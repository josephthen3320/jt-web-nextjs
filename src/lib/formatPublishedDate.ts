export function formatPublishedDate(publishedAt: string): string {
    const publishedDate = new Date(publishedAt);
    const now = new Date();
    const diff = now.getTime() - publishedDate.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const daysAgo = Math.floor(diff / oneDay);

    if (isNaN(publishedDate.getTime())) return ''; // invalid date

    if (daysAgo < 0) return 'In the future: ' + publishedDate.toLocaleDateString(undefined); // future date edge case

    if (daysAgo === 0) return 'Today';
    if (daysAgo === 1) return 'Yesterday';
    if (daysAgo <= 7) return `${daysAgo} days ago`;

    // Use a clean, short, locale-friendly format
    return publishedDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }); // e.g., Apr 13, 2025
}
