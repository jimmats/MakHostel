import React, { useEffect, useState } from "react";
import AccountNav from "../Layout/AccountNav";
import axios from "axios";
import { Link } from "react-router-dom";

import RoomImg from "./RoomImg";
import PaymentForm from "../PaymentPage";

function RoomsBooked() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const userEmail = 'user@example.com'; // Replace this with the actual email value
  
    axios.get(`/bookings/user/${userEmail}`).then((response) => {
      setBookings(response.data);
    }).catch((error) => {
      console.error('Error fetching bookings:', error);
    });
  }, []);
  

  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 && bookings.map((booking) => (
          <Link to={`/account/bookings/${booking._id}`} key={booking._id} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
            <div className="w-48">
              <RoomImg room={booking.room} />
            </div>
            <div className="py-3 pr-3 mb-6 grow">
              <h2 className="text-xl">Room Title: {booking.room.title}</h2>
              <h2 className="text-xl">Room Type: {booking.room.type}</h2>
              <h2 className="text-xl">Room Number: {booking.room.roomNumber}</h2>
              <div className="text-xl">
                <h3 className="mb-2 mt-4 text-gray-500">Duration: {booking.duration} Semester(s)</h3>
                <div className="flex gap-4">
                  <span className="flex text-2xl">
                    | Total price: UGX-{booking.room.roomPrice}
                  </span>
                </div>
                <div className="flex justify-end">
                  <button className="bg-primary p-2 text-center text-white rounded-2xl flex" onClick={PaymentForm}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                    <span>Check out</span>
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RoomsBooked;
