import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function RoomsDisplayPage({placeId}) {
  const [rooms, setRooms] = useState([]);
  const [placeTitle, setPlaceTitle] = useState('');

  function roomsLoading() {
    toast.loading('Loading Rooms', {
      duration: 5000,
      position: "top-center",
    });
  }

  function roomsLoadFailed() {
    toast.error('Failed to load rooms, try again', {
      duration: 5000,
      position: "top-center",
    });
  }

  useEffect(() => {
    async function fetchData() {
      try {
        roomsLoading();
        const data = (await axios.get('/getallrooms')).data;
        setRooms(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData(); 

  }, []); 

  useEffect(() => {
    if (placeId) {
      axios.get(`/places/${placeId}`).then(placeResponse => {
        const placeData = placeResponse.data;
        setPlaceTitle(placeData.title);
      });
    }
  }, [placeId]);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {rooms.length > 0 && rooms.map(room =>(
      <Link to={'/rooms/'+room._id} key={room._id}>
      <div className="bg-gray-500 mb-2 rounded-2xl flex">
          {room.photos?.[0] && (
          
              <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:3000/roomphotos/'+room.photos?.[0]} />
              
          )}
     
      </div>
            
      <div>
      <h2 className="font-bold">{room.title}</h2>
      <h2><span className="text-sm text-gray-500">Location:</span> <span className="font-bold">{placeTitle}</span></h2>
      <h2><span className="text-sm text-gray-500">Room Type: </span> <span className="font-bold">{room.type}</span></h2>
      <h3><span className="text-sm text-gray-500">Room Number: </span> <span className="font-bold">{room.roomNumber}</span></h3>
      <h3><span className="text-sm text-gray-500">Maximum People: </span> <span className="font-bold">{room.maxPeople}</span></h3>
      <div className="mt-1">
      Price: UGX-<span className="font-bold">{room.roomPrice}</span> per sem
      </div>
            
      </div>
      
      </Link>
    ))}
  </div>
  );
}

export default RoomsDisplayPage;
