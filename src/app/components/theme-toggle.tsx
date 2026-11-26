'use client';

import { Moon, Sun } from 'lucide-react';
import { applyTheme, THEME_STORAGE_KEY } from '@/lib/theme';

export function ThemeToggle() {
    function toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        const next = isDark ? 'light' : 'dark';

        applyTheme(next);

        try {
            localStorage.setItem(THEME_STORAGE_KEY, next);
        } catch {
            // Storage can be unavailable (private mode); the switch still works
            // for the current page.
        }
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            title="Toggle color theme"
            className="ml-1 rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
        >
            {/* Both icons ship in the markup and CSS picks one, so the icon
                matches the class set by the init script without hydration
                mismatch or a mount-time flicker. */}
            <Sun className="hidden h-5 w-5 dark:block" />
            <Moon className="block h-5 w-5 dark:hidden" />
        </button>
    );
}
