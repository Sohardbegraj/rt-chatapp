import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomCard: React.FC = () => {
  const [roomCode, setRoomCode] = useState("");
  const navigation=useNavigate();
  const [gen,setgen]=useState("")

const handleCreateRoom = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let generatedCode = "";
    for (let i = 0; i < 6; i++) {
        generatedCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setgen(generatedCode)
    setRoomCode(generatedCode);
    console.log("Created room with code:", generatedCode);
};

    useEffect(()=>{
        const ws = new WebSocket("ws://localhost:8080");

        ws.onopen=()=>{
        ws.send(JSON.stringify({
            type:"join",
            payload:{
            roomid:roomCode
            }
        }))
        }
        return ()=>{
            ws.close()
        }

    },[])

  const handleJoinRoom = () => {
    navigation(`/room/:${roomCode}`)
  };

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono ">
      <div className="bg-zinc-900 p-8 rounded-xl shadow-lg  space-y-4 border border-zinc-700 w-full">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          Real Time Chat
        </h1>
        <p className="text-sm text-zinc-400">
          temporary room that expires after all users exit
        </p>

        <button
          onClick={handleCreateRoom}
          className="w-full bg-white text-black py-2 px-4 rounded-md font-semibold hover:bg-gray-200 transition"
        >
          Create New Room
        </button>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter Room Code"
            value={roomCode}
            required
            onChange={(e) => setRoomCode(e.target.value)}
            className="flex-grow px-4 py-2 rounded-md bg-zinc-800 border border-zinc-700 placeholder-zinc-400 focus:outline-none"
          />
          <button
            onClick={handleJoinRoom}
            className="bg-white text-black px-4 rounded-md font-semibold hover:bg-gray-200 transition"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RoomCard;
