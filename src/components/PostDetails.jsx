import React from 'react'
import {useState, useEffect, useContext} from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import UserContext from '../context/UserContext'


function PostDetails() {
    const [post, setPost] = useState(null)
    const {creator, getReq} = useContext(UserContext)
    const { postId } = useParams()

    useEffect(()=> {
        fetchPost()
    },[])

    const fetchPost = async () => {
        const data = await getReq(`http://localhost:8080/feed/post/${postId}`)
        setPost(data.post)
        // fetch(`http://localhost:8080/feed/post/${postId}`)
        // .then(res => res.json())
        // .then(resData => setPost(resData.post))
        // .catch(err => {
        //     console.log(err)
        // })
    }
   
  return (
    <>
        <Navbar />
        {post &&
            <div className='w-full h-[80vh] flex flex-col items-center justify-center p-10 gap-5'>
                <h2>{post.title}</h2>
                <h5>{creator.name}</h5>
                <hr className='w-1/2 h-2 text-black'/>
                <div className='w-60 h-60'>
                    <img src={`http://localhost:8080/${post.imageUrl}`} alt='Post image' className='w-full h-full'/>
                </div>
            </div>
        }
    </>
  )
}

export default PostDetails
