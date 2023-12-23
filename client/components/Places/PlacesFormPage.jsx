import React, { useEffect } from "react";
import { useState } from "react";
import PhotosUploader from "./PhotosUploader";
import axios from "axios";
import Perks from "../Perks/Perks";
import AccountNav from "../Layout/AccountNav";
import { Navigate, useParams } from "react-router-dom";
import AddRoomsDisplay from "../Rooms/AddRoomsDisplay";
import toast from "react-hot-toast";

function PlacesFormPage(){

    const {id} = useParams();

    const [title,setTitle] =useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [redirectToPlacesList,setRedirectToPlacesList] = useState(false);
    const [description, setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price,setPrice] = useState(500000);
    const [rooms,setRooms] = useState([]);
    const [redirect,setRedirect] = useState('');
    const [placeId, setPlaceId] = useState('');

    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response=>{
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
            setPlaceId(data._id);
        });
    }, [id]);


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

   async function savePlace(ev){
        ev.preventDefault();
        const placeData = {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        }
        if(id){
            //update
            await axios.put(`/places/${id}`,{
                id,
               ...placeData
              });
              toast.success('Place Edited Successfully',{
                duration: 5000,
                position: "bottom-center",
               }
               );
             setRedirect(true);
            }else{
                //new place
                await axios.post('/places',placeData);
                toast.success('Place Added Successfully',{
                    duration: 5000,
                    position: "bottom-center",
                   }
                   );
                 setRedirect(true);   
        }
}
        
      
    if(redirect){
        return <Navigate to={'/account/places'} />
    }

    return(
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
            {preInput('Title','Title for your place should not be too long')}
            <input type='text' placeholder="Title, for example my lovely apartment"
            value={title} onChange={ev => setTitle(ev.target.value)}
             />
            {preInput('Address','Address to this place')}
            <input type="text" placeholder="address" 
                value={address} onChange={ev => setAddress(ev.target.value)}
            />
            {preInput('Photos','More = Better')}
            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
            {preInput('Description','description of the place')}
            <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>
            {preInput('Perks','select all the perks of your place')}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6" >
            <Perks selected={perks} onChange={setPerks}/>
            </div>
            {preInput('Extra Info','house rules, etc')}
            <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
            {preInput('Check in & out times','add check in and out times, remember to add some time window for cleaning the room')}
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
            <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input type="text" placeholder="14:00"
                value={checkIn} onChange={ev => setCheckIn(ev.target.value)}
            />
            </div>
            <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input type="text" placeholder="11:00"
                value={checkOut} onChange={ev => setCheckOut(ev.target.value)}
            />

            </div>
             <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input type="number"
                value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)}
            />
            </div>
            
            <div>
            <h3 className="mt-2 -mb-1">Price per sem</h3>
            <input type="number"
                value={price} onChange={ev => setPrice(ev.target.value)}
            />
            </div>
            </div>
            <div className="mt-4 mb-4 justify-center flex gap-2">

            <AddRoomsDisplay placeId={placeId}/>

            </div>
            <div>
                <button onClick={savePlace} className="primary my-4">Save</button>
            </div>
            </form>
            </div>
    );
}

export default PlacesFormPage;