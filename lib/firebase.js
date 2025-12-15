let app, auth, db;

// Initialize Firebase only on client-side
const initializeFirebase = () => {
  if (typeof window === "undefined") {
    return { app: null, auth: null, db: null };
  }

  if (app) {
    return { app, auth, db };
  }

  try {
    const { initializeApp, getApps } = require("firebase/app");
    const { getAuth } = require("firebase/auth");
    const { getFirestore } = require("firebase/firestore");

    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    };

    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);

    return { app, auth, db };
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
    return { app: null, auth: null, db: null };
  }
};

// Lazy getters
export const getFirebaseApp = () => {
  if (typeof window === "undefined") return null;
  const { app } = initializeFirebase();
  return app;
};

export const getFirebaseAuth = () => {
  if (typeof window === "undefined") return null;
  const { auth } = initializeFirebase();
  return auth;
};

export const getFirebaseDb = () => {
  if (typeof window === "undefined") return null;
  const { db } = initializeFirebase();
  return db;
};

// Direct exports for backward compatibility
export let appInstance = null;
export let authInstance = null;
export let dbInstance = null;

if (typeof window !== "undefined") {
  const { app: a, auth: au, db: d } = initializeFirebase();
  appInstance = a;
  authInstance = au;
  dbInstance = d;
}

export { appInstance as app, authInstance as auth, dbInstance as db };
