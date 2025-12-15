"use client";

import { useState } from "react";

export default function SingleChoiceQuestion({
  title,
  content,
  options,
  optionType = "text", // 'text' or 'image'
  correctAnswer,
  onSubmit,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const correct = selectedOption === correctAnswer;
    setIsCorrect(correct);
    setSubmitted(true);

    if (onSubmit) {
      onSubmit({
        type: "single-choice",
        answer: selectedOption,
        correct,
      });
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setSubmitted(false);
    setIsCorrect(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>

      {/* Content (HTML support) */}
      <div
        className="text-gray-700 mb-6"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Options */}
      <div className="space-y-3 mb-6">
        {options.map((option, index) => {
          const isSelected = selectedOption === index;
          const showResult = submitted && isSelected;

          let borderColor = "border-gray-300";
          if (showResult) {
            borderColor = isCorrect
              ? "border-green-500 bg-green-50"
              : "border-red-500 bg-red-50";
          } else if (isSelected) {
            borderColor = "border-indigo-500 bg-indigo-50";
          }

          return (
            <label
              key={index}
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${borderColor} ${
                submitted ? "cursor-not-allowed" : "hover:border-indigo-300"
              }`}
            >
              <input
                type="radio"
                name="single-choice"
                value={index}
                checked={isSelected}
                onChange={() => !submitted && setSelectedOption(index)}
                disabled={submitted}
                className="w-4 h-4 text-indigo-600"
              />
              {optionType === "text" ? (
                <span className="ml-3 text-gray-900">{option}</span>
              ) : (
                <img
                  src={option}
                  alt={`Option ${index + 1}`}
                  className="ml-3 max-w-xs rounded"
                />
              )}
              {showResult && (
                <span className="ml-auto">{isCorrect ? "✓" : "✗"}</span>
              )}
            </label>
          );
        })}
      </div>

      {/* Feedback */}
      {submitted && (
        <div
          className={`p-4 rounded-lg mb-4 ${
            isCorrect
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {isCorrect
            ? "✓ Poprawna odpowiedź!"
            : "✗ Niepoprawna odpowiedź. Spróbuj ponownie."}
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="flex-1 bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Zatwierdź odpowiedź
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
