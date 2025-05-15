// app/dashboard/interview/[interviewId]/start/_components/RecordAnswerSection.jsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import useSpeechToText from "react-hook-speech-to-text";
import {toast} from 'sonner'
import { ChatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";

function RecordAnswerSection(mockInterviewQuestion,activeQuestionIndex,interviewData) {
  const [userAnswer, setUserAnswer] = useState("");
  const {user} = useUser();
  const [loading,setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({ continuous: true, useLegacyResults: false });

  useEffect(() => {
    if (results && Array.isArray(results)) {
      results.forEach((result) => {
        setUserAnswer((prevAns) => prevAns + result?.transcript);
      });
    }
  }, [results]);


  useEffect(()=>{
    if(!isRecording&&userAnswer.length>10){
      UpdateUserAnswer();
    }
    
  },[userAnswer])


  const StartStopRecording=async()=>{
    if(isRecording)
      {
        // setLoading(true);

      stopSpeechToText()
      
    }
    else{
      startSpeechToText();
    }
  }


    const UpdateUserAnswer=async()=>{
       console.log(userAnswer)
      setLoading(true)
      const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+
            ",User Answer:"+userAnswer+", Depends on question and user answer for given interview question"+
            "plaese give the rating for answer and feedback as area of improvement if any"+
            "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

            const result = await ChatSession.sendMessage(feedbackPrompt);

            const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
            console.log(mockJsonResp);
            const JsonFeedbackResp = JSON.parse(mockJsonResp);

            const resp = await db.insert(UserAnswer).values({
              mockIdRef:interimResult?.mockId,
              question:mockInterviewQuestion[activeQuestionIndex]?.question,
              correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
              userAns:userAnswer,
              feedback:JsonFeedbackResp?.feedback,
              rating:JsonFeedbackResp?.rating,
              userEmail:user?.primaryAddress?.emailAddress,
              createAt:moment().format('DD-MM-YYYY')
            })
            if(resp){
              toast('User Answer recorded successfully')
              setUserAnswer('');
              setResults([]);
            }
            setResults([]);
            setLoading(false);
}

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

        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-500 flex gap-2">
            <Mic /> Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>

      {/* <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button> */}
    </div>
  );
}

export default RecordAnswerSection;