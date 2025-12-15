"use client";

import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

export default function VerifyEmail() {
  const { user } = useAuth();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Zapamiętaj email użytkownika przed wylogowaniem
    if (user?.email) {
      setUserEmail(user.email);
    }

    // Automatyczne wylogowanie po utworzeniu konta
    const auth = getAuth();
    signOut(auth);
  }, [user]);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex items-center justify-center">
        <div className="lg:w-2/3 w-full bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-center text-3xl font-bold text-gray-900 mb-4">
            Email not verified
          </h1>

          {/* Email Display */}
          {userEmail && (
            <p className="text-center text-lg text-gray-700 mb-6">
              Verify clicking on link in email send to your address{" "}
              <span className="font-semibold text-indigo-600">{userEmail}</span>
            </p>
          )}

          {/* Info Box */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
            <div className="flex items-start">
              <svg
                className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-blue-800 font-medium mb-1">
                  Wymagana weryfikacja adresu email
                </p>
                <p className="text-blue-700 text-sm">
                  Na podany adres email wysłaliśmy wiadomość z linkiem
                  weryfikacyjnym. Kliknij w link, aby aktywować swoje konto.
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Co dalej?
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Sprawdź swoją skrzynkę pocztową</li>
              <li>Otwórz wiadomość od Quiz App</li>
              <li>Kliknij w link weryfikacyjny</li>
              <li>Wróć tutaj i zaloguj się na swoje konto</li>
            </ol>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-yellow-800">
                <strong>Uwaga:</strong> Nie widzisz wiadomości? Sprawdź folder
                SPAM lub Wiadomości-śmieci. Możesz również spróbować ponownie
                utworzyć konto.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/user/signin"
              className="inline-flex items-center justify-center text-white bg-indigo-500 border-0 py-3 px-6 focus:outline-none hover:bg-indigo-600 rounded-lg text-base transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Przejdź do logowania
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center text-gray-700 bg-gray-100 border-0 py-3 px-6 focus:outline-none hover:bg-gray-200 rounded-lg text-base transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Strona główna
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
