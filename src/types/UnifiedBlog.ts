export interface UnifiedBlog {
    id: string;
    title: string;
    content: string;
    image: string;
    author: string;
    date: string;
    source: "mongo" | "external"
}