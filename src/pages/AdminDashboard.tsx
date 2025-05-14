import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import RoomGrid from '../components/hotel/RoomGrid';
import BookingList from '../components/hotel/BookingList';
import StatsDisplay from '../components/hotel/StatsDisplay';
import { useHotel } from '../context/HotelContext';

const AdminDashboard: React.FC = () => {
  const { generateRandomOccupancy, resetAllRooms } = useHotel();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header title="Hotel Grand Reservations - Admin" />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-600 mt-1">
              Manage room availability and view bookings
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0 flex flex-wrap gap-3">
            <button
              onClick={() => generateRandomOccupancy(50)}
              className="btn btn-accent"
            >
              Random Occupancy
            </button>
            <button
              onClick={resetAllRooms}
              className="btn btn-outline"
            >
              Reset All Rooms
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <StatsDisplay />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-4 card p-4 bg-amber-50 border border-amber-100">
              <h2 className="text-lg font-medium text-amber-800">Room Management</h2>
              <p className="text-sm text-amber-700 mt-1">
                Click on rooms to toggle their availability status. Gray rooms are booked, white rooms are available.
              </p>
            </div>
            
            <RoomGrid isAdmin={true} />
          </div>
          
          <div>
            <BookingList />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;