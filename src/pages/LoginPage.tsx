import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import Footer from '../components/common/Footer';
import { Building2 } from 'lucide-react';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Building2 className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Hotel Grand Reservations</h1>
            <p className="mt-2 text-slate-600 max-w-md mx-auto">
              Smart room selection based on travel time optimization
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="hidden md:block">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Room Reservation System</h2>
                <ul className="space-y-3">
                  {[
                    'Smart allocation of rooms to minimize travel time',
                    'Optimal booking with up to 5 rooms per guest',
                    'Visualize room layouts across 10 floors',
                    'Real-time tracking of available and booked rooms',
                    'Advanced admin controls for room management'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2 mt-0.5 text-xs">✓</span>
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 p-3 bg-blue-50 rounded-md border border-blue-100">
                  <p className="text-sm text-blue-700">
                    <strong>Our Algorithm:</strong> Rooms are allocated to minimize the total travel time between rooms, prioritizing same-floor bookings when possible.
                  </p>
                </div>
              </div>
            </div>
            
            <LoginForm />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LoginPage;