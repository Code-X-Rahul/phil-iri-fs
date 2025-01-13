"use client";


import { Button } from "@/common/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/components/card";
import { BookOpen, MessageSquare } from "lucide-react";

interface AssessmentTypeSelectorProps {
  onSelect: (type: "reading" | "quiz") => void;
}

export function AssessmentTypeSelector({
  onSelect,
}: AssessmentTypeSelectorProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <Card className="cursor-pointer hover:border-[#0052CC] transition-colors">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#0052CC]">
            Reading Assessment
          </CardTitle>
          <CardDescription>
            Test your reading skills through speech recognition
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <BookOpen className="h-16 w-16 text-[#0052CC] mb-4" />
          <Button
            onClick={() => onSelect("reading")}
            className="bg-[#0052CC] hover:bg-[#0052CC]/90 w-full"
          >
            Start Reading
          </Button>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:border-[#0052CC] transition-colors">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#0052CC]">
            Question & Answer
          </CardTitle>
          <CardDescription>
            Test your comprehension through multiple choice questions
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <MessageSquare className="h-16 w-16 text-[#0052CC] mb-4" />
          <Button
            onClick={() => onSelect("quiz")}
            className="bg-[#0052CC] hover:bg-[#0052CC]/90 w-full"
          >
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
