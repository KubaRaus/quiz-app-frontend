"use client";

import { useState } from "react";

export default function MultipleChoiceQuestion({
  title,
  content,
  options,
  optionType = "text", // 'text' or 'image'
  correctAnswers, // Array of indices
  onSubmit,
}) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const toggleOption = (index) => {
    if (submitted) return;

    setSelectedOptions((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleSubmit = () => {
    if (selectedOptions.length === 0) return;

    // Check if selected answers match correct answers
    const correct =
      selectedOptions.length === correctAnswers.length &&
      selectedOptions.every((idx) => correctAnswers.includes(idx));

    setIsCorrect(correct);
    setSubmitted(true);

    if (onSubmit) {
      onSubmit({
        type: "multiple-choice",
        questionTitle: title,
        answers: selectedOptions,
        selectedAnswers: selectedOptions.map((idx) => options[idx]),
        correct,
      });
    }
  };

  const handleReset = () => {
    setSelectedOptions([]);
    setSubmitted(false);
    setIsCorrect(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>

      {/* Content (HTML support) */}
      <div
        className="text-gray-700 mb-4"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <p className="text-sm text-gray-600 mb-4">
        Zaznacz wszystkie poprawne odpowiedzi
      </p>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {options.map((option, index) => {
          const isSelected = selectedOptions.includes(index);
          const showResult = submitted;
          const isCorrectOption = correctAnswers.includes(index);

          let borderColor = "border-gray-300";
          if (showResult) {
            if (isSelected && isCorrectOption) {
              borderColor = "border-green-500 bg-green-50";
            } else if (isSelected && !isCorrectOption) {
              borderColor = "border-red-500 bg-red-50";
            } else if (!isSelected && isCorrectOption) {
              borderColor = "border-yellow-500 bg-yellow-50";
            }
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
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleOption(index)}
                disabled={submitted}
                className="w-4 h-4 text-indigo-600 rounded"
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
                <span className="ml-auto">
                  {isSelected && isCorrectOption && "✓"}
                  {isSelected && !isCorrectOption && "✗"}
                  {!isSelected && isCorrectOption && "○"}
                </span>
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
            ? "✓ Wszystkie odpowiedzi poprawne!"
            : "✗ Niektóre odpowiedzi są niepoprawne. Spróbuj ponownie."}
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOptions.length === 0}
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
