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

// ==========================================
// 4. 조회수 증가 및 화면 표시 로직 (오늘 조회수 추가)
// ==========================================

// (1) 오늘 날짜 구하기 (YYYY-MM-DD 형식)
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const dateString = `${year}-${month}-${day}`; 

// (2) 데이터베이스 경로 설정
const totalViewCountRef = ref(database, 'views/homepage'); // 총 조회수 경로
const todayViewCountRef = ref(database, `views/daily/${dateString}`); // 오늘 조회수 경로 (날짜별 자동 생성)

// (3) 총 조회수 로직
runTransaction(totalViewCountRef, (currentValue) => {
    return (currentValue || 0) + 1;
}).then((result) => {
    if (result.committed && document.getElementById('count')) {
        document.getElementById('count').innerText = result.snapshot.val();
    }
}).catch((error) => {
    console.error("총 조회수 err:", error);
    if(document.getElementById('count')) document.getElementById('count').innerText = "error";
});

// (4) 오늘 조회수 로직
runTransaction(todayViewCountRef, (currentValue) => {
    return (currentValue || 0) + 1;
}).then((result) => {
    if (result.committed && document.getElementById('todaycount')) {
        document.getElementById('todaycount').innerText = result.snapshot.val();
    }
}).catch((error) => {
    console.error("오늘 조회수 err:", error);
    if(document.getElementById('todaycount')) document.getElementById('todaycount').innerText = "error";
});