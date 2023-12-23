import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { Navigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import PlacesPage from "../Places/PlacesPage";
import AccountNav from "../Layout/AccountNav";
import toast from "react-hot-toast";


function  ProfilePage(){

    const [redirect,setRedirect] = useState(null);

    const {ready,user,setUser} = useContext(UserContext);

    let {subpage} = useParams();

    if(subpage === undefined){
        subpage = 'profile';
    }

   async function logout(){
       await axios.post('/logout');
       toast.success('You have been logged out',{
        duration: 5000,
       }
       );
        setRedirect('/');
       setUser(null);
    }

    if(!ready){
       return (
        toast.loading('Loading',{
            duration: 3000,
           }
           )
       );
        
    }

    if(ready && !user && !redirect){
        return <Navigate to={'/login'} />
    }

   
   

    if (redirect) {
        return <Navigate to={redirect} />
      }

    return (
        <div>
          <AccountNav/>
          <div className="text-center gap-6 mb-12">
          <div>
          Name:{user.name}
          </div><br />
          <div>
          Email:{user.email}<br />
          </div>
          <div className="flex items-center ml-80">
          Password:<input type="password" placeholder="......" readOnly/>
          </div>
          </div>
          {subpage === 'profile' && (
            <div className="text-center max-w-lg mx-auto">
            Logged in as {user.name} ({user.email})<br />
            <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
        )}
        {subpage === 'places' &&(
            <div>
            <PlacesPage />
            </div>
        )}
        </div>
    );

}

export default ProfilePage;