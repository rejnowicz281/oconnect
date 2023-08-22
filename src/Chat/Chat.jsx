import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetchChat } from "../../helpers/API";
import MessageForm from "./MessageForm";

function Chat() {
    const { id } = useParams();
    const [chat, setChat] = useState(null);

    useEffect(() => {
        async function fetchChat() {
            const res = await apiFetchChat(id);
            if (res.status === 200) setChat(res.data.chat);
        }
        fetchChat();
    }, []);

    if (!chat) return <div> Loading... </div>;

    return (
        <div>
            <h1>Chat</h1>
            <MessageForm />
            <ul>
                {chat.messages.map((message) => (
                    <li key={message._id}>
                        {message.user.first_name} {message.user.last_name}: {message.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Chat;
