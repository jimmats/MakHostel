import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

function BookingWidget({room}){

    const [checkIn,setCheckIn] = useState('');
    const [duration,setDuration] = useState('');
    const [numberOfPeople,setNumberOfPeople] = useState(1);
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [email,setEmail] = useState('');
    const [redirect,setRedirect] = useState();
    const {user} = useContext(UserContext);

    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    async function bookThisRoom(){
        
       const response = await axios.post('/bookings',{
            checkIn,duration,numberOfPeople,name,phone,email,
            place:room.place,
            room:room._id,
            price:room.price,
        });
        const bookingId = response.data._id;
        toast.success('Booking successfully added',{
            duration: 5000,
            position: "top-center",
           }
           );
        
    }

    // if(redirect) {
    //     return <Navigate to={'/account/mybookings'} />
    // }

    

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
            Price: UGX-{room.roomPrice} / sem
            </div>
            <div className="border rounded-2xl mt-4">
            <div className="flex">
            <div className="py-3 px-4">
                <label>Check in Date:</label>
                <input type="date" value={checkIn} 
                onChange={ev => setCheckIn(ev.target.value)}
                />
            </div>
            <div className="py-3 px-4 border-l">
                <label>Duration(sem)</label>
                <input type="number" value={duration}
                 onChange={ev => setDuration(ev.target.value)}
                 />
            </div>
            </div>
            <div className="py-3 px-4  border-t">
                <label>Number of People:</label>
                <input type="number" value={numberOfPeople} 
                onChange={ev=> setNumberOfPeople(ev.target.value)}
                />
            </div>
            {duration>0 && (
                <div className="py-3 px-4  border-t">
                <label>Your full Name:</label>
                <input type="text" 
                    value={name} 
                     onChange={ev=> setName(ev.target.value)}
                />
                <br />
                <label>Phone Number</label>
                <input type="tel" 
                    value={phone} 
                    onChange={ev=> setPhone(ev.target.value)}
                />
                 <br />
                <label>Email</label>
                <input type="email" 
                    value={email} 
                    onChange={ev=> setEmail(ev.target.value)}
                />
             </div>
            )}
            </div>

                <button onClick={bookThisRoom} className="primary mt-4">
                Book room
                </button>
            </div>
    );
}

export default BookingWidget;