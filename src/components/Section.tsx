import Reveal from "@/components/Reveal";

export default function Section({
  id,
  title,
  alt = false,
  hint,
  children,
}: {
  id: string;
  title: string;
  alt?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={alt ? "bg-surface-2" : undefined}>
      <Reveal className="mx-auto max-w-7xl px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
        <h2 className="text-2xl text-foreground sm:text-3xl">{title}</h2>
        {hint && <p className="mt-2 text-sm text-muted">{hint}</p>}
        <div className="mt-6">{children}</div>
      </Reveal>
    </section>
  );
}
