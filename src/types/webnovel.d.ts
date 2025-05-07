export interface ChapterInfo {
    slug: string;
    volume: string;
    chapter?: number; // Optional, allows for future use
}

export interface VolumeInfo {
    slug: string;
    chapters: ChapterInfo[];
    volume?: number;         // Optional numeric volume value
    volumeAlias?: string;    // Optional label like "Book"
    chapterAlias?: string;   // Optional label like "Phase"
}

export interface NovelData {
    slug: string;
    title: string;
    author: string;
    description: string;
    volumes: VolumeInfo[];
    volumeAlias?: string;   // Optional default alias for all volumes
    chapterAlias?: string;  // Optional default alias for all chapters
}

export interface ChapterData {
    slug: string;
    novelSlug: string;
    volumeSlug: string;
    chapterSlug: string;
    title: string;
    contentHtml: string;
    prevChapter?: string;
    nextChapter?: string;
    series: string;

    volume?: number;
    chapter?: number;
    volumeAlias?: string;
    chapterAlias?: string;
}
