import { ArticleChunk, ArticleSummaryItem, ArticleTranslations, children, navLinks } from "~~/interfaces/interfaces";

export default function useArticles() {

    // Define a function to list all articles
    const listArticles = async () => {
        const locale = useI18n();
        return await queryContent<ArticleChunk[]>(`/${locale.locale.value}/blog`).only(['tags', 'title', 'description', '_path']).find();
    };

    const summaryArticles = async () => {
        const locale = useI18n();
        return await queryContent<ArticleSummaryItem>(`/${locale.locale.value}/blog'`).only(['title', '_path', 'translation']).find();
    }

    const translations = async (path: string): Promise<ArticleTranslations> => {
        const result = await queryContent<ArticleTranslations>(path).only(['fr', 'en']).findOne();
        
        if (typeof result.fr === 'string' && typeof result.en === 'string') {
            // Now you can safely assign them to the 'fr' and 'ents' properties.
            return {
                fr: result.fr,
                en: result.en,
            };
        } else {
            throw new Error('Invalid types for fr and en properties in result.');
        }
    };

    // Define a function to search through the content of an article
    // and return inside links as an arborescence
    const findInsideLinks = async (path: string): Promise<navLinks[]> => {
        const result = await queryContent(path).findOne();
        const out: navLinks[] = [];
        let previousTitle = 0;

        const temp = result.body.children.filter((item: children) => {
            if (['h2', 'h3', 'h4', 'h5'].includes(item.tag)) {
                return item;
            }
        });

        temp.forEach((item: children, i: number) => {
            if (item.tag === 'h2') {
                out.push({
                    text: item.children[0].value,
                    id: item.props.id,
                    linkedLinks: [],
                });
                previousTitle = i;
            } else {
                // Check if the parent object exists in the 'out' array
                if (out[previousTitle]) {
                    out[previousTitle].linkedLinks.push({
                        text: item.children[0].value,
                        id: item.props.id,
                    });
                } else {
                    console.error(`Parent object at index ${previousTitle} is undefined.`);
                }
            }
        });
        return out;
    };


    // Return the functions to be used in the component
    return { listArticles, findInsideLinks, summaryArticles, translations };
}