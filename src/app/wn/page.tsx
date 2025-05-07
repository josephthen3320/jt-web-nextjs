import { getNovelList } from '@/lib/webnovel';

export default async function WebnovelHome() {
    const novels = await getNovelList();

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Webnovel Library</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {novels.map((novel) => (
                    <div key={novel.slug} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                        <a href={`/wn/${novel.slug}`} className="block">
                            <h2 className="text-xl font-semibold capitalize">
                                {novel.slug.replace(/-/g, ' ')}
                            </h2>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}