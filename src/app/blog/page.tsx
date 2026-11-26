import Link from "next/link";
import type {Metadata} from "next";
import { getAllPosts, tagAnchor } from "@/lib/posts";

export const metadata: Metadata = {
    title: "Joseph Thenara - Blog",
    description: "",
};

export default function BlogList() {
    const posts = getAllPosts();

    return (
        <>
            <div className="max-w-6xl mx-auto p-5">
                <div className="space-y-2 pt-6 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        Blog Posts
                    </h1>
                    <p className="text-md leading-7 text-gray-500 dark:text-gray-400">
                        My occasional musings and things I found interesting.
                    </p>
                </div>
                <div className="container py-12">
                    <div className="flex flex-col gap-4">
                        {posts.map((post) => (
                            <div
                                key={post.slug}
                                className="p-5 rounded-md border border-gray-200 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900 transition duration-300"
                            >
                                <p className="text-gray-500 dark:text-gray-400 text-xs mb-1.5">{post.date}</p>
                                <Link href={`/blog/${post.slug}`} className="text-gray-900 hover:text-pink-700 dark:text-gray-50 dark:hover:text-pink-400">
                                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                                </Link>
                                <p className="text-gray-600 dark:text-gray-400 mt-2 mb-3">{post.description}</p>
                                {/* Tags Rendering */}
                                <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                                    {post.tags.map((tag) => (
                                        <Link
                                            key={tag}
                                            href={`/tags#${tagAnchor(tag)}`}
                                            className="inline-flex items-center justify-center rounded-lg border border-pink-700 py-1 px-3 text-xs font-medium text-pink-700 dark:text-pink-400 dark:border-pink-400 uppercase transition duration-500 ease-in-out hover:bg-pink-700 hover:text-white"
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );

}
