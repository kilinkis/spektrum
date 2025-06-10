
type allowedLocales = 'en-US' | 'da-DK';

export function useContentfulLocale(lang: string): allowedLocales {
  switch (lang) {
    case 'da':
      return 'da-DK'
    case 'en':
    default:
      return 'en-US'
  }
}