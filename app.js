let userName;
let myPeerConnection; // WebRTC peer connection 객체
let aacKind = "d"
document.addEventListener("DOMContentLoaded", () => {
  const script = document.createElement("script");
  script.src = "https://cdn.socket.io/4.1.2/socket.io.min.js";
  document.head.appendChild(script);
  const messageInput = document.getElementById("input1");
  const myFace = document.getElementById("myFace");
  const peerFace = document.getElementById("peerFace");

  script.onload = () => {
    const socket = io("https://aacom.netlify.app/chat.html");

    userName = getCookie("userName");    
    const sendButton = document.getElementById("input2");
    const messageInput = document.getElementById("input1");
    const chatTextarea = document.getElementById("textarea");
    

    // // 비디오 채팅과 관련된 변수들
    // const startButton = document.getElementById("startBtn");
    // const muteButton = document.getElementById("muteBtn");
    // const cameraButton = document.getElementById("cameraBtn");
    // let myStream;
    // let peerStream;

    // // 화상 통화 시작 버튼 클릭 시
    // startButton.addEventListener("click", () => {
    //   startVideoCall(socket);
    // });

    // // 음소거 버튼 클릭 시
    // muteButton.addEventListener("click", () => {
    //   handleMuteClick(myStream);
    // });

    // // 카메라 On/Off 버튼 클릭 시
    // cameraButton.addEventListener("click", () => {
    //   handleCameraClick(myStream);
    // });

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

    socket.on("aac", (pythonResult) =>{
      aacKind = pythonResult;
      console.log("서버에서 파이썬 결과값을 정상적으로 받았고 그 값은 : ", aacKind);
    });

    // // 화상 통화를 시작하는 함수
    // function startVideoCall(socket) {
    //   navigator.mediaDevices
    //     .getUserMedia({ video: true, audio: true })
    //     .then((stream) => {          
    //       // myStream = stream;          
    //       // myFace.srcObject = stream;

    //       // 서버에 화상 통화 시작 메시지 전송
    //       socket.emit("startVideoCall", userName);

    //       // 서버로 자신의 미디어 스트림 전송
    //       socket.emit("stream", stream);      
    //     })
        
    //     .catch((error) => {
    //       console.error("Error accessing media devices:", error);
    //     });
    // }   
    // // 새로운 참가자가 화상 통화에 참여할 때의 처리
    // socket.on("newParticipant", (participantStream) => {
    //   console.log("클라이언트에서 stream을 받았어요");
    //   myFace.srcObject = participantStream; 
    // });

    // // 화상 통화 관련 함수들
    // function handleMuteClick(stream) {
    //   stream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
    // }

    // function handleCameraClick(stream) {
    //   stream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
    // }
  };

// 여기부터 AAC 클릭 관련 함수들////
const aacBot = document.getElementById("aacBot");
const subjectBtn = document.getElementById("subjectBtn");
const aacBtn = document.getElementById("aacBtn");
const verbBtn = document.getElementById("verbBtn");


// 이미지 클릭 시 이벤트 추가
function handleImageClick(event) {
  const clickedImage = event.target;
  const word = clickedImage.alt;
  messageInput.value += word + " ";
}

//aac 가져오기
//주어 부분 aac 설정
function showSubject() {  
  const imageUrlsS = [
      { url: "img/people/me.jpg", alt: "나" },
      { url:"img/people/you.jpg",alt: "너" },
      { url:"img/people/we.jpg",alt: "우리" },
      { url:"img/people/mother.jpg", alt: "엄마" },
      { url:"img/people/father.jpg", alt: "아빠" },
      { url:"img/people/brother.jpg",alt: "형" },
      { url:"img/people/sister.jpg",alt: "누나" },
      { url:"img/people/siblings.jpg",alt: "형제" },
      { url:"img/people/baby.jpg",alt: "아이" },
      { url:"img/people/friend.jpg",alt: "친구" },
      { url:"img/people/grandfather.jpg",alt: "할아버지" },
      { url:"img/people/grandmother.jpg",alt: "할머니" },
      { url:"img/people/woman.jpg",alt: "여자" },
      { url:"img/people/man.jpg",alt: "남자" },
      { url:"img/people/stranger.jpg",alt: "누구" },
  ]   
  // 이미지를 순회하며 삽입
  imageUrlsS.forEach((imageInfo) => {
      const image = document.createElement("img");
      image.src = imageInfo.url;
      image.alt = imageInfo.alt;
      image.addEventListener("click", handleImageClick);
      aacBot.appendChild(image);
  });
}
// 동사 부분 aac 설정
function showVerb() {
  const imageUrlsV = [
      { url: "img/do/go.jpg", alt: "가다" },
      { url: "img/do/ask.jpg", alt: "묻다" },
      { url: "img/do/hi.jpg", alt: "방갑다" },
      { url: "img/do/love.jpg", alt: "사랑하다" },
      { url: "img/do/funny.jpg", alt: "웃다" },
      { url: "img/do/run.jpg", alt: "달리다" },
      { url: "img/do/thanks.jpg", alt: "고맙다" },
      { url: "img/do/notgood.jpg", alt: "싫다" },
      { url: "img/do/good.jpg", alt: "좋다" },
      { url: "img/do/close.jpg", alt: "가깝다" },
      { url: "img/do/blind.jpg", alt: "가리다" },
      { url: "img/do/itch.jpg", alt: "가렵다" },
      { url: "img/do/give.jpg", alt: "주다" },
      { url: "img/do/stop.jpg", alt: "멈추다" },
      { url: "img/do/wait.jpg", alt: "가다리다" },
      { url: "img/do/nervous.jpg", alt: "긴장되다" },
      { url: "img/do/out.jpg", alt: "나가다" },
      { url: "img/do/many.jpg", alt: "많다" },
      { url: "img/do/surprise.jpg", alt: "놀라다" },
      { url: "img/do/again.jpg", alt: "다시하다" },
      
  ]   
  // 이미지를 순회하며 삽입
  imageUrlsV.forEach((imageInfo) => {
      const image = document.createElement("img");
      image.src = imageInfo.url;
      image.alt = imageInfo.alt;      
      image.addEventListener("click", handleImageClick);
      aacBot.appendChild(image);      
  });
}
function showDailylife() {
  const imageUrlsK = [
      { url: "img/dailylife/bike.jpg", alt: "자전거" },
      { url: "img/dailylife/bus.jpg", alt: "버스" },
      { url: "img/dailylife/cook.jpg", alt: "요리" },
      { url: "img/dailylife/hurt.jpg", alt: "다침" },
      { url: "img/dailylife/laundry.jpg", alt: "세탁" },
      { url: "img/dailylife/play.jpg", alt: "놀기" },
      { url: "img/dailylife/study.jpg", alt: "공부" },
      { url: "img/dailylife/toilet.jpg", alt: "화장실" },
      { url: "img/dailylife/fun.jpg", alt: "재미" },
      { url: "img/dailylife/sleep.jpg", alt: "잠" },
      { url: "img/dailylife/compliment.jpg", alt: "칭찬" },
      { url: "img/dailylife/exercise.jpg", alt: "운동" },
      { url: "img/dailylife/phone.jpg", alt: "핸드폰" },
      { url: "img/dailylife/brushTeeth.jpg", alt: "양치" },

  ];
  // 이미지를 순회하며 삽입
  imageUrlsK.forEach((imageInfo) => {
      const image = document.createElement("img");
      image.src = imageInfo.url;
      image.alt = imageInfo.alt;      
      image.addEventListener("click", handleImageClick);
      aacBot.appendChild(image);
  });

}

function showFood() {
  const imageUrlsK = [
      { url: "img/food/chicken.jpg", alt: "치킨" },
      { url: "img/food/Curry.jpg", alt: "카레" },
      { url: "img/food/dumpling.jpg", alt: "만두" },
      { url: "img/food/friedEgg.jpg", alt: "계란후라이" },
      { url: "img/food/friedRice.jpg", alt: "볶음밥" },
      { url: "img/food/hamburger.jpg", alt: "햄버거" },
      { url: "img/food/icecream.jpg", alt: "아이스크림" },
      { url: "img/food/pasta.jpg", alt: "파스타" },
      { url: "img/food/pizza.jpg", alt: "피자" },
      { url: "img/food/porkBelly.jpg", alt: "삼겹살" },
      { url: "img/food/Jajangmyeon.jpg", alt: "짜장면" },
      { url: "img/food/PorkFeet.jpg", alt: "족발" },
      { url: "img/food/tteokbokki.jpg", alt: "떡볶이" },
      { url: "img/food/Yukgaejang.jpg", alt: "육개장" },
      { url: "img/food/ramen.jpg", alt: "라면" },
  ];
  imageUrlsK.forEach((imageInfo) => {
      const image = document.createElement("img");
      image.src = imageInfo.url;
      image.alt = imageInfo.alt;
      image.addEventListener("click", handleImageClick);
      aacBot.appendChild(image);
  });

}
function showHobby() {
  const imageUrlsK = [
      { url:  "img/hobby/badminton.jpg", alt: "배드민턴" },
      { url:  "img/hobby/baseball.jpg", alt: "야구" },
      { url:  "img/hobby/basketball.jpg", alt: "농구" },
      { url:  "img/hobby/board.jpg", alt: "보드게임" },
      { url:  "img/hobby/bowling.jpg", alt: "볼링" },
      { url:  "img/hobby/fishing.jpg", alt: "낚시" },
      { url:  "img/hobby/game.jpg", alt: "게임" },
      { url:  "img/hobby/golf.jpg", alt: "골프" },
      { url:  "img/hobby/guitar.jpg", alt: "기타" },
      { url:  "img/hobby/lego.jpg", alt: "레고" },
      { url:  "img/hobby/movie.jpg", alt: "영W화" },
      { url:  "img/hobby/sing.jpg", alt: "노래" },
      { url:  "img/hobby/soccer.jpg", alt: "축구" },
      { url:  "img/hobby/swim.jpg", alt: "수영" },
      { url:  "img/hobby/travel.jpg", alt: "여행" },

  ];
  imageUrlsK.forEach((imageInfo) => {
      const image = document.createElement("img");
      image.src = imageInfo.url;
      image.alt = imageInfo.alt;
      image.addEventListener("click", handleImageClick);
      aacBot.appendChild(image);
  });

}
function showPlace() {
  const imageUrlsK = [
      { url: "img/place/bakery.jpg", alt: "빵집" },
      { url: "img/place/bank.jpg", alt: "은행" },
      { url: "img/place/bookshop.jpg", alt: "서점" },
      { url: "img/place/cafe.jpg", alt: "카페" },
      { url: "img/place/church.jpg", alt: "교회" },
      { url: "img/place/dentist.jpg", alt: "치과" },
      { url: "img/place/gym.jpg", alt: "체육관" },
      { url: "img/place/mart.jpg", alt: "마트" },
      { url: "img/place/park.jpg", alt: "공원" },
      { url: "img/place/pcRoom.jpg", alt: "피씨방" },
      { url: "img/place/pharmacy.jpg", alt: "약국" },
      { url: "img/place/salon.jpg", alt: "미용실" },
      { url: "img/place/school.jpg", alt: "학교" },
      { url: "img/place/zoo.jpg", alt: "동물원" },
      { url: "img/place/policestation.jpg", alt: "경찰서" },
      
  ];
  imageUrlsK.forEach((imageInfo) => {
      const image = document.createElement("img");
      image.src = imageInfo.url;
      image.alt = imageInfo.alt;
      image.addEventListener("click", handleImageClick);
      aacBot.appendChild(image);
  });

}
function showWeather() {
  const imageUrlsK = [
      { url: "img/weather/cloudy.jpg", alt: "구름" },
      { url: "img/weather/blur.jpg", alt: "흐림" },
      { url: "img/weather/fog.jpg", alt: "안개" },
      { url: "img/weather/hot.jpg", alt: "폭염" },
      { url: "img/weather/rain.jpg", alt: "비" },
      { url: "img/weather/snow.jpg", alt: "눈" },
      { url: "img/weather/sun.jpg", alt: "해" },
      { url: "img/weather/sunny.jpg", alt: "맑음" },
      { url: "img/weather/warm.jpg", alt: "따뜻" },
      { url: "img/weather/windy.jpg", alt: "바람" },      
  ];
  // 이미지를 순회하며 삽입
  imageUrlsK.forEach((imageInfo) => {
      const image = document.createElement("img");
      image.src = imageInfo.url;
      image.alt = imageInfo.alt;
      image.addEventListener("click", handleImageClick);
      aacBot.appendChild(image);
  });

}

 
//주어버튼 누를 시 함수
subjectBtn.addEventListener("click", ()=>{
  aacBot.innerHTML = "";
  showSubject();
})
//aac버튼 누를 시 함수
aacBtn.addEventListener("click", ()=>{
  aacBot.innerHTML = "";    
  
  if(aacKind=="exercise") {
    showHobby();
  }
  else if(aacKind=="daily life") {
    showDailylife();
  }
  else if(aacKind=="meals") {
    showFood();
  }
  else if(aacKind=="places") {
    showPlace();
  }
  else if(aacKind=="weather") {
    showWeather();
  }
  else {
    console.log("aac에 맞는 카테고리가 없어요!");
  }
  
})
//동사버튼 누를 시 함수
verbBtn.addEventListener("click", ()=>{
  aacBot.innerHTML = "";
  showVerb();  
})




}); //여기가 브라우저 실행 후 실행되는 코드 마지막

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



