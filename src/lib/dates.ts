/**
 * Frontmatter edited in the CMS stores unquoted YAML dates, which gray-matter
 * parses into Date objects; hand-written files use "YYYY-MM-DD" strings.
 * Pages expect the string form, so normalise both at the loader boundary.
 */
export function toDateString(value: unknown): string {
    if (value instanceof Date) return value.toISOString().slice(0, 10);
    return String(value ?? '');
}
