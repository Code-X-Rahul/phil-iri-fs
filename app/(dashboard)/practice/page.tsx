"use client";

import { useState, useCallback } from "react";

import { gradeQuestions, readingPassages } from "@/common/data/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/card";
import { RadioGroup, RadioGroupItem } from "@/common/components/radio-group";
import { Label } from "@/common/components/label";
import { AssessmentTypeSelector } from "./components/assessment-type-selector";
import { SpeechAssessment } from "./components/reading/speech-assessment";
import { ReadingResults } from "./components/reading/reading-result";
import { Timer } from "./components/timer";
import { ReadingPassage } from "./components/quiz/reading-passage";
import { QuestionCard } from "./components/quiz/question-card";
import { Button } from "@/common/components/button";
import { ResultsModal } from "./components/quiz/result-modal";

type AssessmentType = "reading" | "quiz" | null;

export default function PracticePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [, setHasStarted] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [assessmentType, setAssessmentType] = useState<AssessmentType>(null);
  const [showResults, setShowResults] = useState(false);
  const [readingScore, setReadingScore] = useState({ correct: 0, total: 0 });
  const [score, setScore] = useState({ total: 0, correct: 0 });

  const calculateScore = () => {
    const questions = gradeQuestions[selectedGrade!];
    let correct = 0;

    Object.entries(answers).forEach(([questionIndex, answer]) => {
      if (questions[Number(questionIndex)].correctAnswer === answer) {
        correct++;
      }
    });

    setScore({
      total: questions.length,
      correct: correct,
    });
  };

  const handleAnswerSelect = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < gradeQuestions[selectedGrade!].length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
    calculateScore();
    setShowResults(true);
  };

  const handleTimeUp = useCallback(() => {
    handleFinish();
  }, [isFinished, handleFinish]);

  const handleAssessmentTypeSelect = (type: AssessmentType) => {
    setAssessmentType(type);
    setHasStarted(true);
  };

  const handleReadingComplete = (correctWords: number, totalWords: number) => {
    setReadingScore({ correct: correctWords, total: totalWords });
    setShowResults(true);
  };

  if (!selectedGrade) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#0052CC] text-center">
              Select Grade Level
            </CardTitle>
            <CardDescription className="text-lg text-center">
              Choose your grade level to begin the assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              onValueChange={(grade) => setSelectedGrade(Number(grade))}
              className="space-y-4"
            >
              {[7, 8, 9, 10].map((grade) => (
                <div
                  key={grade}
                  className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-[#0052CC] transition-colors"
                >
                  <RadioGroupItem
                    value={grade.toString()}
                    id={`grade-${grade}`}
                  />
                  <Label
                    htmlFor={`grade-${grade}`}
                    className="flex-1 cursor-pointer"
                  >
                    Grade {grade}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!assessmentType) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-[#0052CC] mb-8">
            Choose Assessment Type
          </h1>
          <AssessmentTypeSelector onSelect={handleAssessmentTypeSelect} />
        </div>
      </div>
    );
  }

  if (assessmentType === "reading") {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-[#0052CC] mb-8">
            Reading Assessment - Grade {selectedGrade}
          </h1>
          <SpeechAssessment
            text={readingPassages[selectedGrade][0].content}
            onComplete={handleReadingComplete}
          />
          <ReadingResults
            isOpen={showResults}
            correctWords={readingScore.correct}
            totalWords={readingScore.total}
            grade={selectedGrade}
            onClose={() => setShowResults(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Timer duration={30} onTimeUp={handleTimeUp} />

      <div className="container mx-auto px-4 py-8">
        <ReadingPassage
          title={readingPassages[selectedGrade][0].title}
          content={readingPassages[selectedGrade][0].content}
        />

        <QuestionCard
          questionNumber={currentQuestion + 1}
          totalQuestions={gradeQuestions[selectedGrade].length}
          category={gradeQuestions[selectedGrade][currentQuestion].category}
          question={gradeQuestions[selectedGrade][currentQuestion].question}
          options={gradeQuestions[selectedGrade][currentQuestion].options}
          selectedAnswer={answers[currentQuestion] || null}
          onAnswerSelect={handleAnswerSelect}
        />

        <div className="flex justify-between mt-8 max-w-4xl mx-auto">
          <Button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            variant="outline"
          >
            Previous
          </Button>
          <Button
            onClick={handleNextQuestion}
            className="bg-[#0052CC] hover:bg-[#0052CC]/90"
          >
            {currentQuestion === gradeQuestions[selectedGrade].length - 1
              ? "Finish"
              : "Next"}
          </Button>
        </div>

        <ResultsModal
          isOpen={showResults}
          totalQuestions={score.total}
          correctAnswers={score.correct}
          grade={selectedGrade}
          onClose={() => setShowResults(false)}
        />
      </div>
    </div>
  );
}
