export interface UnifiedBlog {
    id: string;
    title: string;
    content: string;
    image: string;
    author: string;
    visibility: string,
    date: string;
    source: "mongo" | "external"
}