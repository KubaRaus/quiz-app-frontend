"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    // Import Firebase only on client-side
    import("./firebase").then(({ auth: firebaseAuth }) => {
      setAuth(firebaseAuth);
      
      const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
        setUser(user);
        setLoading(false);
      });

      return () => unsubscribe();
    });
  }, []);

  const signOut = async () => {
    try {
      if (auth) {
        await firebaseSignOut(auth);
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
