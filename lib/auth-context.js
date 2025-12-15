"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dynamically import Firebase only on client-side
    const initAuth = async () => {
      try {
        const { getAuth } = await import("firebase/auth");
        const { onAuthStateChanged, signOut: firebaseSignOut } = await import("firebase/auth");
        
        // Get or create Firebase app
        let firebaseApp;
        try {
          const { app } = await import("./firebase");
          firebaseApp = app;
        } catch {
          // Firebase not initialized, create a minimal instance
          const { initializeApp, getApps } = await import("firebase/app");
          const apps = getApps();
          firebaseApp = apps.length > 0 ? apps[0] : null;
        }

        if (!firebaseApp) {
          setLoading(false);
          return;
        }

        const auth = getAuth(firebaseApp);

        // Listen to auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error initializing auth:", error);
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const signOut = async () => {
    try {
      const { signOut: firebaseSignOut } = await import("firebase/auth");
      const { getAuth } = await import("firebase/auth");
      const { app } = await import("./firebase");
      
      if (app) {
        const auth = getAuth(app);
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
