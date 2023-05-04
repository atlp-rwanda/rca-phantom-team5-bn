import { Server } from "socket.io";

export interface UpdateRoute {
    busId: number;
    route_id: string;
    state: string;
    seats:number;
    position: { lng: number, lat: number }

}
export default function onUpdate(message: UpdateRoute, callback: Function, io: Server) {
    io.to(message.route_id).emit('onUpdate', { busId: message.busId,seats:message.seats, position: message.position, state: message.state });
    if(typeof callback === 'function') callback();
   


}