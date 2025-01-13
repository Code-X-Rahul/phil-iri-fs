"use client";

import { useState, useEffect, useCallback, useRef } from "react";

import { Mic, MicOff, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/common/components/card";
import { Button } from "@/common/components/button";
import { Timer } from "../timer";
import { Alert, AlertDescription } from "@/common/components/alert";


interface SpeechAssessmentProps {
  text: string;
  onComplete: (score: number, totalWords: number) => void;
}

export function SpeechAssessment({ text, onComplete }: SpeechAssessmentProps) {
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [results, setResults] = useState<{ word: string; correct: boolean }[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const accumulatedTextRef = useRef("");
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize speech recognition with proper type checking
  const initializeSpeechRecognition = useCallback(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognitionAPI =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognitionAPI) {
        const recognition = new SpeechRecognitionAPI() as SpeechRecognition & {
          onend: () => void;
        };

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let interimTranscript = "";
          let finalTranscript = accumulatedTextRef.current;

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += " " + transcript;
              accumulatedTextRef.current = finalTranscript;
            } else {
              interimTranscript += transcript;
            }
          }

          const currentTranscript = finalTranscript + " " + interimTranscript;
          setSpokenText(currentTranscript.trim());
        };

        recognition.onend = () => {
          if (isListening && isTimerActive) {
            if (restartTimeoutRef.current) {
              clearTimeout(restartTimeoutRef.current);
            }

            restartTimeoutRef.current = setTimeout(() => {
              try {
                recognition.start();
              } catch (e) {
                console.error("Failed to restart recognition:", e);
              }
            }, 100);
          }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          // Ignore no-speech errors as they're common during pauses
          if (event.error === "no-speech") {
            return;
          }

          // Log error for debugging but handle specific cases
          console.debug("Speech recognition error type:", event.error);

          // Handle specific error types
          switch (event.error) {
            case "network":
              setError(
                "Network error detected. Please check your internet connection and try again."
              );
              setIsListening(false);
              setIsTimerActive(false);
              break;
            case "not-allowed":
              setError(
                "Microphone access denied. Please allow microphone access and refresh the page."
              );
              setIsListening(false);
              setIsTimerActive(false);
              break;
            case "aborted":
              // Don't show error for user-initiated stops
              if (isListening) {
                setError("Recognition was aborted. Click resume to continue.");
              }
              break;
            default:
              setError(`Recognition error: ${event.error}. Please try again.`);
              // Only stop listening for serious errors
              if (event.error !== "no-speech") {
                setIsListening(false);
              }
          }
        };

        return recognition;
      }
    }
    return null;
  }, [isListening, isTimerActive]);

  useEffect(() => {
    recognitionRef.current = initializeSpeechRecognition();

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
    };
  }, [initializeSpeechRecognition]);

  const evaluateReading = useCallback(
    (spoken: string) => {
      const originalWords = text.toLowerCase().split(/\s+/);
      const spokenWords = spoken.toLowerCase().split(/\s+/);

      const evaluation = originalWords.map((word, index) => ({
        word,
        correct: spokenWords[index]?.trim() === word.trim(),
      }));

      setResults(evaluation);
      const correctWords = evaluation.filter((r) => r.correct).length;
      onComplete(correctWords, originalWords.length);
    },
    [text, onComplete]
  );

  const handleTimeUp = useCallback(() => {
    setIsTimerActive(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    evaluateReading(accumulatedTextRef.current);
  }, [evaluateReading]);

  const handleComplete = useCallback(() => {
    setIsTimerActive(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    evaluateReading(accumulatedTextRef.current);
  }, [evaluateReading]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setError("Speech recognition is not supported in your browser");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        setError(null); // Clear any previous errors
        recognitionRef.current.start();
        setIsListening(true);
        setHasStarted(true);
      } catch (e) {
        console.error("Failed to start recognition:", e);
        setError(
          "Failed to start speech recognition. Please refresh the page and try again."
        );
        setIsTimerActive(false);
      }
    }
  };

  if (!hasStarted) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <Card className="p-6">
          <CardContent className="space-y-4">
            <div className="text-lg font-medium">Reading Material:</div>
            <div className="text-gray-700 leading-relaxed">{text}</div>
            <div className="text-center mt-8">
              <Button
                onClick={toggleListening}
                className="bg-[#0052CC] hover:bg-[#0052CC]/90"
                size="lg"
              >
                <Mic className="w-4 h-4 mr-2" />
                Start Reading Assessment
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                You will have 30 minutes to complete the reading
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {isTimerActive && <Timer duration={30} onTimeUp={handleTimeUp} />}

      <Card className="p-6">
        <CardContent className="space-y-4">
          <div className="text-lg font-medium">Reading Material:</div>
          <div className="text-gray-700 leading-relaxed">
            {text.split(" ").map((word, index) => (
              <span
                key={index}
                className={`inline-block mr-1 p-1 rounded ${
                  results[index]?.correct === true
                    ? "bg-green-100 text-green-800"
                    : results[index]?.correct === false
                    ? "bg-red-100 text-red-800"
                    : ""
                }`}
              >
                {word}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-center gap-4">
        <Button
          onClick={toggleListening}
          className={
            isListening
              ? "bg-red-500 hover:bg-red-600"
              : "bg-[#0052CC] hover:bg-[#0052CC]/90"
          }
        >
          {isListening ? (
            <>
              <MicOff className="w-4 h-4 mr-2" />
              Pause Reading
            </>
          ) : (
            <>
              <Mic className="w-4 h-4 mr-2" />
              {hasStarted ? "Resume Reading" : "Start Reading"}
            </>
          )}
        </Button>

        {hasStarted && (
          <Button
            onClick={handleComplete}
            className="bg-green-600 hover:bg-green-700"
            disabled={!spokenText.length}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Complete Assessment
          </Button>
        )}
      </div>

      {spokenText && (
        <Card className="p-6">
          <CardContent className="space-y-4">
            <div className="text-lg font-medium">Your Reading:</div>
            <div className="text-gray-600">{spokenText}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
