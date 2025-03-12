import Image from "next/image";
import Card from "@/app/components/publication-card";
import Link from "next/link";
import { SiOrcid } from "react-icons/si";
import path from "path";
import fs from "fs";
import {format, parseISO} from "date-fns";
import matter from "gray-matter";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Joseph Thenara - Publications",
    description: "",
};

export default function Publications() {
    const pubDir = path.join(process.cwd(), "src/app/publication-docs");
    const filenames = fs.readdirSync(pubDir);

    const pubDocs = filenames.map((filename) => {
        const filePath = path.join(pubDir, filename);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContent);
        return {
            slug: filename.replace(".md", ""),
            title: data.title,
            description: data.description,
            abstract: data.abstract,
            date: format(parseISO(data.publishedAt), "LLLL d, yyyy"),
            tags: data.tags,
            type: data.type,
            authors: data.authors,
            doi: data.doi,
            href: data.href,
            award: data.award,
            publisher: data.publisher,
            email: data.email,
        }
    });

    return (
    <>
        <div className="mx-auto max-w-6xl">
            <div className="space-y-2 pt-6 md:space-y-5">
                <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                    Publications
                </h1>
                <p className="text-md leading-7 text-gray-500 dark:text-gray-400">
                    Some of my recent and featured publications - most are peer reviewed!
                </p>
                <Link href="https://orcid.org/0000-0002-7584-0245" target="_blank" rel="noopener noreferrer">
                <p className={"text-sm text-gray-600 flex items-center hover:text-green-700 dark:hover:text-green-700"}>
                    <SiOrcid></SiOrcid> &nbsp;&nbsp;https://orcid.org/0000-0002-7584-0245
                </p>
                </Link>
            </div>
            <div className="container py-12">
                <div className="-m-4 flex flex-wrap">
                    {pubDocs.map((post) => (
                        <Card
                        key={post.slug}
                        title={post.title}
                        abstract={post.description}
                        publishedDate={post.date}
                        award={post.award}
                        authors={post.authors}
                        tags={post.tags}
                        type={post.type}
                        email={post.email}
                        />
                    ))}
                </div>
            </div>
        </div>
    </>
  );
}
