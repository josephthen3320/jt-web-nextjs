import {getNovelData, getNovelList} from '@/lib/webnovel';
import {ArrowRight, Bookmark, BookOpen, Calendar, Library, NotebookText, User} from 'lucide-react';

export async function generateMetadata() {
    return {
        title: 'Webnovel Library | Joseph Thenara',
        description: 'Explore my collection of self-published webnovels and discover new stories',
    };
}

export default async function WebnovelHome() {
    const novels = await getNovelList();

    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center justify-center gap-3">
                        <Library className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        Webnovel Library
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Explore my collection of self-published works
                    </p>
                </header>

                {novels.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        <NotebookText className="h-12 w-12 mx-auto mb-4" />
                        <p className="text-xl">No novels available yet</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {novels.map((novel) => (
                            <a
                                key={novel.slug}
                                href={`/wn/${novel.slug}`}
                                className="group block rounded-xl hover:no-underline focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                aria-label={`View ${novel.title} details`}
                            >
                                <article className="border rounded-xl p-6 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm hover:shadow-md h-full">
                                    <div className="relative z-20">
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                            {novel.title}
                                        </h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 flex-shrink-0" />
                                                <span className="truncate">{novel.author}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 flex-shrink-0" />
                                                <span className="truncate">{novel.lastUpdated}</span>
                                            </div>
                                        </div>

                                        {novel.description && (
                                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                                                {novel.description}
                                            </p>
                                        )}

                                        <div className="flex justify-between items-center text-sm">
                                            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                            <span className="text-blue-600 dark:text-blue-300">
                                {novel.volumes} Volume{novel.volumes !== 1 && 's'}
                            </span>
                                            </div>

                                            <div className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                                <span>Explore</span>
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}