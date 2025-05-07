import { getNovelData } from '@/lib/webnovel';
import type { NovelData } from '@/types/webnovel';

type Props = {
    params: Promise<{
        title: string;
    }>;
};

export default async function NovelPage({ params }: Props) {
    // Await the params promise first
    const { title } = await params;
    const novel = await getNovelData(title);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-2">{novel.title}</h1>
            <p className="text-gray-600 mb-6">by {novel.author}</p>
            <p className="mb-8">{novel.description}</p>

            <h2 className="text-2xl font-bold mb-4">Volumes</h2>
            <div className="space-y-4">
                {novel.volumes.map((volume) => (
                    <div key={volume.slug} className="border rounded-lg p-4">
                        <h3 className="text-xl font-semibold mb-2">
                            {novel.volumeAlias} {volume.slug.split('-')[1]}
                        </h3>
                        <div className="ml-4">
                            {volume.chapters.map((chapter) => (
                                <div key={chapter.slug} className="py-2">
                                    <a
                                        href={`/wn/${novel.slug}/${volume.slug}/${chapter.slug}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {novel.chapterAlias} {chapter.slug.split('-')[1]}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const { getNovelList, getNovelData } = await import('@/lib/webnovel');
    const novels = await getNovelList();
    const params: Array<{ title: string }> = [];

    for (const novel of novels) {
        params.push({ title: novel.slug });
    }

    return params;
}
