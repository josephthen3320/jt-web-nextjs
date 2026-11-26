/**
 * Tags are authored as YAML lists now (that is what the CMS writes), but older
 * posts used a comma-separated string. Normalise both shapes to a de-duplicated
 * array so every page consumes the same type.
 */
export function toTagList(value: unknown): string[] {
    const items = Array.isArray(value)
        ? value.map((tag) => String(tag))
        : String(value ?? '').split(',');

    return [...new Set(items.map((tag) => tag.trim()).filter(Boolean))];
}

/** Anchor-safe id for a tag: "Node.js" -> "node-js". */
export function tagAnchor(tag: string) {
    return tag
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}
