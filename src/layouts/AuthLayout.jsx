import { useAuth } from "@clerk/clerk-react";
import { Navigate} from "react-router-dom";
import React from 'react'
import { Loader } from "../components";
function AuthLayout({children, authentication = true}) {

    const {isSignedIn, isLoaded} = useAuth();

    if (!isLoaded) {
        return(
            <Loader/>
        )
    }

    if (authentication) {
        if (!isSignedIn) {
            return <Navigate to='/sign-in' replace/>
        }
        return <>{children}</>
    } else {
        if (isSignedIn) {
          return <Navigate to="/todos" replace />;
        }
        return <>{children}</>;
    }
}

export default AuthLayout