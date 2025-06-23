import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChatWindow } from "./componnts/dashboad";
import RoomCard from "./componnts/room";
import ChatRoom from "./componnts/chatroom";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoomCard/>} />
        <Route path="/room/123456" element={<ChatWindow />} />
        <Route path="/room/:roomId" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
};

export default App;



