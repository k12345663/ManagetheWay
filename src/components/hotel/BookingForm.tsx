import React, { useState, useEffect } from 'react';
import { useHotel } from '../../context/HotelContext';
import { CalendarIcon, Clock, User, Mail, Phone, Check } from 'lucide-react';

const BookingForm: React.FC = () => {
  const { 
    selectedRooms, 
    createBooking, 
    clearSelectedRooms,
    calculateTravelTime,
    findOptimalRooms,
    generateRandomOccupancy,
    resetAllRooms
  } = useHotel();

  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [roomCount, setRoomCount] = useState(1);
  const [isFormValid, setIsFormValid] = useState(false);
  const [totalTravelTime, setTotalTravelTime] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  // Update travel time whenever selected rooms change
  useEffect(() => {
    if (selectedRooms.length > 0) {
      setTotalTravelTime(calculateTravelTime(selectedRooms));
    } else {
      setTotalTravelTime(0);
    }
  }, [selectedRooms, calculateTravelTime]);

  // Validate form
  useEffect(() => {
    setIsFormValid(
      guestName !== '' &&
      email !== '' &&
      phone !== '' &&
      checkIn !== '' &&
      checkOut !== '' &&
      selectedRooms.length > 0
    );
  }, [guestName, email, phone, checkIn, checkOut, selectedRooms]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    createBooking({
      guestName,
      email,
      phone,
      checkIn,
      checkOut,
      specialRequests
    });

    // Show success message
    setSuccessMessage('Booking successful! Your rooms have been reserved.');
    
    // Clear form
    setGuestName('');
    setEmail('');
    setPhone('');
    setSpecialRequests('');
    setCheckIn('');
    setCheckOut('');
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleFindRooms = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomCount < 1 || roomCount > 5) return;
    
    clearSelectedRooms();
    const optimalRooms = findOptimalRooms(roomCount);
    
    // Select the optimal rooms
    optimalRooms.forEach(room => {
      const roomElement = document.getElementById(room.id);
      if (roomElement) {
        roomElement.click();
      }
    });
  };

  return (
    <div className="card space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-900">Book Your Stay</h2>
        <div className="flex gap-2">
          <button
            onClick={() => generateRandomOccupancy(50)}
            className="btn btn-accent text-sm"
            type="button"
          >
            Random Occupancy
          </button>
          <button
            onClick={resetAllRooms}
            className="btn btn-outline text-sm"
            type="button"
          >
            Reset All
          </button>
        </div>
      </div>
      
      {successMessage && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm flex items-center animate-fade-in">
          <Check className="h-4 w-4 mr-2" />
          {successMessage}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <form onSubmit={handleFindRooms} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="checkIn" className="block text-sm font-medium text-slate-700">
                  Check-in Date
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="date"
                    id="checkIn"
                    className="input pl-10"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="checkOut" className="block text-sm font-medium text-slate-700">
                  Check-out Date
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="date"
                    id="checkOut"
                    className="input pl-10"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="roomCount" className="block text-sm font-medium text-slate-700">
                  Number of Rooms (1-5)
                </label>
                <div className="mt-1">
                  <select
                    id="roomCount"
                    className="select"
                    value={roomCount}
                    onChange={(e) => setRoomCount(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} Room{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-end">
                <button type="submit" className="btn btn-primary w-full">
                  Find Optimal Rooms
                </button>
              </div>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
              <h3 className="text-sm font-medium text-blue-800 flex items-center mb-2">
                <Clock className="h-4 w-4 mr-1" />
                Estimated Travel Time
              </h3>
              
              {selectedRooms.length > 0 ? (
                <div>
                  <p className="text-2xl font-bold text-blue-900">
                    {totalTravelTime} minutes
                  </p>
                  <div className="mt-3">
                    <p className="text-sm text-blue-700 mb-2">Travel between rooms:</p>
                    <div className="flex flex-wrap gap-2 items-center">
                      {selectedRooms.map((room, index) => (
                        <React.Fragment key={room.id}>
                          <span className="px-2 py-1 bg-white rounded border border-blue-200 text-sm">
                            {room.number}
                          </span>
                          {index < selectedRooms.length - 1 && (
                            <span className="text-blue-400">→</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-blue-700">
                  Select rooms to see the estimated travel time.
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="guestName" className="block text-sm font-medium text-slate-700">
                Guest Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  id="guestName"
                  className="input pl-10"
                  placeholder="Enter full name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="input pl-10"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                Phone Number
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  className="input pl-10"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="specialRequests" className="block text-sm font-medium text-slate-700">
                Special Requests
              </label>
              <div className="mt-1">
                <textarea
                  id="specialRequests"
                  rows={3}
                  className="input"
                  placeholder="Any special requests?"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                ></textarea>
              </div>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={!isFormValid}
              >
                Complete Booking
              </button>
            </div>
            
            <div className="text-right text-slate-800 text-sm font-medium">
              {selectedRooms.length > 0 && (
                <div>
                  <span>Total price: </span>
                  <span className="text-lg">₹{selectedRooms.length * 2999}</span>
                  <span className="text-xs text-slate-500 ml-1">per night</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;