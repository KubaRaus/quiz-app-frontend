"use client";

import { useState } from "react";

export default function FillInBlanksQuestion({
  title,
  content,
  blanks, // Array of { position, options, correctAnswer }
  onSubmit,
}) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState({});

  const handleAnswerChange = (blankIndex, value) => {
    if (submitted) return;
    setAnswers((prev) => ({
      ...prev,
      [blankIndex]: value,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== blanks.length) return;

    const newResults = {};
    let allCorrect = true;

    blanks.forEach((blank, index) => {
      const correct = answers[index] === blank.correctAnswer;
      newResults[index] = correct;
      if (!correct) allCorrect = false;
    });

    setResults(newResults);
    setSubmitted(true);

    if (onSubmit) {
      onSubmit({
        type: "fill-in-blanks",
        questionTitle: title,
        answers,
        filledAnswers: Object.values(answers),
        correct: allCorrect,
      });
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setResults({});
  };

  // Parse content and replace blanks
  const renderContent = () => {
    let processedContent = content;
    blanks.forEach((blank, index) => {
      const placeholder = `{{blank_${index}}}`;
      processedContent = processedContent.replace(
        placeholder,
        `<span id="blank-${index}" class="inline-blank"></span>`
      );
    });

    return { __html: processedContent };
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>

      {/* Instruction */}
      <p className="text-sm text-gray-600 mb-4">
        Wybierz odpowiednie słowa z listy, aby uzupełnić tekst
      </p>

      {/* Content with blanks */}
      <div className="text-gray-700 mb-6 leading-relaxed">
        {blanks.map((blank, index) => {
          const blankKey = `blank_${index}`;
          const parts = content.split(`{{${blankKey}}}`);

          if (index === 0) {
            return (
              <span key={index}>
                {parts[0]}
                <select
                  value={answers[index] || ""}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  disabled={submitted}
                  className={`mx-1 px-3 py-1 border-2 rounded ${
                    submitted
                      ? results[index]
                        ? "border-green-500 bg-green-50"
                        : "border-red-500 bg-red-50"
                      : "border-indigo-300"
                  } ${submitted ? "cursor-not-allowed" : ""}`}
                >
                  <option value="">---</option>
                  {blank.options.map((option, optIdx) => (
                    <option key={optIdx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {parts.slice(1).join(`{{${blankKey}}}`)}
              </span>
            );
          }
          return null;
        })}
      </div>

      {/* Additional blanks if not in content */}
      <div className="space-y-3 mb-6">
        {blanks.slice(1).map((blank, index) => {
          const actualIndex = index + 1;
          return (
            <div key={actualIndex} className="flex items-center">
              <label className="w-32 text-gray-700 font-medium">
                Pole {actualIndex + 1}:
              </label>
              <select
                value={answers[actualIndex] || ""}
                onChange={(e) =>
                  handleAnswerChange(actualIndex, e.target.value)
                }
                disabled={submitted}
                className={`flex-1 px-3 py-2 border-2 rounded ${
                  submitted
                    ? results[actualIndex]
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                    : "border-gray-300"
                } ${submitted ? "cursor-not-allowed" : ""}`}
              >
                <option value="">Wybierz opcję</option>
                {blank.options.map((option, optIdx) => (
                  <option key={optIdx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {submitted && (
                <span className="ml-3 text-lg">
                  {results[actualIndex] ? "✓" : "✗"}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Feedback */}
      {submitted && (
        <div
          className={`p-4 rounded-lg mb-4 ${
            Object.values(results).every((r) => r)
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {Object.values(results).every((r) => r)
            ? "✓ Wszystkie pola uzupełnione poprawnie!"
            : "✗ Niektóre odpowiedzi są niepoprawne. Spróbuj ponownie."}
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length !== blanks.length}
            className="flex-1 bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Zatwierdź odpowiedzi
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Spróbuj ponownie
          </button>
        )}
      </div>
    </div>
  );
}
