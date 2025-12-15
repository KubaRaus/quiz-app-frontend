"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

export default function QuizResultsPage() {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      if (!user) return;

      setLoading(true);
      setError("");

      try {
        // Zapytanie: pobierz wyniki quizów dla zalogowanego użytkownika
        const q = query(
          collection(db, "quiz-results"),
          where("userId", "==", user.uid),
          orderBy("completedAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        const fetchedResults = [];

        querySnapshot.forEach((doc) => {
          fetchedResults.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setResults(fetchedResults);
      } catch (error) {
        console.error("Error fetching quiz results: ", error);
        setError("Błąd pobierania wyników: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [user]);

  // Formatowanie daty
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Formatowanie czasu
  const formatTime = (seconds) => {
    if (!seconds) return "0s";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  // Ikona dla typu quizu
  const getQuizIcon = (type) => {
    switch (type) {
      case "single-choice":
        return "📝";
      case "multiple-choice":
        return "☑️";
      case "fill-in-blanks":
        return "✏️";
      case "match-pairs":
        return "🔗";
      default:
        return "❓";
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Moje Wyniki Quizów
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Historia wszystkich Twoich rozwiązanych quizów
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="max-w-4xl mx-auto mb-6">
            <div
              role="alert"
              className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded"
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
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results List */}
        {!loading && !error && (
          <div className="max-w-4xl mx-auto">
            {results.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  Brak wyników
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Nie masz jeszcze żadnych rozwiązanych quizów.
                </p>
                <div className="mt-6">
                  <a
                    href="/quiz"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  >
                    Rozwiąż quiz
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Statistics Card */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-white mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold">{results.length}</p>
                      <p className="text-indigo-100">Rozwiązanych quizów</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">
                        {results.filter((r) => r.isCorrect).length}
                      </p>
                      <p className="text-indigo-100">Poprawnych odpowiedzi</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">
                        {results.length > 0
                          ? Math.round(
                              (results.filter((r) => r.isCorrect).length /
                                results.length) *
                                100
                            )
                          : 0}
                        %
                      </p>
                      <p className="text-indigo-100">Skuteczność</p>
                    </div>
                  </div>
                </div>

                {/* Results List */}
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">
                              {getQuizIcon(result.quizType)}
                            </span>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {result.questionTitle}
                            </h3>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {formatDate(result.completedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                              </svg>
                              Czas: {formatTime(result.timeSpent)}
                            </span>
                            <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                              {result.quizType}
                            </span>
                          </div>
                          {result.answers && result.answers.length > 0 && (
                            <div className="mb-2">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">
                                  Twoja odpowiedź:
                                </span>{" "}
                                {Array.isArray(result.answers)
                                  ? result.answers.join(", ")
                                  : result.answers}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          {result.isCorrect ? (
                            <div className="bg-green-100 rounded-full p-3">
                              <svg
                                className="w-6 h-6 text-green-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          ) : (
                            <div className="bg-red-100 rounded-full p-3">
                              <svg
                                className="w-6 h-6 text-red-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm font-medium">
                          <span className="text-gray-600">Wynik: </span>
                          <span
                            className={
                              result.isCorrect
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {result.score}/{result.totalQuestions}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
