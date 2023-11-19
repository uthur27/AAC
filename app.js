const socket = io();

console.log("test");
document.addEventListener("DOMContentLoaded", () => {
  // script 태그를 사용하여 socket.io-client 라이브러리 불러오기
  const script = document.createElement("script");
  script.src = "https://cdn.socket.io/4.1.2/socket.io.min.js";
  document.head.appendChild(script);

  // 스크립트 로딩이 완료된 후에 실행되는 이벤트
  script.onload = () => {
    // 라이브러리 로딩이 완료되면 io 함수를 사용할 수 있음
    const socket = io("http://localhost:3000");

    const messageInput = document.getElementById("input1");
    const sendButton = document.getElementById("input2");
    const chatTextarea = document.getElementById("textarea");

    sendButton.addEventListener("click", () => {
      const message = messageInput.value;
      if (message.trim() !== "") {
        socket.emit("message", message);
        messageInput.value = "";
      }
    });

    socket.on("message", (message) => {
      chatTextarea.value += `${message}\n`;
      chatTextarea.scrollTop = chatTextarea.scrollHeight;
    });
  };
});
