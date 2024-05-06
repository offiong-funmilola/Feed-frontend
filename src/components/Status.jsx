import React from 'react'
import { useEffect } from 'react'
import {useContext, useState} from 'react'
import UserContext from '../context/UserContext'

function Status() {
    const {putReq, getReq} = useContext(UserContext)
    const [status, setStatus] = useState()
    const [value, setValue] = useState({status: ''})
    const [update, setUpdate] = useState(false)
    
    useEffect(() => {
        retriveStatus()
    }, [])

    const retriveStatus = async() => {
        const response = await getReq('http://localhost:8080/auth/status')
        console.log(response.status)
        setStatus(response.status)
    }

    const handleStatus = async(e) => {
        e.preventDefault()
       // console.log(value)
        const response = await putReq('http://localhost:8080/auth/status', value)
        alert(response.message)
        setStatus(response.status)
        setUpdate(false)
    }

  return (
    <div className='w-full flex item-center justify-center p-5 h-20'>
        {!update && 
            <>
                <div className='w-1/2 flex gap-5' onSubmit={handleStatus} > 
                    <div type='text' className='w-[60%] px-3 py-6 rounded-md text-lg border border-purple-900 flex items-center'>{status}</div>
                    <button type='button' className='w-32 px-3 py-6 text-purple-900 bg-white border border-purple-900 rounded-md flex items-center justify-center' onClick={(e) => {setUpdate(true)}}>Update</button>
                </div> 
            </>
        }
        {update && 
            <>
                <form className='w-1/2 flex gap-5' onSubmit={handleStatus} > 
                    <input type='text' name='status' value={value.status} onChange={(e) => {setValue({...value, status: e.target.value})}} className='w-[60%] px-3 py-6 rounded-md text-lg border border-purple-900' placeholder={status || 'Your Status'}/>
                    <button type='submit' className='w-32 px-3 py-6 text-purple-900 bg-white border border-purple-900 rounded-md flex items-center justify-center'>Update</button>
                </form> 
            </>
        }
        
    </div>
  )
}

export default Status
