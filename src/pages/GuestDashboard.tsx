import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import RoomGrid from '../components/hotel/RoomGrid';
import BookingForm from '../components/hotel/BookingForm';
import BookingList from '../components/hotel/BookingList';
import { useHotel } from '../context/HotelContext';

const GuestDashboard: React.FC = () => {
  const { selectedRooms } = useHotel();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Book Your Stay</h1>
          <p className="text-slate-600 mt-1">
            Select rooms from the floor plan below (maximum 5 rooms)
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-4 card p-4 bg-blue-50 border border-blue-100">
              <h2 className="text-lg font-medium text-blue-800">Room Selection</h2>
              <p className="text-sm text-blue-700 mt-1">
                Click on available rooms to select them. The system will calculate the total travel time between your selected rooms.
              </p>
              
              {selectedRooms.length > 0 && (
                <div className="mt-4 p-3 bg-white rounded-md border border-blue-200">
                  <h3 className="text-sm font-medium text-slate-700 mb-2">Selected rooms:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedRooms.map((room) => (
                      <span
                        key={room.id}
                        className="px-2 py-1 bg-primary bg-opacity-10 text-primary rounded text-sm font-medium"
                      >
                        Room {room.number}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <RoomGrid />
          </div>
          
          <div className="space-y-6">
            <BookingForm />
            <BookingList />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GuestDashboard;