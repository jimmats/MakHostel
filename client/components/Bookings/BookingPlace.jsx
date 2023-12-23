import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import RoomGallery from "../Rooms/RoomGallery";
import PaymentForm from "..//PaymentPage";


function BookingPlace(){
    const {id} = useParams();
    const [booking,setBooking] = useState(null)
    
    useEffect(()=>{
        if(id){
            axios.get('/bookings').then(response =>{
                const foundBooking = response.data.find(({_id})=> _id === id);
                if(foundBooking){
                    setBooking(foundBooking);
                }
            });
        }

    }, [id]);

    if(!booking){
        return '';
    }

    return(
        <div className="my-8">
           <h1 className="text-3xl">{booking.room.title}</h1>
           
           <div className="bg-gray-200 p-6 my-6 rounded-2xl items-center flex justify-between">
           <div>
           <h2 className="text-2xl mb-4">Your booking information</h2>
           <h3 className="mb-2 mt-4 text-gray-500">Duration: {booking.duration} Semester(s)</h3>
           <h3 className="mb-2 mt-4 text-gray-500">Room Number: {booking.room.roomNumber}</h3>
           <h3 className="mb-2 mt-4 text-gray-500">Room Type: {booking.room.type} </h3>
           <h3 className="mb-2 mt-4 text-gray-500">Check In Date: {format(new Date(booking.checkIn),'yyyy-MM-dd')}</h3>
           </div>
           <div>
            <div className="bg-primary p-2 text-center text-white rounded-2xl">Total Price</div>
            <div className="text-3xl">UGX-{booking.room.roomPrice}</div>
           </div>
           
           </div>
           <div>
           <RoomGallery room={booking.room}/>
           </div>
           <div className="flex justify-center my-10">
           <div>
        <button className="bg-primary p-2 text-center text-white rounded-2xl flex" onClick={PaymentForm}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
</svg>
        <span>Check out</span>
        
        </button>
            
           </div>
          
           </div>
        </div>
    );
}

export default BookingPlace;