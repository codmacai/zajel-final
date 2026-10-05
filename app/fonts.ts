import { Manrope, Noto_Sans_Arabic } from 'next/font/google';

// Only the two weights the design uses: 400 (text) and 500 (headings, labels, buttons).
export const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-manrope',
});

// Manrope has no Arabic glyphs. This keeps Arabic text (lang="ar") consistent instead of
// falling back to a random system font. Remove it if you don't ship Arabic.
export const arabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-arabic',
});
