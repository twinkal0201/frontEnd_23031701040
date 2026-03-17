import { createContext, useState, useEffect, useContext } from "react";
import { getToken, getUserData } from "../services/AuthSevices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = getToken();
        if (token) {
            setUser(getUserData());
            setLoading(false);
        }
    }, []);
    const loginAuth = (userdata) => {
        setUser(userdata);
    }

    const logoutAuth = () => {
        setUser(null);
        setLoading(true);
    }
    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: user !== null,
            loginAuth,
            logoutAuth,
            loading,
            isPatient: user?.role === "patient",
            isDoctor: user?.role === "doctor",
            isAdmin: user?.role === "admin",
            isReceptionist: user?.role === "receptionist",
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context) {
        return context;
    }
    else {
        throw new Error("useAuth must be used within an AuthProvider")
    }
}