// src/components/ChatRoom.tsx
import  { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Message } from "./message";

const ChatRoom = () => {
   const { roomId } = useParams<{ roomId: any }>();

   const [messages, setMessages] = useState<string[]>(["jdjd"]);
     const messageref = useRef<HTMLInputElement>(null);
     const wsref = useRef<WebSocket | null>(null);
     

    useEffect(() => {
      const ws = new WebSocket("ws://localhost:8080");
      console.log("useeefect");
      
      
      wsref.current = ws;
      return () => {
        ws.close();
      };
    }, []);

    const sendmessage = () => {
      try {
        const message = messageref.current?.value;
        if (message && wsref.current && wsref.current.readyState === WebSocket.OPEN) {
          wsref.current.send(
            JSON.stringify({
              type: "chat",
              payload: {
                message: message,
              },
            })
          );
        console.log(wsref.current?.onmessage ,"wsref.current.onmessage");
        wsref.current.onmessage = (event) => {
          
        try {
          const data = JSON.parse(event.data);
          console.log(data);
          if (data && data.payload && data.payload.message) {
            setMessages((prevMessages) => [...prevMessages, data.payload.message]);
          }
        } catch (e) {
          console.error("Failed to parse message", e);
        }
      };
          console.log(message);
          
          //@ts-ignore
          messageref.current.value = "";
        }
      } catch (e) {
        console.log(e);
      }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-neutral-900 p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-1 flex items-center">
          <span className="ml-2">Real Time Chat</span>
        </h1>
        <p className="text-sm text-neutral-400 mb-4">
          temporary room that expires after all users exit
        </p>

        {/* Room Info */}
        <div className="flex items-center justify-between rounded-md bg-neutral-800 p-2 px-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            Room Code: <span className="font-bold text-white">{roomId}</span>
          </div>
          <span className="text-sm text-neutral-300">Users: {messages}</span>
        </div>

        {/* Chat Box */}
        <div className="h-64 rounded-md border border-neutral-700 bg-black p-4 overflow-y-auto mb-4" >
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
                {messages.map((msg, idx) => (
                  <Message key={idx} text={msg} />
                ))}
              </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            ref={messageref}
            type="text"
            placeholder="Type a message..."
            className="flex-grow rounded-md bg-neutral-800 px-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none"
          />
          <button className="rounded-md bg-white px-4 py-2 text-black font-semibold hover:bg-neutral-300 transition"
            onClick={sendmessage}>
            Send
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default ChatRoom;
