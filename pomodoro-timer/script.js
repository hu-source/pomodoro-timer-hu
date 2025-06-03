const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const modeButtons = document.querySelectorAll('.mode-selector button');

let timer;
let isRunning = false;
let currentMode = 'pomodoro';
let timeLeft = 25 * 60; // デフォルトは25分

// モード選択時の処理
modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        modeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentMode = button.id;
        setTime(currentMode);
        if (!isRunning) {
            updateDisplay();
        }
    });
});

// モードに応じた時間を設定
function setTime(mode) {
    switch(mode) {
        case 'pomodoro':
            timeLeft = 25 * 60;
            break;
        case 'short-break':
            timeLeft = 5 * 60;
            break;
        case 'long-break':
            timeLeft = 15 * 60;
            break;
    }
}

// タイマーの更新
function updateTimer() {
    if (timeLeft <= 0) {
        stopTimer();
        return;
    }
    timeLeft--;
    updateDisplay();
}

// 表示の更新
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

// タイマーの開始
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

// タイマーの停止
function stopTimer() {
    isRunning = false;
    clearInterval(timer);
}

// タイマーのリセット
function resetTimer() {
    stopTimer();
    setTime(currentMode);
    updateDisplay();
}

// ボタンのイベントリスナー
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

// 初期化
modeButtons[0].classList.add('active');
updateDisplay();
