import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col" style={{ height: '70dvh' }}>
            {/* Header spacer */}
            <div className="flex-grow-0 basis-[var(--header-height)]"></div>

            {/* Centered content with outlined box */}
            <div className="flex-grow flex items-center justify-center p-4">
                <div className="border border-gray-600 rounded-lg p-8 text-center backdrop-blur-sm">
                    <h1 className="text-2xl font-medium mb-3">This content is not available in your country</h1>
                    <p className="text-gray-600">
                        The page or resource you&#39;re trying to access is currently not available.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center p-4 mt-5">
                <p className="text-sm text-gray-700 pt-4">
                    <Link href="https://xkcd.com/1969">
                        Just kidding, this is a 404 Not Found Page
                    </Link>
                </p>
            </div>

            {/* Footer spacer */}
            <div className="flex-grow-0 basis-[var(--footer-height)]"></div>
        </div>
    );
}