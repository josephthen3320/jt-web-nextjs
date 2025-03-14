import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import { Key } from "react";
import {format, parseISO} from "date-fns";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Joseph Thenara - Blog",
    description: "",
};

export default function BlogList() {
    const postsDir = path.join(process.cwd(), "src/app/posts");
    const filenames = fs.readdirSync(postsDir);

    const posts = filenames
        .map((filename) => {
            const filePath = path.join(postsDir, filename);
            const fileContent = fs.readFileSync(filePath, "utf8");
            const { data } = matter(fileContent);
            return {
                slug: filename.replace(".md", ""),
                title: data.title,
                description: data.description,
                date: format(parseISO(data.publishedAt), "LLLL d, yyyy"),
                publishedAt: data.publishedAt, // Keep ISO date for sorting
                tags: data.tags
            };
        })
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()); // Sorting newest to oldest

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
                                className="p-5 hover:bg-gray-900 rounded-md border border-gray-800 transition duration-300"
                            >
                                <p className="text-gray-400 text-xs mb-1.5">{post.date}</p>
                                <Link href={`/blog/${post.slug}`} className="text-gray-50 hover:text-pink-600">
                                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                                </Link>
                                <p className="text-gray-500 mt-2 mb-3">{post.description}</p>
                                {/* Tags Rendering */}
                                <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                                    {post.tags.split(",")
                                        .map((tag: string, index: Key | null | undefined) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center justify-center rounded-lg border border-pink-600 py-1 px-3 text-xs font-medium text-pink-600 uppercase transition duration-500 ease-in-out hover:bg-pink-600 hover:text-gray-100 dark:hover:text-gray-900"
                                            >
                                                {tag.trim()} {/* Trim to remove any extra spaces */}
                                            </span>
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
