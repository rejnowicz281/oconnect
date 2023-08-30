import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiDeleteMessage, apiFetchChat } from "../../helpers/API";
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

    useEffect(() => {
        if (chat) {
            const messages = messagesRef.current;
            messages.scrollTop = messages.scrollHeight;
        }
    }, [chat]);

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
