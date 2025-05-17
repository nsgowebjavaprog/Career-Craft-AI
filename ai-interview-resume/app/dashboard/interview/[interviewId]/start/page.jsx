"use client";
import React, { useState, useEffect } from "react";
import { MockInterview } from "@/utils/schema";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import QuestionsSection from "./_components/QuestionsSection"; // ✅ Correct relative path
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";


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
        activeQuestionIndex={activeQuestionIndex}

        />

        {/* Video & Audio Recording (Add your component here) */}

        <RecordAnswerSection
        mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        interviewData={interviewData}
        />

      </div>
<div className='flex justify-end gap-6'>

  {activeQuestionIndex > 0 && 
    <Button className="bg-blue-500"  onClick={() => setactiveQuestionIndex(activeQuestionIndex - 1)}>
      Previous Question
    </Button>
  }

  {activeQuestionIndex !== mockInterviewQuestion?.length - 1 &&
    <Button className="bg-blue-500" onClick={() => setactiveQuestionIndex(activeQuestionIndex + 1)}>
      Next Question
    </Button>
  }

  {activeQuestionIndex === mockInterviewQuestion?.length - 1 &&
    <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
      <Button className="bg-blue-500" >End the Interview</Button>
    </Link>
  }

</div>

    </div>
  );
}

export default StartInterview;