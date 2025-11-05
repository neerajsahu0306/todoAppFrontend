import React, { useEffect } from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Loader } from "./components";
import { useAuth } from '@clerk/clerk-react'
import axiosConfig from './api/api.config'

function App() {
  const { isSignedIn, getToken, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      axiosConfig.setTokenGetter(getToken)
    }
  },[isSignedIn, isLoaded, getToken]);

 

  return (
    <>
      <div className="min-h-screen w-full bg-black relative">
        {/* Cosmic Nebula */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `
       radial-gradient(ellipse 110% 70% at 25% 80%, rgba(147, 51, 234, 0.12), transparent 55%),
       radial-gradient(ellipse 130% 60% at 75% 15%, rgba(59, 130, 246, 0.10), transparent 65%),
       radial-gradient(ellipse 80% 90% at 20% 30%, rgba(236, 72, 153, 0.14), transparent 50%),
       radial-gradient(ellipse 100% 40% at 60% 70%, rgba(16, 185, 129, 0.08), transparent 45%),
       #000000
     `,
          }}
        />
        {/* Your Content/Components */}
        <div className="z-10 relative text-gray-500">
          {!isLoaded && <Loader />}
          {isLoaded && <Outlet />}
        </div>
      </div>
    </>
  );
}

export default App
