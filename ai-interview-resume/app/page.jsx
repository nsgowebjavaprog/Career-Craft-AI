// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// export default function Home() {
//   return (
//         <div>
//           <h1>NS LONI</h1>
//           <Button>Click On It</Button>
//         </div>
//   );
// }

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Home() {
  const router = useRouter();

  const handleStartClick = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-6xl w-full flex flex-col md:flex-row gap-10 items-center">
        
        {/* Image */}
        <div className="flex-shrink-0">
          <Image
            src="/home.jpg"
            alt="Home"
            width={400}
            height={400}
            className="rounded-2xl shadow-md"
          />
        </div>

        {/* Text and Button */}
        <div className="flex flex-col items-start justify-center space-y-6 text-left">
          <h1 className="text-5xl font-extrabold text-blue-500">CareerCraft AI</h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            CareerCraft AI creates ATS-friendly resumes and improves existing ones with real-time, actionable feedback.
          </p>
          <p className="text-md text-gray-600">
            It also provides personalized career tests, recommending suitable jobs, learning paths, certifications, and hiring companies.
          </p>
          <Button 
            onClick={handleStartClick}
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 text-lg rounded-xl shadow-md transition-transform transform hover:scale-105"
          >
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
}