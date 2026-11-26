import type { NovelData } from '@/types/webnovel';

export interface FlatChapter {
    volumeSlug: string;
    chapterSlug: string;
    volume: number;
    chapter: number;
    title?: string;
    publishedAt?: string | null;
}

export interface ChapterNavigation {
    /** Position in reading order, or -1 when the chapter is not part of the novel. */
    index: number;
    total: number;
    current: FlatChapter | null;
    previous: FlatChapter | null;
    next: FlatChapter | null;
}

/**
 * `getNovelData` already sorts volumes and chapters numerically, so flattening
 * them yields reading order - prologues and volume breaks included.
 */
export function flattenChapters(novel: NovelData): FlatChapter[] {
    return novel.volumes.flatMap((volume) =>
        volume.chapters.map((chapter) => ({
            volumeSlug: volume.slug,
            chapterSlug: chapter.slug,
            volume: chapter.volume,
            chapter: chapter.chapter,
            title: chapter.title,
            publishedAt: chapter.publishedAt,
        }))
    );
}

export function chapterHref(novelSlug: string, chapter: FlatChapter): string {
    return `/wn/${novelSlug}/${chapter.volumeSlug}/${chapter.chapterSlug}`;
}

/**
 * Neighbours come from the flattened list rather than chapter-±1, so links
 * cross volume boundaries instead of pointing at non-existent files.
 */
export function resolveChapterNavigation(
    novel: NovelData,
    volumeSlug: string,
    chapterSlug: string
): ChapterNavigation {
    const chapters = flattenChapters(novel);
    const index = chapters.findIndex(
        (chapter) => chapter.volumeSlug === volumeSlug && chapter.chapterSlug === chapterSlug
    );

    return {
        index,
        total: chapters.length,
        current: index >= 0 ? chapters[index] : null,
        previous: index > 0 ? chapters[index - 1] : null,
        next: index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : null,
    };
}
