import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'


function Dashboard() {
  return (
    <div className='p-10'>

      <h2 className='font-bold text-gray-900 text-2xl'>User Dashboard</h2>

      <h2 className='text-gray-700'>Create & Start your AI Mock Interview with CareerCraft AI</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview/>
      </div>

    {/* Previous Interview FeedBack */}

      <InterviewList />

    </div>
  )
}

export default Dashboard
