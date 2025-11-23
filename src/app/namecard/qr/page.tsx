'use client';

import { QRCodeSVG } from 'qrcode.react';
import Image from "next/image";

export default function NameCard() {
    const qrValue = "https://josephthen.vercel.app/namecard"; // change to your real contact page URL

    return (
        <div className="flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-sm text-center border dark:border-gray-700">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Joseph Thenara</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Educator • Software Developer
                </p>

                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-white inline-block rounded-md shadow">
                        <Image src="/namecard/jt-namecard-qr.png" alt='namecard qr code' width={256} height={256} />
                    </div>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Scan the QR code to connect or save this card.
                </p>
            </div>
        </div>
    );
}
