import {createContext, useState} from 'react'

const UserContext = createContext({})

export const UserContextProvider = ({children}) => { 
    const [creator, setCreator] = useState({id: '', name: ''})
    const [loggedIn, setLoggedIn] = useState(false)
    const token = localStorage.getItem('token')
 
    const clientRequest = (url, type, header, data) => {
        let fetchOptions = {
            method: type,
            mode: 'cors',
        }
        if (data) {
            fetchOptions.body = data
        }
        if (header) {
            fetchOptions.headers = header
            if (token) {
                fetchOptions = {
                    ...fetchOptions,
                    headers: {
                        ...fetchOptions.headers,
                        'Authorization': `Bearer ${token}`
                    }
                }
            }
        }
        return fetch(url, fetchOptions)
        .then(res => {
            if(res.status === 401){
                throw new Error('Not Authenticated')
                logOut()
            }
            if(!res.ok){
                console.log('resStatus: ' + res.status)
                throw new Error('Request failed ')
            }
            return res.json()
        })
        .then(result => {
            return result
        })
        .catch(err => {console.log(err)})
    }

    const getReq = (url) => {
        return clientRequest(url, "GET", {
            'Content-Type': 'application/json',
        })
    }

    const putReq = (url, data, type) => {
        let headers = {'Content-Type': 'application/json'}
        let body = JSON.stringify(data)
        if (type === 'formData' ) {
            headers = {'Authorization': `Bearer ${token}`}
            body = data
        }
        return clientRequest(url, "PUT", headers, body)
    }

    const deleteReq = (url) => {
        return clientRequest(url, "DELETE", {
            'Content-Type': 'application/json',
        })
    }

    const postReq = (url, data, type) => {
        let headers = {'Content-Type': 'application/json'}
        let body = JSON.stringify(data)
        if (type === 'formData') {
            headers = { 'Authorization': `Bearer ${token}`}
            body = data
        }
        return clientRequest(url, "POST", headers, body)
    }
    
    const logOut = () => {
        localStorage.removeItem('token')
        setLoggedIn(false)
    }

    return(
        <UserContext.Provider value={{ setCreator, creator, getReq, putReq, deleteReq, postReq, logOut, loggedIn, setLoggedIn}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext