"use client";

// Letter-by-letter entrance for the headline. The full text stays in aria-label so
// screen readers read it as one phrase.
export default function HeroTitle({ text }: { text: string }) {
  return (
    <h1
      aria-label={text}
      className="text-balance mt-4 font-mono text-[clamp(2.75rem,7vw,4.75rem)] font-normal leading-none tracking-[-0.015em] text-foreground"
    >
      {text.split(" ").map((word, w, words) => {
        const before = words.slice(0, w).join(" ").length + (w > 0 ? 1 : 0);
        return (
          <span key={w} aria-hidden className="inline-block whitespace-nowrap">
            {word.split("").map((char, c) => (
              <span
                key={c}
                className="hero-rise inline-block"
                style={{ "--i": (before + c) * 0.35 + 1 } as React.CSSProperties}
              >
                {char}
              </span>
            ))}
            {w < words.length - 1 && " "}
          </span>
        );
      })}
    </h1>
  );
}
