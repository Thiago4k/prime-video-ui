// Importa as categorias de conteúdo e a função de criação de carrossel
import { categories } from './data.js';
import { createCarousel } from './components/Carousel.js';

// Executa o código após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    // Recupera o nome e imagem do perfil ativo do localStorage
    const nomePerfil = localStorage.getItem('perfilAtivoNome');
    const imagemPerfil = localStorage.getItem('perfilAtivoImagem');

    // Se houver perfil ativo, atualiza o nome e a imagem no header
    if (nomePerfil && imagemPerfil) {
        const kidsLink = document.querySelector('.kids-link');
        const profileIcon = document.querySelector('.profile-icon');
        
        if (kidsLink) kidsLink.textContent = nomePerfil;
        if (profileIcon) profileIcon.src = imagemPerfil;
    }

    // Seleciona o container principal onde os carrosséis serão inseridos
    const container = document.getElementById('main-content');
    
    if (container) {
        // Para cada categoria, cria e adiciona um carrossel
        categories.forEach((category, idx) => {
            if (idx > 0) {
                // Adiciona linha divisória azul clara entre seções
                const divider = document.createElement('hr');
                divider.className = 'section-divider';
                container.appendChild(divider);
            }
            // Cria o carrossel da categoria e adiciona ao container
            const carousel = createCarousel(category);
            container.appendChild(carousel);
        });
    }
});
