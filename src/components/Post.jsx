import {useState, useEffect, useContext} from 'react'
import { Link, useSearchParams,} from 'react-router-dom'
import UserContext from '../context/UserContext'
import FormModal from './FormModal'
import Status from './Status'
import openSocket from 'socket.io-client'


function Post() {
    const { creator, getReq, deleteReq} = useContext(UserContext)
    const [posts, setPosts] = useState([])
    const [editId, setEditId] = useState(null)
    const [editPost, setEditPost] = useState({})
    const [postModal, setPostModal] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams() //search params returns the query object
    const [totalItem, setTotalItem] = useState(null)
    const currentPage = Number(searchParams.get("page") || 1) // seting the initial value
    const perPage = Number(searchParams.get("perPage") || 2)// this applies when passing the perpage to url in the case where we cant it to be dynamic, hence the backend recovers it from the query
    const lastPage = Math.ceil(totalItem / perPage)
    
    useEffect(() => {
        console.log('from useeffect')
        fetchData()
        const socket = openSocket.connect('http://localhost:8080')
        socket.on('posts', data => {
            if (data.action === 'create'){
                addPost(data.post)
            }
            if (data.action === 'update'){
                updatePost(data.post)
            }
            if(data.action === 'delete'){
                fetchData()
            }
        })
    }, [currentPage])

    const fetchData = async () => {
        try{
            //Am using the search params here for pagination. 
            const data = await getReq(`http://localhost:8080/feed/posts?${searchParams}`)
            setPosts(data.posts)
            setTotalItem(data.totalItems)
        }
        catch(err){
            console.log(err)
        }
        // const url = `http://localhost:8080/feed/posts?${searchParams}`
        // fetch(url, {
        //     headers: {'Authorization': 'Bearer ' + token}
        // })
        // .then(res => {
        //     if(res.status !== 200){
        //         throw new Error('Failed to fetch posts')
        //     }
        //     return res.json()
        // })
        // .then(resData => {
        //     setPosts(resData.posts)
        //     setTotalItem(resData.totalItems)
        // })
        // .catch(err => {console.log(err)})
    }

    const addPost = (post) => {
        let updatedPosts = [...posts]
        updatedPosts = updatedPosts.unshift(post)
        setPosts(updatedPosts)
    }

    const updatePost = (post) => {
        let updatedPosts = [...posts]
        let postIndex = updatedPosts.findIndex((p) => {p.id === post._id})
        if (postIndex > -1){
            // recall that index can be zero
            updatedPosts[postIndex] = post
        }
        setPosts(updatedPosts )   
    }

    const handleEdit = async (postId) => {
        setEditId(postId)
        try{
            const res = await getReq(`http://localhost:8080/feed/post/${postId}`)
            setEditPost(res.post)
            setPostModal(true)
        }
        catch(err){
            console.log(err)
        }
        
        // fetch(`http://localhost:8080/feed/post/${postId}`, {
        //     headers: {'Authorization': 'Bearer ' + token}
        // })
        // .then(res => res.json())
        // .then(resData => {
        //     setEditPost(resData.post)
        //     setPostModal(true)
        // })
        // .catch(err => {
        //     console.log(err)
        // })
    }
    
    const handleDelete = async (postId) => {
        try{
            const res = await deleteReq(`http://localhost:8080/feed/post/${postId}`)
            if(res.message === 'Delete successful'){
                setSearchParams({ page: currentPage })
                fetchData()
            }  
        }
        catch(err){
            console.log(err)
        }
        // fetch(`http://localhost:8080/feed/post/${postId}`, {
        //     method: 'DELETE',
        //     headers: {'Authorization': 'Bearer ' + token}
        // })
        // .then(res => {
        //     if(res.status !== 200){
        //         throw new Error('Delete post not successful')
        //     }
        //     // setPosts(posts.filter(post => post._id !== postId))
        //     setSearchParams({ page: currentPage })
        //     return res.json()
        // })
        // .then(result => {
        //     fetchData()
        //     alert(result.message)
        // })
        // .catch(err => console.log(err))
    }
    
    const handleNext = () => {
        setSearchParams({ page: currentPage + 1 });
        
    }

    const handlePrev = () => {
        setSearchParams({ page: currentPage - 1 });
        
    }
    console.log(posts)
    return (
        <div className='w-full h-[90vh] flex flex-col items-center justify-center'>
            <Status />
            <div className='w-3/4 h-3/4 flex flex-col items-center gap-3'>
                <button onClick={() => setPostModal(true)} className='w-48 p-3 bg-purple-900 text-white border border-white'>Create Post</button>
                {posts && posts.map((post) => {
                    return (
                        <section key={post._id} className='w-3/4 bg-inherit border border-purple-900 p-5 flex flex-col gap-3'>
                            <h1>{post.title}</h1>
                            <h2>Created by {creator.name} on {post.createdAt}</h2>
                            <p>{post.content}</p>
                            <div className='w-full h-10 flex justify-end items-center p-5 gap-4'>
                                <Link to={`/post/${post._id}`} className='w-32 p-2 bg-white border border-purple-900 text-xl flex items-center justify-center'>View</Link>
                                <button onClick={() => handleEdit(post._id)} className='w-32 p-2 bg-white border border-purple-900 text-xl flex items-center justify-center'>Edit</button>
                                <button onClick={() => handleDelete(post._id)} className='w-32 p-2 bg-white border border-purple-900 text-xl flex items-center justify-center'>Delete</button>
                            </div>
                        </section>
                    )
                })} 
                <div className='flex gap-5'>
                    {currentPage > 1 &&
                        <button onClick={handlePrev} className='w-28 border border-purple-900 text-purple900 text-lg'>Prev</button>
                    }
                    {currentPage !== lastPage &&
                        <button onClick={handleNext} className='w-28 border border-purple-900 text-purple900 text-lg'>Next</button>
                    }
                </div>
            </div>
            {postModal && 
                <FormModal 
                    postData={editPost}
                    editId={editId}
                    postModal={postModal}
                    setPostModal={setPostModal}
                    setEditId={setEditId}
                    setEditPost={setEditPost}
                    fetchData={fetchData}
                />
            }
        </div>
    )
}

export default Post

