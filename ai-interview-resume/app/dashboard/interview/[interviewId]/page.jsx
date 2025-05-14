"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import React, { useEffect, useState } from 'react';
import { eq } from 'drizzle-orm';
import WebcamComponent from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Webcam as WebcamIcon, Lightbulb } from 'lucide-react';

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    setInterviewData(result[0]);
  };

  return (
    <div className="my-10 px-5 md:px-20">
      <h2 className="font-bold text-3xl text-center mb-10">🎯 Let's Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Webcam Section */}
        <div className="flex flex-col items-center justify-center border p-5 rounded-lg shadow-md">
          {webCamEnabled ? (
            <WebcamComponent
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              className="rounded-lg border shadow"
              style={{ width: 300, height: 300 }}
            />
          ) : (
            <>
              <WebcamIcon className="h-48 w-48 my-5 p-4 bg-secondary text-gray-500 rounded-lg border" />
              <Button variant="ghost" onClick={() => setWebCamEnabled(true)}>
                Enable Web-Cam & MicroPhone
              </Button>
            </>
          )}
        </div>

        {/* Interview Details + Info */}
        <div className="flex flex-col gap-6">
          {/* Job Info */}
          <div className="p-5 border rounded-lg shadow bg-white space-y-3">
            <h2 className="text-lg">
              <strong>Job Role & Position:</strong> {interviewData?.jobPosition || 'N/A'}
            </h2>
            <h2 className="text-lg">
              <strong>Job Desc & Tech Stack:</strong> {interviewData?.jobDesc || 'N/A'}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience:</strong> {interviewData?.jobExperience || 'N/A'}
            </h2>
          </div>

          {/* Info Box */}
          <div className="p-5 border rounded-lg border-yellow-400 bg-yellow-100 shadow-sm">
            <h2 className="flex items-center gap-2 text-yellow-700 text-md font-semibold">
              <Lightbulb className="text-yellow-500" />
              Information
            </h2>
            <p className="mt-3 text-yellow-800 text-sm">
              {process.env.NEXT_PUBLIC_INFORMATION || 'No information available. Please check your .env.local.'}
            </p>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="flex justify-center md:justify-end mt-10">
        <Link href = {'/dashboard/interview/'+params.interviewId+'/start'}/>
        <Button className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg">
          Start Interview
        </Button>
      </div>
    </div>
  );
}

export default Interview;