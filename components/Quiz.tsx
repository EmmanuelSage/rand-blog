import React, { useState } from 'react';

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuizProps {
  question: string;
  options: QuizOption[];
  explanation?: string;
}

export const Quiz: React.FC<QuizProps> = ({ question, options, explanation }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleOptionSelect = (optionId: string) => {
    if (!isSubmitted) {
      setSelectedOption(optionId);
    }
  };
  
  const handleSubmit = () => {
    if (selectedOption) {
      setIsSubmitted(true);
    }
  };
  
  const handleReset = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
  };
  
  const isCorrect = selectedOption 
    ? options.find(option => option.id === selectedOption)?.isCorrect 
    : false;
  
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-8">
      <h3 className="text-xl font-bold mb-4">{question}</h3>
      
      <div className="space-y-3 mb-6">
        {options.map((option) => {
          let optionClass = "border rounded-lg p-3 cursor-pointer transition-colors";
          
          if (isSubmitted) {
            if (option.id === selectedOption) {
              optionClass += option.isCorrect 
                ? " bg-green-100 border-green-500" 
                : " bg-red-100 border-red-500";
            } else if (option.isCorrect) {
              optionClass += " bg-green-50 border-green-300";
            }
          } else if (option.id === selectedOption) {
            optionClass += " bg-blue-50 border-blue-500";
          } else {
            optionClass += " hover:bg-gray-100";
          }
          
          return (
            <div 
              key={option.id}
              className={optionClass}
              onClick={() => handleOptionSelect(option.id)}
            >
              {option.text}
              
              {isSubmitted && option.isCorrect && (
                <span className="ml-2 text-green-600">✓</span>
              )}
              
              {isSubmitted && option.id === selectedOption && !option.isCorrect && (
                <span className="ml-2 text-red-600">✗</span>
              )}
            </div>
          );
        })}
      </div>
      
      {isSubmitted && explanation && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <h4 className="font-bold mb-2">Explanation:</h4>
          <p>{explanation}</p>
        </div>
      )}
      
      <div className="flex justify-end">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className={`px-4 py-2 rounded-lg ${
              selectedOption 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}; 