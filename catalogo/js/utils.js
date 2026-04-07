// Extrai o ID do vídeo do YouTube a partir de uma URL
// Se não houver URL, retorna um ID padrão
export function getYouTubeId(url) {
    if (!url) return "7RUA0IOfar8";
    if (url.includes('v=')) {
        // Para URLs do tipo ?v=ID
        return url.split('v=')[1].split('&')[0];
    }
    // Para URLs do tipo .../ID
    return url.split('/').pop();
}

