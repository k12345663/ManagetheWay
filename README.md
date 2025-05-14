# ManagetheWay
 Hotel Reservation System that has efficient and optimal allocation
# Hotel Room Reservation System - Solution Document

## 1. Introduction

This document provides a detailed solution for the Hotel Room Reservation System problem. The system is designed to efficiently allocate rooms to guests based on defined priority rules, minimizing travel time between booked rooms.

### Problem Overview

* A hotel has 97 rooms distributed across 10 floors.
* Rooms are numbered sequentially (e.g., Floor 1: 101-110, Floor 2: 201-210).
* Rooms on the 10th floor are numbered 1001-1007.
* Travel times:

  * **Horizontal travel:** 1 minute between adjacent rooms.
  * **Vertical travel:** 2 minutes between floors.
* Booking Rules:

  * A guest can book up to 5 rooms.
  * Priority is to book rooms on the same floor.
  * If not available on one floor, the system optimizes room selection to minimize total travel time.

## 2. System Design

### Architecture

* The system is designed using a clean, modular architecture with two primary components:

  * **Frontend:** Manages user interaction and room visualization.
  * **Backend:** Handles the core logic of room selection, travel time calculation, and booking rules.

### Room Selection Logic

* Rooms are first checked for availability on the same floor.
* If the required rooms are not available on one floor, the system calculates the combined travel time (horizontal + vertical) for optimal room selection.

## 3. Functionalities

### User Interface

* **Input:** Accepts the number of rooms to book.
* **Book Button:** Triggers the room allocation process.
* **Visualization:** Displays the current room occupancy status in a grid format.
* **Random Occupancy:** Simulates random room occupancy.
* **Reset Button:** Clears all bookings and resets the system.

## 4. Algorithm and Logic

### Room Allocation Algorithm

1. Calculate available rooms on each floor.
2. Prioritize rooms on the same floor for booking.
3. If insufficient, calculate the travel time for cross-floor booking combinations.
4. Choose the combination with the lowest total travel time.

### Travel Time Calculation

* **Horizontal Travel:** Calculated as the difference between adjacent room numbers on the same floor.
* **Vertical Travel:** Calculated as the difference in floor levels multiplied by 2 (2 minutes per floor).

### Example Scenarios

1. If a guest wants 4 rooms and all are available on one floor, they are booked directly.
2. If not, the system considers combinations across floors, calculating travel time to select the most efficient arrangement.

## 5. Technical Details

* The solution uses a **TypeScript-based implementation** for type safety and clarity.
* The system is optimized for fast calculations of travel time using efficient data structures (arrays for room tracking).
* A priority queue approach is used to always select the optimal room combination.

## 6. Code Logic (Simplified)

* Room data is stored in a 2D array representing each floor.
* The algorithm iterates over each floor, checking availability and calculating travel time.
* Optimal room combinations are determined using a priority queue, ensuring the lowest travel time is selected.
* Functions are modular, with clear separation of concerns (e.g., room selection, travel time calculation, visualization).

## 7. Test Cases and Examples

* Test Case 1: Booking 3 rooms on an empty floor (direct booking).
* Test Case 2: Booking 5 rooms with partial availability on one floor (multi-floor booking).
* Test Case 3: Booking 4 rooms with scattered availability (calculates optimal combination).

## 8. Conclusion

* This solution provides an efficient, optimized approach to room booking while minimizing travel time.
* Future improvements could include dynamic room pricing, user authentication, and enhanced UI.
