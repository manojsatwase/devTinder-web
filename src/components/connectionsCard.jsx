import { capitalFirstLetter } from "../utils/constants";

const connectionsCard = ({ connection }) => {
    const { _id,firstName, lastName, photoUrl, age, gender, about ,skills} = connection;
    return (
        <div  className="m-4 p-4 text-left rounded-lg w-75 bg-base-300">
            <img
                alt="photo"
                src={photoUrl}
                className="w-20 h-20 rounded-full"
            />
            <h2 className="mt-2">{`${capitalFirstLetter(firstName)} ${capitalFirstLetter(lastName)}`}</h2>
            <div className="flex justify-between">
              <p className="my-1">Age : {age}</p>
              <p>Gender : {capitalFirstLetter(gender)}</p>
            </div>
            <h2 className="text-pink-500">Skills:</h2>
            <ul className="flex flex-wrap">
            {skills.map(skill=>(
               <li className="mx-1" key={skill}>• {skill}</li>
            ))}
            </ul>
            <h2 className="mt-2 text-cyan-500">About :</h2>
            <p>{about}</p>
        </div>
    )
}

export default connectionsCard