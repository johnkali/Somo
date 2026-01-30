export interface UnifiedBlog {
    id: number;
    title: string;
    content: string;
    image: string;
    author: string;
    date: string;
    source: "mongo" | "external"
}