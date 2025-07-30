const cardsArray = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍍', '🥝', '🍒'];
const gameBoard = document.querySelector('.game-board');
let flippedCards = [];
let matched = 0;

// Duplicate and shuffle cards
const gameCards = [...cardsArray, ...cardsArray].sort(() => 0.5 - Math.random());

function createCard(symbol) {
  const card = document.createElement('div');
  card.classList.add('card');

  const front = document.createElement('div');
  front.classList.add('front');
  front.textContent = symbol;

  const back = document.createElement('div');
  back.classList.add('back');
  back.textContent = '❓';

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', () => {
    if (
      card.classList.contains('flip') ||
      flippedCards.length === 2
    ) return;

    card.classList.add('flip');
    flippedCards.push({ card, symbol });

    if (flippedCards.length === 2) {
      if (flippedCards[0].symbol === flippedCards[1].symbol) {
        matched += 2;
        flippedCards = [];
        if (matched === gameCards.length) {
          setTimeout(() => alert('🎉 You won!'), 300);
        }
      } else {
        setTimeout(() => {
          flippedCards.forEach(item => item.card.classList.remove('flip'));
          flippedCards = [];
        }, 1000);
      }
    }
  });

  return card;
}

// Initialize board
gameCards.forEach(symbol => {
  const card = createCard(symbol);
  gameBoard.appendChild(card);
});
