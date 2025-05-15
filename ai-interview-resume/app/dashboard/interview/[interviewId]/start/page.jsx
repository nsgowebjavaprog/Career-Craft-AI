"use client";
import React, { useState, useEffect } from "react";
import { MockInterview } from "@/utils/schema";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import QuestionsSection from "./_components/QuestionsSection"; // ✅ Correct relative path
import RecordAnswerSection from "./_components/RecordAnswerSection";


function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex,setactiveQuestionIndex] = useState(0);



  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (result.length > 0) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
      }
    } catch (error) {
      console.error("Failed to fetch interview details:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions Section */}
        <QuestionsSection
        mockInterviewQuestion={mockInterviewQuestion}
        
        activeQuestionIndex

        />

        {/* Video & Audio Recording (Add your component here) */}

        <RecordAnswerSection />




      </div>
    </div>
  );
}

export default StartInterview;