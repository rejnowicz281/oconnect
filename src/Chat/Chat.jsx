import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiDeleteMessage, apiFetchChat } from "../../API/chats";
import { useAuthStore } from "../store";
import MessageForm from "./MessageForm";
import css from "./styles/Chat.module.css";

import UserBox from "../Users/UserBox";
import AsyncButton from "../shared/AsyncButton";
import PageLoading from "../shared/PageLoading";
import socket from "../socket";

function Chat() {
    const currentUser = useAuthStore((state) => state.currentUser);
    const messagesRef = useRef(null);

    const { id } = useParams();
    const [chat, setChat] = useState(null);
    const [socketLoaded, setSocketLoaded] = useState(false);

    useEffect(() => {
        // Set the initial socketLoaded state to the current socket connection status
        setSocketLoaded(socket.connected);

        // If the socket connects, make sure the socketLoaded state is set to true
        socket.on("connect", () => {
            console.log("Connected to socket");
            setSocketLoaded(true);
        });

        // If the socket fails to connect, make sure the socketLoaded state is set to false
        socket.on("connect_error", (err) => {
            console.log("Socket connection error", err);
            setSocketLoaded(false);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from socket");
            setSocketLoaded(false);
        });

        socket.emit("joinChat", id);

        socket.on("addMessage", (message) => {
            addMessage(message);
        });

        socket.on("removeMessage", (messageId) => {
            removeMessage(messageId);
        });

        return () => {
            setSocketLoaded(false);
            socket.off("connect");
            socket.off("connect_error");
            socket.off("disconnect");
            socket.emit("leaveChat", id);
            socket.off("addMessage");
            socket.off("removeMessage");
        };
    }, [id, socketLoaded]);

    useEffect(() => {
        if (socketLoaded) fetchChat();

        return () => {
            setChat(null);
        };
    }, [id, socketLoaded]);

    useEffect(() => {
        if (chat && messagesRef?.current) {
            const messages = messagesRef.current;
            messages.scrollTop = messages.scrollHeight;
        }
    }, [chat]);

    async function fetchChat(retry = 0) {
        if (retry > 10) return setChat(null);

        const res = await apiFetchChat(id);

        if (res.status === 200) setChat(res.data.chat);
        else fetchChat(retry + 1);
    }

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

    if (!socketLoaded) return <PageLoading text="Connecting to socket..." />;

    if (!chat) return <PageLoading />;

    return (
        <div className={css.container}>
            <h1 className={css.heading}>
                <Link to={`/users/${chat.other_user._id}`}>
                    {chat.other_user.first_name} {chat.other_user.last_name}
                </Link>
            </h1>
            <div className={css.messages} ref={messagesRef}>
                {chat.messages.map((message) => (
                    <div className={css.message} key={message._id}>
                        <UserBox user={message.user} />
                        {message.user._id == currentUser._id && (
                            <AsyncButton
                                className={css.delete}
                                mainAction={() => apiDeleteMessage(chat._id, message._id)}
                                content="Delete"
                                loadingContent="Deleting..."
                            />
                        )}
                        <div className={css.text}>{message.text}</div>
                    </div>
                ))}
            </div>
            <MessageForm />
        </div>
    );
}

export default Chat;
