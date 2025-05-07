import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { ChapterInfo, VolumeInfo, NovelData, ChapterData } from '@/types/webnovel';

const contentDirectory = path.join(process.cwd(), 'src/content/webnovels');

export async function getNovelList() {
    const novelDirs = await fs.readdir(contentDirectory);
    return novelDirs.map(dir => ({ slug: dir }));
}

export async function getNovelData(slug: string): Promise<NovelData> {
    const metaPath = path.join(contentDirectory, slug, 'meta.json');
    const metaData = JSON.parse(await fs.readFile(metaPath, 'utf8'));

    const volumeDirs = (await fs.readdir(path.join(contentDirectory, slug)))
        .filter(item => item.startsWith('volume-'));

    const volumes = await Promise.all(volumeDirs.map(async (volume) => {
        const chapterFiles = (await fs.readdir(path.join(contentDirectory, slug, volume)))
            .filter(file => file.endsWith('.md'));

        const chapters = await Promise.all(chapterFiles.map(async (file) => {
            return {
                slug: file.replace(/\.md$/, ''),
                volume: volume,
            };
        }));

        return {
            slug: volume,
            chapters: chapters.sort((a, b) => a.slug.localeCompare(b.slug))
        };
    }));

    return {
        slug,
        ...metaData,
        volumes: volumes.sort((a, b) => a.slug.localeCompare(b.slug))
    };
}

export async function getChapterData(
    novelSlug: string,
    volumeSlug: string,
    chapterSlug: string
): Promise<ChapterData> {
    const fullPath = path.join(contentDirectory, novelSlug, volumeSlug, `${chapterSlug}.md`);
    const fileContents = await fs.readFile(fullPath, 'utf8');

    const matterResult = matter(fileContents);
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    const allChapters = (await fs.readdir(path.join(contentDirectory, novelSlug, volumeSlug)))
        .filter(file => file.endsWith('.md'))
        .map(file => file.replace(/\.md$/, ''))
        .sort();

    const currentIndex = allChapters.indexOf(chapterSlug);

    return {
        novelSlug,
        volumeSlug,
        chapterSlug,
        contentHtml,
        title: matterResult.data.title,
        prevChapter: currentIndex > 0 ? allChapters[currentIndex - 1] : undefined,
        nextChapter: currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : undefined,
    };
}