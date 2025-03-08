import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { BASE_URL } from "../utils/constants";
import RequestList from "./RequestList";

const Requests = () => {
  const dispatch = useDispatch();

  const requests = useSelector(store => store.requests);

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

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1>No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>
      {requests?.map((request => <RequestList key={request?._id} request={request} />))}
    </div>
  )
}

export default Requests;