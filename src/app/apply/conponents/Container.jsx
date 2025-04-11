import React from 'react';

function Container({ children }) {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

export default Container;
