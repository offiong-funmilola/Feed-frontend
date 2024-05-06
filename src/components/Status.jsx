import React from 'react'
import { useEffect } from 'react'
import {useContext, useState} from 'react'
import UserContext from '../context/UserContext'

function Status() {
    const {putReq, getReq} = useContext(UserContext)
    const [status, setStatus] = useState()
    const [value, setValue] = useState()
    
    useEffect(() => {
        retriveStatus()
    }, [])

    const retriveStatus = async() => {
        const response = await getReq('http://localhost:8080/auth/status')
        setStatus(response.status)
    }

    const handleStatus = async(e) => {
        e.preventDefault()
        const response = await putReq('http://localhost:8080/auth/status', value)
        alert(response.message)
    }
  return (
    <div className='w-full flex item-center justify-center p-5 h-20'>
        <form className='w-1/2 flex gap-5' onSubmit={handleStatus} > 
            <input type='text' name='status' value={status || ''} onChange={(e) => {setValue(e.target.value)}} className='w-[60%] px-3 py-6 rounded-md text-lg border border-purple-900'/>
            <button type='submit' className='w-32 px-3 py-6 text-purple-900 bg-white border border-purple-900 rounded-md flex items-center justify-center'>Update</button>
        </form> 
    </div>
  )
}

export default Status
