// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context to hold authentication state
const AuthContext = createContext();

// Provide a way to use the authentication context
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Default is not logged in

    // Mock login/logout functions
    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
