"use client";

import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  // Pobierz returnUrl z parametrów query
  const returnUrl = searchParams.get("returnUrl");

  useEffect(() => {
    if (user) {
      // Sprawdź czy istnieje parametr returnUrl, jeśli nie - przekieruj do głównej
      if (returnUrl) {
        router.push(returnUrl);
      } else {
        router.push("/");
      }
    }
  }, [user, returnUrl, router]);

  if (user) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Ustaw persistence na sesję przeglądarki
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // Po ustawieniu persistence, zaloguj użytkownika
        return signInWithEmailAndPassword(auth, email, password);
      })
      .then((userCredential) => {
        // Sprawdź czy email jest zweryfikowany
        if (!userCredential.user.emailVerified) {
          console.log("Email not verified, redirecting to verify page");
          setError(
            "Twój adres email nie został jeszcze zweryfikowany. Sprawdź swoją skrzynkę pocztową i kliknij w link weryfikacyjny."
          );
          setLoading(false);
          // Opóźnione przekierowanie do strony weryfikacji
          setTimeout(() => {
            router.push("/user/verify");
          }, 3000);
          return;
        }

        // Po udanym logowaniu, przekieruj do returnUrl lub głównej
        if (returnUrl) {
          router.push(returnUrl);
        } else {
          router.push("/");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // Wyświetl przyjazny komunikat błędu w Alert
        if (errorCode === "auth/invalid-credential") {
          setError("Nieprawidłowy email lub hasło");
        } else if (errorCode === "auth/user-not-found") {
          setError("Nie znaleziono użytkownika z tym adresem email");
        } else if (errorCode === "auth/wrong-password") {
          setError("Nieprawidłowe hasło");
        } else if (errorCode === "auth/invalid-email") {
          setError("Nieprawidłowy format adresu email");
        } else {
          setError(`Błąd logowania: ${errorMessage}`);
        }
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
            Witaj ponownie!
          </h1>
          <p className="leading-relaxed mt-4">
            Zaloguj się, aby uzyskać dostęp do swoich quizów i wyników.
          </p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Zaloguj się
          </h2>

          {error && (
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
                  <p className="font-medium">Błąd logowania</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
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
            <button
              type="submit"
              disabled={loading}
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg w-full disabled:opacity-50"
            >
              {loading ? "Logowanie..." : "Zaloguj"}
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-3">
            Nie masz konta?{" "}
            <Link
              href="/user/register"
              className="text-indigo-500 hover:text-indigo-600"
            >
              Zarejestruj się
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
