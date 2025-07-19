let timer;
let milliseconds = 0;
let isRunning = false;

const display = document.getElementById('timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const toggleThemeBtn = document.getElementById('toggle-theme');

function updateTime() {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(totalSeconds % 60).padStart(2, '0');
  const ms = String(milliseconds % 1000).padStart(3, '0').substring(0, 2);

  display.textContent = `${hrs}:${mins}:${secs}:${ms}`;
}

startBtn.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      milliseconds += 10;
      updateTime();
    }, 10);
  }
});

pauseBtn.addEventListener('click', () => {
  isRunning = false;
  clearInterval(timer);
});

resetBtn.addEventListener('click', () => {
  isRunning = false;
  clearInterval(timer);
  milliseconds = 0;
  updateTime();
});

function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-theme');
    toggleThemeBtn.textContent = 'Modo Escuro';
  } else {
    document.body.classList.remove('light-theme');
    toggleThemeBtn.textContent = 'Modo Claro';
  }
}

toggleThemeBtn.addEventListener('click', () => {
  if (document.body.classList.contains('light-theme')) {
    applyTheme('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    applyTheme('light');
    localStorage.setItem('theme', 'light');
  }
});

window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);
  updateTime();
});
