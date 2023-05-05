
import { createServer } from "http";
import { io as Client } from "socket.io-client";
import { Server, Socket } from "socket.io";
import { assert } from "chai";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { AddressInfo } from "net";
import onJoin, { UserData } from "../onJoin";
import onUpdate from "../onUpdate";

describe("testing socket", () => {
  let io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, serverSocket: Socket, clientSocket: any

  before((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = (httpServer.address() as AddressInfo).port;
      clientSocket = Client(`http://localhost:${port}`);
      io.on("connection", (socket: any) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  after(() => {
    io.close();
    clientSocket.close();
  });

  it("should work", (done) => {
    clientSocket.on("join", (arg: any) => {
      assert.equal(arg, "world");
      done();
    });
    
    serverSocket.emit("hello", "world");
  });

  it("should work (with ack)", (done) => {
    serverSocket.on("join", (arg: UserData, cb: Function) => { onJoin(serverSocket, arg,cb, io)});
    clientSocket.emit("join", (arg: any) => {
      assert.equal(arg, {});
      done();
    });
  });
  
});