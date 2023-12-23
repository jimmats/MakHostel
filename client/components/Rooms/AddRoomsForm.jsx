import React, { useEffect, useState } from "react";
import RoomPhotosUploader from "../Rooms/RoomPhotosUploader";
import Perks from "../Perks/Perks";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


function AddRoomsForm({ placeId , onCloseModal}){

  const {id} = useParams();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [roomDescription, setRoomDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [maxPeople, setMaxPeople] = useState(1);
  const [roomPrice, setRoomPrice] = useState(0);
  const [roomNumber, setRoomNumber] = useState("");
  const [redirect, setRedirect] = useState(0);
  const [place, setPlace] = useState('');
  const [placeTitle, setPlaceTitle] = useState('');
  

  useEffect(()=>{
    if(!id){
        return;
    }
    axios.get('/rooms/'+id).then(response=>{
        const {data} = response;
        setTitle(data.title);
        setAddedPhotos(data.photos);
        setRoomDescription(data.roomDescription);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setRoomPrice(data.roomPrice);
        setRoomNumber(data.roomNumber);
        setMaxPeople(data.maxPeople);
        setType(data.type);
        setPlace(data.place);

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


  function inputHeader(text){
    return(
    <h2 className="text-xl mt-4">{text}</h2>
    );
}

function inputDescription(text){
    return(
<p className="text-gray-500 text-sm">{text}</p>
    );
}

function preInput(header, description) {
    return(
        <>
            {inputHeader(header)}
            {inputDescription(description)}
        </>
    );
}


async function saveRoom(ev) {
  ev.preventDefault();
  const roomData = {
    title,
    addedPhotos,
    roomDescription,
    perks,
    extraInfo,
    type,
    maxPeople,
    roomPrice,
    roomNumber,
    place: placeId,
  };
    await axios.post('/rooms', roomData);
    toast.success('Room Saved Successfully',{
      duration: 5000,
      position: "bottom-center",
     }
     );
     onCloseModal();
  }



if(redirect){
  return <Navigate to={'/places/id'} />
}
    

    return(
      <div>
      <form onSubmit={saveRoom}>
      {preInput('Hostel','Hostel to which room belongs to')}
      <input type='text' placeholder="Hostel"
      value={placeTitle} onChange={ev => setPlace(ev.target.value)} readOnly={true}
       />
      {preInput('Title','Title for your room')}
      <input type='text' placeholder="Room Title"
      value={title} onChange={ev => setTitle(ev.target.value)}
       />
      {preInput('Photos','More = Better')}
      <RoomPhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
      {preInput('Description','description of the room')}
      <textarea value={roomDescription} onChange={ev => setRoomDescription(ev.target.value)}/>
      {preInput('Perks','select all the perks of the room')}
      <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6" >
      <Perks selected={perks} onChange={setPerks}/>
      </div>
      {preInput('Extra Info','house rules, etc')}
      <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
  
      <div className="grid gap-2 grid-cols-2 md:grid-cols-4">

      <div>
  <h3 className="mt-2 -mb-1">Room type</h3>
  <select
    value={type}
    onChange={(ev) => setType(ev.target.value)}
  className="my-4 border border-black rounded-2xl">
    <option value="">--Room Type--</option>
    <option value="single">Single Room</option>
    <option value="double">Double Room</option>
    <option value="triple">Triple Room</option>
    <option value="quad">Quad Room</option>
  </select>
</div>


      <div>
      <h3 className="mt-2 -mb-1">Room Number</h3>
      <input type="text"
          value={roomNumber} onChange={ev => setRoomNumber(ev.target.value)}
      />
      </div>

       <div>
      <h3 className="mt-2 -mb-1">Max number of people</h3>
      <input type="number"
          value={maxPeople} onChange={ev => setMaxPeople(ev.target.value)}
      />
      </div>
      
      <div>
      <h3 className="mt-2 -mb-1">Price per sem</h3>
      <input type="number"
          value={roomPrice} onChange={ev => setRoomPrice(ev.target.value)}
      />
      </div>
      </div>
      <div className="mt-4 mb-4 justify-center flex gap-2">

      {/* <AddRoomsDisplay /> */}
      </div>
      <div className="flex justify-center">
          <button className="bg-primary p-2  text-white rounded-2xl flex" onClick={saveRoom}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
            Save Room
          </button> 
      </div>
      </form>
      </div>
    );

}

export default AddRoomsForm;