import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { BASE_URL } from "../utils/constants";
import RequestList from "./RequestList";
import TostMessage from "../TostMessage";

const Requests = () => {
  const [showTost,setShowTost] = useState(false);
  const [success,setMessage] = useState("");

  const requests = useSelector(store => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err?.response?.data);
    }
  }

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(`${BASE_URL}/request/review/${status}/${_id}`, {}, {
        withCredentials: true
      });
      setShowTost(true);
      setMessage(res.data.message);
      // Dispatch action to remove request from store
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.response.data);
    }
  };
  


  useEffect(() => {
    fetchRequests();  // Re-fetch the data when the component mounts or requests change
    
    // Timer for hiding the toast message after it shows
    let timer;
    if (success) {
      timer = setTimeout(() => setShowTost(false), 3500);
    }
  
    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, [success, requests]);  // Trigger re-fetch when either `success` or `requests` changes
  

  if (!requests) return;

  if (requests.length === 0) return <h1 className="flex justify-center my-10">No Requests Found</h1>;

  return (
    <div className="text-center my-10">
       {showTost && (<TostMessage alertClass="alert-success" message={success} color={"success"} />)} 
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>
      {requests?.map((request => <RequestList key={request?._id} request={request} reviewRequest={reviewRequest} />))}
    </div>
  )
}

export default Requests;