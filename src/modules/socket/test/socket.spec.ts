// with { "type": "module" } in your package.json
import { createServer } from "http";
import { io as Client } from "socket.io-client";
import { Server } from "socket.io";
import { assert } from "chai";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { AddressInfo } from "net";

// with { "type": "commonjs" } in your package.json
// const { createServer } = require("http");
// const { Server } = require("socket.io");
// const Client = require("socket.io-client");
// const assert = require("chai").assert;

describe("testing socket", () => {
  let io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, serverSocket: { emit: (arg0: string, arg1: string) => void; on: (arg0: string, arg1: (cb: any) => void) => void; }, clientSocket: { on: (arg0: string, arg1: { (err?: any): void; (arg: any): void; }) => void; close: () => void; emit: (arg0: string, arg1: (arg: any) => void) => void; };

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
    clientSocket.on("hello", (arg: any) => {
      assert.equal(arg, "world");
      done();
    });
    serverSocket.emit("hello", "world");
  });

  it("should work (with ack)", (done) => {
    serverSocket.on("hi", (cb: (arg0: string) => void) => {
      cb("hola");
    });
    clientSocket.emit("hi", (arg: any) => {
      assert.equal(arg, "hola");
      done();
    });
  });
});