// script.js

// Obtemos referências dos elementos HTML
const monthYearEl = document.getElementById("monthYear");
const calendarBody = document.getElementById("calendarBody");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Data atual (vamos começar exibindo o mês/ano atuais, mas pode fixar em 2025 se quiser)
let currentDate = new Date();

// Dia selecionado (guardaremos no formato "YYYY-MM-DD" para usar como chave no localStorage)
let selectedDate = formatDate(currentDate);

// Carrega as tarefas do localStorage (ou cria um objeto vazio se não houver nada)
let tasksData = JSON.parse(localStorage.getItem("tasksData")) || {};

// ------------------ Funções de Calendário ------------------

// Função para renderizar o calendário do mês/ano atual
function renderCalendar(date) {
  // Definimos para o dia 1 do mês atual
  date.setDate(1);

  // Mês e ano
  const year = date.getFullYear();
  const month = date.getMonth(); // 0 = Janeiro, 1 = Fevereiro, etc.

  // Texto do cabeçalho (Ex: "Março 2025")
  const monthName = date.toLocaleString("pt-BR", { month: "long" });
  monthYearEl.textContent = `${capitalizeFirstLetter(monthName)} de ${year}`;

  // Limpar o corpo do calendário antes de renderizar
  calendarBody.innerHTML = "";

  // Descobrir o dia da semana do primeiro dia do mês (0 = domingo, 6 = sábado)
  const firstDayOfWeek = date.getDay();

  // Número de dias no mês
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Vamos criar as linhas (semanas) dinamicamente
  let row = document.createElement("tr");
  let dayCellCount = 0;

  // Preencher espaços em branco antes do primeiro dia (se o mês não começar em domingo)
  for (let i = 0; i < firstDayOfWeek; i++) {
    const emptyCell = document.createElement("td");
    row.appendChild(emptyCell);
    dayCellCount++;
  }

  // Preencher os dias do mês
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("td");
    cell.textContent = day;

    // Formatar a data para comparar e salvar
    const cellDate = new Date(year, month, day);
    const cellDateString = formatDate(cellDate);

    // Se for a data selecionada, adicionar classe
    if (cellDateString === selectedDate) {
      cell.classList.add("selected-day");
    }

    // Ao clicar em um dia, definimos como data selecionada
    cell.addEventListener("click", () => {
      selectedDate = cellDateString;
      updateSelectedDay(); // Destaca visualmente
      renderTasks();       // Carrega tarefas
    });

    row.appendChild(cell);
    dayCellCount++;

    // Se chegamos ao fim da semana (7 colunas), criar nova linha
    if (dayCellCount % 7 === 0) {
      calendarBody.appendChild(row);
      row = document.createElement("tr");
    }
  }

  // Se sobrar espaço no final do mês, preencher com células vazias
  if (dayCellCount % 7 !== 0) {
    for (let i = dayCellCount % 7; i < 7; i++) {
      const emptyCell = document.createElement("td");
      row.appendChild(emptyCell);
    }
    calendarBody.appendChild(row);
  }
}

// Função para destacar a célula do dia selecionado
function updateSelectedDay() {
  const cells = calendarBody.querySelectorAll("td");
  cells.forEach((cell) => {
    cell.classList.remove("selected-day");
    // Comparar se o texto da célula + mês/ano bate com a selectedDate
    const day = cell.textContent;
    if (day) {
      const cellDateString = formatDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      );
      if (cellDateString === selectedDate) {
        cell.classList.add("selected-day");
      }
    }
  });
}

// Navegação entre meses
prevMonthBtn.addEventListener("click", () => {
  // Subtrai 1 mês
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
  updateSelectedDay();
});

nextMonthBtn.addEventListener("click", () => {
  // Soma 1 mês
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
  updateSelectedDay();
});

// ------------------ Funções de Tarefas ------------------

// Renderiza as tarefas do dia selecionado
function renderTasks() {
  // Limpa a lista
  taskList.innerHTML = "";

  // Obtemos as tarefas do dia selecionado (array) ou array vazio
  const dayTasks = tasksData[selectedDate] || [];

  // Cria um <li> para cada tarefa
  dayTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;

    // Botão de remover
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "x";
    removeBtn.classList.add("remove-btn");
    removeBtn.addEventListener("click", () => {
      removeTask(index);
    });

    li.appendChild(removeBtn);
    taskList.appendChild(li);
  });
}

// Adiciona nova tarefa
function addTask() {
  const newTask = taskInput.value.trim();
  if (newTask === "") return;

  // Se não existir array para a data selecionada, criamos
  if (!tasksData[selectedDate]) {
    tasksData[selectedDate] = [];
  }

  // Adiciona a tarefa no array
  tasksData[selectedDate].push(newTask);

  // Salva no localStorage
  saveTasks();

  // Limpa o input
  taskInput.value = "";

  // Atualiza a lista de tarefas
  renderTasks();
}

// Remove uma tarefa específica (pelo índice)
function removeTask(index) {
  tasksData[selectedDate].splice(index, 1);
  saveTasks();
  renderTasks();
}

// Salva o objeto tasksData no localStorage
function saveTasks() {
  localStorage.setItem("tasksData", JSON.stringify(tasksData));
}

// ------------------ Funções Utilitárias ------------------

// Formata uma data em "YYYY-MM-DD" (p. ex. 2025-03-05)
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Capitaliza a primeira letra de uma string (ex: "março" -> "Março")
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ------------------ Inicialização ------------------

// Evento para adicionar tarefas ao clicar no botão
addTaskBtn.addEventListener("click", addTask);

// Permitir adicionar tarefa ao pressionar Enter no input
taskInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Renderiza o calendário inicial
renderCalendar(currentDate);
// Destaca o dia atual
updateSelectedDay();
// Renderiza as tarefas do dia atual
renderTasks();
