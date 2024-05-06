import { NavLink } from "react-router-dom"
import {useContext} from 'react'
import UserContext from "../context/UserContext"

function Navbar() {
    const {loggedIn, loggedOut} = useContext(UserContext)
    return (
        <div className="w-full h-[10vh] p-10 flex items-center justify-between bg-purple-900">
            <NavLink to='/'>
                <div className="w-48 p-3 border-2 border-white text-white font-bold mr-auto">MessageNode</div>
            </NavLink>
            <div className=" flex gap-5 justify-between">
                {!loggedIn &&
                 <>
                    <NavLink to='/signup'>
                        <div className="font-bold  text-white">Signup</div>
                    </NavLink>
                    <NavLink to='/login'>
                        <div className="font-bold  text-white">Login</div>
                    </NavLink> 
                </>
                }
                
                {loggedIn && 
                <> 
                    <NavLink to='/feed'>
                        <div className="font-bold text-amber-500">Feed</div>
                    </NavLink>
                    <NavLink to='' >
                        <button className="font-bold text-white" onClick={loggedOut}>Logout</button>
                    </NavLink>
                </>
                }   
            </div>
        </div>
    )
}

export default Navbar