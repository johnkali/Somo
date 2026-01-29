export const mapExternalBlog = (blog: any) =>{
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return {
        id: blog.id,
        title: blog.title,
        content: blog.body,
        author: `Author: ${user.firstName}`,
        date: new Date().toLocaleDateString(),
        image: `https://picsum.photos/seed/${blog.id}/600/400`,
    }
}