import  { createContext, useState, useEffect } from "react";
import type  {ReactNode} from "react";

interface  AuthContextType {
    user: any;
    setUser: (user: any) => void;
}
export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(()=>{
        const userData = localStorage.getItem("user");
        return userData ? JSON.parse(userData) : null;
    })

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
