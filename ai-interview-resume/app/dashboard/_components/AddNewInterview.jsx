"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation"; // ✅ Only this one should be used

// import { useRouter } from "next/router";



function AddNewInterview() {

  const [openDailog, setOpenDailog] = useState(false)
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setjobDesc] = useState();
  const [jobExperience, setjobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState();
  const router = useRouter();
  const {user} = useUser();



  const onSubmit=async(e) =>{
    setLoading(true)
    e.preventDefault()
    console.log(jobPosition, jobDesc, jobExperience)

    const InputPrompt="Job position: "+jobPosition+", Job Description: "+jobDesc+" Years of Experience: "+jobExperience+", Depends on Job Position, Job Description, & Years of Experience given us "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview question along with Answer in JSON format, Give us question and answer field on JSON"

    const result = await ChatSession.sendMessage(InputPrompt);
    const MockJsonResp = (result.response.text()).replace('```json', '').replace('```', '')
    console.log(JSON.parse(MockJsonResp));
    setJsonResponse(MockJsonResp);

    // Store in DataBase

    if(MockJsonResp){
      
    const resp = await db.insert(MockInterview)
    .values({
      mockId:uuidv4(),
      jsonMockResp:MockJsonResp,
      jobPosition:jobPosition,
      jobDesc:jobDesc,
      jobExperience:jobExperience,
      createBy:user?.primaryEmailAddress?.emailAddress,
      createAt:moment().format('DD-MM-YYYY')
    }).returning({mockId:MockInterview.mockId});
   
    console.log("Inserted ID:", resp);
    if(resp){
      setOpenDailog(false);
      router.push('/dashboard/interview/' + resp[0]?.mockId);
    }
  }
  else{
    console.log("GETTING -- ERROR");
  }
    setLoading(false);
  }

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-gray-200 hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDailog(true)}
      >
        <h2 className="font-bold text-lg text-center"> + Add New</h2>
      </div>

      <Dialog open={openDailog} onOpenChange={setOpenDailog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-gray-900">
              Tell More About Job Interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2 className="text-gray-900">Add All Details</h2>

                  <div className="mt-7 my-3">
                    <label className="text-gray-900">Job Role / Position</label>
                    <Input
                      placeholder="e.g. ML Engineer"
                      required
                      onChange={(event) =>
                        setJobPosition(event.target.value)
                      }
                    />
                  </div>

                  <div className="my-3">
                    <label className="text-gray-900">Job Description / Language / Framework / etc..</label>
                    <Textarea
                      placeholder="e.g. ML, AI, NLP, DP more"
                      required
                      onChange={(event) => setjobDesc(event.target.value)}
                    />
                  </div>

                  <div className="my-3">
                    <label className="text-gray-900">Experience</label>
                    <Input
                      placeholder="e.g. 2"
                      type="number"
                      max="50"
                      required
                      onChange={(event) =>
                        setjobExperience(event.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDailog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading?
                    <>
                    <LoaderCircle className="animate-spin text-blue-200"/> AI will Generating 
                    </>:'Start Interview'
                    }
                    </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;