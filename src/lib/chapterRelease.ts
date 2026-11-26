/**
 * Content dates are authored as date-only strings ("2025-05-15"). `new Date()`
 * reads those as UTC midnight, which shifts the release day for anyone outside
 * UTC. Parse them at local midnight so a chapter releases at the start of its
 * own day.
 */
export function parsePublishedDate(publishedAt: string): Date | null {
    const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(publishedAt.trim());

    const parsed = dateOnly
        ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]))
        : new Date(publishedAt);

    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function isReleased(publishedAt: string | null | undefined, now: Date) {
    if (!publishedAt) return true;

    const releaseDate = parsePublishedDate(publishedAt);
    if (!releaseDate) return true;

    return releaseDate.getTime() <= now.getTime();
}

/**
 * Single source of truth for chapter gating: future-dated chapters stay
 * previewable in development and are hidden/is blocked once deployed.
 * A chapter dated today is available all day.
 */
export function isChapterAvailable(
    publishedAt: string | null | undefined,
    now: Date = new Date()
): boolean {
    if (process.env.NODE_ENV !== 'production') return true;

    return isReleased(publishedAt, now);
}
