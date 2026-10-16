import { RevealGroup, RevealItem } from "@/components/Reveal";
import { container } from "@/lib/layout";

export default function Section({
  id,
  title,
  alt = false,
  hint,
  staggerContent = false,
  children,
}: {
  id: string;
  title: string;
  alt?: boolean;
  hint?: string;
  // When true the children wrap their own cards in RevealItem so they stagger in.
  staggerContent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={alt ? "bg-surface-2" : undefined}>
      <RevealGroup className={`${container} py-14 sm:py-16`}>
        <RevealItem>
          <h2 className="text-2xl text-foreground sm:text-3xl">{title}</h2>
          {hint && <p className="mt-2 text-sm text-muted">{hint}</p>}
        </RevealItem>
        {staggerContent ? (
          <div className="mt-6">{children}</div>
        ) : (
          <RevealItem className="mt-6" order={1}>
            {children}
          </RevealItem>
        )}
      </RevealGroup>
    </section>
  );
}
