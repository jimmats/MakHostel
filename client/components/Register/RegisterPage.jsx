import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";


function Register(){

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

   async function registerUser(ev){
        ev.preventDefault();
        try{
     await  axios.post('/register',{
            name,
            email,
            password,
        });
        // alert('Registration successful, now you can log in');
        toast.success('Registration successful, now you can log in',{
            duration: 5000,
           }
           );

    } catch(e){
        // alert('Registration failed, please try again later');
        toast.error('Registration failed, please try again!',{
            duration: 5000,
           }
           );
    }
}

return (
    <div className="mt-4 grow flex items-center justify-around">
    <div className="mb-64">
    <h1 className="text-4xl text-center mb-4">Register</h1>
    <form className="max-w-md mx-auto" onSubmit={registerUser}>
        <input type="text" placeholder="Your name" 
        value={name} onChange={ev => setName(ev.target.value)}
        />
        <input type="email" placeholder="your@email.com"
        value={email} onChange={ev => setEmail(ev.target.value)}
        />
        <input type="password" placeholder="password"
        value={password} onChange={ev => setPassword(ev.target.value)}
        />
        <input type="password" placeholder="confirm password"
        value={password} onChange={ev => setPassword(ev.target.value)}
        />
        <button className="primary">Register</button>
        <div className="text-center py-2 text-gray-500">
        Already have an account?
         <Link to={'/login'} className="underline text-black">Login</Link>
        </div>
    </form>
    </div>
    </div>
);
}

export default Register;