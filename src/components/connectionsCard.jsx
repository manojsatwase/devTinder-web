import { Link } from "react-router-dom";
import { capitalFirstLetter } from "../utils/constants";

const connectionsCard = ({ connection }) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;
    return (
        <div
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto justify-between"
          >
            <div className="flex flex-wrap">
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
             <div className="text-left mx-10">
              <h2 className="font-bold text-xl">
                {capitalFirstLetter(firstName) + " " + capitalFirstLetter(lastName)}
              </h2>
              {age && gender && <p>{age + ", " + capitalFirstLetter(gender)}</p>}
              <p>{about}</p>
            </div>
            </div>
            <Link to={"/chat/" + _id}>
              <button className="btn btn-primary bg-pink-500 border-0 px-4 py-2 mt-5">Chat</button>
            </Link>
          </div>
    )
}

export default connectionsCard