import { Server } from "socket.io";
import Cache from "../utils/redisCasheUtils";


export interface UpdateRoute {
    busId: number;
    route_id: string;
    state: string;
    seats:number;
    position: { lng: number, lat: number }

}
export default async function onUpdate(message: UpdateRoute, callback: Function, io: Server) {
    io.to(message.route_id).emit('onUpdate', { busId: message.busId,seats:message.seats, position: message.position, state: message.state });
     await Cache.busUpdate(`bus:${message.busId.toString()}`, async()=>({...message}));
    if(typeof callback === 'function') callback();
   


}