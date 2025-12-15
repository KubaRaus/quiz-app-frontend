"use client";

import { useState } from "react";
import SingleChoiceQuestion from "@/components/quiz/SingleChoiceQuestion";
import MultipleChoiceQuestion from "@/components/quiz/MultipleChoiceQuestion";
import FillInBlanksQuestion from "@/components/quiz/FillInBlanksQuestion";
import MatchPairsQuestion from "@/components/quiz/MatchPairsQuestion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";

export const dynamic = 'force-dynamic';

export default function QuizDemoPage() {
  const [results, setResults] = useState([]);
  const { user } = useAuth();

  const handleQuestionSubmit = async (result) => {
    const newResult = {
      ...result,
      timestamp: new Date().toISOString(),
    };

    setResults((prev) => [...prev, newResult]);

    // Save to Firestore
    if (user) {
      try {
        const timestamp = serverTimestamp();
        await addDoc(collection(db, "quiz-results"), {
          userId: user.uid,
          userEmail: user.email,
          quizType: result.type,
          questionTitle: result.questionTitle || "Quiz Question",
          score: result.correct ? 1 : 0,
          totalQuestions: 1,
          answers:
            result.selectedAnswers ||
            result.matches ||
            result.filledAnswers ||
            [],
          isCorrect: result.correct,
          completedAt: timestamp,
          timeSpent: result.timeSpent || 0,
        });
        console.log("Result saved to Firestore");
      } catch (error) {
        console.error("Error saving result:", error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Prezentacja komponentów quizowych
        </h1>
        <p className="text-lg text-gray-600">
          Poniżej znajdują się wszystkie 4 typy pytań dostępne w aplikacji
        </p>
      </div>

      {/* Results Summary */}
      {results.length > 0 && user && (
        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Twoje wyniki (zapisane w Firestore)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-indigo-600">
                {results.length}
              </div>
              <div className="text-sm text-gray-600">Odpowiedzi</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600">
                {results.filter((r) => r.correct).length}
              </div>
              <div className="text-sm text-gray-600">Poprawne</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-red-600">
                {results.filter((r) => !r.correct).length}
              </div>
              <div className="text-sm text-gray-600">Niepoprawne</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-indigo-600">
                {results.length > 0
                  ? Math.round(
                      (results.filter((r) => r.correct).length /
                        results.length) *
                        100
                    )
                  : 0}
                %
              </div>
              <div className="text-sm text-gray-600">Skuteczność</div>
            </div>
          </div>
        </div>
      )}

      {/* Question 1: Single Choice */}
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            1. Pojedynczy wybór (tekst)
          </h2>
          <p className="text-gray-600">
            Wybierz jedną poprawną odpowiedź z listy opcji tekstowych
          </p>
        </div>
        <SingleChoiceQuestion
          title="Jaka jest stolica Polski?"
          content="<p>Pytanie dotyczy geografii Polski. Wybierz <strong>jedną</strong> poprawną odpowiedź.</p>"
          options={["Kraków", "Warszawa", "Gdańsk", "Wrocław"]}
          optionType="text"
          correctAnswer={1}
          onSubmit={handleQuestionSubmit}
        />
      </section>

      {/* Question 2: Single Choice with Images */}
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            2. Pojedynczy wybór (obrazy)
          </h2>
          <p className="text-gray-600">Wybierz jeden poprawny obraz</p>
        </div>
        <SingleChoiceQuestion
          title="Który kolor reprezentuje RGB (255, 0, 0)?"
          content="<p>Wybierz kolor odpowiadający wartości RGB <code>(255, 0, 0)</code></p>"
          options={[
            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%230000ff"/%3E%3C/svg%3E',
            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23ff0000"/%3E%3C/svg%3E',
            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%2300ff00"/%3E%3C/svg%3E',
            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23ffff00"/%3E%3C/svg%3E',
          ]}
          optionType="image"
          correctAnswer={1}
          onSubmit={handleQuestionSubmit}
        />
      </section>

      {/* Question 3: Multiple Choice */}
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            3. Wielokrotny wybór
          </h2>
          <p className="text-gray-600">Zaznacz wszystkie poprawne odpowiedzi</p>
        </div>
        <MultipleChoiceQuestion
          title="Które z poniższych języków są językami programowania?"
          content="<p>Zaznacz <strong>wszystkie</strong> języki programowania z poniższej listy.</p>"
          options={["JavaScript", "HTML", "Python", "CSS", "Java", "PHP"]}
          optionType="text"
          correctAnswers={[0, 2, 4, 5]}
          onSubmit={handleQuestionSubmit}
        />
      </section>

      {/* Question 4: Fill in Blanks */}
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            4. Uzupełnianie luk
          </h2>
          <p className="text-gray-600">
            Wybierz odpowiednie słowa z listy, aby uzupełnić tekst
          </p>
        </div>
        <FillInBlanksQuestion
          title="Uzupełnij zdanie o React"
          content="<p>React to biblioteka JavaScript do budowania _____ użytkownika. Została stworzona przez _____.</p>"
          blanks={[
            {
              position: 0,
              options: ["interfejsów", "serwerów", "baz danych", "sieci"],
              correctAnswer: "interfejsów",
            },
            {
              position: 1,
              options: ["Google", "Facebook", "Microsoft", "Apple"],
              correctAnswer: "Facebook",
            },
          ]}
          onSubmit={handleQuestionSubmit}
        />
      </section>

      {/* Question 5: Match Pairs */}
      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            5. Dopasowywanie par
          </h2>
          <p className="text-gray-600">Połącz powiązane ze sobą elementy</p>
        </div>
        <MatchPairsQuestion
          title="Dopasuj frameworki do języków programowania"
          content="<p>Dopasuj frameworki frontendowe do języków, w których są napisane.</p>"
          pairs={[
            { left: "React", right: "JavaScript" },
            { left: "Angular", right: "TypeScript" },
            { left: "Vue.js", right: "JavaScript" },
            { left: "Svelte", right: "JavaScript" },
          ]}
          onSubmit={handleQuestionSubmit}
        />
      </section>

      {/* Info Section */}
      <section className="bg-gray-100 rounded-lg p-8 mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Informacje techniczne
        </h2>
        <div className="space-y-2 text-gray-700">
          <p>✓ Każde pytanie posiada tytuł i treść (z obsługą HTML)</p>
          <p>
            ✓ Pytania typu pojedynczy/wielokrotny wybór obsługują opcje tekstowe
            i obrazkowe
          </p>
          <p>
            ✓ Wszystkie odpowiedzi są walidowane i wyświetlany jest feedback
          </p>
          <p>
            ✓ Wyniki są zapisywane do Firestore (jeśli użytkownik jest
            zalogowany)
          </p>
          <p>✓ Komponenty są w pełni responsywne (mobile, tablet, desktop)</p>
          <p>✓ Możliwość ponownego rozwiązania każdego pytania</p>
        </div>
      </section>
    </div>
  );
}
