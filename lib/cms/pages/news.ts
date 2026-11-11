import type { PageDef } from '../registry';
import { BLOCK_TYPES, NEWS_ARTICLES, NEWS_PAGE } from '@/components/news/data';

// The kinds of content a block holds, so each block shows only its own fields.
const TEXT_BLOCKS = ['Paragraph', 'Heading', 'Quote'];

export const NEWS: PageDef = {
  id: 'news',
  label: 'News',
  path: '/#news',
  group: 'Company',
  sections: [
    {
      id: 'articles',
      label: 'Articles',
      defaults: NEWS_ARTICLES,
      note: 'The newest 3 show on the home page; each article has its own page',
      hints: {
        articles: { itemLabel: 'Article', allowEmpty: true, help: 'Sorted by date, newest first. With no articles, the news section is hidden from the home page.' },
        'articles.*.title': { label: 'Title', required: true },
        'articles.*.slug': { kind: 'slug', label: 'Page address', prefix: '/news/', help: 'Lowercase words joined by hyphens. Must be different for each article.' },
        'articles.*.date': { kind: 'date', label: 'Date', required: true },
        'articles.*.category': { label: 'Category', help: 'For example Global Freight or Customs & Trade' },
        'articles.*.author': { label: 'Written by' },
        'articles.*.excerpt': { kind: 'textarea', label: 'Summary', required: true, help: 'Shown on the home page card, under the title, and in Google results' },
        'articles.*.image': { kind: 'image', label: 'Cover photo', required: true },
        'articles.*.imageAlt': { label: 'Cover photo description', help: 'Describes the photo for screen readers and Google' },
        'articles.*.accent': { kind: 'color', label: 'Dot colour', help: 'The small dot next to the category' },
        'articles.*.body': { label: 'Article', itemLabel: 'Block', required: true, help: 'Build the article from blocks: paragraphs, headings, quotes, bullet lists and photos. Use the arrows to reorder.' },
        'articles.*.body.*.type': { kind: 'select', label: 'Block type', options: BLOCK_TYPES },
        'articles.*.body.*.text': { kind: 'textarea', label: 'Text', required: true, when: { key: 'type', is: TEXT_BLOCKS } },
        'articles.*.body.*.items': { label: 'Bullet points', itemLabel: 'Point', required: true, when: { key: 'type', is: ['Bullet list'] } },
        'articles.*.body.*.image': { kind: 'image', label: 'Photo', required: true, when: { key: 'type', is: ['Image'] } },
        'articles.*.body.*.caption': { label: 'Caption', help: 'Shown under the photo; also describes it for screen readers', when: { key: 'type', is: ['Image'] } },
      },
    },
    {
      id: 'page',
      label: 'Article page text',
      defaults: NEWS_PAGE,
      note: 'Labels and the call to action on every article page',
      hints: {
        homeLabel: { label: 'Breadcrumb: home' },
        newsLabel: { label: 'Breadcrumb: news' },
        backLabel: { label: '“Back to news” link' },
        tocLabel: { label: 'Contents heading', help: 'Above the list of the article’s headings' },
        authorLabel: { label: 'Author label', help: 'For example “Written by”' },
        authorNote: { label: 'About the author', kind: 'textarea', help: 'Shown in the author box at the end of every article' },
        publishedLabel: { label: 'Date label' },
        readingLabel: { label: 'Reading time label' },
        readTimeLabel: { label: 'After the minutes', help: 'For example “min read”' },
        topicLabel: { label: 'Category label' },
        shareLabel: { label: 'Share label' },
        copiedLabel: { label: 'After copying the link' },
        moreLabel: { label: 'More news heading' },
        ctaTitle: { label: 'Call to action: heading' },
        ctaText: { label: 'Call to action: text', kind: 'textarea' },
        ctaButton: { label: 'Main button text' },
        ctaHref: { label: 'Main button link' },
        ctaSecondaryButton: { label: 'Second button text' },
        ctaSecondaryHref: { label: 'Second button link' },
      },
    },
  ],
};
