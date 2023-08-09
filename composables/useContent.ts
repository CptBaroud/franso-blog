import { ArticleChunk, ArticleSummaryItem, children, navLinks } from "~~/interfaces/interfaces";

export default function useArticles() {

    // Define a function to list all articles
    const listArticles = async () => {
        const locale = useI18n();
        console.log(locale.locale.value)
        return await queryContent<ArticleChunk[]>(`/${locale.locale.value}/blog`).only(['tags', 'title', 'description', '_path']).find()
    };

    const summaryArticles = async () => {
        const locale = useI18n();
        return await queryContent<ArticleSummaryItem>(`/${locale.locale.value}/blog'`).only(['title', '_path']).find()

    }

    // Define a function to search through the content of an article
    // and return inside links as an arborescence
    const findInsideLinks = async (path: string): Promise<navLinks[]> => {
        const result = await queryContent(path).findOne();
        const out: navLinks[] = []
        let previousTitle = 0;

        const temp = result.body.children.filter((item: children) => {
            // We do not match H as it is the article title
            if (['h2', 'h3', 'h4', 'h5'].includes(item.tag)) {
                return item
            }
        })
        temp.forEach((item: children, i: number) => {
            if (item.tag === 'h2') {
                out.push({
                    text: item.children[0].value, id: item.props.id, linkedLinks: []
                })
                previousTitle = i
            } else {
                out[previousTitle].linkedLinks.push({
                    text: item.children[0].value, id: item.props.id
                })
            }
        });
        return out;
    };

    // Return the functions to be used in the component
    return { listArticles, findInsideLinks, summaryArticles };
}