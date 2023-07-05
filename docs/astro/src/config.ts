export const SITE = { title: 'Doc', description: 'Comment thrower.', defaultLanguage: 'ja_JP' };

export const OPEN_GRAPH = {};

// This is the type of the frontmatter you put in the docs markdown files.
export type Frontmatter = {
  title: string;
  description: string;
  layout: string;
  image?: { src: string; alt: string };
  dir?: 'ltr' | 'rtl';
  ogLocale?: string;
  lang?: string;
};

export const KNOWN_LANGUAGES = { 日本語: 'ja' } as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);
export const GITHUB_EDIT_URL = `https://github.com/hkj-hub/comment-atlatltree/main/docs`;
export const BASE_PATH = 'comment-atlatl';

export type Sidebar = Record<
  (typeof KNOWN_LANGUAGE_CODES)[number],
  Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
  ja: {
    目次: [{ text: 'イントロダクション', link: `${BASE_PATH}/ja/introduction` }],
  },
};