"use client";

import { useState } from "react";

export default function MatchPairsQuestion({
  title,
  content,
  pairs, // Array of { left, right } objects
  onSubmit,
}) {
  const [matches, setMatches] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState({});

  // Shuffle right items for display
  const [shuffledRight] = useState(() => {
    const rightItems = pairs.map((p, i) => ({ value: p.right, index: i }));
    return rightItems.sort(() => Math.random() - 0.5);
  });

  const handleMatch = (leftIndex, rightValue) => {
    if (submitted) return;

    setMatches((prev) => ({
      ...prev,
      [leftIndex]: rightValue,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(matches).length !== pairs.length) return;

    const newResults = {};
    let allCorrect = true;

    pairs.forEach((pair, index) => {
      const correct = matches[index] === pair.right;
      newResults[index] = correct;
      if (!correct) allCorrect = false;
    });

    setResults(newResults);
    setSubmitted(true);

    if (onSubmit) {
      onSubmit({
        type: "match-pairs",
        matches,
        correct: allCorrect,
      });
    }
  };

  const handleReset = () => {
    setMatches({});
    setSubmitted(false);
    setResults({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>

      {/* Content (HTML support) */}
      <div
        className="text-gray-700 mb-4"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <p className="text-sm text-gray-600 mb-6">
        Dopasuj elementy z lewej kolumny do elementów z prawej kolumny
      </p>

      {/* Matching Interface */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Left Column */}
        <div className="space-y-3">
          {pairs.map((pair, index) => (
            <div
              key={index}
              className={`p-4 border-2 rounded-lg ${
                submitted
                  ? results[index]
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              <div className="font-medium text-gray-900 mb-2">{pair.left}</div>
              <select
                value={matches[index] || ""}
                onChange={(e) => handleMatch(index, e.target.value)}
                disabled={submitted}
                className={`w-full px-3 py-2 border rounded ${
                  submitted ? "cursor-not-allowed" : ""
                } ${
                  matches[index]
                    ? "border-indigo-500 bg-white"
                    : "border-gray-300"
                }`}
              >
                <option value="">Wybierz dopasowanie</option>
                {shuffledRight.map((item, idx) => (
                  <option key={idx} value={item.value}>
                    {item.value}
                  </option>
                ))}
              </select>
              {submitted && (
                <div className="mt-2 text-sm">
                  {results[index] ? (
                    <span className="text-green-600">✓ Poprawnie</span>
                  ) : (
                    <span className="text-red-600">
                      ✗ Niepoprawnie (poprawna: {pair.right})
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Column - Visual Reference */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-700 mb-2">
            Dostępne opcje:
          </div>
          {shuffledRight.map((item, index) => (
            <div
              key={index}
              className="p-4 border-2 border-gray-200 rounded-lg bg-indigo-50"
            >
              <div className="text-gray-900">{item.value}</div>
            </div>
          ))}
        </div>
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
            ? "✓ Wszystkie pary dopasowane poprawnie!"
            : "✗ Niektóre pary są niepoprawne. Spróbuj ponownie."}
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(matches).length !== pairs.length}
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
