export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'FR',
    messages: {
        EN: {
            welcome: 'Welcome',
            headermsg: "Franso's blog",
            hi: "Hi, I'm",
            description: "Cybersecurity engineer, pentester and CTF enthusiast",
            later: "Come back later",
            Seemore: "See more",
            right: "All rights belong to",
            Maded: "Made with ♡ by Gurvan",
            Article1: "FIND MY",
            Article2: "ARTICLES HERE"

        },
        FR: {
            welcome: 'Bienvenue',
            headermsg: 'Blog de Franso',
            hi: "Yo, c'est",
            description: "Ingénieur en cybersécurité, pentester et passionné de CTF",
            later: "Revenez plus tard",
            Seemore: "En voir +",
            right: "Tous les droits appartiennent à",
            Maded: "Réalisé avec ♡ par Gurvan",
            Article1: "RETROUVER MES",
            Article2: "ARTICLES"
        }
    }
}))