// Importa função utilitária para extrair o ID do YouTube
import { getYouTubeId } from '../utils.js';

// Cria um card de filme/série para o carrossel
export function createCard(item) {
    // Cria o elemento principal do card
    const card = document.createElement('div');
    card.className = 'movie-card';
    // Se o item possui progresso, adiciona classe para barra de progresso
    if ('progress' in item) {
        card.classList.add('has-progress');
    }

    // Imagem de capa do conteúdo
    const img = document.createElement('img');
    img.src = item.img;
    img.alt = item.nome ? `Capa do filme ou série: ${item.nome}` : 'Capa do conteúdo';

    // Iframe para exibir trailer do YouTube
    const iframe = document.createElement('iframe');
    iframe.frameBorder = "0";
    iframe.allow = "autoplay; encrypted-media";

    // Extrai o ID do vídeo do YouTube
    const videoId = getYouTubeId(item.youtube);

    // Adiciona o iframe e a imagem ao card
    card.appendChild(iframe);
    card.appendChild(img);

    // Container dos detalhes do card (botões, nome, tags, descrição)
    const details = document.createElement('div');
    details.className = 'card-details';
    
    // Renderização do nome do conteúdo, com ajuste específico para Monarch
    let nomeHtml;
    if (item.nome === 'Monarch: Legado dos Monstros') {
        nomeHtml = `<div class="details-nome" data-monarch>${item.nome} ${item.resolucao ? `<span class='resolucao-icone'>${getResIcon(item.resolucao)}</span>` : ''}</div>`;
    } else {
        nomeHtml = item.nome ? `<div class="details-nome">${item.nome} ${item.resolucao ? `<span class='resolucao-icone'>${getResIcon(item.resolucao)}</span>` : ''}</div>` : '';
    }
    // Monta o HTML dos detalhes do card
    details.innerHTML = `
        <div class="details-buttons">
            <div class="left-buttons">
                <button class="btn-icon btn-play-icon"><i class="fas fa-play" style="margin-left:2px;"></i></button>
                ${item.progress ? '<button class="btn-icon"><i class="fas fa-check"></i></button>' : ''}
                <button class="btn-icon"><i class="fas fa-thumbs-up"></i></button>
            </div>
            <div class="right-buttons">
                <button class="btn-icon"><i class="fas fa-chevron-down"></i></button>
            </div>
        </div>
        ${nomeHtml}
        <div class="details-tags">
            ${(item.generos && Array.isArray(item.generos)) ? item.generos.map(g => `<span>${g}</span>`).join('') : '<span>Empolgante</span>'}
        </div>
        ${item.breveDescricao ? `<div class="details-breve-descricao">${item.breveDescricao}</div>` : ''}
    `;

    // Função utilitária para retornar o ícone de resolução
    function getResIcon(res) {
        if (!res) return '';
        let label = '';
        if (res === 'HD') label = 'HD';
        else if (res === 'UHD') label = 'UHD';
        else if (res === '4K') label = '4K';
        else return '';
        return `<span class='resolucao-icone-caixa' title='${label}${res === '4K' ? ' Ultra HD' : res === 'UHD' ? ' Ultra HD' : ''}'>${label}</span>`;
    }
    // Adiciona os detalhes ao card
    card.appendChild(details);

    // Se houver progresso, adiciona barra de progresso ao card
    if ('progress' in item) {
        const pbContainer = document.createElement('div');
        pbContainer.className = 'progress-bar-container';
        const pbValue = document.createElement('div');
        pbValue.className = 'progress-value';
        pbValue.style.width = `${item.progress}%`;
        pbContainer.appendChild(pbValue);
        card.appendChild(pbContainer);
    }

    // Controla o timeout para iniciar o trailer ao passar o mouse
    let playTimeout;
    card.addEventListener('mouseenter', () => {
        // Ajusta a origem da transformação para evitar corte nas bordas
        const rect = card.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        
        if (rect.left < 100) {
            card.classList.add('origin-left');
        } else if (rect.right > windowWidth - 100) {
            card.classList.add('origin-right');
        }

        // Após 600ms, inicia o trailer do YouTube e esconde a imagem
        playTimeout = setTimeout(() => {
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${videoId}`;
            iframe.classList.add('playing');
            img.classList.add('playing-video');
        }, 600);
    });

    // Ao sair do card, para o trailer e restaura a imagem
    card.addEventListener('mouseleave', () => {
        clearTimeout(playTimeout);
        iframe.classList.remove('playing');
        img.classList.remove('playing-video');
        iframe.src = "";
        card.classList.remove('origin-left');
        card.classList.remove('origin-right');
    });

    // Retorna o elemento do card pronto para uso
    return card;
}
