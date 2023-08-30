import { io } from "socket.io-client";

const URL = "https://oconnect.fly.dev";

const socket = io(URL);

export default socket;
