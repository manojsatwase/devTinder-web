import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { BASE_URL, capitalFirstLetter } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "/logout", {}, {
                withCredentials: true
            })
            // clear user from redux store
            dispatch(removeUser());
            return navigator("/login");
        } catch (err) {
            // Error logic maybe redirect to error page 
            console.err(err.message)
        }
    }

    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="text-xl">DevTinder</Link>
            </div>
            {user && (
                <div className="flex gap-2">
                    {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}

                    <div className='p-2'>Welcome ,{capitalFirstLetter(user?.firstName)}</div>
                    <div className="dropdown dropdown-end mx-5 flex">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt={user?.firstName}
                                    src={user?.photoUrl} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                    <span className="badge">Edit</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/connections" className="justify-between">
                                    Connections
                                </Link>
                            </li>
                            <li>
                                <Link to="/requests" className="justify-between">
                                    Requests
                                </Link>
                            </li>
                            <li onClick={handleLogout}><a>Logout</a></li>
                        </ul>
                    </div>

                </div>
            )}
        </div>
    )
}

export default NavBar;