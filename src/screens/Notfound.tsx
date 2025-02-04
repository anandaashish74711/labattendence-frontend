import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-red-500">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <Link to="/" className="text-blue-500 underline">Go Back Home</Link>
    </div>
  );
};

export default NotFoundPage;
