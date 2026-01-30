export interface Blogs {
    _id: string;
    title: string;
    content: string;
    image?: string;
    createdAt: string;
    author?:{
        firstName: string;
        email: string;
    };
}