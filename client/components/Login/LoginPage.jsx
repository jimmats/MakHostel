import React,{useContext, useState} from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import {UserContext} from "../../UserContext";
import toast from "react-hot-toast";

function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [redirect, setRedirect] = useState(false);

    const {setUser} = useContext(UserContext);
    


    
    async function handleLogin(ev){
        ev.preventDefault();
        
        try {
            const {data} = await axios.post('/login', {email,password});
            setUser(data);
            // alert('Login Successful');
            toast.loading('Loging in...',{
                duration: 1000,
                position: "top-center",
               }
               );
            toast.success('Login Successful',{
            duration: 4000,
            position: "top-center",
           }
           );
            setRedirect(true);
          } catch (error) {
            console.error('Login failed:', error);
            toast.loading('Loging in...',{
                duration: 1000,
                position: "top-center",
               }
               );
            toast.error('Login Failed',{
                duration: 4000,
                position: "top-center",
               });
          }
          
}

if(redirect) {
    return <Navigate to={'/'} />
}

return (
    <div className="mt-4 grow flex items-center justify-around">
    <div className="mb-64">
    <h1 className="text-4xl text-center mb-4">Login</h1>
    <form className="max-w-md mx-auto" onSubmit={handleLogin}>
        <input type="email" placeholder="your@email.com"
            value={email} onChange={ev => setEmail(ev.target.value)}
        />
        <input type="password" placeholder="password"
            value={password} onChange={ev =>setPassword(ev.target.value)}
        />
        <button className="primary">Login</button>
        <div className="text-center py-2 text-gray-500">
        Don't have an account yet?
         <Link to={'/register'} className="underline text-black">Register now</Link>
        </div>
    </form>
    </div>
    </div>
);
}

export default Login;