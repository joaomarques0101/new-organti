const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const typingIndicator = document.getElementById('typing-indicator');
const themeToggle = document.getElementById('theme-toggle');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  addMessage('user', message);
  input.value = '';
  showTyping();
  simulateBotResponse(message);
});

function addMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);

  const avatar = document.createElement('div');
  avatar.classList.add('avatar');
  avatar.textContent = sender === 'user' ? '🧑' : '🤖';

  const content = document.createElement('div');
  content.classList.add('message-content');
  content.innerHTML = `<strong>${sender === 'user' ? 'Você' : 'Organti IA'}:</strong><br>${text}`;

  msgDiv.appendChild(avatar);
  msgDiv.appendChild(content);
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping() {
  typingIndicator.classList.remove('hidden');
}

function hideTyping() {
  typingIndicator.classList.add('hidden');
}

function simulateBotResponse(userMessage) {
  setTimeout(() => {
    hideTyping();
    addMessage('bot', 'Resposta simulada da Organti IA.');
  }, 1500);
}

// Tema Claro/Escuro
function setTheme(theme) {
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(theme);
  localStorage.setItem('theme', theme);
  themeToggle.textContent = theme === 'dark' ? '🌙 Modo Escuro' : '☀️ Modo Claro';
}

// Alternar Tema
themeToggle.addEventListener('click', () => {
  const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});

// Carregar tema salvo
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);
});
