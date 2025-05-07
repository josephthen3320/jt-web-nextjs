import { getChapterData, getNovelList } from '@/lib/webnovel';
import type { ChapterData } from '@/types/webnovel';

type Props = {
    params: Promise<{
        title: string;
        volume: string;
        chapter: string;
        volumeAlias: string;
        chapterAlias: string;
    }>;
};

export default async function ChapterPage({ params }: Props) {
    // Next.js 15 now models `params` as a Promise, so we await it first:
    const { title, volume, chapter } = await params;
    const chapterData = await getChapterData(title, volume, chapter);

    return (
        <div className="container mx-auto py-8 max-w-3xl">
            <nav className="mb-6">
                <a href={`/wn/${title}`} className="text-blue-600 hover:underline">
                    ← Back to: {chapterData.series}
                </a>
            </nav>

            <p className="text-gray-600 mb-2">
                {chapterData.volumeAlias} {volume.split('-')[1]}, {chapterData.chapterAlias} {chapter.split('-')[1]}
            </p>
            <h1 className="text-3xl font-bold mb-8">{chapterData.title}</h1>

            <article
                className="prose lg:prose-xl dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: chapterData.contentHtml }}
            />

            <div className="mt-12 pt-6 border-t flex justify-between">
                {chapterData.prevChapter ? (
                    <a
                        href={`/wn/${title}/${volume}/${chapterData.prevChapter}`}
                        className="text-blue-600 hover:underline"
                    >
                        ← Previous Chapter
                    </a>
                ) : <span />}

                {chapterData.nextChapter ? (
                    <a
                        href={`/wn/${title}/${volume}/${chapterData.nextChapter}`}
                        className="text-blue-600 hover:underline"
                    >
                        Next Chapter →
                    </a>
                ) : <span />}
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const novels = await getNovelList();
    const params: Array<{ title: string; volume: string; chapter: string }> = [];

    for (const novel of novels) {
        const { getNovelData } = await import('@/lib/webnovel');
        const novelData = await getNovelData(novel.slug);
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
