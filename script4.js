// script.js

document.getElementById('saveDiary').addEventListener('click', function() {
    const diaryText = document.getElementById('diaryText').value;
    if (diaryText.trim() !== '') {
      // Exemplo: salva o texto no Local Storage
      localStorage.setItem('diaryEntry', diaryText);
      alert('Seu diário foi salvo com sucesso!');
      // Opcional: limpar o campo
      document.getElementById('diaryText').value = '';
    } else {
      alert('Por favor, conte como foi seu dia!');
    }
  });
  