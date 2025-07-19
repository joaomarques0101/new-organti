let display = document.getElementById("display");

function appendNumber(num) {
  if (display.innerText === "0") {
    display.innerText = num;
  } else {
    display.innerText += num;
  }
}

function appendOperator(op) {
  display.innerText += op;
}

function appendFunction(fn) {
  if (fn === 'sqrt') {
    display.innerText = `Math.sqrt(${display.innerText})`;
  } else {
    display.innerText = `Math.${fn}(${display.innerText})`;
  }
}

function clearDisplay() {
  display.innerText = "0";
}

function deleteLast() {
  let txt = display.innerText;
  display.innerText = txt.length > 1 ? txt.slice(0, -1) : "0";
}

function calculate() {
  try {
    let expression = display.innerText.replace('^', '**');
    let result = eval(expression);
    display.innerText = result;
  } catch (e) {
    display.innerText = "Erro";
  }
}
// Alternância de tema claro/escuro
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  const isDark = document.body.classList.contains('dark-mode');
  themeToggle.textContent = isDark ? '🌞 Modo Claro' : '🌙 Modo Escuro';
});
