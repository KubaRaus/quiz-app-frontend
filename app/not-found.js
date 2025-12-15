import Link from "next/link";

export default function NotFound() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <div className="text-center lg:w-2/3 w-full">
          {/* 404 Icon */}
          <div className="flex justify-center mb-8">
            <svg
              className="w-40 h-40 text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* 404 Text */}
          <h1 className="title-font sm:text-6xl text-5xl mb-4 font-bold text-gray-900">
            404
          </h1>

          <h2 className="title-font sm:text-3xl text-2xl mb-4 font-medium text-gray-900">
            Strona nie została znaleziona
          </h2>

          <p className="mb-8 leading-relaxed text-lg">
            Przepraszamy, ale strona, której szukasz, nie istnieje. Mogła zostać
            przeniesiona lub usunięta.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <Link
              href="/"
              className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg items-center"
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

            <button
              onClick={() => window.history.back()}
              className="inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg items-center"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Wróć
            </button>
          </div>

          {/* Popular Links */}
          <div className="mt-12">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Lub przejdź do:
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/about"
                className="text-indigo-500 hover:text-indigo-600 inline-flex items-center"
              >
                O aplikacji
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Link>
              <Link
                href="/user/signin"
                className="text-indigo-500 hover:text-indigo-600 inline-flex items-center"
              >
                Zaloguj się
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Link>
              <Link
                href="/user/register"
                className="text-indigo-500 hover:text-indigo-600 inline-flex items-center"
              >
                Zarejestruj się
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
