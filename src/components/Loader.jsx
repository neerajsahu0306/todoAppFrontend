import React from 'react'

function Loader() {
    return (
      <>
        <div className=" flex justify-center items-center min-h-screen">
          <div className=" ">
            <style>{`
            @keyframes blinkCursor {
              50% {
                border-right-color: transparent;
              }
            }
    
            @keyframes typeAndDelete {
              0%,
              10% {
                width: 0;
              }
              45%,
              55% {
                width: 6.2em;
              }
              90%,
              100% {
                width: 0;
              }
            }
    
            .loader-text {
              animation: typeAndDelete 4s steps(11) infinite, blinkCursor 0.5s step-end infinite alternate;
            }
          `}</style>

            <div className="border border-gray-700 bg-slate-950 text-green-400 font-mono text-base p-6 w-48 rounded shadow-lg relative overflow-hidden">
              {/* Terminal Header */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-gray-600 rounded-t flex items-center justify-between px-2">
                <div className="text-gray-200 text-sm font-medium">Status</div>

                {/* Terminal Controls */}
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
              </div>

              {/* Loading Text */}
              <div className="mt-6 inline-block whitespace-nowrap overflow-hidden border-r-2 border-green-500 loader-text">
                Loading...
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Loader