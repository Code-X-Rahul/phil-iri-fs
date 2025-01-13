"use client";


import { Button } from "@/common/components/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/common/components/dialog";
import { useRouter } from "next/navigation";

interface ResultsModalProps {
  isOpen: boolean;
  totalQuestions: number;
  correctAnswers: number;
  grade: number;
  onClose: () => void;
}

export function ResultsModal({
  isOpen,
  totalQuestions,
  correctAnswers,
  grade,
  onClose,
}: ResultsModalProps) {
  const router = useRouter();
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Excellent performance!";
    if (percentage >= 80) return "Very good performance!";
    if (percentage >= 70) return "Good performance!";
    if (percentage >= 60) return "Fair performance.";
    return "Needs improvement.";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#0052CC]">
            Assessment Results
          </DialogTitle>
          <DialogDescription className="text-lg">
            Grade {grade} Reading Assessment
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-center py-4">
            <div className="text-4xl font-bold text-[#0052CC]">
              {percentage}%
            </div>
            <p className="text-gray-600 mt-2">{getPerformanceMessage()}</p>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p>Total Questions: {totalQuestions}</p>
            <p>Correct Answers: {correctAnswers}</p>
            <p>Incorrect Answers: {totalQuestions - correctAnswers}</p>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <Button variant="outline" onClick={() => router.push("/")}>
            Exit
          </Button>
          <Button
            className="bg-[#0052CC] hover:bg-[#0052CC]/90"
            onClick={onClose}
          >
            Review Answers
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
