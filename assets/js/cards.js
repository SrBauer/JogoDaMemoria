// Função para embaralhar as cartas
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para criar as cartas
function createCards(cards) {
    const memoryGame = document.querySelector('.memory-game');
    cards.forEach(card => {
        // Criação de dois cards para formar o par
        for (let i = 0; i < 2; i++) {
            const memoryCard = document.createElement('div');
            memoryCard.classList.add('memory-card');
            memoryCard.setAttribute('data-card', card.id);

            const frontFace = document.createElement('img');
            frontFace.classList.add('front-face');
            frontFace.src = card.image;

            const backFace = document.createElement('img');
            backFace.classList.add('back-face');
            backFace.src = 'img/back.png';

            memoryCard.appendChild(frontFace);
            memoryCard.appendChild(backFace);
            memoryGame.appendChild(memoryCard);
        }
    });
}

// Carregar o JSON e criar as cartas
fetch('cards.json')
    .then(response => response.json())
    .then(data => {
        const shuffledCards = shuffle(data.cards);
        createCards(shuffledCards);
    })
    .catch(error => console.error('Erro ao carregar as cartas:', error));
