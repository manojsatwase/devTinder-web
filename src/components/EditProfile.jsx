import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import AlertMessage from "../AlertMessage";
import TostMessage from "../TostMessage";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
    const [age, setAge] = useState(user?.age);
    const [gender, setGender] = useState(user?.gender);
    const [about, setAbout] = useState(user?.about);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [showTost,setShowTost] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        // Only trigger timeout when success message is set
        if (success) {
            const timer = setTimeout(() => {
                setSuccess("");
                setShowTost(false);
            }, 3500); // Clear success message after 3500ms
            return () => clearTimeout(timer); // Clear timeout on cleanup
        }
        if(error){
            const timer = setTimeout(() => setError(""), 3500); // Clear success message after 3500ms
            return () => clearTimeout(timer); // Clear timeout on cleanup
        }
    }, [success ,error]); // Trigger when success changes


    const handleSaveProfile = async () => {
        // Clear Errors
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName, lastName, photoUrl, age, gender, about
            },

                {
                    withCredentials: true
                }
            )
            setSuccess(res.data.message);
            dispatch(addUser(res?.data?.user));
            setLoading(false);
            setShowTost(true);
        } catch (err) {
            setError(err.response?.data);
            setLoading(false);
        }
    }
  console.log(showTost);
    return (
        <div className="flex gap-10 justify-center">
            <div className="flex justify-center my-10">
                <div className="card card-border bg-base-300 w-96">
                    <div className="card-body">
                         {showTost && (<TostMessage alertClass="alert-success" message={success} color={"success"} />)}
                        <h2 className="card-title justify-center">Edit Profile</h2>
                        <div>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">First Name</span>
                                </div>
                                <input
                                    type="text"
                                    value={firstName}
                                    placeholder="Please Enter First Name"
                                    className="input input-bordered w-full max-w-xs py-2 border-0 my-2"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Last Name</span>
                                </div>
                                <input
                                    type="text"
                                    value={lastName}
                                    placeholder="Please Enter Last Name"
                                    className="input input-bordered w-full max-w-xs py-2 border-0 my-2"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Photo URL</span>
                                </div>
                                <input
                                    type="text"
                                    value={photoUrl}
                                    placeholder="Upload File"
                                    className="input input-bordered w-full max-w-xs py-2 border-0 my-2"
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Age</span>
                                </div>
                                <input
                                    type="number"
                                    value={age}
                                    placeholder="Please Enter Age"
                                    className="input input-bordered w-full max-w-xs py-2 border-0 my-2"
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </label>
                            <div>
                                <span>Male :</span>
                                <input
                                    type="radio"
                                    value="male"
                                    name="gender"
                                    checked={gender === 'male'}
                                    className={`radio radio-success  p-2 mx-2 `}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <span className="mx-2">Female :</span>
                                <input
                                    type="radio"
                                    value="female"
                                    name="gender"
                                    checked={gender === 'female'}
                                    className={`radio radio-success  p-2 mx-2`}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <span className="mx-2">Other :</span>
                                <input
                                    type="radio"
                                    value="other"
                                    name="gender"
                                    checked={gender === 'other'}
                                    className={`radio radio-success  p-2 mx-2`}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </div>
                            <label>
                                <textarea
                                    type="text"
                                    value={about}
                                    placeholder="Secondary"
                                    className="textarea textarea-secondary my-2"
                                    onChange={(e) => setAbout(e.target.value)}
                                ></textarea>
                            </label>
                        </div>
                        {error &&  (<AlertMessage alertClass="alert-error" message={error} color="error" />)}
                        {/* {success && (<AlertMessage alertClass="alert-success" message={success} color="success"/>)} */}
                        <div className="card-actions justify-end">
                            <button
                                disabled={loading}
                                className="btn btn-primary bg-primary border-0 p-2"
                                onClick={handleSaveProfile}
                            >{loading ? "Loading..." : "Save Profile"}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-10">
                <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
            </div>
        </div>
    )
}

export default EditProfile;