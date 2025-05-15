"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // <-- Correct import for App Router!
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { db } from "@/utils/db";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// Optionally, add prop types for better clarity
export default function FeedbackClient({ interviewId }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function GetFeedback() {
      try {
        setLoading(true);
        setError(null);
        const result = await db
          .select()
          .from(UserAnswer)
          .where(eq(UserAnswer.mockIdRef, interviewId))
          .orderBy(UserAnswer.id);
        setFeedbackList(result);
      } catch (err) {
        setError("Failed to fetch feedback. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    GetFeedback();
  }, [interviewId]);

  if (loading) {
    return <div className="p-10 text-lg">Loading feedback...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-600">{error}</div>;
  }

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congrats</h2>
      <h2 className="font-bold text-2xl">Here is your Interview Feedback</h2>
      <h2 className="text-primary text-lg my-3">
        Interview Rating: <strong>8/10</strong>
      </h2>
      <h2 className="text-sm text-gray-500">
        Find below Interview Ques and Correct Answer, Your Answer & feedback for
        the user improvement
      </h2>

      {feedbackList.map((item) => (
        <Collapsible key={item.id} className="mt-7">
          <CollapsibleTrigger className="p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full">
            {item.question} <ChevronUpDown className="h-5 w-5" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="flex flex-col gap-2">
              <h2 className="text-red-500 p-2 border rounded-lg">
                <strong>Rating: </strong>
                {item.rating}
              </h2>
              <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                <strong>Your Answer: </strong>
                {item.userAns}
              </h2>
              <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                <strong>Correct Answer: </strong>
                {item.correctAns}
              </h2>
              <h2 className="p-2 border rounded-lg bg-primary-50 text-sm text-primary-900">
                <strong>FeedBack: </strong>
                {item.feedback}
              </h2>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}

      <Button onClick={() => router.push("/dashboard")}>GO BACK / HOME</Button>
    </div>
  );
}