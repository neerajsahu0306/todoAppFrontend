import React from 'react'
import { SignIn } from '@clerk/clerk-react';
import {  neobrutalism} from "@clerk/themes";
function SignInpage() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center `bg-gradient-to-br` from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <SignIn
            appearance={{
              theme: neobrutalism,
            }}
            signUpUrl='/sign-up'
          />
        </div>
      </div>
    </>
  );
}

export default SignInpage