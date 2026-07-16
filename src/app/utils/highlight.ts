import hljs from 'highlight.js';

export const highlightCode = (str: string, lang?: string): string => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(str, { language: lang }).value;
    } catch (__) {}
  }

  try {
    return hljs.highlightAuto(str).value;
  } catch (__) {}

  return '';
};
