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
  
  export interface children {
    type: string,
    tag: string,
    children: [
        {
            type: string,
            value: string
        }
    ]
    props: {
        id: string
    }
}

export interface navLink {
    text: string,
    id: string,
}

export interface navLinks {
    text: string,
    id: string,
    linkedLinks: navLink[]
}