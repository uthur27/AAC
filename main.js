function loginPage() {
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  // 소켓 연결
  const socket = io("http://localhost:3000");

  // 폼 요소에 대한 참조 가져오기
  const loginForm = document.getElementById("login-form");

  // 폼 제출 이벤트 리스너 등록
  loginForm.addEventListener("submit", (event) => {
    // 폼의 기본 동작 방지 (페이지 새로고침 방지)
    event.preventDefault();

    // 입력된 사용자 이름 가져오기
    const userNameInput = document.querySelector('input[name="userName"]');
    const userName = userNameInput.value;

    // 서버로 사용자 이름 전송
    socket.emit("setUsername", userName);

    // 여기에서 사용자 이름을 저장하거나 필요한 동작 수행
    console.log("Logged in as:", userName);

    // 예를 들어 쿠키에 사용자 이름 저장
    document.cookie = `userName=${userName}; path=/`;

    // 페이지 전환 (chat.html로 이동)
    window.location.href = "chat.html";
  });
});
