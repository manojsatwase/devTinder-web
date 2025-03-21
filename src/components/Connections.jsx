import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import ConnectionsCard from "./connectionsCard";

const Connections = () => {
    const dispatch = useDispatch();

    const connections = useSelector(store => store?.connections);

    const featchConnection = async () => {
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
 
    if (!connections) return <h1 className="text-center my-10">No Connections Found!</h1>;
    if (connections?.length === 0) return <h1 className="text-center my-10">No Connections Found!</h1>

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-2xl">Connections</h1>
            {connections && (
                connections?.map((connection) => <ConnectionsCard  key={connection?._id} connection={connection} />)

            )}
        </div>
    )
}

export default Connections;