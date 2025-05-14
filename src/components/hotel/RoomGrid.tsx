import React from 'react';
import { useHotel, Room } from '../../context/HotelContext';
import { BuildingIcon } from 'lucide-react';

type RoomGridProps = {
  isAdmin?: boolean;
};

const RoomGrid: React.FC<RoomGridProps> = ({ isAdmin = false }) => {
  const { 
    rooms, 
    selectedRooms, 
    selectRoom, 
    deselectRoom, 
    setRoomStatus 
  } = useHotel();

  // Group rooms by floor
  const roomsByFloor: Record<number, Room[]> = {};
  rooms.forEach((room) => {
    if (!roomsByFloor[room.floor]) {
      roomsByFloor[room.floor] = [];
    }
    roomsByFloor[room.floor].push(room);
  });

  // Sort rooms within each floor
  Object.values(roomsByFloor).forEach((floorRooms) => {
    floorRooms.sort((a, b) => a.number - b.number);
  });

  // Get floor numbers and sort them
  const floorNumbers = Object.keys(roomsByFloor)
    .map(Number)
    .sort((a, b) => a - b);

  const handleRoomClick = (room: Room) => {
    if (isAdmin) {
      // Admin can toggle room status
      const newStatus = room.status === 'available' ? 'booked' : 'available';
      setRoomStatus(room.id, newStatus);
    } else {
      // Guest can select/deselect available rooms
      if (room.status !== 'available') return;

      const isSelected = selectedRooms.some((r) => r.id === room.id);
      if (isSelected) {
        deselectRoom(room);
      } else {
        selectRoom(room);
      }
    }
  };

  const getRoomClassName = (room: Room) => {
    const isSelected = selectedRooms.some((r) => r.id === room.id);
    const baseClass = 'room room-hover-effect';
    
    if (isSelected) {
      return `${baseClass} room-selected`;
    }
    
    return `${baseClass} ${room.status === 'available' ? 'room-available' : 'room-booked'}`;
  };

  return (
    <div className="space-y-8">
      {floorNumbers.map((floor) => (
        <div key={`floor-${floor}`} className="card">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="text-lg font-medium">
              Floor {floor}
              {floor === 10 && (
                <span className="ml-2 px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">
                  Top Floor
                </span>
              )}
            </h3>
          </div>
          
          <div className="p-4 grid grid-cols-11 gap-3">
            <div className="elevator flex flex-col items-center justify-center">
              <BuildingIcon size={16} className="text-slate-600" />
              <span className="text-xs text-slate-600 mt-1">Elevator</span>
            </div>
            
            {roomsByFloor[floor].map((room) => (
              <button
                key={room.id}
                className={getRoomClassName(room)}
                onClick={() => handleRoomClick(room)}
                disabled={!isAdmin && room.status === 'booked'}
              >
                {room.number}
              </button>
            ))}
            
            {/* Add empty cells to fill the grid for floor 10 */}
            {floor === 10 && Array.from({ length: 3 }).map((_, i) => (
              <div key={`empty-${i}`} className="h-12"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomGrid;