import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { JoinChat, Landing, Room, Error } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/room" element={<Room />} />
        <Route path="/joinChat" element={<JoinChat />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer
        position="top-center"
        pauseOnHover={false}
        theme="light"
        closeOnClick={true}
        autoClose={1000}
      />
    </Router>
  );
};

export default App;
