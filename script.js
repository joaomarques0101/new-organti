document.addEventListener('DOMContentLoaded', () => {
  // Toggle da sidebar no mobile
  const toggleBtn = document.getElementById('toggleSidebar');
  const sidebar = document.querySelector('.sidebar');
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Gráfico de Pizza (Pie Chart)
  const pieCtx = document.getElementById('pieChart').getContext('2d');
  new Chart(pieCtx, {
    type: 'pie',
    data: {
      labels: ['Custos Fixos', 'Custos Variáveis', 'Investimento', 'Gastos'],
      datasets: [{
        data: [30, 25, 20, 25],
        backgroundColor: ['#3498db', '#e67e22', '#2ecc71', '#9b59b6']
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } }
    }
  });

  // Gráfico de Barras (Bar Chart)
  const barCtx = document.getElementById('barChart').getContext('2d');
  new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril'],
      datasets: [
        { label: 'Orçamento Total', data: [50000, 40000, 45000, 60000], backgroundColor: '#3498db' },
        { label: 'Gasto até o momento', data: [30000, 25000, 20000, 40000], backgroundColor: '#e67e22' }
      ]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } },
      plugins: { legend: { position: 'bottom' } }
    }
  });

  // Gráfico de Linhas (Line Chart)
  const lineCtx = document.getElementById('lineChart').getContext('2d');
  new Chart(lineCtx, {
    type: 'line',
    data: {
      labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
      datasets: [{
        label: 'Meta Atingida (%)',
        data: [60, 70, 80, 90],
        fill: false,
        borderColor: '#2ecc71',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true, max: 100 } },
      plugins: { legend: { position: 'bottom' } }
    }
  });

  // Gráfico de Barras Horizontais
  const horizontalBarCtx = document.getElementById('horizontalBarChart').getContext('2d');
  new Chart(horizontalBarCtx, {
    type: 'bar',
    data: {
      labels: ['Projeto X', 'Projeto Y', 'Projeto Z'],
      datasets: [{
        label: 'Progresso (%)',
        data: [40, 75, 60],
        backgroundColor: ['#9b59b6', '#1abc9c', '#f1c40f']
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      scales: { x: { beginAtZero: true, max: 100 } },
      plugins: { legend: { position: 'bottom' } }
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleSidebar');
  const sidebar = document.querySelector('.sidebar');

  // Ao clicar no botão, alterna a classe 'open' na sidebar
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Fechar sidebar ao clicar em algum link (apenas em telas pequenas)
  const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
    });
  });
});
