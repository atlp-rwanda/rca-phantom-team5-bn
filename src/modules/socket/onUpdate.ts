import { Server } from "socket.io";

export interface UpdateRoute{
     busId:number;
     route_id:string;
     on:number

}
export default function onUpdate(message: UpdateRoute, callback: Function, io: Server) {


    io.to(message.route_id).emit('update', { busId: message.busId, on: message.on });

    callback();


}