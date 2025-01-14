"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Mic, MicOff, CheckCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/common/components/card";
import { Button } from "@/common/components/button";
import { Timer } from "../timer";
import { Progress } from "@/common/components/progress";
import { Alert, AlertDescription, AlertTitle } from "@/common/components/alert";
import { Textarea } from "@/common/components/textarea";

interface SpeechAssessmentProps {
  text: string;
  onComplete: (score: number, totalWords: number) => void;
}

export function SpeechAssessment({ text, onComplete }: SpeechAssessmentProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [results, setResults] = useState<{ word: string; correct: boolean }[]>(
    []
  );
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [audioLevel, setAudioLevel] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (
      (typeof window !== "undefined" && "SpeechRecognition" in window) ||
      "webkitSpeechRecognition" in window
    ) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        setTranscript(finalTranscript + interimTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setError(`Speech recognition error: ${event.error}`);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current?.start();
        }
      };
    } else {
      setError("Speech recognition is not supported in this browser.");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  useEffect(() => {
    let animationFrameId: number;

    const checkAudioLevel = () => {
      if (microphoneStreamRef.current && analyserRef.current) {
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        const average =
          dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
        setAudioLevel(average);
        animationFrameId = requestAnimationFrame(checkAudioLevel);
      }
    };

    if (isListening) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          microphoneStreamRef.current = stream;
          audioContextRef.current = new (window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
            
          analyserRef.current = audioContextRef.current.createAnalyser();
          const source =
            audioContextRef.current.createMediaStreamSource(stream);
          source.connect(analyserRef.current);
          checkAudioLevel();
        })
        .catch((err) => {
          console.error("Error accessing microphone:", err);
          setError(
            "Failed to access microphone. Please ensure your microphone is connected and try again."
          );
        });
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (microphoneStreamRef.current) {
        microphoneStreamRef.current
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, [isListening]);

  const startListening = useCallback(() => {
    setError(null);
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
      setHasStarted(true);
      setIsTimerActive(true);
    } else {
      setError("Speech recognition is not supported in this browser.");
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      setIsTimerActive(false);
    }
  }, []);

  const evaluateReading = useCallback(
    (spoken: string) => {
      const originalWords = text
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        .split(/\s+/);
      const spokenWords = spoken
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        .split(/\s+/);

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

  const handleComplete = useCallback(() => {
    stopListening();
    const spokenText = showManualInput ? manualInput : transcript;
    evaluateReading(spokenText);
  }, [
    transcript,
    showManualInput,
    manualInput,
    stopListening,
    evaluateReading,
  ]);

  const handleTimeUp = useCallback(() => {
    stopListening();
    evaluateReading(transcript);
  }, [stopListening, evaluateReading, transcript]);

  if (!hasStarted) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <Card className="p-6">
          <CardContent className="space-y-4">
            <div className="text-lg font-medium">Reading Material:</div>
            <div className="text-gray-700 leading-relaxed">{text}</div>
            <div className="text-center mt-8">
              <Button
                onClick={startListening}
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
            {text.split(/\s+/).map((word, index) => (
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

      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <Button
            onClick={isListening ? stopListening : startListening}
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

          <Button
            onClick={handleComplete}
            className="bg-green-600 hover:bg-green-700"
            disabled={!transcript.length && !manualInput.length}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Complete Assessment
          </Button>
        </div>

        <div className="flex items-center gap-2 w-full max-w-xs">
          <AlertTriangle
            className={`w-4 h-4 ${
              audioLevel > 0 ? "text-green-500" : "text-red-500"
            }`}
          />
          <Progress value={audioLevel} max={255} className="w-full" />
        </div>
      </div>

      {(transcript || manualInput) && (
        <Card className="p-6">
          <CardContent className="space-y-4">
            <div className="text-lg font-medium">Your Reading:</div>
            <div className="text-gray-600">
              {showManualInput ? manualInput : transcript}
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!transcript && !manualInput && isListening && (
        <Alert>
          <AlertTitle>No speech detected</AlertTitle>
          <AlertDescription>
            If you&apos;re speaking but no text appears, please check your
            microphone and ensure it&apos;s not muted. You can also try the
            manual input option below.
          </AlertDescription>
        </Alert>
      )}

      <Button
        onClick={() => setShowManualInput(!showManualInput)}
        variant="outline"
        className="mt-4"
      >
        {showManualInput ? "Hide" : "Show"} Manual Input
      </Button>

      {showManualInput && (
        <Textarea
          placeholder="Type your reading here if speech recognition is not working..."
          value={manualInput}
          onChange={(e) => setManualInput(e.target.value)}
          rows={10}
          className="mt-4"
        />
      )}
    </div>
  );
}
