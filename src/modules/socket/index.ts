import { Socket } from "socket.io";
import { Server } from "socket.io";
import onJoin from "./onJoin";
import onUpdate from "./onUpdate";
import onDisconnect from "./onDisconnect";

export default function SocketConnection(socket: Socket, io: Server) {
      try {
            socket.on('join', (data, callback) => onJoin(socket, data, callback, io));

            socket.on('update', (data, callBack) => onUpdate(data, callBack, io));

            socket.on('disconnect', (key) => onDisconnect(key,socket, io))
      } catch (err:any) {
            console.log(err.message);
      }

}