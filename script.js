document.addEventListener('DOMContentLoaded', () => {
    const suits = ['♥', '♦', '♣', '♠'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
    const gameBoard = document.getElementById('game-board');
    let deck = [];

    // Create deck of cards
    suits.forEach((suit) => {
        values.forEach((value) => {
            deck.push({
                suit,
                value,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        });
    });

    // Shuffle deck
    deck.sort(() => 0.5 - Math.random());

    // Initialize game state
    const tableau = Array.from({ length: 7 }, () => []);
    const foundation = Array.from({ length: 4 }, () => []);
    const stock = [];
    const waste = [];

    // Deal cards to tableau
    let cardIndex = 0;
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j <= i; j++) {
            tableau[i].push(deck[cardIndex]);
            cardIndex++;
        }
    }

    // Add remaining cards to stock
    for (let i = cardIndex; i < deck.length; i++) {
        stock.push(deck[i]);
    }

    // Render tableau
    tableau.forEach((column, colIndex) => {
        column.forEach((card, rowIndex) => {
            const cardElement = document.createElement('div');
            cardElement.className = `card ${card.color}`;
            cardElement.style.top = `${rowIndex * 30}px`;
            cardElement.style.left = `${colIndex * 110}px`;
            cardElement.innerHTML = `<div class="value">${card.value}</div><div class="suit">${card.suit}</div>`;
            gameBoard.appendChild(cardElement);
        });
    });

    // Add event listeners and game logic
    // Implement game rules for moving cards, building foundation piles, and using the stockpile
    // Detailed implementation would be quite extensive, but here's a skeleton

    function moveCard(card, fromPile, toPile) {
        // Logic for moving cards
        // Check if the move is valid
        // Update game state
        // Render changes
    }

    function checkWinCondition() {
        // Check if all foundation piles are complete
        // Display winning message if game is won
    }

    // Example event listener for moving cards
    document.querySelectorAll('.card').forEach(cardElement => {
        cardElement.addEventListener('dragstart', event => {
            // Handle drag start
        });

        cardElement.addEventListener('dragover', event => {
            // Handle drag over
            event.preventDefault();
        });

        cardElement.addEventListener('drop', event => {
            // Handle drop
            // Move card if valid
            checkWinCondition();
        });
    });
});
