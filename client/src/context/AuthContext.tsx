import { createContext, useState, useContext, ReactNode, useEffect } from "react"
import { AuthContextType } from "@/utils/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
  }

export const AuthProvider = ({ children } : AuthProviderProps) => {
    const [token, setToken] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [profileImage, setProfileImage] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [role, setRole] = useState<string>("");

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedName = localStorage.getItem('username');
        const storedProfileImage = localStorage.getItem('profileImage');
        const storedUserId = localStorage.getItem('userId');
        const StoredRole = localStorage.getItem('role')
    
        if (storedToken) setToken(storedToken);
        if (storedName) setName(storedName);
        if (storedProfileImage) setProfileImage(storedProfileImage);
        if (storedUserId) setUserId(storedUserId);
        if (StoredRole) setRole(role);
      }, []);    

    return (
        <AuthContext.Provider value={{ userId ,token, name, profileImage, role, setUserId, setToken, setName, setProfileImage, setRole }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};