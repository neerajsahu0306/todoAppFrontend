import React from 'react'
import { SignUp } from '@clerk/clerk-react';
import { dark, neobrutalism } from '@clerk/themes';

function SignUpPage() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center `bg-gradient-to-br` from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
         <SignUp
         appearance={{
          theme: neobrutalism,
         }}
         signInUrl='/sign-in'
         />
        </div>
      </div>

    </>
  );
}

export default SignUpPage