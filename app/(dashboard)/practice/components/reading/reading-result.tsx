"use client";


import { Button } from "@/common/components/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/common/components/dialog";
import { useRouter } from "next/navigation";

interface ReadingResultsProps {
  isOpen: boolean;
  correctWords: number;
  totalWords: number;
  grade: number;
  onClose: () => void;
}

export function ReadingResults({
  isOpen,
  correctWords,
  totalWords,
  grade,
  onClose,
}: ReadingResultsProps) {
  const router = useRouter();
  const percentage = Math.round((correctWords / totalWords) * 100);

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Excellent reading skills!";
    if (percentage >= 80) return "Very good reading skills!";
    if (percentage >= 70) return "Good reading skills!";
    if (percentage >= 60) return "Fair reading skills.";
    return "Needs improvement in reading.";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#0052CC]">
            Reading Results
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
            <p>Total Words: {totalWords}</p>
            <p>Correctly Pronounced: {correctWords}</p>
            <p>Mispronounced: {totalWords - correctWords}</p>
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
            Try Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
