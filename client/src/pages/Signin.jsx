import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleUserSignIn(e){
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/user/signin" , {
                method: "POST",
                credentials : "include",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({email,password})
            })
            const data = await response.json()

            if(!response.ok){
                alert(data.msg || "Signin failed")
                return
            }
            localStorage.setItem('isLoggedIn', 'true')
            alert("Signin Successfull")
            navigate("/")
        } catch (err) {
            alert(err)
        }
    }

    useEffect(()=>{
        const isLoggedIn = localStorage.getItem('isLoggedIn')
        if(isLoggedIn){
            navigate("/")
        }
    },[])

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
            <form className='flex flex-col gap-4' onSubmit={handleUserSignIn}>
                <input
                    type='email'
                    value={email}
                    placeholder='Email'
                    id='email'
                    className='border p-3 rounded-lg'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    value={password}
                    placeholder='Password'
                    id='password'
                    className='border p-3 rounded-lg'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='bg-accent text-white p-3 rounded-lg uppercase hover:opacity-90 cursor-pointer' type='submit'>
                    Sign in
                </button>
            </form>
        </div>
    );
}
