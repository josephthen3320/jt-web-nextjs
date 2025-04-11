'use client';

import { useState } from "react";
import { Metadata } from "next";
import {
    FaEnvelope,
    FaGithub,
    FaLinkedin,
    FaPhone,
    FaGlobe,
    FaWeixin,
} from "react-icons/fa";
import Image from "next/image";

const contacts = [
    {
        label: "Email Me",
        href: "mailto:josephthenara@outlook.com",
        icon: <FaEnvelope />,
    },
    {
        label: "GitHub",
        href: "https://github.com/josephthen3320",
        icon: <FaGithub />,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/josephthenara",
        icon: <FaLinkedin />,
    },
    {
        label: "Portfolio",
        href: "https://josephthen.vercel.app",
        icon: <FaGlobe />,
    },
    {
        label: "Call Me",
        href: "tel:+8617132060751",
        icon: <FaPhone />,
    },
];

export default function ContactPage() {
    const [showWechatModal, setShowWechatModal] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                Joseph Thenara
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                IB Computer Science Educator • Software Developer
            </p>

            <div className="w-full max-w-sm space-y-4">
                {contacts.map((contact, idx) => (
                    <a
                        key={idx}
                        href={contact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full px-6 py-3 text-lg font-medium rounded-lg bg-white text-gray-800 shadow hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition"
                    >
                        {contact.icon}
                        {contact.label}
                    </a>
                ))}

                {/* WeChat button */}
                <button
                    onClick={() => setShowWechatModal(true)}
                    className="flex items-center justify-center gap-3 w-full px-6 py-3 text-lg font-medium rounded-lg bg-green-500 text-white shadow hover:bg-green-600 transition"
                >
                    <FaWeixin />
                    WeChat
                </button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
                This is a mobile-friendly contact card — scan the QR code or save this link!
            </p>

            {/* Modal */}
            {showWechatModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-xs text-center">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Scan WeChat QR</h2>
                        <Image
                            src="/namecard/wechat.jpeg"
                            alt="WeChat QR Code"
                            width={250}
                            height={250}
                            className="mx-auto rounded-md"
                        />
                        <button
                            onClick={() => setShowWechatModal(false)}
                            className="mt-6 w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
