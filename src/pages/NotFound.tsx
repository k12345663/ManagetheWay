import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <Building2 className="h-16 w-16 text-primary mb-4" />
      <h1 className="text-4xl font-bold text-slate-900 mb-2">404</h1>
      <p className="text-slate-600 text-lg mb-6">Oops! Page not found.</p>
      
      <Link
        to="/"
        className="btn btn-primary flex items-center"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;