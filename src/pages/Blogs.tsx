

function Blogs() {
    return (
        <article className="max-w-3xl mx-auto p-6  my-10 bg-gray-100 rounded-2xl shadow-md">
            {/* Blog Header */}
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Building My First Blog Post Layout with Semantic HTML
                </h1>
                <p className="text-sm text-gray-500">
                    Published on <span className="font-medium">August 10, 2026</span> · by{" "}
                    <span className="font-medium">John Kali</span>
                </p>
            </header>

            {/* Featured Image */}
            <img
                src="https://picsum.photos/id/5/200/300"
                alt="Blog cover"
                className="h-100 w-full object-cover"
            />

            {/* Introduction */}
            <section className="my-6">
                <h2 className="text-xl font-semibold mb-2">Introduction</h2>
                <p className="text-gray-700 leading-relaxed">
                    This blog post demonstrates a simple yet well-structured blog layout
                    using semantic HTML principles. The goal is to create content that is
                    readable, accessible, and easy to maintain.
                </p>
            </section>

            {/* Main Content */}
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Main Content</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                    While building this layout, I focused on the following key elements:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Using semantic HTML tags for better structure</li>
                    <li>Organizing content into clear sections</li>
                    <li>Improving readability with simple styling</li>
                </ul>
            </section>

            {/* Conclusion */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Conclusion</h2>
                <p className="text-gray-700 leading-relaxed">
                    Creating a basic blog post layout is a strong foundation for more
                    advanced blogging platforms. It reinforces the importance of clean
                    structure, accessibility, and user-friendly design.
                </p>
            </section>

            {/* Read More */}
            <footer>
                <a
                    href="#"
                    className="text-blue-600 font-medium hover:underline"
                >
                    Read More →
                </a>
            </footer>
        </article>
    );
}
export default Blogs;