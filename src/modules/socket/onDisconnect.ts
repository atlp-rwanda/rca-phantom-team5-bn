import { Server, Socket } from "socket.io";
import Cache from "../../utils/redisCasheUtils";

export default async function onDisconnect(key:string, io: Server<any>) {
    console.log('disconnect',key)
    // const result = await Cache.reduceCount(key);

    // if (result) {
    //     io.to(result.id).emit('routeData', { room: result.name, users: result.count });
    // }
}