import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getAllPosts, type PostSummary } from "@/lib/posts";
import { tagAnchor } from "@/lib/tags";

export const metadata: Metadata = {
    title: "Joseph Thenara - Tags",
    description: "Blog posts grouped by tag.",
};

type TagGroup = {
    label: string;
    posts: PostSummary[];
};

export default function Tags() {
    const posts = getAllPosts();

    // Group case-insensitively, but keep the spelling from the first post that
    // used the tag so "VR" and "vr" collapse into one section labelled "VR".
    const groups = new Map<string, TagGroup>();
    for (const post of posts) {
        for (const tag of post.tags) {
            const key = tag.toLowerCase();
            const group = groups.get(key);
            if (group) {
                group.posts.push(post);
            } else {
                groups.set(key, { label: tag, posts: [post] });
            }
        }
    }

    const tags = [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));

    return (
        <div className="max-w-6xl mx-auto p-5">
            <nav className="pt-6">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    All posts
                </Link>
            </nav>
            <div className="space-y-2 pt-4 md:space-y-5">
                <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                    Tags
                </h1>
                <p className="text-md leading-7 text-gray-500 dark:text-gray-400">
                    {posts.length} posts across {tags.length} tags.
                </p>
            </div>

            {tags.length === 0 ? (
                <p className="container py-12 text-gray-600 dark:text-gray-400">No tags yet.</p>
            ) : (
                <>
                    {/* Jump list keeps the index usable once the tag count grows */}
                    <div className="pt-8 flex flex-wrap gap-2">
                        {tags.map(([key, group]) => (
                            <a
                                key={key}
                                href={`#${tagAnchor(group.label)}`}
                                className="inline-flex items-center justify-center rounded-lg border border-pink-700 py-1 px-3 text-xs font-medium text-pink-700 dark:text-pink-400 dark:border-pink-400 uppercase transition duration-500 ease-in-out hover:bg-pink-700 hover:text-white"
                            >
                                {group.label}
                            </a>
                        ))}
                    </div>

                    <div className="container py-8 space-y-10">
                        {tags.map(([key, group]) => (
                            <section key={key} id={tagAnchor(group.label)}>
                                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {group.label}
                                    <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                        {group.posts.length} {group.posts.length === 1 ? "post" : "posts"}
                                    </span>
                                </h2>
                                <ul className="space-y-3">
                                    {group.posts.map((post) => (
                                        <li
                                            key={post.slug}
                                            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-gray-200 pb-3 dark:border-gray-800"
                                        >
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="text-gray-900 hover:text-pink-700 dark:text-gray-50 dark:hover:text-pink-400"
                                            >
                                                {post.title}
                                            </Link>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {post.date}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
