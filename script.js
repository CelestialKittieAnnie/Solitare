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
            cardElement.innerHTML = `
                <div class="top-left">${card.value} ${card.suit}</div>
                <div class="suit">${card.suit}</div>
                <div class="bottom-right">${card.value} ${card.suit}</div>
            `;
            cardElement.draggable = true; // Make card draggable
            cardElement.dataset.suit = card.suit;
            cardElement.dataset.value = card.value;
            gameBoard.appendChild(cardElement);
        });
    });

    // Drag-and-drop functionality
    let draggedCard = null;

    // Mouse events
    document.addEventListener('dragstart', event => {
        draggedCard = event.target;
    });

    document.addEventListener('dragover', event => {
        event.preventDefault();
    });

    document.addEventListener('drop', event => {
        if (event.target.className.includes('card')) {
            const targetCard = event.target;
            // Implement logic to check if move is valid based on solitaire rules
            // If valid, move draggedCard to targetCard's position
            const validMove = true; // Placeholder for actual move validation logic
            if (validMove) {
                const draggedIndex = Array.from(gameBoard.children).indexOf(draggedCard);
                const targetIndex = Array.from(gameBoard.children).indexOf(targetCard);
                gameBoard.insertBefore(draggedCard, targetIndex < draggedIndex ? targetCard : targetCard.nextSibling);
                draggedCard = null;
            }
        }
    });

    // Touch events
    document.addEventListener('touchstart', event => {
        if (event.target.className.includes('card')) {
            draggedCard = event.target;
            event.preventDefault();
        }
    });

    document.addEventListener('touchmove', event => {
        if (draggedCard) {
            const touch = event.touches[0];
            draggedCard.style.top = `${touch.clientY - 75}px`;
            draggedCard.style.left = `${touch.clientX - 50}px`;
            event.preventDefault();
        }
    });

    document.addEventListener('touchend', event => {
        if (draggedCard) {
            const touch = event.changedTouches[0];
            const targetCard = document.elementFromPoint(touch.clientX, touch.clientY);
            if (targetCard && targetCard.className.includes('card')) {
                // Implement logic to check if move is valid based on solitaire rules
                // If valid, move draggedCard to targetCard's position
                const validMove = true; // Placeholder for actual move validation logic
                if (validMove) {
                    const draggedIndex = Array.from(gameBoard.children).indexOf(draggedCard);
                    const targetIndex = Array.from(gameBoard.children).indexOf(targetCard);
                    gameBoard.insertBefore(draggedCard, targetIndex < draggedIndex ? targetCard : targetCard.nextSibling);
                    draggedCard = null;
                }
            } else {
                draggedCard.style.top = ''; // Reset position
                draggedCard.style.left = ''; // Reset position
                draggedCard = null;
            }
            event.preventDefault();
        }
    });

    function checkWinCondition() {
        // Check if all foundation piles are complete
        // Display winning message if game is won
    }
});
