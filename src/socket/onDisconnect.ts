import { Server, Socket } from "socket.io";
import Cache from "../utils/redisCasheUtils";

export default async function onDisconnect(key:any, socket: Socket, io: Server) {
    // ('console.logdisconnect',key)
    // console.log(socket.id)
    // const result = await Cache.reduceCount(key);

    // if (result) {
    //     io.to(result.id).emit('routeData', { room: result.name, users: result.count });
    // }
}