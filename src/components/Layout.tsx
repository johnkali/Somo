import type {ReactNode} from "react";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx"


const Layout = ({children}: {children: ReactNode}) => {

    return (
     <div className="min-h-screen flex flex-column">
     <Navbar/>
         <main className="flex-w p-4">{children}</main>
     <Footer/>
        </div>
    );
};

export default Layout;