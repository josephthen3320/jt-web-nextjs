import {
    FaRegFileAlt,
    FaGithub,
    FaExternalLinkAlt,
    FaRegEnvelope,
    FaUniversity,
    FaAward,
    FaCalendarAlt, FaExternalLinkSquareAlt
} from "react-icons/fa";
import { Key } from "react";
import {FaUpRightFromSquare} from "react-icons/fa6";


const Card = ({
                  title, abstract, publishedDate, publisher, authors, type, award, doi, href, tags, email }: any) => (
    <div className="md p-4">
        <div className="h-full transform overflow-hidden rounded-md border-2 border-solid border-gray-200 bg-transparent bg-opacity-20 transition duration-500 hover:scale-105 hover:rounded-md hover:border-primary-500 hover:bg-gray-300 dark:border-gray-700 dark:hover:border-primary-500 dark:hover:bg-gray-800">
            <div className="p-6">
                <div className="mb-3 flex flex-row items-center justify-between">
                    <div className="my-2">
                        <FaRegFileAlt className="h-10 w-10 text-primary-color-500 dark:text-primary-color-dark-500" />
                    </div>
                    <div className="flex flex-row justify-between">
                        {href && (
                            <div className="mx-1.5">
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaExternalLinkAlt className="text-xl text-gray-500 transition duration-200 hover:rotate-180 hover:text-blue-400"/>
                                </a>
                            </div>
                        )}

                        {/* Email contact */}
                        {email && (
                            <div className="mx-1.5">
                                <a
                                    href={"mailto:" + email + "?subject=Interest: " + title + "&body=Hi, I'm interested in your article '" + title + "'"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaRegEnvelope className="text-xl text-gray-500 transition duration-200 hover:rotate-180 hover:text-blue-400" />
                                </a>
                            </div>
                        )}
                        {doi && (
                            <div className="mx-1.5">
                                <a
                                    href={doi}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaUpRightFromSquare className="text-xl text-gray-500 transition duration-200 hover:rotate-180 hover:text-blue-400" />
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Publication Type */}
                {type && (
                    <h6 className={"text-xs uppercase text-gray-600"}>{type}
                    </h6>
                )}

                {/* Publication Title*/}
                <h2 className="mb-0.5 text-2xl font-bold leading-8 tracking-tight">{title}</h2>

                {/* Author List */}
                {authors && (
                    <h3 className={"mb-3 text-sm leading-8 tracking-tight"}>
                        {authors}
                    </h3>
                )}

                {/* Publication Description*/}
                <p className="prose text-sm mb-3 max-w-none text-gray-500 dark:text-gray-400">{abstract}</p>

                {/* Publication Awards */}
                {award && (
                    <div className={"mb-3 text-xs flex items-center"}>
                        <FaAward></FaAward>&nbsp;&nbsp;{award}
                    </div>
                )}

                {/* Publishing Metadata (Date & Publisher) */}
                <div className={"mb-5 text-xs text-gray-400"}>
                    <div className="mb-2 flex items-center">
                        <FaCalendarAlt></FaCalendarAlt>&nbsp;&nbsp;
                        {publishedDate}
                    </div>

                    <div className="mb-2 flex items-center">
                        <FaUniversity></FaUniversity>&nbsp;&nbsp;
                        {publisher}
                    </div>
                </div>

                {/* Publication Tags Parsing */}
                <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                    {tags.split(",")
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
        </div>
    </div>
)

export default Card