// script.js

// Selecionar elementos
const foodNameInput = document.getElementById('foodName');
const foodCaloriesInput = document.getElementById('foodCalories');
const addFoodBtn = document.getElementById('addFoodBtn');
const foodListTbody = document.getElementById('foodList');
const totalCaloriesEl = document.getElementById('totalCalories');

// Carregar dados do Local Storage (ou criar array vazio)
let foods = JSON.parse(localStorage.getItem('foods')) || [];

// Renderizar tabela inicial
renderTable();

// 1. Função para adicionar alimento
function addFood() {
  const name = foodNameInput.value.trim();
  const calories = foodCaloriesInput.value.trim();

  // Validações simples
  if (!name || !calories) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  if (Number(calories) <= 0) {
    alert('O valor de calorias deve ser maior que zero!');
    return;
  }

  // Criar objeto alimento
  const newFood = {
    id: Date.now(),  // ID único
    name: name,
    calories: Number(calories)
  };

  // Adicionar ao array
  foods.push(newFood);

  // Salvar no localStorage
  saveToLocalStorage();

  // Limpar inputs
  foodNameInput.value = '';
  foodCaloriesInput.value = '';

  // Atualizar tabela
  renderTable();
}

// 2. Função para remover alimento
function removeFood(id) {
  // Filtrar o array, removendo o item com o ID
  foods = foods.filter((food) => food.id !== id);
  saveToLocalStorage();
  renderTable();
}

// 3. Função para renderizar a tabela e o total
function renderTable() {
  // Limpar corpo da tabela
  foodListTbody.innerHTML = '';

  // Se não houver alimentos, sai
  if (foods.length === 0) {
    totalCaloriesEl.textContent = '0';
    return;
  }

  // Percorrer array e criar linhas
  let total = 0;
  foods.forEach((food) => {
    const tr = document.createElement('tr');

    // Coluna: Nome
    const tdName = document.createElement('td');
    tdName.textContent = food.name;

    // Coluna: Calorias
    const tdCalories = document.createElement('td');
    tdCalories.textContent = food.calories;

    // Coluna: Botão de remover
    const tdActions = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = 'Remover';
    removeBtn.addEventListener('click', () => {
      removeFood(food.id);
    });
    tdActions.appendChild(removeBtn);

    // Monta a linha
    tr.appendChild(tdName);
    tr.appendChild(tdCalories);
    tr.appendChild(tdActions);

    // Adiciona a linha na tabela
    foodListTbody.appendChild(tr);

    // Acumula calorias
    total += food.calories;
  });

  // Atualizar o total no HTML
  totalCaloriesEl.textContent = total;
}

// 4. Função para salvar no Local Storage
function saveToLocalStorage() {
  localStorage.setItem('foods', JSON.stringify(foods));
}

// Eventos
addFoodBtn.addEventListener('click', addFood);

// Permitir adicionar ao pressionar Enter no campo de calorias
foodCaloriesInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    addFood();
  }
});
