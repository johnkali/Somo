import {createContext, useState} from "react";

//global state for authentication

interface AuthContextType{
    user: any;
    login: (userData: any, token: string) => void;
    logout: () => void;
    setUser: React.Dispatch<React.SetStateAction<any>>; // <--- add this

}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("user");
            return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
        } catch {
            return null;
        }
    });

    const login = (userData: any, token: string) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, setUser, login, logout }}>{children}</AuthContext.Provider>;
};