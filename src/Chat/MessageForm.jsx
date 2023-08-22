import { useState } from "react";
import { useParams } from "react-router-dom";
import { apiCreateMessage } from "../../helpers/API";

function MessageForm() {
    const { id } = useParams(); // chat id
    const [text, setText] = useState("");
    const [errors, setErrors] = useState([]);
    const [sending, setSending] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setSending(true);

        const res = await apiCreateMessage(id, text);

        if (res.status === 200) {
            setText("");
            setErrors([]);
        } else {
            setErrors(res.data.errors);
        }
        setSending(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            {errors.map((error) => (
                <div key={error.msg} className="error">
                    {error.msg}
                </div>
            ))}
            <input
                className="chat-message-input"
                type="text"
                placeholder="Type your message here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button disabled={sending} className={`send-message-button`} type="submit">
                {sending ? "Sending..." : "Send"}
            </button>
        </form>
    );
}

export default MessageForm;
