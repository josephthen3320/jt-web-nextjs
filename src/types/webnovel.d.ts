export interface ChapterInfo {
    publishedAt?: string | null;
    slug: string;
    title?: string;
    volume: number; // Changed to number
    chapter: number;
}

export interface VolumeInfo {
    slug: string;
    title?: string;
    chapters: ChapterInfo[];
    volume: number;
    volumeAlias: string;
}

export interface NovelData {
    slug: string;
    title: string;
    author: string;
    description: string;
    volumes: VolumeInfo[];
    volumeAlias: string;
    chapterAlias: string;
    updatedAt: string;
}

export interface ChapterData {
    overallChapterNo: number;
    slug: string;
    novelSlug: string;
    volumeSlug: string;
    chapterSlug: string;
    title: string;
    contentHtml: string;
    //prevChapter?: string;
    //nextChapter?: string;
    series: string;
    volume: number;
    chapter: number;
    volumeAlias: string;
    chapterAlias: string;
    publishedAt: string;
    isFinalChapter: boolean;
    isFirstChapter: boolean;
}