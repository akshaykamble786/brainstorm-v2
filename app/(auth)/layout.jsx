import React from "react";

export default function AuthLayout({ children }) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        {/* <div className="w-full max-w-md p-8 space-y-8 bg-foreground rounded-lg shadow-md"> */}
          {children}
        {/* </div> */}
      </div>
    );
  }
  