"use client"
import React, { useEffect, useState } from 'react'
import {db} from '@/utils/db'
import { MockInterview } from '@/utils/schema'; 
import {useUser} from '@clerk/nextjs'
import {eq} from 'drizzle-orm'
import { desc } from 'drizzle-orm';
import { index } from 'drizzle-orm/gel-core';
import InterviewItemCard from './InterviewItemCard';


function InterviewList() {

    const {user} = useUser();
    const [interviewList, setInterviewList] = useState([]);


    useEffect(() => {
        user && GetInterviewList();
    }, [user])

    const GetInterviewList = async() =>{
        const result = await db.select()
        .from(MockInterview)
        .where(eq(MockInterview.createBy, user?.primaryEmailAddress?. emailAddress))
        .orderBy(desc(MockInterview.id))
    
        console.log(result);
        setInterviewList(result);

    }

  return (
    <div>
      <h2 className='font-medium text-orange-500 text-bold text-xl'>Previous Mock Interview</h2>
    
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-4'>
    {interviewList && interviewList.map((interview, index) =>(
        
        <InterviewItemCard 
        interview={interview}
        key={index}/>
    ))}

    </div>
    </div>
  )
}

export default InterviewList
