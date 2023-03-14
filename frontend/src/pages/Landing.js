import { Link } from "react-router-dom";
import chat from "../assets/chat.svg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col gap-4 items-center justify-center">
      <img src={chat} alt="chat-img" className="h-[250px]" />
      <Link to="/joinChat" className="bg-black text-white py-1 px-3 font-bold">
        Chat with Someone
      </Link>
    </div>
  );
};

export default Landing;
