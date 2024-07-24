import React from 'react'
import {  Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import {useState, useContext} from 'react'
import UserContext from '../context/UserContext'


function Signup() {
    const navigate = useNavigate()
    const {postReq} = useContext(UserContext)
    const [user, setUser] = useState({})

    const handleChange = (e) => {
        const {name, value} = e.target
        setUser({...user, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const result = await postReq('http://localhost:8080/auth/signup', user)
                alert(result.message)
                navigate('/login')
        }
        catch(err){
            console.log(err)
        }
        finally{
            setUser({})
        }
        
        // fetch('http://localhost:8080/auth/signup', {
        //     method: 'POST',
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify(user)
        // })
        // .then(res => {
        //     if (res.status === 422){
        //         throw new Error('Validation failed, check and ensure that user data is correct')
        //     }
        //     if(res.status !== 200 && res.status !== 201){
        //         return new Error('Something went wrong')
        //     }
        //     return res.json()
        // })
        // .then(result => {
        //     alert(result.message)
        //     navigate('/login')
        //     setUser({})

        // })
        // .catch(err => {
        //     console.log(err)
        // })   
    }
    return (
        <div className='w-full h-screen'>
            <Navbar />
            <div className='w-full h-[90vh] flex flex-col items-center justify-center gap-5'>
                <form className='w-1/2 h-3/4 border-2 border-purple-900 p-10 flex flex-col items-center gap-5' onSubmit={handleSubmit} noValidate>
                    <h3 className='text-2xl text-purple-900 mb-10'>Create Your Account</h3>
                    <div className='w-3/4 flex flex-col gap-2 text-lg'>
                        <label htmlFor='name'>Name</label>
                        <input id='name' type='text' name='name' className='w-full h-10 border-2 rounded-md border-purple-900 px-4 py-3' value={user.name || ''} onChange={handleChange}/>
                    </div>
                    <div className='w-3/4 flex flex-col gap-2 text-lg'>
                        <label htmlFor='email'>Email</label>
                        <input id='email' type='email' name='email' className='w-full h-10 border-2 rounded-md border-purple-900 px-4 py-3' value={user.email || ''} onChange={handleChange}/>
                    </div>
                    <div className='w-3/4 flex flex-col gap-2 text-lg'>
                        <label htmlFor='password'>Password</label>
                        <input id='password' type='password' name='password' className='w-full h-10 border-2 rounded-md border-purple-900 px-4 py-3' value={user.password || ''} onChange={handleChange}/>
                    </div>
                    <button type='submit' className='w-32 px-5 py-2 rounded-md border-2 border-purple-900 text-purple-900 text-lg mt-10'>Signup</button>
                </form>
                <div className='w-full flex items-end justify-center gap-2'>
                    <p className='text-lg'>Already have an account</p>
                    <Link to='/login' className='text-xl font-bold text-purple-900'>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup
