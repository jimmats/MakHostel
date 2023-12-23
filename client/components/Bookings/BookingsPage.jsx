import React, { useEffect, useState } from "react";
import AccountNav from "../Layout/AccountNav";
import axios from "axios";
import { Link } from "react-router-dom";

import RoomImg from "../Rooms/RoomImg";
import PaymentForm from "../PaymentPage";
import toast from "react-hot-toast";

function BookingsPage(){

    const [bookings,setBookings] = useState([]);
    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
          }).catch(error => {
            console.error('Error fetching bookings:', error);
          });
      }, []);


      function removeBooking(ev,bookingId){
        ev.preventDefault();
        const updatedBookings = bookings.filter(booking => booking._id !== bookingId);

        // Update the state with the new list of places
        setBookings(updatedBookings);
      
        axios.delete(`/bookings/${bookingId}`)
          .then(response => {
            console.log('Booking deleted successfully');
            toast.success('Booking deleted successfully',{
              duration: 5000,
              position: "top-center",
             }
             );
          })
          .catch(error => {
            console.error('Error deleting booking:', error);
            toast.error('Error deleting booking,try again',{
              duration: 5000,
              position: "top-center",
             }
             );
          });
    }
      
    return(
        <div>
            <AccountNav />
            <h1>Total number of Bookings is {bookings.length}</h1>
            <div>
            {bookings?.length > 0 && bookings.map(booking =>(
                <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                <div className="w-48">
                <RoomImg room={booking.room} /> 
                </div>
              
               <div className="py-3 pr-3 mb-6 grow">
               <h2 className="text-xl">Room Title:{booking.room.title}</h2>

               <h2 className="text-xl">Room Type: {booking.room.type}</h2>
               <h2 className="text-xl">Room Number: {booking.room.roomNumber}</h2>
                
               <div className="text-xl">
                <h3 className="mb-2 mt-4 text-gray-500">Duration: {booking.duration} Semester(s)</h3>
               <div className="flex gap-4">
               
                <span className="flex text-2xl">
                | Total price: UGX-{booking.room.roomPrice}
                </span>
                
               </div>
               <div className="flex mt-3 relative">
                <button className="bg-primary p-2 text-center text-white rounded-2xl flex" onClick={PaymentForm}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
</svg>
        <span>Check out</span>
        
        </button>
                </div>
                <div className="h-10 flex relative">
                <button onClick={ev=>removeBooking(ev,booking._id)} className="cursor-pointer absolute bottom-1 right-1 rounded-2xl text-white bg-opacity-50 bg-black py-2 px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
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


export default BookingsPage;