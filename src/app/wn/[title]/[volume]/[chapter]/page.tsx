import { notFound } from 'next/navigation';
import Link from 'next/link';
import {getChapterData, getNovelData, getNovelList} from '@/lib/webnovel';
import {chapterHref, resolveChapterNavigation} from '@/lib/chapterNavigation';
import {isChapterAvailable, parsePublishedDate} from '@/lib/chapterRelease';
import {ArrowLeft, ArrowRight, Clock, WrapText} from 'lucide-react';

type Props = {
    params: Promise<{
        title: string;
        volume: string;
        chapter: string;
        volumeAlias: string;
        chapterAlias: string;
    }>;
};

export async function generateMetadata({ params }: Props) {
    const { title, volume, chapter } = await params;

    const novel = await getNovelData(title);
    if (!novel) {
        return {
            title: 'Chapter not found | Joseph Thenara',
        };
    }

    const chapterData = await getChapterData(title, volume, chapter);

    return {
        title: chapterData
            ? `${novel.title} - ${chapterData.chapterAlias} ${chapterData.chapter} | Joseph Thenara`
            : `${novel.title} - Chapter not found | Joseph Thenara`,
        description: chapterData
            ? `Read ${novel.title} ${chapterData.chapterAlias} ${chapterData.chapter} on our platform.`
            : `Chapter not found for ${novel.title}.`,
    };
}

export default async function ChapterPage({ params }: Props) {
    const { title, volume, chapter } = await params;

    // Resolve the novel first so hidden novels 404 even when a chapter file exists.
    const novel = await getNovelData(title);
    if (!novel) notFound();

    const chapterData = await getChapterData(title, volume, chapter);
    if (!chapterData) notFound();

    const publishedDate = parsePublishedDate(chapterData.publishedAt);
    const navigation = resolveChapterNavigation(novel, volume, chapter);

    // Scheduled chapters are readable in development but gated once deployed.
    if (!isChapterAvailable(chapterData.publishedAt)) {
        return (
            <><nav
                className="mb-6 sticky top-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-2 shadow-sm z-10">
                <Link
                    href={`/wn/${title}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Back to {chapterData.series}
                </Link>
            </nav>
                <div className="container mx-auto px-4 py-20 max-w-xl text-center">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                        Chapter Not Yet Available
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        This chapter is scheduled to release on:{' '}
                        <span className="font-mono">
                            {publishedDate
                                ? publishedDate.toLocaleDateString(undefined, {
                                    weekday: 'short',
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })
                                : chapterData.publishedAt}
                        </span>
                    </p>
                </div>
            </>
        );
    }

    // Calculate estimated reading time (assume 200 words per minutes.)
    const wordCount = chapterData.contentHtml.split(/\s+/).length;       // Count words
    const readingTime =  Math.ceil(wordCount / 120);            // Calculate reading time (rounded up)

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <nav className="mb-6 sticky top-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-2 shadow-sm z-10">
                <Link
                    href={`/wn/${title}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to {chapterData.series}
                </Link>
            </nav>

            <div className="mb-8 space-y-2">
                <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        {chapterData.volumeAlias} {volume.split('-')[1]} :: {chapterData.chapterAlias} {chapter.split('-')[1]}
                    </p>
                    <p className="font-thin">
                        {navigation.index + 1} / {navigation.total}
                    </p>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {chapterData.title}
                </h1>
                <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
                    <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {readingTime} mins
                    </span>
                    <span className="flex items-center gap-2">
                        <WrapText className={"h-4 w-4"} />
                        {wordCount} words
                    </span>
                </div>
            </div>

            <article
                className="prose lg:prose-lg dark:prose-invert
                           max-w-none prose-headings:font-medium
                           prose-p:leading-relaxed prose-a:text-blue-600
                           dark:prose-a:text-blue-400 mb-8"
                dangerouslySetInnerHTML={{ __html: chapterData.contentHtml }}
            />

            <div className="mb-8 space-y-2">
                <p className="text-gray-500 dark:text-gray-400">
                    Published on: {publishedDate?.toLocaleDateString() ?? chapterData.publishedAt}
                </p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between gap-4">
                    {navigation.previous && (
                        <Link
                            href={chapterHref(title, navigation.previous)}
                            className="flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="mr-2 h-5 w-5" />
                            <div className="text-left">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {novel.volumeAlias} {navigation.previous.volume} · Previous
                                </span>
                                <p className="font-medium">{chapterData.chapterAlias} {navigation.previous.chapter}</p>
                            </div>
                        </Link>
                    )}

                    {navigation.next && (
                        <Link
                            href={chapterHref(title, navigation.next)}
                            className="flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-lg transition-colors ml-auto"
                        >
                            <div className="text-right">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    Next · {novel.volumeAlias} {navigation.next.volume}
                                </span>
                                <p className="font-medium">{chapterData.chapterAlias} {navigation.next.chapter}</p>
                            </div>
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const novels = await getNovelList();
    const params: Array<{ title: string; volume: string; chapter: string }> = [];

    for (const novel of novels) {
        const novelData = await getNovelData(novel.slug);
        if (!novelData) continue;

        for (const volume of novelData.volumes) {
            for (const chapter of volume.chapters) {
                params.push({
                    title: novel.slug,
                    volume: volume.slug,
                    chapter: chapter.slug,
                });
            }
        }
    }

    return params;
}
