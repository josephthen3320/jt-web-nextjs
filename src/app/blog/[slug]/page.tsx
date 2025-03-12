import { format, parseISO } from 'date-fns';
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import {FaClock} from "react-icons/fa"; // GitHub Flavored Markdown


export default async function BlogPost(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const filePath = path.join(process.cwd(), "src/app/posts", `${params.slug}.md`);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(fileContent);
    const processedContent = await remark()
        .use(remarkGfm)
        .use(html)
        .process(content);
    const contentHtml = processedContent.toString();

    // Calculate estimated reading time (assume 200 words per minutes.
    const wordCount = content.split(/\s+/).length;       // Count words
    const readingTime =  Math.ceil(wordCount / 200);            // Calculate reading time (rounded up)

    return (
        <div className="max-w-2xl mx-auto p-5">
            <div className={"text-center mb-8"}>
                <time dateTime={data.publishedAt} className={"mb-1 text-xs text-gray-600"}>
                    { format(parseISO(data.publishedAt), "LLLL d, yyyy") }
                </time>
                <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
                <p className={"text-gray-600 text-sm mb-2"}>
                    <span className={"text-gray-400"}>by</span> <span className={"text-blue-500"}>{data.author}</span>
                    &nbsp; <b>/</b> &nbsp;
                    <span className={"text-gray-400"}>in</span> <span className={"text-blue-500"}>data.category</span>
                </p>
            </div>


            {/* Show estimated reading time */}
            <div className="mb-8 flex justify-end">
                <p className="text-gray-600 text-xs flex items-center">
                    <FaClock className="mr-1" />
                    {readingTime} min
                </p>
            </div>

            <div
                className="mt-4 prose text-gray-400 prose-invert"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
        </div>
    );
}
