import React from 'react'
import Navbar from './Navbar'
import {Link, useNavigate} from 'react-router-dom'
import { useState, useContext} from 'react'
import UserContext from '../context/UserContext'

const defaultData = {email: "", password: ""}

function Login() {
    const navigate = useNavigate()
    const {postReq, setLoggedIn} = useContext(UserContext)
    const [user, setUser] = useState(defaultData)
    
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setUser(prev => ({...prev, [name]: value}))
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        try{
            let data = await postReq('http://localhost:8080/auth/login', user)
            console.log(postReq('http://localhost:8080/auth/login', user))
            localStorage.setItem('token', data.token)
            localStorage.setItem('userId', data.userId)
            alert(data.message)
            setLoggedIn(true)
            navigate('/feed')
        }
        catch(err){
            console.log(err)
        }
        finally{
            setUser(defaultData)
        }
       
       // fetch('http://localhost:8080/auth/login', {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": 'application/json'
        //     },
        //     body: JSON.stringify(user)
        // })
        // .then(res => {
        //     if(res.status === 401){
        //         throw new Error('User not found')
        //     }
        //     if(res.status !== 200){
        //         throw new Error('Invalid user details')
        //     }
        //     return res.json()
        // })
        // .then(data => {
        //     localStorage.setItem('token', data.token)
        //     localStorage.setItem('userId', data.userId)
        //     alert(data.message)
        //     setUser(defaultData)
        //     navigate('/feed')
        // })
        // .catch(err => console.log(err))
    }
  return (
    <div className='w-full h-screen'>
        <Navbar/>
        <div className='w-full h-[90vh] flex flex-col items-center justify-center gap-5'>
            <form className='w-1/2 h-1/2 border-2 border-purple-900 p-10 flex flex-col items-center gap-5' onSubmit={handleLoginSubmit}>
                <h3 className='text-2xl text-purple-900 mb-10'>Welcome Back </h3>
                <div className='w-3/4 flex flex-col gap-2 text-lg'>
                    <label htmlFor='email'>Email</label>
                    <input id='email' type='email' name='email' className='w-full h-10 border-2 rounded-md border-purple-900 px-4 py-3' value={user.email} onChange={handleInputChange}/>
                </div>
                <div className='w-3/4 flex flex-col gap-2 text-lg'>
                    <label htmlFor='password'>Password</label>
                    <input id='password' type='password' name='password' className='w-full h-10 border-2 rounded-md border-purple-900 px-4 py-3' value={user.password} onChange={handleInputChange}/>
                </div>
                <button type='submit' className='w-32 px-5 py-2 rounded-md border-2 border-purple-900 text-purple-900 text-lg'>Login</button>
            </form>
            <div className='w-full flex items-end justify-center gap-2'>
                <p className='text-lg'>Don't have an account</p>
                <Link to='/signup' className='text-xl font-bold text-purple-900'>Signup</Link>
            </div>
        </div>
    </div>
  )
}

export default Login
