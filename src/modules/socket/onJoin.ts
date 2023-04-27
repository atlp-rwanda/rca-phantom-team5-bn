import { Server, Socket } from "socket.io";
import Cache from "../../utils/redisCasheUtils";
import routes from '../routes/repository/routesRepository'
export interface UserData {
    route_id: string;
    device_id: string;
    origin: number;
    destination: number
}

export default async function onJoin(socket: Socket, data: UserData, callback: Function, io: Server) {
   try {
    const result = await Cache.get(data.route_id,()=> routes.getRouteByOrginDestinaton(data.origin,data.destination));

    socket.join(result.id);

    socket.emit('joined', { user: 'phantom', text: `welcome to route ${result.name}.`});
    socket.broadcast.to(result.id).emit('newUser', { text: `new user has joined!` });

    io.to(result.id).emit('routeData', { room: result.name, wait: result.count});

    callback();
   } catch (error) {
    callback(error)
   }
   
}