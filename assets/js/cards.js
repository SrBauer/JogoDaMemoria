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

// Função para inicializar o jogo
function initGame() {
    fetch('assets/json/cards.json')
        .then(response => response.json())
        .then(data => {
            const shuffledCards = shuffle(data.cards);
            createCards(shuffledCards);
            addEventListeners();
        })
        .catch(error => console.error('Erro ao carregar as cartas:', error));
}

// Função para adicionar event listeners
function addEventListeners() {
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => card.addEventListener('click', flipCard));
}

// Função para virar a carta
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Variáveis globais
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Função para verificar se as cartas são iguais
function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;

    isMatch ? disableCards() : unflipCards();
}

// Função para desabilitar as cartas quando são iguais
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

// Função para desvirar as cartas quando não são iguais
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

// Função para resetar o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Inicializar o jogo quando a página carregar
document.addEventListener('DOMContentLoaded', initGame);
