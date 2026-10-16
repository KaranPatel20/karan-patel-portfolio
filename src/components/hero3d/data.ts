// Synthetic points that illustrate the Living Flood Map pipeline. They are not real tweets
// and no F1 is computed from them. A seeded PRNG keeps the layout identical on every load.

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Rand = () => number;

function gauss(rand: Rand) {
  let u = 0;
  while (u === 0) u = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand());
}

const FLOOD = { center: [1.35, 0.3, 0.2], sigma: [0.42, 0.38, 0.4] } as const;
const NOISE = { center: [-1.35, -0.25, -0.2], sigma: [0.78, 0.62, 0.7] } as const;

// Gaussian blob around a cluster centre, rejecting samples beyond 2.2 sigma.
function sampleCluster(rand: Rand, cluster: typeof FLOOD | typeof NOISE, spread: number) {
  for (;;) {
    const g: [number, number, number] = [gauss(rand), gauss(rand), gauss(rand)];
    if (Math.hypot(g[0], g[1], g[2]) > 2.2) continue;
    return [
      cluster.center[0] + g[0] * cluster.sigma[0] * spread,
      cluster.center[1] + g[1] * cluster.sigma[1] * spread,
      cluster.center[2] + g[2] * cluster.sigma[2] * spread,
    ] as const;
  }
}

// Tangled start: truncated 3D Gaussian, sigma 0.8, max length 2.3.
function sampleTangle(rand: Rand) {
  for (;;) {
    const p: [number, number, number] = [gauss(rand) * 0.8, gauss(rand) * 0.8, gauss(rand) * 0.8];
    if (Math.hypot(p[0], p[1], p[2]) <= 2.3) return p;
  }
}

export type PointData = {
  count: number;
  a: Float32Array;
  b: Float32Array;
  c: Float32Array;
  // Per point: x = predicted flood by the local model, y = predicted flood after review,
  // z = reviewed by Gemini, w = random seed that staggers the motion.
  meta: Float32Array;
};

export function generatePoints(count: number): PointData {
  const rand = mulberry32(20260616);
  const a = new Float32Array(count * 3);
  const b = new Float32Array(count * 3);
  const c = new Float32Array(count * 3);
  const meta = new Float32Array(count * 4);

  for (let i = 0; i < count; i++) {
    const isFlood = rand() < 0.38;
    const localWrong = rand() < (isFlood ? 0.22 : 0.14);
    const predLocalFlood = localWrong ? !isFlood : isFlood;
    const reviewed = localWrong ? rand() < 0.85 : rand() < 0.12;
    let predFinalFlood = predLocalFlood;
    if (reviewed) predFinalFlood = rand() < 0.93 ? isFlood : !isFlood;
    const seed = rand();

    const tangled = sampleTangle(rand);

    const localCluster = predLocalFlood ? FLOOD : NOISE;
    const fringe = sampleCluster(rand, localCluster, reviewed ? 1.55 : 1);
    const bPos = reviewed
      ? ([fringe[0] * 0.7, fringe[1] * 0.7, fringe[2] * 0.7] as const)
      : fringe;

    let cPos = bPos;
    if (predFinalFlood !== predLocalFlood || reviewed) {
      cPos = sampleCluster(rand, predFinalFlood ? FLOOD : NOISE, reviewed ? 1.1 : 1);
    }

    a.set(tangled, i * 3);
    b.set(bPos, i * 3);
    c.set(cPos, i * 3);
    meta[i * 4] = predLocalFlood ? 1 : 0;
    meta[i * 4 + 1] = predFinalFlood ? 1 : 0;
    meta[i * 4 + 2] = reviewed ? 1 : 0;
    meta[i * 4 + 3] = seed;
  }

  return { count, a, b, c, meta };
}
