import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format, parseISO } from 'date-fns';

export interface PostSummary {
    slug: string;
    title: string;
    description: string;
    /** Human-readable publish date, e.g. "April 30, 2025". */
    date: string;
    /** Raw ISO date, kept for sorting. */
    publishedAt: string;
    tags: string[];
}

const postsDirectory = path.join(process.cwd(), 'src/app/posts');

/** Anchor-safe id for a tag: "Node.js" -> "node-js". */
export function tagAnchor(tag: string) {
    return tag
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

/**
 * Posts are plain markdown in src/app/posts. Tags are authored as a
 * comma-separated frontmatter string, so they are normalised to an array here
 * and every page that lists posts consumes the same shape.
 */
export function getAllPosts(): PostSummary[] {
    return fs
        .readdirSync(postsDirectory)
        .filter((filename) => filename.endsWith('.md'))
        .map((filename) => {
            const filePath = path.join(postsDirectory, filename);
            const { data } = matter(fs.readFileSync(filePath, 'utf8'));

            return {
                slug: filename.replace('.md', ''),
                title: data.title,
                description: data.description,
                date: format(parseISO(data.publishedAt), 'LLLL d, yyyy'),
                publishedAt: data.publishedAt,
                tags: [...new Set(
                    String(data.tags ?? '')
                        .split(',')
                        .map((tag) => tag.trim())
                        .filter(Boolean)
                )],
            };
        })
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
