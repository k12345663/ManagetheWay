import React, { createContext, useContext, useState, useEffect } from 'react';

export type RoomStatus = 'available' | 'booked';

export type Room = {
  id: string;
  number: number;
  floor: number;
  status: RoomStatus;
};

export type Booking = {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  roomIds: string[];
  checkIn: string;
  checkOut: string;
  specialRequests?: string;
  totalTravelTime: number;
};

type HotelContextType = {
  rooms: Room[];
  selectedRooms: Room[];
  bookings: Booking[];
  setRoomStatus: (roomId: string, status: RoomStatus) => void;
  selectRoom: (room: Room) => void;
  deselectRoom: (room: Room) => void;
  clearSelectedRooms: () => void;
  createBooking: (booking: Omit<Booking, 'id' | 'roomIds' | 'totalTravelTime'>) => void;
  generateRandomOccupancy: (percentage: number) => void;
  resetAllRooms: () => void;
  calculateTravelTime: (rooms: Room[]) => number;
  findOptimalRooms: (count: number) => Room[];
};

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Initialize hotel rooms
  useEffect(() => {
    const initialRooms: Room[] = [];
    
    // Generate rooms for floors 1-9 (10 rooms each)
    for (let floor = 1; floor <= 9; floor++) {
      for (let roomNum = 1; roomNum <= 10; roomNum++) {
        const roomNumber = floor * 100 + roomNum;
        initialRooms.push({
          id: `room-${roomNumber}`,
          number: roomNumber,
          floor,
          status: 'available',
        });
      }
    }
    
    // Generate rooms for floor 10 (7 rooms)
    for (let roomNum = 1; roomNum <= 7; roomNum++) {
      const roomNumber = 1000 + roomNum;
      initialRooms.push({
        id: `room-${roomNumber}`,
        number: roomNumber,
        floor: 10,
        status: 'available',
      });
    }
    
    setRooms(initialRooms);
  }, []);

  // Set room status
  const setRoomStatus = (roomId: string, status: RoomStatus) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) => (room.id === roomId ? { ...room, status } : room))
    );
  };

  // Select a room
  const selectRoom = (room: Room) => {
    if (selectedRooms.length < 5 && room.status === 'available' && !selectedRooms.find(r => r.id === room.id)) {
      setSelectedRooms([...selectedRooms, room]);
    }
  };

  // Deselect a room
  const deselectRoom = (room: Room) => {
    setSelectedRooms(selectedRooms.filter((r) => r.id !== room.id));
  };

  // Clear all selected rooms
  const clearSelectedRooms = () => {
    setSelectedRooms([]);
  };

  // Calculate travel time between a set of rooms
  const calculateTravelTime = (roomSet: Room[]): number => {
    if (roomSet.length <= 1) return 0;
    
    // Sort rooms by floor and room number for calculation
    const sortedRooms = [...roomSet].sort((a, b) => {
      if (a.floor !== b.floor) return a.floor - b.floor;
      return a.number - b.number;
    });
    
    let totalTime = 0;
    
    // Calculate time between each consecutive pair of rooms
    for (let i = 0; i < sortedRooms.length - 1; i++) {
      const currentRoom = sortedRooms[i];
      const nextRoom = sortedRooms[i + 1];
      
      // Calculate vertical travel time (2 minutes per floor)
      const floorDifference = Math.abs(nextRoom.floor - currentRoom.floor);
      const verticalTime = floorDifference * 2;
      
      // Calculate horizontal travel time (1 minute per room)
      let horizontalTime = 0;
      
      if (currentRoom.floor === nextRoom.floor) {
        // If on the same floor, calculate room distance
        const roomDifference = Math.abs(
          (nextRoom.number % 100) - (currentRoom.number % 100)
        );
        horizontalTime = roomDifference;
      } else {
        // If on different floors, calculate distance from each room to elevator
        const currentRoomToElevator = (currentRoom.number % 100);
        const nextRoomToElevator = (nextRoom.number % 100);
        horizontalTime = currentRoomToElevator + nextRoomToElevator;
      }
      
      totalTime += verticalTime + horizontalTime;
    }
    
    return totalTime;
  };

  // Find optimal rooms based on minimizing travel time
  const findOptimalRooms = (count: number): Room[] => {
    if (count <= 0 || count > 5) return [];
    
    const availableRooms = rooms.filter((room) => room.status === 'available');
    if (availableRooms.length < count) return [];
    
    // Group available rooms by floor
    const roomsByFloor = availableRooms.reduce((acc, room) => {
      if (!acc[room.floor]) {
        acc[room.floor] = [];
      }
      acc[room.floor].push(room);
      return acc;
    }, {} as Record<number, Room[]>);
    
    // Find floors with enough consecutive rooms
    let bestRooms: Room[] = [];
    let bestTravelTime = Infinity;
    
    // Check each floor for consecutive rooms
    Object.values(roomsByFloor).forEach((floorRooms) => {
      if (floorRooms.length >= count) {
        // Sort rooms by number
        const sortedRooms = floorRooms.sort((a, b) => a.number - b.number);
        
        // Check each possible consecutive sequence
        for (let i = 0; i <= sortedRooms.length - count; i++) {
          const roomSet = sortedRooms.slice(i, i + count);
          const travelTime = calculateTravelTime(roomSet);
          
          if (travelTime < bestTravelTime) {
            bestTravelTime = travelTime;
            bestRooms = roomSet;
          }
        }
      }
    });
    
    // If we found a solution on a single floor, return it
    if (bestRooms.length === count) {
      return bestRooms;
    }
    
    // If we need to span multiple floors, find the best combination
    const allCombinations = findRoomCombinations(availableRooms, count);
    
    return allCombinations.reduce((best, current) => {
      const currentTime = calculateTravelTime(current);
      const bestTime = calculateTravelTime(best);
      return currentTime < bestTime ? current : best;
    }, allCombinations[0] || []);
  };

  // Helper function to find all possible room combinations
  const findRoomCombinations = (availableRooms: Room[], count: number): Room[][] => {
    const combinations: Room[][] = [];
    
    const generate = (current: Room[], start: number) => {
      if (current.length === count) {
        combinations.push([...current]);
        return;
      }
      
      for (let i = start; i < availableRooms.length; i++) {
        current.push(availableRooms[i]);
        generate(current, i + 1);
        current.pop();
      }
    };
    
    generate([], 0);
    return combinations;
  };

  // Generate random occupancy
  const generateRandomOccupancy = (percentage: number) => {
    const roomCount = rooms.length;
    const roomsToBook = Math.floor((roomCount * percentage) / 100);
    
    // Reset all rooms first
    const resetRooms = rooms.map(room => ({ ...room, status: 'available' }));
    
    // Randomly select rooms to book
    const shuffled = [...resetRooms].sort(() => Math.random() - 0.5);
    const bookedRooms = shuffled.slice(0, roomsToBook);
    
    // Update room status
    setRooms(resetRooms.map(room => ({
      ...room,
      status: bookedRooms.some(booked => booked.id === room.id) ? 'booked' : 'available'
    })));
    
    // Clear selected rooms
    clearSelectedRooms();
    
    // Clear bookings
    setBookings([]);
  };

  // Create a new booking
  const createBooking = (bookingData: Omit<Booking, 'id' | 'roomIds' | 'totalTravelTime'>) => {
    if (selectedRooms.length === 0) return;
    
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      ...bookingData,
      roomIds: selectedRooms.map((room) => room.id),
      totalTravelTime: calculateTravelTime(selectedRooms),
    };
    
    // Update rooms status
    selectedRooms.forEach((room) => {
      setRoomStatus(room.id, 'booked');
    });
    
    // Add booking
    setBookings([...bookings, newBooking]);
    
    // Clear selected rooms
    clearSelectedRooms();
  };

  // Reset all rooms
  const resetAllRooms = () => {
    setRooms(rooms.map((room) => ({ ...room, status: 'available' })));
    clearSelectedRooms();
    setBookings([]);
  };

  const value: HotelContextType = {
    rooms,
    selectedRooms,
    bookings,
    setRoomStatus,
    selectRoom,
    deselectRoom,
    clearSelectedRooms,
    createBooking,
    generateRandomOccupancy,
    resetAllRooms,
    calculateTravelTime,
    findOptimalRooms,
  };

  return <HotelContext.Provider value={value}>{children}</HotelContext.Provider>;
};