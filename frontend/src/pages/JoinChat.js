import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

export const socket = io.connect("http://localhost:3001");
const dataObject = { username: "", roomId: "" };

const JoinChat = () => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const joinChat = (e) => {
    e.preventDefault();
    if (!username || !roomId) {
      toast.error("Please provide a username and a room Id!");
      return;
    }
    dataObject.username = username;
    dataObject.roomId = roomId;
    socket.emit("join_room", roomId);
    navigate("/room");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center">
      <form className="flex flex-col h-[350px] w-[280px] md:w-[320px] py-4 px-7 gap-6 bg-black rounded-lg shadow-lg">
        <h1 className="text-xl md:text-2xl text-white text-center mb-6">
          Welcome to Chat App
        </h1>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          className="py-1 px-3 outline-none"
        />
        <input
          type="text"
          placeholder="room id"
          onChange={(e) => setRoomId(e.target.value)}
          className="py-1 px-3 outline-none"
        />
        <button
          type="submit"
          className="py-1 px-3 bg-gray-300 font-bold"
          onClick={joinChat}
        >
          Join a Chat
        </button>
      </form>
    </div>
  );
};

export { dataObject };

export default JoinChat;
