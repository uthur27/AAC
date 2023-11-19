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

    // 클릭 이벤트 핸들러
    sendButton.addEventListener("click", () => sendMessage());

    // 키보드 이벤트 핸들러
    messageInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        sendMessage();
      }
    });

    // 서버로 메시지 전송
    function sendMessage() {
      const message = messageInput.value;
      if (message.trim() !== "") {
        socket.emit("message", message);
        messageInput.value = "";
      }
    }

    //서버에서 메시지 받음
    socket.on("message", (message) => {
      chatTextarea.value += `${message}\n`;
      chatTextarea.scrollTop = chatTextarea.scrollHeight;
    });
  };
});

document.getElementById("hbtn").addEventListener("click", function () {
  // chat 페이지에서 AAC 버튼 누를 시 홈페이지(index.html)로 이동
  window.location.href = "index.html";
});
