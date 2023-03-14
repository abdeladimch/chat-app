import { useEffect, useState } from "react";
import { MdSend } from "react-icons/md";

const RoomComponent = ({ socket, dataObject }) => {
  const [text, setText] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messageInput = document.getElementById("txt");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text) {
      return;
    }
    const hours =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : new Date().getHours();
    const minutes =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : new Date().getMinutes();
    const time = hours + ":" + minutes;
    const messageObject = {
      room: dataObject.roomId,
      author: dataObject.username,
      message: text,
      time: time,
    };
    await socket.emit("send_message", messageObject);
    setMessageList((oldList) => [...oldList, messageObject]);
    messageInput.value = "";
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((oldList) => [...oldList, data]);
    });
  }, [socket]);

  return (
    <div className="flex flex-col">
      {/* chat header */}

      <div className="flex gap-2 items-center bg-blue-400 py-4 px-3">
        <div className="w-[15px] h-[15px] rounded-full bg-green-500"></div>
        <p className="text-lg font-bold text-white">Live Chat</p>
      </div>

      {/* chat body */}

      <div
        id="msgScreen"
        className="h-[300px] w-[300px] bg-gray-400 overflow-y-auto overflow-x-hidden py-2 px-3 flex flex-col gap-3"
      >
        {messageList.map((message) => {
          return (
            <div key={Math.random()}>
              {dataObject.username === message.author ? (
                <div className="flex flex-col gap-2">
                  <p className="font-bold ">You</p>
                  <div className="flex gap-2 items-center">
                    <p className="bg-blue-200 rounded-lg py-2 px-1 min-w-[40px] style">
                      {message.message}
                    </p>
                    <p className=" text-white ">{message.time}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2 items-end">
                  <p className="font-bold flex justify-start">
                    {message.author}
                  </p>
                  <div className="flex gap-2 items-center">
                    <p className=" text-white ">{message.time}</p>
                    <p className="bg-blue-200 rounded-lg py-2 px-1 min-w-[40px] style">
                      {message.message}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* chat footer */}

      <form
        id="myForm"
        className="flex gap-2 items-center py-4 px-3 bg-slate-300"
      >
        <input
          type="text"
          id="txt"
          placeholder="what's on your mind..."
          className="py-1 px-3 outline-none w-full"
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="text-2xl cursor-pointer"
          onClick={sendMessage}
        >
          <MdSend />
        </button>
      </form>
    </div>
  );
};

export default RoomComponent;
