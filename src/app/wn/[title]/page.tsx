import { getChapterData, getNovelData } from '@/lib/webnovel';
import type { NovelData, ChapterData } from '@/types/webnovel';
import { notFound } from 'next/navigation';
import { ArrowLeft, User, BookOpen, BarChart, Clock } from 'lucide-react';
import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import {formatPublishedDate} from "@/lib/formatPublishedDate";

type Props = {
    params: Promise<{ title: string }>;
};

async function getLatestValidChapterData(
    title: string,
    volumeSlug: string,
    chapters: { slug: string; title?: string }[]
): Promise<ChapterData | null> {
    for (let i = chapters.length - 1; i >= 0; i--) {
        const chapterSlug = chapters[i].slug;
        try {
            const data = await getChapterData(title, volumeSlug, chapterSlug);
            return data;
        } catch (err) {
            console.warn(`Skipping missing chapter: ${chapterSlug}`, err);
        }
    }
    return null;
}

export async function generateMetadata({ params }: Props) {
    const { title } = await params;
    const novel = await getNovelData(title);
    return {
        title: `${novel.title} | Joseph Thenara`,
        description: `View details and chapters for ${title}`,
    };
}

export default async function NovelPage({ params }: Props) {
    const { title } = await params;
    const novel = await getNovelData(title);

    if (!novel) notFound();

    const totalVolume = novel.volumes.length;
    const currentVolume = novel.volumes[totalVolume - 1];
    const latestChapterData = await getLatestValidChapterData(title, currentVolume.slug, currentVolume.chapters);

    if (!latestChapterData) notFound();

    const totalChapters = novel.volumes.reduce((acc, vol) => acc + vol.chapters.length, 0);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Back Navigation */}
            <nav className="mb-6">
                <Link
                    href="/wn"
                    className="inline-flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    All Novels / {new Date(latestChapterData.publishedAt).toLocaleDateString()}
                </Link>
            </nav>

            {/* Novel Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{novel.title}</h1>

                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300 mb-6">
                    <div className="flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        <span>{novel.author}</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-2">
                            <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Volumes</p>
                                <p className="font-semibold">{novel.volumes.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-2">
                            <BarChart className="h-6 w-6 text-green-600 dark:text-green-400" />
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Chapters</p>
                                <p className="font-semibold">{totalChapters}</p>
                            </div>
                        </div>
                    </div>
                    {novel.updatedAt && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Last Updated</p>
                                    <p className="font-semibold text-sm">
                                        {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(novel.updatedAt))}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Synopsis */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 w-full max-w-none">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Synopsis</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{novel.description}</p>
                </div>
            </div>

            {/* Volume List */}
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Volume List</h2>
            <div className="space-y-4">
                {novel.volumes.map((volume) => (
                    <section
                        key={volume.slug}
                        className="border rounded-xl p-6 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                    {novel.volumeAlias} {volume.slug.replace('volume-', '')}
                                </h3>
                                {volume.title && (
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">{volume.title}</p>
                                )}
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                {volume.chapters.length} Chapters
              </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1">
                            {volume.chapters.map((chapter) => (
                                <Link
                                    key={chapter.slug}
                                    href={`/wn/${novel.slug}/${volume.slug}/${chapter.slug}`}
                                    className="group flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                >
                                    <div className="flex gap-3 items-center w-full">
                                        {/* Chapter Number */}
                                        <span className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors shrink-0">
                                          {novel.chapterAlias} {chapter.chapter}
                                        </span>

                                        {/* Chapter Title */}
                                        {chapter.title && (
                                            <span className="text-sm text-gray-700 dark:text-gray-300 truncate min-w-0 flex-1">
                                                {chapter.title}
                                            </span>
                                        )}

                                        {/* Publish Date */}
                                        {chapter.publishedAt && (
                                            <span className="text-sm text-gray-500 dark:text-gray-400 font-mono text-right shrink-0 ml-auto">
                                                {formatPublishedDate(chapter.publishedAt)}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const { getNovelList } = await import('@/lib/webnovel');
    const novels = await getNovelList();
    const params: Array<{ title: string }> = novels.map((novel) => ({ title: novel.slug }));
    return params;
}
