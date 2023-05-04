import { Server, Socket } from "socket.io";
import Cache from "../../utils/redisCasheUtils";
import routes from '../routes/repository/routesRepository'
export interface UserData {
    route_id: string;
    device_id: string;
    origin: number;
    destination: number
}

const fetchRouteInfo = async (origin: string, destination: string) => {
    let data: any = await routes.getRouteByOrginDestinaton(parseInt(origin), parseInt(destination))
    return { id: data.id, route_name: data.route_name }
}

export default async function onJoin(socket: Socket, data: UserData, callback: Function, io: Server) {
    try {
        const result: any = await Cache.get(data.route_id.toString(), () => (fetchRouteInfo(data.origin.toString(), data.destination.toString())));
        socket.emit('joined', { user: 'phantom', text: `welcome to route ${result.name}.` });
        socket.broadcast.to(result.id).emit('newUser', { text: `new user has joined!` });
        socket.join(result.id);
        io.to(result.id).emit('routeData', { route: result.route_name, wait: result.count });

        callback(result);
    } catch (error) {
        console.log(error)
        callback(error)
    }

}