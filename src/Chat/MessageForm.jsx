import { useState } from "react";
import { AiOutlineLoading, AiOutlineSend } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { apiCreateMessage } from "../../helpers/API";
import css from "./styles/MessageForm.module.css";

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
                <div key={error.msg} className={css.error}>
                    {error.msg}
                </div>
            ))}
            <div className={css["input-box"]}>
                <input
                    className={css.input}
                    type="text"
                    placeholder="Type your message here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button disabled={sending} className={css.submit} type="submit">
                    {sending ? <AiOutlineLoading className="spin" /> : <AiOutlineSend />}
                </button>
            </div>
        </form>
    );
}

export default MessageForm;
