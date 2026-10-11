// One content container for the header, every section and the footer, so side padding
// and max width cannot drift between them.
export const container = "mx-auto w-full max-w-7xl px-6 sm:px-12 lg:px-16";

// Card surface taken from the hero result card: 32px radius, 24px padding (32px from sm up).
// Every card on the site uses it, and card grids use cardGap between cards.
export const card = "rounded-[32px] border border-border bg-surface p-6 shadow-card sm:p-8";
export const cardGap = "gap-6";
