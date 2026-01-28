const Footer = () => {
    return (
        <footer className="bg-gray-100 border-t mt-auto">
            <div className="flex justify-center gap-4 mt-2">
                <a href="#" className="hover:text-blue-600">Twitter</a>
                <a href="#" className="hover:text-blue-600">GitHub</a>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-600 text-sm">
                &copy; {new Date().getFullYear()} SomoBlog. All rights reserved. | !Wozaa?
            </div>
        </footer>
    );
};

export default Footer;
