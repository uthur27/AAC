let userName;
let myPeerConnection; // WebRTC peer connection 객체

document.addEventListener("DOMContentLoaded", () => {
  const script = document.createElement("script");
  script.src = "https://cdn.socket.io/4.1.2/socket.io.min.js";
  document.head.appendChild(script);

  script.onload = () => {
    const socket = io("http://localhost:3000");

    let userName = getCookie("userName");
    const messageInput = document.getElementById("input1");
    const sendButton = document.getElementById("input2");
    const chatTextarea = document.getElementById("textarea");
    const myFace = document.getElementById("myFace");
    const peerFace = document.getElementById("peerFace");

    // 비디오 채팅과 관련된 변수들
    const startButton = document.getElementById("startBtn");
    const muteButton = document.getElementById("muteBtn");
    const cameraButton = document.getElementById("cameraBtn");
    let myStream;
    let peerStream;

    // 화상 통화 시작 버튼 클릭 시
    startButton.addEventListener("click", () => {
      startVideoCall(socket);
    });

    // 음소거 버튼 클릭 시
    muteButton.addEventListener("click", () => {
      handleMuteClick(myStream);
    });

    // 카메라 On/Off 버튼 클릭 시
    cameraButton.addEventListener("click", () => {
      handleCameraClick(myStream);
    });

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
        socket.emit("message", message, userName);
        messageInput.value = "";
        chatTextarea.value += `${userName} : ${message}\n`;
        chatTextarea.scrollTop = chatTextarea.scrollHeight;
      }
    }

    // 서버에서 메시지 받음
    socket.on("message", (message, userN) => {
      if (userN == userName) {
      } else {
        chatTextarea.value += `${userN} : ${message}\n`;
        chatTextarea.scrollTop = chatTextarea.scrollHeight;
      }
    });

    // 화상 통화를 시작하는 함수
    function startVideoCall(socket) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {          
          myStream = stream;
          myFace.srcObject = stream;

          // 서버에 화상 통화 시작 메시지 전송
          socket.emit("startVideoCall", userName);

          // 서버로 자신의 미디어 스트림 전송
          socket.emit("stream", stream);          
        })
        .catch((error) => {
          console.error("Error accessing media devices:", error);
        });
    }

    // 미디어 스트림을 받았을 때의 이벤트 핸들러
    socket.on("stream", (stream) => {    
      io.emit("newParticipant", stream);    
    });
    // 새로운 참가자가 화상 통화에 참여할 때의 처리
    socket.on("newParticipant", (participantStream) => {
        console.log("상대방의 stream 정보를 받았습니다");
        console.log(participantStream);
        peerFace.srcObject = participantStream;
      }
    );

    // 화상 통화 관련 함수들
    function handleMuteClick(stream) {
      stream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
    }

    function handleCameraClick(stream) {
      stream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
    }
  };
});

// chat 페이지에서 AAC 버튼 누를 시 홈페이지(index.html)로 이동하는 함수
document.getElementById("hbtn").addEventListener("click", function() {
  window.location.href = "index.html";
})

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

