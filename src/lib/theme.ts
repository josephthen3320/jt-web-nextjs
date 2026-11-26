export const THEME_STORAGE_KEY = 'theme';

export type Theme = 'light' | 'dark';

/** The `dark` class on <html> is the single source of truth for the palette. */
export function applyTheme(theme: Theme) {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
}

/**
 * Inlined as the first element of <body> so the palette is applied before any
 * content is painted. Keep it ES5 and dependency-free - it runs before React.
 * A stored choice wins over the OS preference; the OS is only the default.
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');var d=s==='dark'||(s!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light';}catch(e){}})();`;
