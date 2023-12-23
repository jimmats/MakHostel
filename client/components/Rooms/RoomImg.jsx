import React from "react";


function RoomImg({room,index=0,className=null}){
   
       if(!room.photos?.length){ 
           return '';
       }
       if (!className){
           className = 'object-cover';
       }
       return (    
               <img className={className} src={'http://localhost:3000/roomphotos/'+room.photos[index]} alt=""/>
       );
}

export default RoomImg;