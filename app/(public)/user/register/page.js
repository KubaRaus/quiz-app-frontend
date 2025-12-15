"use client";

// Firebase imports removed; use dynamic import in submit handler
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  if (user) {
    return null;
  }

  // Auth instance will be obtained dynamically inside onSubmit

  const onSubmit = (e) => {
    e.preventDefault();
    setRegisterError("");

    // Walidacja równości haseł
    if (password !== confirmPassword) {
      setRegisterError("Hasła nie są zgodne");
      return;
    }

    if (password.length < 6) {
      setRegisterError("Hasło musi mieć co najmniej 6 znaków");
      return;
    }

    setLoading(true);

    Promise.all([
      import("firebase/auth"),
      import("@/lib/firebase"),
    ])
      .then(([authModule, firebaseLib]) => {
        const { createUserWithEmailAndPassword, sendEmailVerification } = authModule;
        const { getFirebaseAuth } = firebaseLib;
        const auth = getFirebaseAuth();
        if (!auth) {
          throw new Error("Firebase auth niedostępny na serwerze");
        }

        return createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log("User registered!");
            return sendEmailVerification(auth.currentUser)
              .then(() => {
                console.log("Email verification sent!");
                router.push("/user/verify");
              })
              .catch((error) => {
                setRegisterError(
                  "Błąd wysyłania emaila weryfikacyjnego: " + error.message
                );
                console.dir(error);
              });
          });
      })
      .then((userCredential) => {
        console.log("User registered!");
        sendEmailVerification(auth.currentUser)
          .then(() => {
            console.log("Email verification sent!");
            router.push("/user/verify");
          })
          .catch((error) => {
            setRegisterError(
              "Błąd wysyłania emaila weryfikacyjnego: " + error.message
            );
            console.dir(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // Obsługa błędów rejestracji
        if (errorCode === "auth/email-already-in-use") {
          setRegisterError(
            "Ten adres email jest już zarejestrowany. Użyj innego adresu lub zaloguj się."
          );
        } else if (errorCode === "auth/invalid-email") {
          setRegisterError("Nieprawidłowy format adresu email");
        } else if (errorCode === "auth/weak-password") {
          setRegisterError("Hasło jest za słabe. Użyj co najmniej 6 znaków.");
        } else {
          setRegisterError(errorMessage);
        }
        console.dir(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">
            Dołącz do nas!
          </h1>
          <p className="leading-relaxed mt-4">
            Utwórz konto, aby tworzyć własne quizy i śledzić swoje postępy.
          </p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Rejestracja
          </h2>

          {registerError && (
            <div
              role="alert"
              className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded"
            >
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="font-medium">Błąd rejestracji</p>
                  <p className="text-sm">{registerError}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Hasło
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="confirmPassword"
                className="leading-7 text-sm text-gray-600"
              >
                Potwierdź hasło
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg w-full disabled:opacity-50"
            >
              {loading ? "Rejestracja..." : "Zarejestruj się"}
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-3">
            Masz już konto?{" "}
            <Link
              href="/user/signin"
              className="text-indigo-500 hover:text-indigo-600"
            >
              Zaloguj się
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
