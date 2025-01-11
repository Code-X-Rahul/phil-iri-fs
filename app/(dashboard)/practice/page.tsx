"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/common/components/card";
import { Button } from "@/common/components/button";
import { Timer } from "./components/timer";
import { QuestionCard } from "./components/question-card";

// Dummy questions data
const questions = [
  {
    id: 1,
    category: "Reading Comprehension",
    question: "What is the main idea of the passage?",
    options: [
      { id: "a", text: "The importance of reading" },
      { id: "b", text: "The history of books" },
      { id: "c", text: "The future of digital media" },
      { id: "d", text: "The impact of literature" },
    ],
  },
  // Add more questions here...
].concat(
  Array(19)
    .fill(null)
    .map((_, index) => ({
      id: index + 2,
      category: "Reading Comprehension",
      question: `Sample Question ${index + 2}`,
      options: [
        { id: "a", text: "Option A" },
        { id: "b", text: "Option B" },
        { id: "c", text: "Option C" },
        { id: "d", text: "Option D" },
      ],
    }))
);

export default function PracticePage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [hasStarted, setHasStarted] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (!answers[currentQuestion]) {
      alert("Please select an answer before proceeding to the next question.");
      return;
    }
    if (currentQuestion < questions.length - 1) {
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

  const handleFinish = useCallback(() => {
    // Calculate score and show results
    const score = Object.keys(answers).length;
    alert(
      `Quiz completed! You answered ${score} out of ${questions.length} questions.`
    );
    router.push("/");
  }, [answers, router]);

  const handleTimeUp = useCallback(() => {
    handleFinish();
  }, [handleFinish]);

  const startAssessment = () => {
    setHasStarted(true);
  };

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg text-center">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">
              Reading Assessment
            </CardTitle>
            <CardDescription className="text-lg">
              You are about to start a 30-minute reading assessment with 20
              questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-left space-y-2">
              <h3 className="font-semibold">Instructions:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>You will have 30 minutes to complete all questions</li>
                <li>Read each question carefully before answering</li>
                <li>
                  You can navigate between questions using the Previous and Next
                  buttons
                </li>
                <li>
                  The assessment will automatically submit when time runs out
                </li>
                <li>Make sure you have a stable internet connection</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={startAssessment} className="px-8" size="lg">
              Start Assessment
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Timer duration={30} onTimeUp={handleTimeUp} />

      <div className="container mx-auto px-4 py-8">
        <QuestionCard
          questionNumber={currentQuestion + 1}
          totalQuestions={questions.length}
          category={questions[currentQuestion].category}
          question={questions[currentQuestion].question}
          options={questions[currentQuestion].options}
          selectedAnswer={answers[currentQuestion] || null}
          onAnswerSelect={handleAnswerSelect}
        />

        {!answers[currentQuestion] && (
          <p className="text-red-500 text-center mt-4">
            Please select an answer before proceeding.
          </p>
        )}

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
            disabled={!answers[currentQuestion]}
          >
            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
