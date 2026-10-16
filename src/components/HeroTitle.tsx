"use client";

// Words materialize (blur, rise, fade) one after another. The full text stays in
// aria-label so screen readers read it as one phrase.
export default function HeroTitle({ text }: { text: string }) {
  return (
    <h1
      aria-label={text}
      className="mx-auto max-w-5xl text-balance text-[clamp(2.75rem,7vw,4.75rem)] font-semibold text-foreground"
    >
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          aria-hidden
          className="hero-materialize inline-block"
          style={{ "--i": i + 1 } as React.CSSProperties}
        >
          {word}
          {" "}
        </span>
      ))}
    </h1>
  );
}
