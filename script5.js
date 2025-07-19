// Inicializa o gráfico de contas a pagar
const ctxFinance = document.getElementById('financeChart').getContext('2d');
let financeChart = new Chart(ctxFinance, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'Contas a Pagar (R$)',
      data: [],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});

// Inicializa o gráfico de poupança
const ctxSavings = document.getElementById('savingsChart').getContext('2d');
let savingsChart = new Chart(ctxSavings, {
  type: 'pie',
  data: {
    labels: ['Poupança', 'Gasto Total'],
    datasets: [{
      data: [0, 0], // Inicialmente vazio
      backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true
  }
});

// Array para armazenar as contas
let bills = [];
let savingsAmount = 0;

// Função para adicionar conta
function addBill(event) {
  event.preventDefault();
  const description = document.getElementById('billDescription').value.trim();
  const amount = parseFloat(document.getElementById('billAmount').value) || 0;

  if (description === "" || amount <= 0) {
    alert("Preencha os campos corretamente!");
    return;
  }

  bills.push({ description, amount });

  document.getElementById('billDescription').value = "";
  document.getElementById('billAmount').value = "";

  updateBillTable();
  updateCharts();
}

// Atualiza a tabela de contas
function updateBillTable() {
  const tableBody = document.getElementById('billTable');
  tableBody.innerHTML = "";
  let total = 0;

  bills.forEach((bill, index) => {
    total += bill.amount;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${bill.description}</td>
      <td>R$ ${bill.amount.toFixed(2)}</td>
      <td><button class="btn btn-danger btn-sm" onclick="deleteBill(${index})">Excluir</button></td>
    `;
    tableBody.appendChild(row);
  });

  document.getElementById('totalBills').textContent = `R$ ${total.toFixed(2)}`;
}

// Remove conta e atualiza gráficos
function deleteBill(index) {
  bills.splice(index, 1);
  updateBillTable();
  updateCharts();
}

// Função para atualizar os gráficos
function updateCharts() {
  // Atualiza gráfico de contas a pagar
  financeChart.data.labels = bills.map(bill => bill.description);
  financeChart.data.datasets[0].data = bills.map(bill => bill.amount);
  financeChart.update();

  // Calcula total de contas e atualiza gráfico de poupança
  let totalBills = bills.reduce((sum, bill) => sum + bill.amount, 0);
  savingsChart.data.datasets[0].data = [savingsAmount, totalBills];
  savingsChart.update();
}

// Função para calcular saldo e atualizar gráfico de poupança
function calculate() {
  const salary = parseFloat(document.getElementById('salary').value) || 0;
  savingsAmount = parseFloat(document.getElementById('savings').value) || 0;

  if (salary <= 0 || savingsAmount < 0) {
    alert("Digite valores válidos para salário e poupança.");
    return;
  }

  document.getElementById('result').innerHTML = `<h3>Saldo Disponível: R$ ${(salary - savingsAmount).toFixed(2)}</h3>`;

  updateCharts();
}
// Modificamos updateCharts() para chamar updateSummary()
function updateCharts() {
    financeChart.data.labels = bills.map(bill => bill.description);
    financeChart.data.datasets[0].data = bills.map(bill => bill.amount);
    financeChart.update();
  
    let totalBills = bills.reduce((sum, bill) => sum + bill.amount, 0);
    savingsChart.data.datasets[0].data = [savingsAmount, totalBills];
    savingsChart.update();
  
    updateSummary();
  }
  // Atualiza o resumo financeiro
function updateSummary() {
    let totalReceived = parseFloat(document.getElementById('salary').value) || 0;
    let totalPaid = bills.reduce((sum, bill) => sum + bill.amount, 0);
    let totalSavings = savingsAmount;
    let finalBalance = totalReceived - totalPaid - totalSavings;
  
    document.getElementById('totalReceived').textContent = totalReceived.toFixed(2);
    document.getElementById('totalPaid').textContent = totalPaid.toFixed(2);
    document.getElementById('totalSavings').textContent = totalSavings.toFixed(2);
    
    let finalBalanceElement = document.getElementById('finalBalance');
    finalBalanceElement.textContent = finalBalance.toFixed(2);
  
    // Muda a cor do saldo final dependendo se é positivo ou negativo
    if (finalBalance < 0) {
      finalBalanceElement.classList.add('negative');
    } else {
      finalBalanceElement.classList.remove('negative');
    }
  }
  