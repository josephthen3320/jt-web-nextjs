import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format, parseISO } from 'date-fns';
import { toTagList } from '@/lib/tags';

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

/**
 * Posts are plain markdown in src/app/posts. Tags are YAML lists written by the
 * CMS (older entries used a comma-separated string); toTagList normalises both
 * so every page that lists posts consumes the same shape.
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
                tags: toTagList(data.tags),
            };
        })
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
