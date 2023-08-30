import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiDeleteMessage, apiFetchChat } from "../../helpers/API";
import { useAuthStore } from "../store";
import MessageForm from "./MessageForm";

import UserBox from "../Users/UserBox";
import AsyncButton from "../shared/AsyncButton";
import PageLoading from "../shared/PageLoading";
import socket from "../socket";

function Chat() {
    const currentUser = useAuthStore((state) => state.currentUser);

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
            if (res.status === 200) {
                setChat(res.data.chat);
            }
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

    if (!chat) return <PageLoading />;

    return (
        <div>
            <h1>Chat</h1>
            <ul>
                {chat.messages.map((message) => (
                    <li key={message._id}>
                        <UserBox user={message.user} /> {message.text}
                        {message.user._id == currentUser._id && (
                            <AsyncButton
                                mainAction={() => apiDeleteMessage(chat._id, message._id)}
                                text="Delete"
                                loadingText="Deleting..."
                            />
                        )}
                    </li>
                ))}
            </ul>
            <MessageForm />
        </div>
    );
}

export default Chat;
