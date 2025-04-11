"use client";
import Image from "next/image";
import {
    FaFolder,
    FaRegFolder,
    FaEnvelope,
    FaGithub,
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaExternalLinkAlt
} from "react-icons/fa";
import {FaAward} from "react-icons/fa";


const Card = ({
                  title,
                  description,
                  award,
                  imgSrc,
                  href,
                  github,
                  youtube,
                  tech,
                  key
              }: any) => (
    <div className="md p-4 md:w-1/2" style={{maxWidth: '544px'}}>
        <div
            className="h-full transform overflow-hidden rounded-md border-2 border-solid border-gray-200 bg-transparent bg-opacity-20 transition duration-500 hover:scale-105 hover:rounded-md hover:border-primary-500 hover:bg-gray-300 dark:border-gray-700 dark:hover:border-primary-500 dark:hover:bg-gray-800">

            <div
                onContextMenu={(e) => e.preventDefault()}
                className="select-none"
            >
                <Image
                    src={`/projects/catalogue/${imgSrc || "placeholder_bk.png"}`}
                    alt={title}
                    width={544}
                    height={300}
                    className="object-cover w-full h-48"
                    draggable={false}
                />
            </div>

            <div className="p-6">
                <div className="flex flex-row items-center justify-between">
                    <div className="my-2">
                        <FaRegFolder className="h-10 w-10 text-primary-color-500 dark:text-primary-color-dark-500"/>
                    </div>
                    <div className="flex flex-row justify-between">
                        {href && (
                            <div className="mx-1.5">
                                <a href={href} target="_blank" rel="noopener noreferrer">
                                    <FaExternalLinkAlt
                                        className="text-xl text-gray-500 transition duration-200 hover:rotate-180 hover:text-blue-400"/>
                                </a>
                            </div>
                        )}
                        {github && (
                            <div className="mx-1.5">
                                <a href={github} target="_blank" rel="noopener noreferrer">
                                    <FaGithub
                                        className="text-xl text-gray-500 transition duration-200 hover:rotate-180 hover:text-blue-400"/>
                                </a>
                            </div>
                        )}
                        {youtube && (
                            <div className="mx-1.5">
                                <a href={youtube} target="_blank" rel="noopener noreferrer">
                                    <FaYoutube
                                        className="text-2xl text-gray-500 transition duration-200 hover:rotate-180 hover:text-blue-400"/>
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">{title}</h2>

                {award && (
                    <div className="mb-3 text-xs flex items-center">
                        <FaAward/>&nbsp;&nbsp;{award}
                    </div>
                )}

                <p className="prose text-sm mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>

                <div className="flex flex-row justify-between">
                    <div className="text-sm text-gray-400">
                        {tech.map((t: string, i: number, arr: []) => (
                            i + 1 === arr.length ? `${t}` : `${t} • `
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Card;
