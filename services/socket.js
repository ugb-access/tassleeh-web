import { io } from "socket.io-client";
// import { BASE_URL } from "../Path/Path";

const socket = io("http://localhost:3000/");

socket.onAny((event, ...args) => {
	console.log("%csocket: " + event, "  color: red");
});

export default socket;
