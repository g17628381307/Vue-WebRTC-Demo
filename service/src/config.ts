import express from "express";
import http from "http";
import { Server as IO } from "socket.io";
/**
 * 初始化 express
 * @param app
 * @returns
 */
export default function initApp() {
  let app = express();

  app.get("/hello", (req, res) => {
    res.send("hello");
  });
  let http_server = http.createServer(app);
  http_server.listen(3003);
  console.log(http_server);
  let io = new IO(http_server, {
    path: "/rtc",
    // 允许跨域访问
    cors: {
      origin: "*"
    }
  });
  http_server.on("listening", () => {
    let addr = http_server.address();
    console.log(addr, "addr");
    if (addr) {
      let port = typeof addr === "string" ? addr : addr.port;
      console.log(`Listening on ${port}`);
    }
  });
  return io;
}
