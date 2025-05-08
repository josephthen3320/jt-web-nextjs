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
            const chapterSlug = file.replace(/\.md$/, '');
            return {
                slug: chapterSlug,
                volume: volume,
                chapterAlias: metaData.volumes?.[volume]?.chapters?.[chapterSlug]?.alias || null
            };
        }));

        return {
            slug: volume,
            volumeAlias: metaData.volumes?.[volume]?.alias || null,
            chapters: chapters.sort((a, b) => a.slug.localeCompare(b.slug))
        };
    }));

    return {
        slug,
        ...metaData,
        volumes: volumes.sort((a, b) => a.slug.localeCompare(b.slug))
    };
}

export async function getChapterData(title: string, volume: string, chapter: string): Promise<ChapterData> {
    const filePath = path.join(process.cwd(), 'src', 'content', 'webnovels', title, volume, `${chapter}.md`);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
        chapterSlug: "", novelSlug: "", volumeSlug: "",
        title: data.title,
        slug: data.slug || chapter,
        contentHtml,
        chapter: Number(data.chapter),
        volume: Number(data.volume),
        prevChapter: data.prevChapter || null,
        nextChapter: data.nextChapter || null,
        chapterAlias: data.chapterAlias || "Chapter",
        volumeAlias: data.volumeAlias || "Volume",
        series: data.series || null,
        publishedAt: data.publishedAt || null,
    };
}