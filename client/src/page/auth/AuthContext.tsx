import { createContext, useState, useContext } from "react"

const AuthContext = createContext();

export const AuthProvider = ({ children}) => {
    const [token, setToken] = useState(null);
    const [name, setName] = useState("");
    const [profileImage, setProfileImage] = useState("");

    // useEffect(() => {
    //     const cookieToken = document.cookie.split('; ').find(row => row.startsWith('token='));
    //     setToken(cookieToken ? cookieToken.split('=')[1] : null);
    //     setName(localStorage.getItem("username") || "");
    //     setProfileImage(localStorage.getItem("profileImage") || "");
    //   }, []);

    return (
        <AuthContext.Provider value={{ token, name, profileImage, setToken, setName, setProfileImage }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);