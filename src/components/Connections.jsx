import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import ConnectionsCard from "./connectionsCard";

const Connections = () => {
    const dispatch = useDispatch();

    const connections = useSelector(state=>state.connections);

    const featchConnection = async () => {
        if(connections) return;
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true
            });
            dispatch(addConnections(res?.data?.users));
        } catch (err) {
            console.error(err.response?.data);
        }
    }

    useEffect(() => {
        featchConnection();
    }, []);

    if(!connections) return;

    if(connections?.length === 0) return <h1>No Connections Found!</h1>

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-2xl">Connections</h1>
            <div className="flex justify-center">
            {
                connections.map(connection=><ConnectionsCard key={connection._id} connection={connection} />)
            }
            </div>
        </div>
    )
}

export default Connections;