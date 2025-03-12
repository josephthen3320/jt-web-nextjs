import Link from "next/link";
import { FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { SiOrcid } from "react-icons/si";

export default function Footer() {
    return (
        <footer>
            <div className="mt-10 flex flex-col items-center">
                {/* Social Media Icons */}
                <div className="mb-4 flex space-x-4">
                    <Link href="https://www.linkedin.com/in/josephthenara" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className={"text-2xl text-gray-600 hover:text-blue-600"} />
                    </Link>
                    <Link href="https://www.instagram.com/josephthen3320/" target={"_blank"} rel="noopener noreferrer">
                        <FaInstagram className={"text-2xl text-gray-600 hover:text-pink-600"} />
                    </Link>
                    <Link href="https://www.youtube.com/@josephthenara" target={"_blank"} rel="noopener noreferrer">
                        <FaYoutube className={"text-2xl text-gray-600 hover:text-red-600"} />
                    </Link>
                    <Link href="https://orcid.org/0000-0002-7584-0245" target="_blank" rel="noopener noreferrer">
                        <SiOrcid className={"text-2xl text-gray-600 hover:text-green-600"} />
                    </Link>
                </div>

                {/* Copyright Text */}
                <div className="mb-2 hidden text-sm text-gray-500 dark:text-gray-400 md:flex">
                    <div className="mx-1">
                        <Link href="/" className="link-underline">
                            {` ©${new Date().getFullYear()}`} - Joseph Thenara
                        </Link>
                    </div>
                </div>
                <div className="mb-2 text-sm text-gray-500 dark:text-gray-400 sm:block md:hidden lg:hidden">
                    <div className="mx-1">
                        <Link href="/" className="link-underline">
                            {` © ${new Date().getFullYear()}`} - Joseph Thenara
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}