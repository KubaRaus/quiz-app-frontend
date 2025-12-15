import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Witaj w Quiz App
              <br className="hidden lg:inline-block" />
              Testuj swoją wiedzę
            </h1>
            <p className="mb-8 leading-relaxed">
              Interaktywna aplikacja do tworzenia i rozwiązywania quizów.
              Sprawdź swoją wiedzę z różnych dziedzin, twórz własne pytania i
              śledź swoje postęy.
            </p>
            <div className="flex justify-center">
              <Link
                href="/user/register"
                className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Rozpocznij
              </Link>
              <Link
                href="/about"
                className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
              >
                Dowiedz się więcej
              </Link>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <svg
              className="object-cover object-center rounded"
              alt="hero"
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect fill="#6366f1" width="500" height="500" rx="20" />
              <circle cx="250" cy="200" r="80" fill="#fff" opacity="0.9" />
              <rect
                x="180"
                y="300"
                width="140"
                height="20"
                rx="10"
                fill="#fff"
                opacity="0.9"
              />
              <rect
                x="150"
                y="340"
                width="200"
                height="20"
                rx="10"
                fill="#fff"
                opacity="0.7"
              />
              <rect
                x="170"
                y="380"
                width="160"
                height="20"
                rx="10"
                fill="#fff"
                opacity="0.5"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
            <h2 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Funkcje aplikacji
            </h2>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">
              Odkryj wszystkie możliwości naszej platformy quizowej
            </p>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <div className="flex-grow">
                <h3 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Różne typy pytań
                </h3>
                <p className="leading-relaxed text-base">
                  Pojedynczy wybór, wielokrotny wybór, uzupełnianie luk i
                  dopasowywanie par
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                >
                  <circle cx="6" cy="6" r="3"></circle>
                  <circle cx="6" cy="18" r="3"></circle>
                  <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                </svg>
              </div>
              <div className="flex-grow">
                <h3 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Responsywny design
                </h3>
                <p className="leading-relaxed text-base">
                  Działa płynnie na urządzeniach mobilnych, tabletach i
                  komputerach
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="flex-grow">
                <h3 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Konta użytkowników
                </h3>
                <p className="leading-relaxed text-base">
                  Bezpieczne uwierzytelnianie i personalizowane doświadczenie
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
            <h2 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">
              Gotowy na wyzwanie? Zarejestruj się już dziś!
            </h2>
            <Link
              href="/user/register"
              className="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"
            >
              Dołącz teraz
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
