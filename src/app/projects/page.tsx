import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import Card from "@/app/components/project-card";
import Link from "next/link";
import type { Metadata } from "next";
import { SiOrcid } from "react-icons/si";
import { FaGithub } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Joseph Thenara - Projects",
    description: "",
};

export default function Projects() {
    const projDir = path.join(process.cwd(), "src/app/projects/catalogue");
    const filenames = fs.readdirSync(projDir).filter((filename) => {
        const filePath = path.join(projDir, filename);
        return fs.statSync(filePath).isFile() && filename.endsWith(".md");
    });

    const projects = filenames.map((filename) => {
        const filePath = path.join(projDir, filename);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContent);

        return {
            title: data.title,
            description: data.description,
            award: data.award,
            tech: data.tech || [],
            youtube: data.youtube,
            href: data.href,
            github: data.github,
            imgSrc: data.imgSrc,
        };
    });

    return (
        <>
            <div className="mx-auto max-w-6xl">
                <div className="space-y-2 pt-6 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        Projects
                    </h1>
                    <p className="text-md leading-7 text-gray-500 dark:text-gray-400">
                        A list of projects I have been working on or built
                    </p>
                    <Link
                        href="https://github.com/josephthen3320"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <p className="text-sm text-gray-600 flex items-center hover:text-gray-500 dark:hover:text-gray-500">
                            <FaGithub /> &nbsp;&nbsp;https://github.com/josephthen3320
                        </p>
                    </Link>
                </div>
                <div className="container py-12">
                    <div className="-m-4 flex flex-wrap">
                        {projects.map((proj) => (
                            // eslint-disable-next-line react/jsx-key
                            <Card {...proj} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
