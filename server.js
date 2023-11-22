import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());

// 현재 스크립트의 디렉토리에서 정적 파일 제공
app.use(express.static(__dirname));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// Socket.IO 연결 설정
io.on("connection", (socket) => {
  console.log("A user connected");
  // 이름 전달
  // socket.on("setUsername", (userName) => {
  //   socket.userName = userName;
  //   console.log("User set username to:", userName);
  // });

  // 클라이언트에서 메시지를 받으면 모든 클라이언트에게 전파
  // socket.on("message", (data) => {
  //   console.log("Received message:", data);
  //   io.emit("message", data);
  // });

  // 화상 통화 시작 메시지를 받았을 때의 이벤트 핸들러
  // socket.on("startVideoCall", (userName) => {
  //   console.log(`${userName} started a video call`);
  // });

  // // 미디어 스트림을 받았을 때의 이벤트 핸들러
  // socket.on("stream", (stream) => {        
  //   //변경전
  //   //io.emit("newParticipant", stream);
  //   console.log("strea 전송!");
  //   socket.broadcast.emit("newParticipant", stream);
  // });

  socket.on("message", (message, userName) => {
    console.log("Received message:", message);
    io.emit("message", message, userName);
  });

  // 연결이 끊어지면 로그 출력
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

httpServer.listen(3000, () => {
  console.log("server listening on port");
});
