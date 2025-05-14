import React, { useMemo } from 'react';
import { useHotel } from '../../context/HotelContext';
import { TrendingUp, Users, Home, AlertCircle } from 'lucide-react';

const StatsDisplay: React.FC = () => {
  const { rooms, bookings } = useHotel();
  
  const stats = useMemo(() => {
    const totalRooms = rooms.length;
    const bookedRooms = rooms.filter((room) => room.status === 'booked').length;
    const availableRooms = totalRooms - bookedRooms;
    const occupancyRate = Math.round((bookedRooms / totalRooms) * 100);
    
    // Get rooms by floor
    const floorStats: Record<number, { total: number; booked: number }> = {};
    rooms.forEach((room) => {
      if (!floorStats[room.floor]) {
        floorStats[room.floor] = { total: 0, booked: 0 };
      }
      
      floorStats[room.floor].total += 1;
      if (room.status === 'booked') {
        floorStats[room.floor].booked += 1;
      }
    });
    
    // Find most occupied floor
    let mostOccupiedFloor = 0;
    let highestOccupancyRate = 0;
    
    Object.entries(floorStats).forEach(([floor, stats]) => {
      const floorOccupancyRate = (stats.booked / stats.total) * 100;
      if (floorOccupancyRate > highestOccupancyRate) {
        highestOccupancyRate = floorOccupancyRate;
        mostOccupiedFloor = parseInt(floor);
      }
    });
    
    return {
      totalRooms,
      bookedRooms,
      availableRooms,
      occupancyRate,
      mostOccupiedFloor,
      highestOccupancyRate: Math.round(highestOccupancyRate),
      totalBookings: bookings.length,
    };
  }, [rooms, bookings]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="card p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-blue-700">Occupancy Rate</p>
            <p className="text-2xl font-bold text-blue-900 mt-1">{stats.occupancyRate}%</p>
          </div>
          <div className="bg-blue-500 p-2 rounded-md">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
        </div>
        <p className="text-xs text-blue-600 mt-2">
          {stats.bookedRooms} out of {stats.totalRooms} rooms booked
        </p>
      </div>
      
      <div className="card p-4 bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-green-700">Available Rooms</p>
            <p className="text-2xl font-bold text-green-900 mt-1">{stats.availableRooms}</p>
          </div>
          <div className="bg-green-500 p-2 rounded-md">
            <Home className="h-5 w-5 text-white" />
          </div>
        </div>
        <p className="text-xs text-green-600 mt-2">
          Ready for new bookings
        </p>
      </div>
      
      <div className="card p-4 bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-amber-700">Total Bookings</p>
            <p className="text-2xl font-bold text-amber-900 mt-1">{stats.totalBookings}</p>
          </div>
          <div className="bg-amber-500 p-2 rounded-md">
            <Users className="h-5 w-5 text-white" />
          </div>
        </div>
        <p className="text-xs text-amber-600 mt-2">
          Active guest reservations
        </p>
      </div>
      
      <div className="card p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-purple-700">Most Occupied Floor</p>
            <p className="text-2xl font-bold text-purple-900 mt-1">
              Floor {stats.mostOccupiedFloor}
            </p>
          </div>
          <div className="bg-purple-500 p-2 rounded-md">
            <AlertCircle className="h-5 w-5 text-white" />
          </div>
        </div>
        <p className="text-xs text-purple-600 mt-2">
          {stats.highestOccupancyRate}% occupancy rate
        </p>
      </div>
    </div>
  );
};

export default StatsDisplay;