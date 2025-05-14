import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex h-screen w-screen">
      {/* Left Side - Image and Paragraph */}
      <div className="w-1/2 bg-gray-100 flex flex-col justify-center items-center p-10">
        <img
          src="/signin.png" // ✅ Using the correct image path
          alt="Welcome"
          className="w-2/3 mb-6 rounded-xl shadow-lg"
        />
        <p className="text-lg text-gray-700 text-center">
          Welcome to AI Interview Assistant. Streamline your preparation with personalized guidance and smart tools.
        </p>
      </div>

      {/* Right Side - Clerk Sign In */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <SignIn />
      </div>
    </div>
  );
}
