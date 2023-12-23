import React from "react";

import { useEffect, useState } from "react";

function PlaceRoom(){

const [rooms,setRooms] = useState([]);

useEffect(async()=>{
    try{
        const data = await axios.get('/places/:id/rooms').data;
    }catch (error){
        console.log(error);
    }
}, []);

return (
    <div>
        <h1>Rooms</h1>
    </div>
);
  

    

}

export default PlaceRoom;