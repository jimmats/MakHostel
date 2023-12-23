import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../Bookings/BookingWidget";
import Perks from "../Perks/Perks";
import RoomGallery from "../Rooms/RoomGallery";

function RoomPage({placeId}){
    const {id} = useParams();
    const [room,setRoom] = useState(null);
    const [selectedPerks, setSelectedPerks] = useState([]);
    const [placeTitle, setPlaceTitle] = useState('');
    

    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get(`/rooms/${id}`).then(response =>{
            setRoom(response.data);
        });
    }, [id]);

    useEffect(() => {
        if (placeId) {
          axios.get(`/places/${placeId}`).then(placeResponse => {
            const placeData = placeResponse.data;
            setPlaceTitle(placeData.title);
          });
        }
      }, [placeId]);


    if(!room){
        return '';
        }

    
   
    return(
    <div className="mt-4 py-4 bg-gray-100 -mx-8 px-8 pt-8">
        <h1 className="text-3xl">{room.title}</h1>
        <h1 className="text-2xl">Location:{placeTitle}</h1>
        <RoomGallery room={room} />
        
        <div className="mt-8 mb-4 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
        <div className="my-4">
        <h2 className="font-semibold text-2xl">Description</h2>
            {room.description}
        </div>
        Room Type: {room.type}<br />
        Room Number: {room.roomNumber}<br />
        Max number of people: {room.maxPeople}
        </div>
        <div>
        <BookingWidget room={room}/>
        </div> 
        </div>

         <div className="bg-white -mx-8 px-8 py-8 border-t">
         <div>
            <h2 className="font-semibold text-2xl">Extra Info</h2>
        </div>
        <div className="mb-4 mt-2text-sm text-gray-700 leading-5">
            {room.extraInfo}
        </div>
        <div>
            <h2 className="mt-4 font-semibold text-2xl">Perks</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
        <div className="grid grid-cols-4">
        <Perks
          selected={room.perks}
          onChange={(perks) => setSelectedPerks(room.perks)}
        />
        </div>
        </div>


         </div>
        

    </div>
    );
}

export default RoomPage;