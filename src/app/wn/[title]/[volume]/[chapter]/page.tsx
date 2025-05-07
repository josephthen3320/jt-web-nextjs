import { getChapterData } from '@/lib/webnovel';
import { getNovelList } from '@/lib/webnovel';
import type { ChapterData } from '@/types/webnovel';

export default async function ChapterPage({
                                              params,
                                          }: {
    params: { title: string; volume: string; chapter: string };
}) {
    const chapter = await getChapterData(params.title, params.volume, params.chapter);

    return (
        <div className="container mx-auto py-8 max-w-3xl">
            <nav className="mb-6">
                <a href={`/wn/${params.title}`} className="text-blue-600 hover:underline">
                    ← Back to {params.title.replace(/-/g, ' ')}
                </a>
            </nav>

            <h1 className="text-3xl font-bold mb-2">{chapter.title}</h1>
            <p className="text-gray-600 mb-8">
                Volume {params.volume.split('-')[1]}, Chapter {params.chapter.split('-')[1]}
            </p>

            <article
                className="prose lg:prose-xl dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: chapter.contentHtml }}
            />

            <div className="mt-12 pt-6 border-t flex justify-between">
                <div>
                    {chapter.prevChapter && (
                        <a
                            href={`/wn/${params.title}/${params.volume}/${chapter.prevChapter}`}
                            className="text-blue-600 hover:underline"
                        >
                            ← Previous Chapter
                        </a>
                    )}
                </div>
                <div>
                    {chapter.nextChapter && (
                        <a
                            href={`/wn/${params.title}/${params.volume}/${chapter.nextChapter}`}
                            className="text-blue-600 hover:underline"
                        >
                            Next Chapter →
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const novels = await getNovelList();
    const params = [];

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