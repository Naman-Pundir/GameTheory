# GameTheory

A simple booking system built using Node.js for the backend, React.js for the frontend, and MongoDB as the database. This application allows users to manage bookings for various sports courts.

## Live Link: https://gt-frontend-pe5h.onrender.com/

## Tech Stack

- **Backend**: Node.js
  - The backend is built using Node.js, allowing for efficient handling of requests and real-time updates.
- **Frontend**: React.js
  - The frontend is developed with React.js, providing a responsive and interactive user interface for managing bookings.
- **Database**: MongoDB
  - MongoDB is used as the database to store and manage booking data, providing flexibility with its document-oriented structure.

## Data Model

The application utilizes a document-based data model in MongoDB. Below are the key collections and their relationships:

1. **Centers**
   - Represents different sports centers.
   - Fields:
     - `_id`: Unique identifier for the center.
     - `name`: Name of the center.
     - `location`: Address or location details.

2. **Sports**
   - Represents different types of sports available for booking.
   - Fields:
     - `_id`: Unique identifier for the sport.
     - `name`: Name of the sport.

3. **Courts**
   - Represents various courts available in each center for booking.
   - Fields:
     - `_id`: Unique identifier for the court.
     - `name`: Name of the court.
     - `sport_id`: Reference to the associated sport (relationship with Sports collection).

4. **Bookings**
   - Represents bookings made by customers.
   - Fields:
     - `_id`: Unique identifier for the booking.
     - `center_id`: Reference to the associated center (relationship with Centers collection).
     - `court_id`: Reference to the booked court (relationship with Courts collection).
     - `date`: Date of the booking (format: YYYY-MM-DD).
     - `time_slot`: Time slot for the booking.
     - `customer_name`: Name of the customer who made the booking.

### Relationships
- Each **Court** is linked to a **Sport** through the `sport_id`.
- Each **Booking** is linked to a **Center** through the `center_id` and to a **Court** through the `court_id`.
