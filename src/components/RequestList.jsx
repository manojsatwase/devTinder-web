import React from 'react'

const RequestList = ({ request }) => {
    const { firstName, lastName, photoUrl, age, gender, about } = request?.fromUserId;
    return (
        <div className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
            <div>
                <img
                    alt="photo"
                    className="w-20 h-20 rounded-full"
                    src={photoUrl}
                />
            </div>
            <div className="text-left">
                <h2 className="font-bold text-xl">
                    {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + " " + gender}</p>}
                <p>{about}</p>
            </div>
            <div>
                <button className="btn btn-primary bg-purple-500 border-0 px-3 my-1 py-2 mx-2 font-bold">Reject</button>
                <button className="btn btn-secondary bg-pink-500 border-0 px-3 my-1 py-2 mx-2 font-bold">Accept</button>
            </div>
        </div>
    )
}

export default RequestList; 