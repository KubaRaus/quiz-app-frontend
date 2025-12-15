export default function AboutPage() {
  return (
    <>
      {/* About Section */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              O aplikacji
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Quiz App to nowoczesna aplikacja do tworzenia i rozwiązywania
              quizów, stworzona z myślą o nauce i rozrywce.
            </p>
          </div>

          <div className="flex flex-wrap -m-4">
            <div className="lg:w-1/2 md:w-full p-4">
              <div className="bg-gray-100 p-8 rounded-lg h-full">
                <h2 className="text-xl font-medium title-font mb-4 text-gray-900">
                  Funkcjonalności
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center mr-3">
                      ✓
                    </span>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Uwierzytelnianie użytkowników
                      </h3>
                      <p className="text-sm text-gray-600">
                        Bezpieczne logowanie za pomocą Firebase Authentication
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center mr-3">
                      ✓
                    </span>
                    <div>
                      <h3 className="font-medium text-gray-900">Autoryzacja</h3>
                      <p className="text-sm text-gray-600">
                        Dostęp do chronionych zasobów tylko dla zalogowanych
                        użytkowników
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center mr-3">
                      ✓
                    </span>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Responsywne stylowanie
                      </h3>
                      <p className="text-sm text-gray-600">
                        Działa na urządzeniach mobilnych, tabletach i
                        komputerach
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center mr-3">
                      ✓
                    </span>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Zapis danych
                      </h3>
                      <p className="text-sm text-gray-600">
                        Wszystkie dane są bezpiecznie przechowywane w Firestore
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 md:w-full p-4">
              <div className="bg-gray-100 p-8 rounded-lg h-full">
                <h2 className="text-xl font-medium title-font mb-4 text-gray-900">
                  Typy pytań quizowych
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center mr-3">
                      1
                    </span>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Pojedynczy wybór
                      </h3>
                      <p className="text-sm text-gray-600">
                        Pytania z opcjami tekstowymi lub obrazkami (jedna
                        poprawna odpowiedź)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center mr-3">
                      2
                    </span>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Wielokrotny wybór
                      </h3>
                      <p className="text-sm text-gray-600">
                        Pytania z wieloma poprawnymi odpowiedziami
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center mr-3">
                      3
                    </span>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Uzupełnianie luk
                      </h3>
                      <p className="text-sm text-gray-600">
                        Wpisywanie brakujących słów z listy opcji
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center mr-3">
                      4
                    </span>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Dopasowywanie par
                      </h3>
                      <p className="text-sm text-gray-600">
                        Łączenie powiązanych ze sobą elementów
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="text-gray-600 body-font bg-gray-50">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
              Technologie
            </h2>
          </div>
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-white">
                <svg
                  className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
                </svg>
                <h3 className="title-font font-medium text-xl text-gray-900">
                  Next.js 16
                </h3>
                <p className="leading-relaxed text-sm">Framework React</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-white">
                <svg
                  className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
                </svg>
                <h3 className="title-font font-medium text-xl text-gray-900">
                  Tailwind CSS
                </h3>
                <p className="leading-relaxed text-sm">Stylowanie</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-white">
                <svg
                  className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.771zm16.794 3.692l-2.25-14.203a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984z" />
                </svg>
                <h3 className="title-font font-medium text-xl text-gray-900">
                  Firebase
                </h3>
                <p className="leading-relaxed text-sm">Backend & Auth</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-white">
                <svg
                  className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
                <h3 className="title-font font-medium text-xl text-gray-900">
                  Firestore
                </h3>
                <p className="leading-relaxed text-sm">Database</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Section */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h2 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Autor
            </h2>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Aplikacja została stworzona jako projekt zaliczeniowy na
              laboratoria z Frontend Development.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="p-4 lg:w-1/3 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-indigo-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
                  JR
                </div>
                <div className="w-full">
                  <h3 className="title-font font-medium text-lg text-gray-900">
                    Jakub Raus
                  </h3>
                  <h4 className="text-gray-500 mb-3">Student Informatyki</h4>
                  <p className="mb-4">
                    Projekt wykonany w ramach przedmiotu Frontend Laboratory
                    wykorzystujący nowoczesne technologie webowe.
                  </p>
                  <span className="inline-flex">
                    <a className="text-gray-500" href="#">
                      <svg
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="ml-2 text-gray-500" href="#">
                      <svg
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="ml-2 text-gray-500" href="#">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
