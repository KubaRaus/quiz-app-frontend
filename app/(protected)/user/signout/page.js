"use client";

// Remove top-level Firebase import; use dynamic import inside handler
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function LogoutForm() {
  const router = useRouter();
  const { user } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    signOut(auth);
    router.push("/");
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center justify-center">
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-gray-900 text-2xl font-bold title-font mb-3 text-center">
            Wylogowanie
          </h2>

          {user && (
            <div className="mb-6 bg-white border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">
                Jesteś zalogowany jako:
              </p>
              <p className="text-base font-semibold text-gray-900">
                {user.email}
              </p>
            </div>
          )}

          <p className="text-gray-600 text-center mb-6">
            Czy na pewno chcesz się wylogować?
          </p>

          <form onSubmit={onSubmit}>
            <button
              type="submit"
              className="text-white bg-indigo-500 border-0 py-3 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg w-full mb-3 transition-colors"
            >
              Wyloguj
            </button>
          </form>

          <button
            onClick={() => router.back()}
            className="text-gray-700 bg-gray-200 border-0 py-3 px-8 focus:outline-none hover:bg-gray-300 rounded text-lg w-full transition-colors"
          >
            Anuluj
          </button>
        </div>
      </div>
    </section>
  );
}
