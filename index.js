// Define o perfil ativo no localStorage
// Parâmetros:
//   nome: string com o nome do perfil selecionado
//   imagem: string com o caminho da imagem do perfil selecionado
function setPerfilAtivo(nome, imagem) {
  // Salva o nome do perfil ativo no localStorage
  localStorage.setItem('perfilAtivoNome', nome);
  // Salva o caminho da imagem do perfil ativo no localStorage
  localStorage.setItem('perfilAtivoImagem', imagem);
}

// Utilitário para obter e salvar perfis customizados no localStorage
function getPerfisCustomizados() {
  return JSON.parse(localStorage.getItem('perfisCustomizados') || '[]');
}
function salvarPerfisCustomizados(perfis) {
  localStorage.setItem('perfisCustomizados', JSON.stringify(perfis));
}

// Função para criar elemento de perfil customizado
function criarElementoPerfilCustomizado(perfil, idx) {
  const li = document.createElement('li');
  li.className = 'profile custom-profile';
  li.setAttribute('role', 'button');
  li.setAttribute('tabindex', '0');
  li.setAttribute('aria-label', `Perfil ${perfil.nome}`);
  const a = document.createElement('a');
  a.href = 'catalogo/catalogo.html';
  a.style.display = 'block';
  a.style.textDecoration = 'none';
  a.style.color = 'inherit';
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = perfil.imagem || 'assets/perfil 1.jpg';
  img.alt = `Avatar do perfil ${perfil.nome}`;
  const figcaption = document.createElement('figcaption');
  figcaption.textContent = perfil.nome;
  // Botão de excluir (ícone lixeira estilizado)
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-profile-btn';
  deleteBtn.title = 'Excluir perfil';
  // SVG de lixeira estilizado para fundo escuro
  deleteBtn.innerHTML = `
    <svg width="18" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;">
      <path d="M3 6h18" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <rect x="5" y="6" width="14" height="15" rx="2.5" stroke="#fff" stroke-width="2" fill="none"/>
      <rect x="9" y="3" width="6" height="3" rx="1.5" stroke="#fff" stroke-width="2" fill="none"/>
      <line x1="10" y1="11" x2="10" y2="17" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <line x1="14" y1="11" x2="14" y2="17" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;
  deleteBtn.style.marginLeft = '1.7rem';
  deleteBtn.style.background = 'none';
  deleteBtn.style.border = 'none';
  deleteBtn.style.cursor = 'pointer';
  deleteBtn.style.padding = '2px';
  deleteBtn.style.display = 'inline-flex';
  deleteBtn.style.alignItems = 'center';
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    const perfis = getPerfisCustomizados();
    perfis.splice(idx, 1);
    salvarPerfisCustomizados(perfis);
    li.remove();
  });
  figcaption.appendChild(deleteBtn);
  figure.appendChild(img);
  figure.appendChild(figcaption);
  a.appendChild(figure);
  a.addEventListener('click', () => {
    setPerfilAtivo(perfil.nome, img.src);
  });
  li.appendChild(a);
  return li;
}

document.addEventListener('DOMContentLoaded', () => {
  // Adiciona evento para armazenar perfil ativo nos perfis existentes
  const profileElements = document.querySelectorAll('.profile');
  profileElements.forEach(profile => {
    const link = profile.querySelector('a');
    const img = profile.querySelector('img');
    const caption = profile.querySelector('figcaption');
    if (link && img && caption) {
      link.addEventListener('click', () => {
        setPerfilAtivo(caption.childNodes[0].textContent.trim(), img.src);
      });
    }
  });

  // Renderiza perfis customizados
  const ul = document.querySelector('.profiles');
  const addProfileLi = document.querySelector('.add-profile');
  const perfisCustomizados = getPerfisCustomizados();
  perfisCustomizados.forEach((perfil, idx) => {
    const novoPerfil = criarElementoPerfilCustomizado(perfil, idx);
    ul.insertBefore(novoPerfil, addProfileLi);
  });

  // Evento para adicionar novo perfil
  if (addProfileLi) {
    addProfileLi.addEventListener('click', function handleAddProfileClick(e) {
      e.stopPropagation();
      // Substitui o conteúdo do botão por um input e botão de confirmação
      addProfileLi.innerHTML = '';
      addProfileLi.style.cursor = 'default';
      const label = document.createElement('label');
      label.textContent = 'Novo perfil:';
      label.style.color = '#00a8ff'; // azul padrão do projeto para o texto 'Novo perfil'
      label.style.fontWeight = '600';
      label.style.marginBottom = '0.5rem';
      const input = document.createElement('input');
      input.id = 'new-profile-name';
      input.type = 'text';
      input.placeholder = 'Digite o nome';
      input.style.padding = '0.5rem 1rem';
      input.style.borderRadius = '8px';
      input.style.border = '1px solid #00a8ff';
      input.style.outline = 'none';
      input.style.fontSize = '1rem';
      input.style.width = '80%';
      input.style.maxWidth = '140px';
      input.style.textAlign = 'center';
      input.style.color = '#222';
      input.style.background = '#e8f4ff';
      input.style.marginBottom = '0.5rem';
      const btn = document.createElement('button');
      btn.textContent = 'Adicionar';
      btn.style.padding = '0.4rem 1.2rem';
      btn.style.borderRadius = '8px';
      btn.style.border = 'none';
      btn.style.background = '#00a8ff';
      btn.style.color = '#fff';
      btn.style.fontWeight = '600';
      btn.style.cursor = 'pointer';
      btn.style.fontSize = '1rem';
      btn.style.marginTop = '0.2rem';
      btn.addEventListener('click', function() {
        const nome = input.value;
        if (nome && nome.trim()) {
          // Seleciona aleatoriamente uma das quatro imagens de perfil
          const imagensPerfil = [
            './assets/perfil-1.jpg',
            './assets/perfil-2.jpg',
            './assets/perfil-3.jpg',
            './assets/perfil-4.jpg'
          ];
          const imagemAleatoria = imagensPerfil[Math.floor(Math.random() * imagensPerfil.length)];
          const novoPerfil = { nome: nome.trim(), imagem: imagemAleatoria };
          const perfis = getPerfisCustomizados();
          perfis.push(novoPerfil);
          salvarPerfisCustomizados(perfis);
          ul.insertBefore(criarElementoPerfilCustomizado(novoPerfil, perfis.length - 1), addProfileLi);
          restaurarAddProfileLi();
        } else {
          input.focus();
        }
      });
      // Função para restaurar o botão original
      function restaurarAddProfileLi() {
        addProfileLi.innerHTML = `<figure>\
  <div class="add-profile-icon" aria-hidden="true" style="display: flex; align-items: center; justify-content: center; height: 140px;">\
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\
      <circle cx="12" cy="12" r="11" stroke="#00a8ff" stroke-width="2" fill="none"/>\
      <path d="M12 8v8M8 12h8" stroke="#00a8ff" stroke-width="2" stroke-linecap="round"/>\
    </svg>\
  </div>\
  <figcaption style="text-align: center; color: #00a8ff; font-weight: 600;">Adicionar outro perfil</figcaption>\
</figure>`;
        addProfileLi.style.cursor = 'pointer';
      }
      addProfileLi.appendChild(label);
      addProfileLi.appendChild(input);
      addProfileLi.appendChild(btn);
      input.focus();
      // Se perder o foco do input e botão, restaura o botão original
      input.addEventListener('blur', function(e) {
        setTimeout(() => {
          if (document.activeElement !== btn) {
            restaurarAddProfileLi();
          }
        }, 200);
      });
      btn.addEventListener('blur', function(e) {
        setTimeout(() => {
          if (document.activeElement !== input) {
            restaurarAddProfileLi();
          }
        }, 200);
      });
    });
  }
});

// Aguarda o carregamento completo da página
window.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash-screen');

    // Verifica se a animação já rodou nesta sessão
    if (sessionStorage.getItem('splash_executada')) {
        // Se já rodou, remove a splash na hora (sem animação)
        splash.style.display = 'none';
    } else {
        // Se é a primeira vez, executa os 3 segundos
        setTimeout(() => {
            splash.style.display = 'none';
            // Salva na "memória" que a animação já foi exibida
            sessionStorage.setItem('splash_executada', 'true');
        }, 3000);
    }
});