//조회수
// 1. 최신 Firebase SDK 모듈 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getDatabase, ref, runTransaction } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
// 2. 내 Firebase 프로젝트 설정 값 입력하기
const firebaseConfig = {
    apiKey: "AIzaSyB2cDmycduaLvBEIIM6aZuPap8cXZb08wg",
    authDomain: "triz-count.firebaseapp.com",
    databaseURL: "https://triz-count-default-rtdb.firebaseio.com/",
    projectId: "triz-count",
    storageBucket: "triz-count.firebasestorage.app",
    messagingSenderId: "294128761658",
    appId: "1:294128761658:web:be65cbf5a0a9d87481ee03",
    measurementId: "G-E8WCTJPP7Q"
};

// 3. Firebase 및 데이터베이스 초기화
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

// 4. 조회수 증가 및 화면 표시 로직
const viewCountRef = ref(database, 'views/homepage');

runTransaction(viewCountRef, (currentValue) => {
    return (currentValue || 0) + 1;
}).then((result) => {
    if (result.committed) {
        // 성공 시 HTML의 id="count"인 태그에 조회수 대입
        document.getElementById('count').innerText = result.snapshot.val();
    }
}).catch((error) => {
    console.error("err:", error);
    document.getElementById('count').innerText = "error";
});

