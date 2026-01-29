import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx"

interface LayoutProps {
    children: React.ReactNode;
}
const Layout = ({children}: LayoutProps) => {

    return (
     <div className="min-h-screen flex-row">
    <header>
        <Navbar/>
    </header>
         <main className="flex-1">{children}</main>
     <footer>
         <Footer/>
     </footer>
        </div>
    );
};

export default Layout;