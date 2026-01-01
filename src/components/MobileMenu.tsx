import { useState, useEffect, useRef } from 'react';

interface NavItem {
  href: string;
  label: string;
  isActive: boolean;
}

interface MobileMenuProps {
  navItems: NavItem[];
  contactHref: string;
  contactLabel: string;
  currentLang: string;
  altLang: string;
  altLangPath: string;
}

type Theme = 'light' | 'dark' | 'system';

export default function MobileMenu({
  navItems,
  contactHref,
  contactLabel,
  currentLang,
  altLang,
  altLangPath,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setThemeState] = useState<Theme>('system');
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Initialize theme from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      setThemeState(stored);
    }
  }, []);

  // Theme toggle function
  const cycleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];

    setThemeState(nextTheme);
    localStorage.setItem('theme', nextTheme);

    // Apply theme
    const isDark =
      nextTheme === 'dark' ||
      (nextTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Update desktop toggle icon
    const desktopToggle = document.getElementById('theme-toggle');
    if (desktopToggle) {
      desktopToggle.setAttribute('data-theme', nextTheme);
    }
  };

  // Theme icon components
  const SunIcon = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );

  const MoonIcon = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );

  const MonitorIcon = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <SunIcon />;
      case 'dark':
        return <MoonIcon />;
      case 'system':
        return <MonitorIcon />;
    }
  };

  // Close menu when clicking/tapping outside
  useEffect(() => {
    function handleClickOutside(event: PointerEvent | TouchEvent) {
      const target = event.target as Node;

      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(target) &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      // Use pointerdown as primary (works on all modern browsers including iOS Safari)
      document.addEventListener('pointerdown', handleClickOutside);
      // Fallback for older browsers that don't support pointer events
      document.addEventListener('touchstart', handleClickOutside, { passive: true });
    }

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Close menu on route change (for Astro navigation)
  useEffect(() => {
    function handlePageLoad() {
      setIsOpen(false);
    }

    document.addEventListener('astro:page-load', handlePageLoad);
    return () => {
      document.removeEventListener('astro:page-load', handlePageLoad);
    };
  }, []);

  // Close menu on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        onPointerDown={(e) => e.stopPropagation()}
        onTouchEnd={() => {
          // Ensures React attaches touch listeners for iOS compatibility
        }}
        className="relative z-50 cursor-pointer select-none rounded-full p-2 text-slate-800 transition-all duration-300 hover:bg-blue-100 hover:text-blue-500 dark:text-white dark:hover:bg-blue-900 md:hidden"
        style={{
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
          WebkitUserSelect: 'none',
          userSelect: 'none',
        }}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Mobile Navigation */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`fixed left-0 right-0 top-16 z-40 bg-white/95 shadow-lg backdrop-blur-md transition-all duration-300 dark:bg-slate-900/95 md:hidden ${
          isOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <div className="flex flex-col space-y-2 p-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                item.isActive
                  ? 'bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-400'
                  : 'text-slate-800 hover:bg-blue-50 hover:text-blue-500 dark:text-white dark:hover:bg-blue-900/50 dark:hover:text-blue-400'
              }`}
              onClick={() => setIsOpen(false)}
              onPointerDown={(e) => e.stopPropagation()}
            >
              {item.label}
            </a>
          ))}
          <a
            href={contactHref}
            className="btn-primary mx-4 px-4 py-2 text-center text-sm"
            onClick={() => setIsOpen(false)}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {contactLabel}
          </a>
          <div className="px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-500 dark:bg-blue-900 dark:text-blue-400">
                  {currentLang.toUpperCase()}
                </span>
                <a
                  href={altLangPath}
                  className="rounded-full px-3 py-1 text-sm font-medium text-slate-500 transition-all duration-300 hover:bg-blue-50 hover:text-blue-500 dark:text-slate-400 dark:hover:bg-blue-900/50 dark:hover:text-blue-400"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  {altLang.toUpperCase()}
                </a>
              </div>
              {/* Theme Toggle */}
              <button
                type="button"
                onClick={cycleTheme}
                onPointerDown={(e) => e.stopPropagation()}
                className="rounded-full p-2 text-slate-500 transition-all duration-300 hover:bg-blue-50 hover:text-blue-500 dark:text-slate-400 dark:hover:bg-blue-900/50 dark:hover:text-blue-400"
                aria-label="Toggle theme"
                title={`Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`}
              >
                {getThemeIcon()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
