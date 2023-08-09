export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'fr',
    langDir: 'locales/',
    locales: [
        {
            code: 'fr',
            iso: 'fr-FR',
            file: 'fr.json'
        },
        {
            code: 'en',
            iso: 'en-EN',
            file: 'en.json'
        }
    ],
    defaultLocale: 'fr',
}))