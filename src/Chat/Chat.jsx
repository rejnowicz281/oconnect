import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiDeleteMessage, apiFetchChat } from "../../helpers/API";
import { useAuthStore } from "../store";
import MessageForm from "./MessageForm";

import socket from "../socket";

function Chat() {
    const currentUser = useAuthStore((state) => state.currentUser);

    const navigate = useNavigate();
    const { id } = useParams();
    const [chat, setChat] = useState(null);

    useEffect(() => {
        socket.emit("joinChat", id);

        socket.on("addMessage", (message) => {
            addMessage(message);
        });

        socket.on("removeMessage", (messageId) => {
            removeMessage(messageId);
        });

        return () => {
            socket.emit("leaveChat", id);
            socket.off("addMessage");
            socket.off("removeMessage");
        };
    }, [id]);

    useEffect(() => {
        async function fetchChat() {
            const res = await apiFetchChat(id);
            if (res.status === 200) setChat(res.data.chat);
            else navigate("/friends");
        }
        fetchChat();
    }, [id]);

    function addMessage(message) {
        setChat((prevChat) => ({
            ...prevChat,
            messages: [...prevChat.messages, message],
        }));
    }

    function removeMessage(messageId) {
        setChat((prevChat) => ({
            ...prevChat,
            messages: prevChat.messages.filter((message) => message._id !== messageId),
        }));
    }

    if (!chat) return <div> Loading... </div>;

    return (
        <div>
            <h1>Chat</h1>
            <ul>
                {chat.messages.map((message) => (
                    <li key={message._id}>
                        {message.user.first_name} {message.user.last_name}: {message.text}
                        {message.user._id == currentUser._id && (
                            <button onClick={async () => await apiDeleteMessage(chat._id, message._id)}>Delete</button>
                        )}
                    </li>
                ))}
            </ul>
            <MessageForm />
        </div>
    );
}

export default Chat;
