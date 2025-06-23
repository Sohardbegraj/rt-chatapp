// src/components/ChatWindow.tsx
import { useEffect, useRef, useState } from "react";
import { Message } from "./message";

export const ChatWindow = () => {
  
  const [messages, setMessages] = useState<{ text: string }[]>([]);
  const messageref = useRef<HTMLInputElement>(null);
  const wsref = useRef<WebSocket | null>(null);
  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:8080");
    console.log("hii");
    
    ws.onmessage=(event)=>{
      console.log("Raw event data:", event.data);  // Add this
      setMessages(messages => [
        ...messages,
        { text: event.data }
      ]);
      console.log("hii");
    }
    return ()=>{
      ws.close
    }
  },[])

  return (
      <div className="h-screen w-screen bg-black flex items-center justify-center"> 
          
    <div className="w-full max-w-2xl h-[80vh] bg-zinc-900 border-4 border-gray-300 rounded-2xl shadow-lg flex flex-col overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((msg, index) => (
          <Message key={index} text={typeof msg === "string" ? msg : msg.text} />
        ))}
      </div>
      <div className="p-4 flex border-t-4 border-gray-300">
      <input
        ref={messageref}
        type="text"
        className="flex-1 p-2 border rounded-l-xl focus:outline-none bg-white"
        placeholder="Type a message..."
      />
      <button
        onClick={() => {
          if (messageref.current) {
            const message = (messageref.current as HTMLInputElement).value;            
            if (wsref.current) {
              console.log("send");
              wsref.current.send(JSON.stringify({
                type:"chat",
                payload:{
                  message:message
                }
              }))
            }
          }
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded-r-xl hover:bg-blue-700"
      >
        Send
      </button>
    </div>
    </div>
    </div>
  );
};