import {
  BufferAttribute,
  BufferGeometry,
  Color,
  ColorManagement,
  Group,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";
import { generatePoints } from "./data";

export type SceneColors = { flood: string; noise: string; neutral: string; review: string };

export type SceneApi = {
  render: (t1: number, t2: number, time: number, p: number, px: number, py: number) => void;
  layout: () => void;
  setColors: (colors: SceneColors) => void;
  dispose: () => void;
};

type Elements = { stage: HTMLElement; copy: HTMLElement; card: HTMLElement };

const FOV = 45;
const CAMERA_Z = 7;
const PIXEL_RATIO_CAP = 1.75;
// Space on the right edge kept free for the stage rail.
const RAIL_SPACE = 72;

const vertexShader = /* glsl */ `
  attribute vec3 aB;
  attribute vec3 aC;
  attribute vec4 aMeta;
  uniform float uT1;
  uniform float uT2;
  uniform float uTime;
  uniform float uPR;
  uniform float uSize;
  uniform vec3 uFlood;
  uniform vec3 uNoise;
  uniform vec3 uNeutral;
  uniform vec3 uReview;
  varying vec3 vColor;
  varying float vAlpha;

  float ease(float x) { return x * x * (3.0 - 2.0 * x); }

  void main() {
    float seed = aMeta.w;
    float d1 = ease(clamp(uT1 * 1.6 - seed * 0.6, 0.0, 1.0));
    float d2 = ease(clamp(uT2 * 1.6 - seed * 0.6, 0.0, 1.0));

    vec3 p = mix(mix(position, aB, d1), aC, d2);
    p += 0.03 * vec3(
      sin(uTime * 0.7 + seed * 40.0),
      sin(uTime * 0.6 + seed * 31.0),
      sin(uTime * 0.5 + seed * 23.0)
    );

    vec3 localColor = aMeta.x > 0.5 ? uFlood : uNoise;
    vec3 finalColor = aMeta.y > 0.5 ? uFlood : uNoise;
    vec3 color = mix(mix(uNeutral, localColor, d1), finalColor, d2);

    float flash = aMeta.z > 0.5 ? sin(3.14159265 * d2) : 0.0;
    vColor = mix(color, uReview, flash);

    float localAlpha = aMeta.x > 0.5 ? 0.9 : 0.55;
    float finalAlpha = aMeta.y > 0.5 ? 0.9 : 0.55;
    vAlpha = mix(mix(0.7, localAlpha, d1), finalAlpha, d2);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uSize * (1.0 + 1.2 * flash) * uPR * (7.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float soft = smoothstep(0.5, 0.3, r);
    gl_FragColor = vec4(vColor, vAlpha * soft);
  }
`;

export async function createFloodScene(
  canvas: HTMLCanvasElement,
  { stage, copy, card }: Elements,
  colors: SceneColors,
): Promise<SceneApi> {
  // Pass CSS colours straight through: the custom shader writes sRGB values to the canvas.
  ColorManagement.enabled = false;

  const renderer = new WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 50);
  camera.position.z = CAMERA_Z;
  const group = new Group();
  scene.add(group);

  const lowPower =
    window.innerWidth < 700 ||
    (typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4);
  const data = generatePoints(lowPower ? 1700 : 3400);

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(data.a, 3));
  geometry.setAttribute("aB", new BufferAttribute(data.b, 3));
  geometry.setAttribute("aC", new BufferAttribute(data.c, 3));
  geometry.setAttribute("aMeta", new BufferAttribute(data.meta, 4));

  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uT1: { value: 0 },
      uT2: { value: 0 },
      uTime: { value: 0 },
      uPR: { value: 1 },
      uSize: { value: 4 },
      uFlood: { value: new Color(colors.flood) },
      uNoise: { value: new Color(colors.noise) },
      uNeutral: { value: new Color(colors.neutral) },
      uReview: { value: new Color(colors.review) },
    },
  });

  // The clusters are not symmetric (the noise cluster is wide and sits left), so measure the real
  // spread of every layout and centre the cloud on its bounding box. `halfExtent` is what the
  // layout divides by, so the cloud fits its free area instead of assuming a radius of 2.3.
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const layout of [data.a, data.b, data.c]) {
    for (let i = 0; i < layout.length; i += 3) {
      minX = Math.min(minX, layout[i]);
      maxX = Math.max(maxX, layout[i]);
      minY = Math.min(minY, layout[i + 1]);
      maxY = Math.max(maxY, layout[i + 1]);
    }
  }
  const halfExtent = Math.max(maxX - minX, maxY - minY) / 2;

  const points = new Points(geometry, material);
  points.frustumCulled = false;
  points.position.set(-(minX + maxX) / 2, -(minY + maxY) / 2, 0);
  group.add(points);

  let width = 1;
  let height = 1;
  let pointerX = 0;
  let pointerY = 0;

  function layout() {
    const stageRect = stage.getBoundingClientRect();
    width = Math.max(1, stageRect.width);
    height = Math.max(1, stageRect.height);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, PIXEL_RATIO_CAP);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    material.uniforms.uPR.value = pixelRatio;

    const copyRect = copy.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const wpp = (2 * Math.tan((FOV * Math.PI) / 360) * CAMERA_Z) / height;

    let cx: number;
    let cy: number;
    let radius: number;
    if (width >= 900) {
      const left = Math.max(copyRect.right, cardRect.right) - stageRect.left + 24;
      const right = width - RAIL_SPACE;
      const free = Math.max(120, right - left);
      cx = left + free / 2;
      cy = height / 2;
      radius = Math.min(0.5 * free * 0.95, 0.44 * height);
    } else {
      const top = copyRect.bottom - stageRect.top;
      const bottom = cardRect.top - stageRect.top;
      const gap = Math.max(0, bottom - top);
      cx = width / 2;
      cy = top + gap / 2;
      // Keep at least 70px when the gap allows it; on very short screens shrink to the gap
      // instead of covering the copy or the card.
      const fit = Math.min(0.46 * width, 0.55 * gap);
      radius = gap >= 127 ? Math.max(70, fit) : Math.max(36, fit);
    }

    group.position.set((cx - width / 2) * wpp, -(cy - height / 2) * wpp, 0);
    group.scale.setScalar((radius * wpp) / halfExtent);
    material.uniforms.uSize.value = Math.min(6.5, Math.max(3, radius * 0.02));
  }

  function render(t1: number, t2: number, time: number, p: number, px: number, py: number) {
    pointerX += (px - pointerX) * 0.06;
    pointerY += (py - pointerY) * 0.06;
    material.uniforms.uT1.value = t1;
    material.uniforms.uT2.value = t2;
    material.uniforms.uTime.value = time;
    group.rotation.y = Math.sin(time * 0.2) * 0.25 + pointerX * 0.25 + (p - 0.5) * 0.5;
    group.rotation.x = 0.12 + pointerY * 0.18;
    renderer.render(scene, camera);
  }

  function setColors(next: SceneColors) {
    material.uniforms.uFlood.value.set(next.flood);
    material.uniforms.uNoise.value.set(next.noise);
    material.uniforms.uNeutral.value.set(next.neutral);
    material.uniforms.uReview.value.set(next.review);
  }

  function dispose() {
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  }

  layout();
  // Compile and link the shader off the main thread (KHR_parallel_shader_compile) so the first
  // frame does not stall the page.
  await renderer.compileAsync(scene, camera);
  return { render, layout, setColors, dispose };
}
