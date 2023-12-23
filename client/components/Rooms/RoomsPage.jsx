import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../Layout/AccountNav";
import { Link } from "react-router-dom";
import RoomImg from "../Rooms/RoomImg";
import toast from "react-hot-toast";

function RoomsPage({placeId}) {
    const [rooms, setRooms] = useState([]);
    const [placeTitle, setPlaceTitle] = useState([]);

    useEffect(()=>{
      axios.get('/user-rooms').then(({data}) => {
      setRooms(data);
      });
  }, []);

    useEffect(() => {
        if (placeId) {
          axios.get(`/places/${placeId}`).then(placeResponse => {
            const placeData = placeResponse.data;
            setPlaceTitle(placeData.title);
          });
        }
      }, [placeId]);

    
    function removeRoom(ev,roomId){
        ev.preventDefault();
        const updatedRooms = rooms.filter(room => room._id !== roomId);

        // Update the state with the new list of places
        setRooms(updatedRooms);
      
        axios.delete(`/rooms/${roomId}`)
          .then(response => {
            console.log('Room deleted successfully');
            toast.success('Room deleted successfully',{
              duration: 5000,
              position: "bottom-center",
             }
             );
          })
          .catch(error => {
            console.error('Error deleting room:', error);
            toast.error('Error deleting room,try again',{
              duration: 5000,
              position: "bottom-center",
             }
             );
          });
    }
           

    return (
        <div>
            <AccountNav />
            <h1>Total number of Rooms is {rooms.length}</h1>

            <div>
            {rooms?.length > 0 && rooms.map(room =>(
            
                <Link to={`/account/rooms/${room._id}`}  key={room._id} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                <RoomImg room={room} /> 
                </div>
               <div className="py-3 pr-3 grow">
        
               <h2 className="text-xl">{room.title}</h2>
                
               <span className="text-2xl">
                | Location: {placeTitle}
                </span>

               <span className="text-2xl">
                | Room Type: {room.type}
                </span>

                <span className="text-2xl">
                | Room price: UGX-{room.roomPrice}
                </span>

                <span className="text-2xl">
                | Room Number: {room.roomNumber}
                </span>
                
                <div className="h-10 flex relative">
                <button onClick={ev=>removeRoom(ev,room._id)} className="cursor-pointer absolute bottom-1 right-1 rounded-2xl text-white bg-opacity-50 bg-black py-2 px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
                    </button>
                </div>

               </div>
                </Link>
            ))}
            </div>
        </div>
    );
}

export default RoomsPage;
