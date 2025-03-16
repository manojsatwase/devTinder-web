import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const user = useSelector(store => store?.user);
    const userId = user?._id;

    const fetchChatMessages = async () => {
        const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
            withCredentials: true
        })
        const chatMessage = chat?.data?.messages.map(msg => {
            const { senderId, text, createdAt } = msg;
            return { firstName: senderId.firstName, lastName: senderId.lastName, text, createdAt }
        })
        setMessages(chatMessage);
    }

    useEffect(() => {
        fetchChatMessages();
    }, []);

    useEffect(() => {
        if (!userId) {
            return;
        }
        // creating a connection
        const socket = createSocketConnection();
        // As soon as the page loaded the socket connection is made and joinChat event is emitted 
        socket.emit("joinChat", { firstName: user?.firstName, userId, targetUserId });

        socket.on("messageReceived", ({ firstName,lastName, text }) => {
            setMessages((messages) => [...messages, { firstName, lastName,text }]);
        })

        // the major important thinks is cleanup whenever you component load you need to do cleanup of this event also
        // you can not leave the socket connection empty
        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId]);

    const sendMessage = () => {
        // creating a connection
        const socket = createSocketConnection();
        socket.emit("sendMessage", {
            firstName: user?.firstName,
            lastName: user?.lastName,
            userId: user?._id,
            targetUserId,
            text: newMessage
        });
        setNewMessage("");
    }

    return (
        <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col rounded-2xl">
            <h1 className="p-5 border-b border-gray-600">Chat</h1>
            <div className="flex-1 overflow-scroll p-5">
                {
                    messages?.map((msg, index) => {
                        let createdAt = msg?.createdAt?.split(":").slice(0, 1).join("").slice(0, 10)
                        return (
                            <div key={index}>
                                <div className={`chat ${user?.firstName === msg?.firstName ? "chat-end" : "chat-start"}`}>
                                    <div className="chat-header">
                                        {`${msg?.firstName} ${msg?.lastName}`}
                                       {createdAt && (
                                        <time className="text-xs opacity-50">{createdAt}</time>
                                       ) } 
                                    </div>
                                    <div className="chat-bubble">{msg?.text}</div>
                                    <div className="chat-footer opacity-50">Seen</div>
                                </div>
                                {/* <div className="chat chat-end">
                                    <div className="chat-header">
                                        Manish Pandole
                                        <time className="text-xs opacity-50">2 hour ago</time>
                                    </div>
                                    <div className="chat-bubble">I'm Fine , How are you ?.</div>
                                    <div className="chat-footer opacity-50">Delivered</div>
                                </div> */}
                            </div>
                        )
                    })
                }
            </div>
            <div className="p-5 border-t border-gray-600 flex gap-2 items-center">
                <input
                    type="text"
                    value={newMessage}
                    className="flex-1 border border-gray-500 text-white rounded-full px-4 py-2 focus:outline-0"
                    placeholder="Chat Here..."
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                    className="btn bg-pink-500 px-4 py-2 border-0 rounded-2xl"
                    onClick={sendMessage}
                >Send</button>
            </div>
        </div>
    )
}

export default Chat