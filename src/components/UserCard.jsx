import React from 'react'
import { capitalFirstLetter } from '../utils/constants'

const UserCard = ({user}) => {
  const {firstName,lastName,photoUrl,age,gender,about} = user;
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
      <div className="card-actions justify-end">
        <button className="btn bg-blue-500 border-0 px-4 py-2">Ignore</button>
        <button className="btn bg-pink-500 border-0 px-4 py-2">Interested</button>
      </div>
    </div>
  </div>
  )
}

export default UserCard