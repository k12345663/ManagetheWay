import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Hotel Grand Reservations. All rights reserved.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Made and managed by Prathmesh Kolte
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;