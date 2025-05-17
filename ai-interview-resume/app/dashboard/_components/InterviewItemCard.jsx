import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({interview}) {

    const router = useRouter();

    const onStart=()=>{
        router.push('/dashboard/interview/'+interview?.mockId)
    }

    const onFeedbackPress=()=>{
        router.push('/dashboard/interview/'+interview.mockId+"/feedback")
    }

//   return (

//     <div className='border shadow-sm rounded-lg p-3'>
//         <h2 className='font-bold text-gray-900'>{interview.jobPosition}</h2>
//         <h2 className='text-sm text-gray-800'>{interview?.jobExperience} Year of experience</h2>
//         <h2 className='text-xs text-gray-500'> Created At: {interview.createdAt}</h2>
    
//         <div className='flex justify-between mt-2 gap-2'>
            
//             <Button size="sm" variant="outline" className="w-full" onClick={onFeedbackPress}> Feedback</Button>

//             <Button size="sm" className="w-full" onClick={onStart}> Start</Button>
//         </div>
//     </div>
//   )
// }

return (
    <div className="border shadow-sm bg-secondary rounded-lg p-3">
      {/* Info Section */}
      <h2 className="font-bold text-blue-600 text-2xl">{interview.jobPosition}</h2>
      <h2 className="text-lg text-gray-800 mt-2">{interview.jobExperience} Year of experience</h2>
      <h2 className="text-sm text-gray-500 mt-1">Created At: {interview.createdAt}</h2>

      {/* Buttons Section */}
      <div className="flex gap-6 mt-6">
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={onFeedbackPress}
        >
          Feedback
        </Button>
        <Button
          size="sm"
          className="flex-1 bg-gray-900 hover:bg-900 text-white"
          onClick={onStart}
        >
          Start
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard
