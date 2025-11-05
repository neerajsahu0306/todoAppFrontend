import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { createBrowserRouter , RouterProvider} from 'react-router-dom';
import {Home, SignUpPage, SignInPage, Todo} from './pages/index.js'
import MainLayout from './layouts/MainLayout.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <MainLayout>
            <Home />
          </MainLayout>
        ),
      },
      {
        path: "/sign-up",
        element: (
          <AuthLayout authentication={false}>
            <MainLayout>
              <SignUpPage />
            </MainLayout>
          </AuthLayout>
        ),
      },
      {
        path: "/sign-in",
        element: (
          <AuthLayout authentication={false}>
            <MainLayout>
              <SignInPage />
            </MainLayout>
          </AuthLayout>
        ),
      },
      {
        path: "/todos",
        element: (
          <AuthLayout authentication={true}>
            <MainLayout>
              <Todo />
            </MainLayout>
          </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
    <RouterProvider router={router}/>
    </ClerkProvider>
    
  </StrictMode>,
)
