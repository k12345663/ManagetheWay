import React from 'react';
import { useHotel } from '../../context/HotelContext';
import { Clock, User, Calendar, CheckSquare } from 'lucide-react';

const BookingList: React.FC = () => {
  const { bookings, rooms } = useHotel();

  // Get room number by ID
  const getRoomNumber = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    return room ? room.number : 'Unknown';
  };

  // Sort bookings by check-in date (most recent first)
  const sortedBookings = [...bookings].sort((a, b) => {
    return new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime();
  });

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Recent Bookings</h2>
      
      {sortedBookings.length === 0 ? (
        <div className="p-6 text-center">
          <p className="text-slate-500">No bookings found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedBookings.map((booking) => (
            <div
              key={booking.id}
              className="border border-slate-200 rounded-lg p-4 transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-slate-900 flex items-center">
                  <User className="h-4 w-4 mr-1 text-primary" />
                  {booking.guestName}
                </h3>
                <div className="flex items-center text-sm text-slate-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                </div>
              </div>
              
              <div className="mt-3 flex items-center text-sm text-slate-700">
                <Clock className="h-4 w-4 mr-1 text-blue-600" />
                <span className="font-medium text-blue-700">Total travel time: {booking.totalTravelTime} minutes</span>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-slate-700 mb-2">Booked Rooms:</h4>
                <div className="flex flex-wrap gap-2">
                  {booking.roomIds.map((roomId) => (
                    <span
                      key={roomId}
                      className="px-2 py-1 bg-primary bg-opacity-10 text-primary rounded text-sm font-medium"
                    >
                      Room {getRoomNumber(roomId)}
                    </span>
                  ))}
                </div>
              </div>
              
              {booking.specialRequests && (
                <div className="mt-3 text-sm text-slate-700">
                  <span className="font-medium">Special requests: </span>
                  {booking.specialRequests}
                </div>
              )}
              
              <div className="mt-3 text-right">
                <span className="inline-flex items-center text-sm text-green-600">
                  <CheckSquare className="h-4 w-4 mr-1" />
                  Confirmed
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingList;