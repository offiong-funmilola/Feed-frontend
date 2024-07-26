import React from 'react'
import {useState, useContext} from 'react'
import UserContext from '../context/UserContext'

function FormModal({
    postModal, setPostModal, postData, editId, fetchData,
    setEditId, setEditPost
}) {
    const [values, setValues] = useState(postData)
    const {setCreator, postReq, putReq} = useContext(UserContext)
   
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setValues(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const imageInput = document.getElementById('image')
        const formData = new FormData()
        formData.append('title', values.title)
        formData.append('content', values.content)
        formData.append('image', imageInput.files[0])
        try{
            if(editId){
                const data = await putReq(`http://localhost:8080/feed/post/${editId}`, formData, 'formData')
                alert(data.message)
                setEditId(null)
                setEditPost({})
            }
            else{
                const data = await postReq('http://localhost:8080/feed/post', formData, 'formData')
                setCreator(prev => ({...prev, ...data.creator}))
                alert(data.message)
            }
            fetchData()   
        }
        catch(err){
            console.log(err)
        }
        finally{
            setPostModal(false) 
        }
        // const error = validate(values)
        // console.log('validation result' + error)
        // if(Object.keys(error).length > 0){
        //     throw new Error('you have error from form validation')
        // }
        // let url = 'http://localhost:8080/feed/post'
        // if(editId){
        //     method = 'PUT'
        //     url = `http://localhost:8080/feed/post/${editId}`
        //     fetch(url, {
        //         method: method,
        //         body: formData,
        //         headers: {'Authorization': 'Bearer ' + token}   
        //     })
        //     .then(res => {
        //         if(res.status !== 200 && res.status !== 201) {
        //             throw new Error('Oop! something went wrong. try again')
        //         }
        //         return res.json()
        //     })
        //     .then(data => {
        //         setPosts(prev => prev.map(item => {
        //             if (item._id === editId) {
        //                 item = {...item, ...data.post}
        //             }
        //             return item
        //         }))
        //     })
        //     .catch(err => console.log(err))
        //     setPostModal(false)
        //     setEditId(null)
        //     setEditPost({})
        // }
        // else {
        //     fetch(url, {
        //         method: method,
        //         body: formData,
        //         headers: {'Authorization': 'Bearer ' + token}   
        //     })
        //     .then(res => {
        //         if(res.status !== 200 && res.status !== 201) {
        //             throw new Error('Oop! something went wrong. try again')
        //         }
        //         return res.json()
        //     })
        //     .then(data => {
        //         setCreator(prev => ({...prev, ...data.creator}))
        //         fetchData()
        //         alert(data.message)
        //     })
        //     .catch(err => console.log(err))
        //     setPostModal(false)    
        // }    
    }

    return (
        <div className={`modal ${postModal ? 'modal-open' : ''}`}>
            <div className="modal-box w-full">
                <form method='POST' onSubmit={handleSubmit} className='w-full h-full p-5 bg-purple-300 flex flex-col gap-3 items-center justify-center' noValidate>
                    <h4 className='text-center text-2xl'>Create a new Post</h4>
                    <div className='w-full h-15 flex flex-col gap-2 text-xl'>
                        <label htmlFor='title' className=''>Title</label>
                        <input id='title' type='text' name='title' className='px-4 py-3 rounded-sm' value={values.title} onChange={handleChange}/>
                    </div>
                    <div className='w-full h-15 flex flex-col gap-2 text-xl'>
                        <label htmlFor='image'>Choose an Image</label>
                        <input id='image' type='file' name='image' className='px-4 py-3 rounded-sm' value={values.imagePath || values.image} onChange={handleChange}/>
                        <div className='w-40 h-40'>
                            {values.image && <img src={`http://localhost:8080/${values.imagePath||values.image}/`} alt={values.title} className='w-full h-full'/>} 
                        </div> 
                    </div>
                    <div className='w-full flex flex-col gap-2 text-xl'>
                        <label htmlFor='content'>Content</label>
                        <textarea id='content' name='content' rows={8} cols={70} className='px-4 py-3 rounded-sm' value={values.content} onChange={handleChange}></textarea>
                    </div>
                    <button type='submit' className='w-48 text-xl border-2 border-white p-3'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default FormModal