export interface Theme {
    isDark: boolean,
}

export interface ArticleChunk {
    title: string,
    description: string,
    tags: string[],
    _path: string
}

export interface ArticleSummaryItem {
    title: string,
    _path: string
}

export interface ElementProps {
    offsetWidth: number;
    offsetHeight: number;
  }
  