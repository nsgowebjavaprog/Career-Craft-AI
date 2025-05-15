// app/dashboard/interview/[interviewId]/start/_components/RecordAnswerSection.jsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import useSpeechToText from "react-hook-speech-to-text";

function RecordAnswerSection() {
  const [userAnswer, setUserAnswer] = useState("");

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({ continuous: true, useLegacyResults: false });

  useEffect(() => {
    if (results && Array.isArray(results)) {
      results.forEach((result) => {
        setUserAnswer((prevAns) => prevAns + result?.transcript);
      });
    }
  }, [results]);

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5 relative">
        <Image
          src={"/webcam.jpg"}
          width={200}
          height={200}
          className="absolute"
          alt="Webcam background"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>

      <Button
        variant="outline"
        className="my-10"
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
      >
        {isRecording ? (
          <h2 className="text-red-500 flex gap-2">
            <Mic /> Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>

      <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button>
    </div>
  );
}

export default RecordAnswerSection;