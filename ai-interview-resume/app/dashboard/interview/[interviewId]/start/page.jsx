"use client";
import React, { useState, useEffect } from 'react';
import { MockInterview } from '@/utils/schema';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    if (result.length > 0) {
      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      console.log(jsonMockResp);
      setMockInterviewQuestions(jsonMockResp);
      setInterviewData(result[0]);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Start Interview</h1>
      
      {interviewData ? (
        <div className="mb-6">
          <h2 className="text-lg"><strong>Role:</strong> {interviewData.jobPosition}</h2>
          <h2 className="text-lg"><strong>Experience:</strong> {interviewData.jobExperience}</h2>
        </div>
      ) : (
        <p>Loading interview details...</p>
      )}

      {mockInterviewQuestions.length > 0 ? (
        <div className="space-y-4">
          <h3 className="font-semibold">Interview Questions:</h3>
          {mockInterviewQuestions.map((question, index) => (
            <div key={index} className="p-3 border rounded bg-gray-100">
              <p><strong>Q{index + 1}:</strong> {question}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No questions found or loading...</p>
      )}
    </div>
  );
}

export default StartInterview;