// Importa a função responsável por criar um card de filme/série
import { createCard } from './Card.js';

// Cria um carrossel (slider) para uma categoria de filmes/séries
export function createCarousel(category) {
    // Cria o container principal da seção do carrossel
    const section = document.createElement('div');
    section.className = 'slider-section';

    // Cria o cabeçalho do carrossel (título e indicadores)
    const header = document.createElement('div');
    header.className = 'slider-header';

    // Título da categoria
    const title = document.createElement('h2');
    title.className = 'slider-title';
    title.innerText = category.title;

    // Indicadores de navegação do carrossel
    const indicators = document.createElement('div');
    indicators.className = 'slider-indicators';

    // Adiciona título e indicadores ao cabeçalho
    header.appendChild(title);
    header.appendChild(indicators);
    section.appendChild(header);

    // Cria a linha que irá conter os cards de filmes/séries
    const row = document.createElement('div');
    row.className = 'movie-row';

    // Para cada item da categoria, cria um card e adiciona à linha
    category.items.forEach(item => {
        const card = createCard(item);
        row.appendChild(card);
    });

    // Adiciona a linha de cards à seção principal
    section.appendChild(row);
    return section;
}
