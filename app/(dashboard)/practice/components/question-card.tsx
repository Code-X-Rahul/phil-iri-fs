"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/card";
import { Label } from "@/common/components/label";
import { RadioGroup, RadioGroupItem } from "@/common/components/radio-group";

interface Option {
  id: string;
  text: string;
}

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  category: string;
  question: string;
  options: Option[];
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
}

export function QuestionCard({
  questionNumber,
  totalQuestions,
  category,
  question,
  options,
  selectedAnswer,
  onAnswerSelect,
}: QuestionCardProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">
            Category: <span className="font-medium">{category}</span>
          </div>
          <div className="text-lg font-medium">
            {questionNumber} / {totalQuestions}
          </div>
        </div>
        <CardTitle className="text-xl font-bold mb-4">{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAnswer || ""} onValueChange={onAnswerSelect}>
          {options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2 mb-4">
              <RadioGroupItem value={option.id} id={option.id} />
              <Label htmlFor={option.id} className="text-lg cursor-pointer">
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
