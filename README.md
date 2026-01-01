# Website Boilerplate

A clean, production-ready website boilerplate with i18n support, blog functionality, and SEO optimization.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) 5.x
- **UI Library**: [React](https://react.dev/) 19
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 3.x
- **Icons**: [Iconify](https://iconify.design/) (Lucide icons)
- **Language**: TypeScript
- **Hosting**: [Vercel](https://vercel.com/)
- **Code Formatting**: Prettier

## Features

- **i18n**: Japanese/English bilingual support (easily extendable)
- **Blog**: Markdown-based blog with tags and RSS feed
- **SEO**: Comprehensive SEO optimization with structured data (JSON-LD)
- **Dark Mode**: System-aware dark mode with manual toggle
- **Responsive**: Mobile-first responsive design
- **Security**: CSP headers, HSTS, and other security best practices
- **Analytics**: Google Analytics integration (optional)
- **Contact Form**: Google Forms integration with spam protection
- **Sitemap**: Auto-generated sitemap

## Pages

- **Home**: Hero section with features and CTA
- **Blog**: Markdown-based blog with breadcrumbs
- **Contact**: Contact form with Google Forms integration
- **404**: Custom error page

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone this repository
git clone https://github.com/your-username/website-boilerplate.git
cd website-boilerplate

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type check and build for production |
| `npm run check` | Run Astro type checking |
| `npm run preview` | Preview production build locally |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |

## Project Structure

```
src/
├── components/     # UI components
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Hero.astro
│   ├── MobileMenu.tsx
│   ├── Breadcrumb.astro
│   ├── ThemeToggle.astro
│   └── LanguageSwitcher.astro
├── content/        # Blog posts (Markdown)
│   ├── config.ts   # Content collection schema
│   └── blog/
│       ├── en/     # English posts
│       └── ja/     # Japanese posts
├── i18n/           # Translation files
│   ├── en.json     # English translations
│   ├── ja.json     # Japanese translations
│   └── utils.ts    # i18n utilities
├── layouts/        # Page layouts
│   └── BaseLayout.astro
├── pages/          # Page routes
│   ├── en/         # English pages
│   │   ├── index.astro
│   │   ├── blog/
│   │   └── contact.astro
│   ├── ja/         # Japanese pages
│   │   ├── index.astro
│   │   ├── blog/
│   │   └── contact.astro
│   ├── 404.astro
│   └── index.astro # Redirect to default locale
└── styles/
    └── global.css  # Global styles & Tailwind

public/
├── fonts/          # Custom fonts (Noto Sans JP, Atkinson)
├── scripts/        # Client-side scripts (analytics)
├── favicon.svg     # Site favicon
└── robots.txt      # SEO robots file
```

## Setup Checklist

After cloning, complete the following steps to customize the boilerplate for your site.

### Step 1: Basic Site Information

#### 1.1 Domain Configuration

| File | Line | Change |
|------|------|--------|
| `astro.config.mjs` | 9 | `site: 'https://your-domain.com'` |
| `src/layouts/BaseLayout.astro` | 37 | `siteUrl = 'https://your-domain.com'` |
| `public/robots.txt` | 2, 8 | Update sitemap URL |

#### 1.2 Site Name & Branding

| File | Line | Change |
|------|------|--------|
| `src/components/Header.astro` | 42 | Update "Site Name" |
| `src/components/Footer.astro` | 38 | Update "Site Name" |
| `src/i18n/en.json` | - | Update `site.title` |
| `src/i18n/ja.json` | - | Update `site.title` |

#### 1.3 Author Information

Update in `src/layouts/BaseLayout.astro`:
- Lines 62-78: Person schema (name, job title, social links)
- Lines 82-98: Organization schema
- Line 268: `<meta name="author">`
- Lines 310, 314-315: OG and Twitter meta tags

### Step 2: Social Links

| File | Lines | Links |
|------|-------|-------|
| `src/components/Footer.astro` | 20-27 | GitHub, X (Twitter) URLs |
| `src/pages/en/contact.astro` | 105, 114 | GitHub, X (Twitter) URLs |
| `src/pages/ja/contact.astro` | 105, 114 | GitHub, X (Twitter) URLs |

### Step 3: Content

#### 3.1 Translations

Edit the translation files in `src/i18n/`:

| Key | Description |
|-----|-------------|
| `site.title` | Site name for SEO |
| `site.description` | Meta description |
| `hero.*` | Homepage hero section |
| `features.*` | Feature cards |
| `cta.*` | Call-to-action section |

#### 3.2 Blog Posts

Delete sample posts and create your own:
- `src/content/blog/en/sample-post.md` → Delete
- `src/content/blog/ja/sample-post.md` → Delete

### Step 4: Contact Form (Google Forms)

1. Create a Google Form with fields: Name, Email, Subject, Message
2. Get the form action URL and entry IDs:
   - Open form → More (⋮) → Get pre-filled link
   - Fill in test data and click "Get link"
   - Extract URL and `entry.XXXXXXXXX` values

3. Update in `src/pages/en/contact.astro` and `src/pages/ja/contact.astro`:

| Line | Change |
|------|--------|
| 24 | Form action URL |
| 44 | Name field: `entry.XXXXXXXXX` |
| 69 | Subject field: `entry.XXXXXXXXX` |
| 83 | Message field: `entry.XXXXXXXXX` |

### Step 5: Analytics & SEO (Optional)

#### Google Analytics

1. Get your GA4 Measurement ID (format: `G-XXXXXXXXXX`)
2. Update:
   - `src/layouts/BaseLayout.astro` line 330
   - `public/scripts/analytics.js` line 9

#### Google Search Console

1. Get verification code from Search Console
2. Update `src/layouts/BaseLayout.astro` line 326

### Step 6: Assets

| File | Action |
|------|--------|
| `public/favicon.svg` | Replace with your favicon |

### Step 7: Default Language (Optional)

If your primary language is not Japanese, update `vercel.json` lines 5-7 to change the default redirect.

---

## Quick Setup Summary

```bash
# 1. Clone and install
git clone https://github.com/your-username/website-boilerplate.git
cd website-boilerplate
npm install

# 2. Search for all TODO comments
grep -r "TODO:" --include="*.astro" --include="*.js" --include="*.json" --include="*.txt" .

# 3. Start development
npm run dev

# 4. Build and deploy
npm run build
```

## Blog

### Creating Posts

Add Markdown files to:
- `src/content/blog/en/` for English posts
- `src/content/blog/ja/` for Japanese posts

### Post Frontmatter

```yaml
---
title: 'Post Title'
description: 'Post description for SEO'
pubDate: 2024-01-01
updatedDate: 2024-01-02  # optional
tags: ['tag1', 'tag2']
draft: false  # set to true to hide from listing
---

Your markdown content here...
```

### RSS Feed

RSS feeds are auto-generated at:
- `/en/blog/rss.xml`
- `/ja/blog/rss.xml`

## Deployment

### Vercel (Recommended)

1. Push repository to GitHub
2. Log in to [Vercel](https://vercel.com/)
3. Click "New Project" → Select your repository
4. Deploy (auto-configured for Astro)

### Other Platforms

Build the site and deploy the `dist/` folder:

```bash
npm run build
# Deploy dist/ folder to your hosting provider
```

## Customization

### Colors

The design uses Tailwind CSS with a blue primary color. To customize:

1. Edit `tailwind.config.mjs` for theme extensions
2. Edit `src/styles/global.css` for component styles

### Typography

- **Headings**: Noto Serif JP
- **Body**: Noto Sans JP

Fonts are loaded via Google Fonts in `src/styles/global.css`.

### Adding a New Language

1. Create translation file: `src/i18n/{lang}.json`
2. Update `src/i18n/utils.ts` to include the new language
3. Create page directories: `src/pages/{lang}/`
4. Create blog directory: `src/content/blog/{lang}/`

## Security

Pre-configured security headers in `vercel.json`:

- Content-Security-Policy (CSP)
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy
- Strict-Transport-Security (HSTS)

## License

MIT
