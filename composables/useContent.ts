import { ArticleChunk, ArticleSummaryItem } from "~~/interfaces/interfaces";

export default function useArticles() {  

    // Define a function to list all articles
    const listArticles = async () => {
        return await queryContent<ArticleChunk[]>("/blog").only(['tags', 'title', 'description', '_path']).find() 
    };
    
    const summaryArticles = async () => {
        return await queryContent<ArticleSummaryItem>("/blog").only(['title', '_path']).find()

    }
  
    // Define a function to search through the content of an article
    // and return inside links as an arborescence
    const findInsideLinks = async (path: string) => {
        const result = await queryContent(path).find();
        console.dir(result)
        return []
    };
  
    // Return the functions to be used in the component
    return { listArticles, findInsideLinks, summaryArticles };
  }