export interface ChapterInfo {
    slug: string;
    volume: string;
}

export interface VolumeInfo {
    slug: string;
    chapters: ChapterInfo[];
}

export interface NovelData {
    slug: string;
    title: string;
    author: string;
    description: string;
    volumes: VolumeInfo[];
}

export interface ChapterData {
    novelSlug: string;
    volumeSlug: string;
    chapterSlug: string;
    title: string;
    contentHtml: string;
    prevChapter?: string;
    nextChapter?: string;
}