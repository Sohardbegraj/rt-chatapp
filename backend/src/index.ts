import { WebSocketServer, WebSocket } from "ws";


const ws =new WebSocketServer({port : 8080})

interface user{
    socket:WebSocket,
    room :string,
}

const allsocket:user[]=[]

ws.on("connection",(socket)=>{
    socket.on("message",(message : string )=>{
        const pasrsedmessage=JSON.parse(message) 

        if(pasrsedmessage.type=="join"){
            allsocket.push({
                socket,
                room:pasrsedmessage.payload.roomid
            })
        }
        if(pasrsedmessage.type=="chat"){
            const currentroom=allsocket.find(x=>x.socket==socket)?.room

            for (let index = 0; index < allsocket.length; index++) {
                if(allsocket[index].room==currentroom){
                    allsocket[index].socket.send(pasrsedmessage?.payload?.message)
                    console.log("hii");
                    console.log(pasrsedmessage,"paseddata");
                    console.log(pasrsedmessage.payload,"paseddata payload");
                    console.log(pasrsedmessage.payload.message);
                }
                
            }
        }
    })
})
