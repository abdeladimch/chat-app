import { socket, dataObject } from "./JoinChat";
import RoomComponent from "../components/RoomComponent";

const Room = () => {
  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center">
      <RoomComponent socket={socket} dataObject={dataObject} />
    </div>
  );
};

export default Room;
