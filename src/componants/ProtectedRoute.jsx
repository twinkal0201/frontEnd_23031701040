import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function ProtectedRoue({ children, allowedRoles = [] }) {
    const navigate = useNavigate();
    const { isAuthenticated, loading, user } = useAuth();
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!isAuthenticated) {
        navigate("/login");
    }
    if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
        navigate("/");
    }
    return children;
}
export default ProtectedRoue;