import React from 'react'
import { BASE_URL, capitalFirstLetter } from '../utils/constants'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
  const {firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, {
        withCredentials: true
      });
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err.response.data);
    }
  }

  return (
    <div className="card bg-base-300 w-86 shadow-sm">
      <figure>
        <img
          className='w-70 h-60 object-fill'
          src={photoUrl}
          alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${capitalFirstLetter(firstName)} ${capitalFirstLetter(lastName)}`}</h2>
        <div className='flex'>
          {age && (<p>{`Age : ${age}`}</p>)}
          {gender && (<p>{`Gender : ${capitalFirstLetter(gender)}`}</p>)}
        </div>
        <p>{about}</p>
        {
          user?._id && (
            <div className="card-actions justify-end">
              <button
                className="btn bg-blue-500 border-0 px-4 py-2"
                onClick={() => handleSendRequest("ignored", user?._id)}
              >Ignored</button>
              <button className="btn bg-pink-500 border-0 px-4 py-2"
                onClick={() => handleSendRequest("interested", user?._id)}
              >Interested</button>
            </div>
          )
        }

      </div>
    </div>
  )
}

export default UserCard