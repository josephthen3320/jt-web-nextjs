import Image from "next/image";
import Card from "@/app/components/project-card";
import Link from "next/link";
import type {Metadata} from "next";
import {SiOrcid} from "react-icons/si";
import {FaGithub} from "react-icons/fa";

export const metadata: Metadata = {
    title: "Joseph Thenara - Projects",
    description: "",
};

export default function Projects() {
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
                <Link href="https://github.com/josephthen3320" target="_blank" rel="noopener noreferrer">
                    <p className={"text-sm text-gray-600 flex items-center hover:text-gray-500 dark:hover:text-gray-500"}>
                        <FaGithub></FaGithub> &nbsp;&nbsp;https://github.com/josephthen3320
                    </p>
                </Link>
            </div>
            <div className="container py-12">
                <div className="-m-4 flex flex-wrap">
                    <Card
                        key="Fire Safety Training App"
                        title="Fire Safety Training App"
                        description="The project aims to investigate the potential and applications of MR in the field of education and training through developing a ‘fire safety training’ app for Microsoft HoloLens 2."
                        tech={["Unity", "MRTK", "C#"]}
                        award={"Distinguished Final Year Project Award"}
                        youtube={"https://www.youtube.com/watch?v=9BV7fYqjp3g"}
                    />
                    <Card
                        key="Holographic Pokemon TCG"
                        title="Holographic Pokemon Trading Card Game (TCG)"
                        description="An ambitious project to re-create and augment the classic Pokemon TCG with MR technologies through the HoloLens2. This project aims augment TCG to provide players with fantastical, beyond-reality TCG experience."
                        tech={["Unity", "MRTK", "C#", "Vuforia"]}
                    />
                </div>
            </div>
        </div>
    </>
  );
}
