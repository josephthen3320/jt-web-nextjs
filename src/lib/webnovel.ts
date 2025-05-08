import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { ChapterInfo, VolumeInfo, NovelData, ChapterData } from '@/types/webnovel';
import {slug} from "github-slugger";

const contentDirectory = path.join(process.cwd(), 'src/content/webnovels');

export async function getNovelList() {
    const novelDirs = await fs.readdir(contentDirectory);
    const novels = await Promise.all(
        novelDirs.map(async (dir) => {
            const novelPath = path.join(contentDirectory, dir);

            // 👉 Count only subdirectories named "volume-*"
            const entries = await fs.readdir(novelPath, { withFileTypes: true });
            const volumeCount = entries.filter(
                (e) => e.isDirectory() && e.name.startsWith('volume-')
            ).length;

            // 👉 Read your existing meta.json
            const metaPath = path.join(novelPath, 'meta.json');
            const metaData = JSON.parse(await fs.readFile(metaPath, 'utf8'));

            return {
                slug: dir,
                title: metaData.title,
                author: metaData.author,
                description: metaData.description,
                // replace metaData.volumes?.length with actual folder count
                volumes: volumeCount,
                lastUpdated: metaData.updatedAt || null,
            };
        })
    );
    return novels;
}

export async function getNovelData(slug: string): Promise<NovelData> {
    const metaPath = path.join(contentDirectory, slug, 'meta.json');
    const metaData = JSON.parse(await fs.readFile(metaPath, 'utf8'));

    const volumeDirs = (await fs.readdir(path.join(contentDirectory, slug)))
        .filter(item => item.startsWith('volume-'))
        .sort((a, b) => {
            const aNum = parseInt(a.split('-')[1]);
            const bNum = parseInt(b.split('-')[1]);
            return aNum - bNum;
        });

    const volumes = await Promise.all(volumeDirs.map(async (volumeDir) => {
        const volumeNum = parseInt(volumeDir.split('-')[1]);
        const chapterFiles = (await fs.readdir(path.join(contentDirectory, slug, volumeDir)))
            .filter(file => file.endsWith('.md'))
            .sort((a, b) => {
                const aNum = parseInt(a.split('-')[1]);
                const bNum = parseInt(b.split('-')[1]);
                return aNum - bNum;
            });

        const chapters = await Promise.all(chapterFiles.map(async (file) => {
            const chapterNum = parseInt(file.split('-')[1]);
            const filePath = path.join(contentDirectory, slug, volumeDir, file);
            const { data } = matter(await fs.readFile(filePath, 'utf8'));

            return {
                slug: file.replace('.md', ''),
                title: data.title,
                volume: volumeNum, // number type
                chapter: chapterNum
            } as ChapterInfo;
        }));

        return {
            slug: volumeDir,
            title: metaData.volumes?.[volumeNum]?.title,
            volume: volumeNum,
            volumeAlias: metaData.volumeAlias || 'Volume',
            chapters
        } as VolumeInfo;
    }));

    return {
        slug,
        title: metaData.title,
        author: metaData.author,
        description: metaData.description,
        volumeAlias: metaData.volumeAlias || 'Volume',
        chapterAlias: metaData.chapterAlias || 'Chapter',
        volumes,
        updatedAt: metaData.updatedAt || new Date().toISOString()
    };
}

export async function getChapterData(title: string, volume: string, chapter: string): Promise<ChapterData> {
    const filePath = path.join(contentDirectory, title, volume, `${chapter}.md`);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const processedContent = await remark().use(html).process(content);

    // Parse volume/chapter numbers from slugs
    const volumeNum = parseInt(volume.split('-')[1]);
    const chapterNum = parseInt(chapter.split('-')[1]);

    return {
        novelSlug: title,
        volumeSlug: volume,
        chapterSlug: chapter,
        slug: chapter,
        title: data.title || `${data.chapterAlias || 'Chapter'} ${chapterNum}`,
        contentHtml: processedContent.toString(),
        volume: volumeNum,
        chapter: chapterNum,
        volumeAlias: data.volumeAlias || 'Volume',
        chapterAlias: data.chapterAlias || 'Chapter',
        series: data.series || title,
        publishedAt: data.publishedAt || new Date().toISOString(),
        prevChapter: data.prevChapter || null,
        nextChapter: data.nextChapter || null
    };
}