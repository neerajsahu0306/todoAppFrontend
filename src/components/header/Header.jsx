import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

function Header() {
  const { user, signOut, isSignedIn } = useAuth();

  return (
    <>
      <header>
        <div>
          <div>
            {/* Logo */}
            <Link to="/">Todo App</Link>

            {/* Navigation - Only show when signed in */}
            {isSignedIn && (
              <nav>
                <Link to="/todos">Todos</Link>
              </nav>
            )}
          </div>

          {/* Right Side */}
          <div>
            {isSignedIn ? (
              <>
                {/* User Info */}
                <div>
                  <p>
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p>{user?.emailAddresses[0]?.emailAddress}</p>
                </div>

                {/* Sign Out Button */}
                <button onClick={() => signOut({ redirectUrl: "/sign-in" })}>
                  Sign Out
                </button>
              </>
            ) : (
              /* Sign Up Button */
              <Link to="/sign-up">Get Started</Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
