import { Server, Socket } from "socket.io";
import Cache from "../utils/redisCasheUtils";
import routes from '../modules/routes/repository/routesRepository'
export interface UserData {
    route_id: string;
    device_id: string;
    busId?:string;
    origin: number;
    destination: number
}

const fetchRouteInfo = async (origin: string, destination: string) => {
    let data: any = await routes.getRouteByOrginDestinaton(parseInt(origin), parseInt(destination))
    return { id: data.id, route_name: data.route_name }
}

export default async function onJoin(socket: Socket, data: UserData, callback: Function, io: Server, fetcher = fetchRouteInfo) {
    try {
        
        const result: any = await Cache.get(data.route_id.toString(), () => (fetcher(data.origin.toString(), data.destination.toString())));
        let recentBus:any = null;
        if(data.busId){
            recentBus = await Cache.get(`bus:${data.busId.toString()}`, async()=>({id:data.busId,completed:false,user_id:socket.id ,route_id:data.route_id}))
        }
        socket.emit('joined', { user: 'phantom', text: `welcome to route ${result.name}.` });
        socket.broadcast.to(result.id).emit('RecentBus', { data: recentBus });
        socket.join(result.id);
        io.to(result.id).emit('routeData', { route: result.route_name, wait: result.count });
        callback();
    } catch (error) {
        // console.log(error)
        callback(error)
    }

}