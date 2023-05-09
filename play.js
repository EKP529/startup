class Card {
    _num;
    _val;
    _suit;

    constructor(num, val, suit) {
        this._num = num;
        this._val = val;
        this._suit = suit;
    }

    get num() {
        return this._num;
    }

    get val() {
        return this._val;
    }

    get suit() {
        return this._suit;
    }
}
class Deck {
    _cards = [];

    constructor() {
        for (let i = 2; i <= 14; i++) {
            if (i <= 10) {
                this._cards.push(new Card(`${i}`, i,'♦'));
                this._cards.push(new Card(`${i}`, i,'♣'));
                this._cards.push(new Card(`${i}`, i,'♥'));
                this._cards.push(new Card(`${i}`, i,'♠'));
            }
            else {
                if (i === 11) {
                    this._cards.push(new Card('J',11,'♦'));
                    this._cards.push(new Card('J',11,'♣'));
                    this._cards.push(new Card('J',11,'♥'));
                    this._cards.push(new Card('J',11,'♠'));
                }
                else if (i === 12) {
                    this._cards.push(new Card('Q',12,'♦'));
                    this._cards.push(new Card('Q',12,'♣'));
                    this._cards.push(new Card('Q',12,'♥'));
                    this._cards.push(new Card('Q',12,'♠'));
                }
                else if (i === 13) {
                    this._cards.push(new Card('K',13,'♦'));
                    this._cards.push(new Card('K',13,'♣'));
                    this._cards.push(new Card('K',13,'♥'));
                    this._cards.push(new Card('K',13,'♠'));
                }
                else {
                    this._cards.push(new Card('A',14,'♦'));
                    this._cards.push(new Card('A',14,'♣'));
                    this._cards.push(new Card('A',14,'♥'));
                    this._cards.push(new Card('A',14,'♠'));
                }
            }
        }
        this.#shuffle();
    }

    #shuffle() {
        let currentIndex = this._cards.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [this._cards [currentIndex], this._cards [randomIndex]] = [
                this._cards [randomIndex], this._cards [currentIndex]];
        }
    }

    get cards() {
        return this._cards;
    }
}
class Pile {
    _cards = [];

    addCard(card) {
        this._cards.unshift(card);
    }

    clearPile() {
        const oldCards = [...this._cards];
        this._cards = [];
        return oldCards;
    }
}
class Player {
    _username;
    _hand = [];

    constructor(username) {
        this._username = username;
    }

    get username() {
        return this._username;
    }

    get hand() {
        return this._hand;
    }
    set hand(cards) {
        this._hand = cards;
    }
    numCardsInHand() {
        return this._hand.length;
    }

    addToHand(cards) {
        this._hand.push(cards);
    }
}
class Game {
    _deck;
    _pile;
    _players = [];
    _currPlayer;

    constructor() {
        this._deck = new Deck();
        this._pile = new Pile();

        // instantiate player
        this._players.push(new Player(localStorage.getItem('userName')));
        let playerNameEl = document.querySelector('#player1 > .player-name');
        playerNameEl.textContent = this._players[0].username;

        //instantiate opponents
        const oppsString = localStorage.getItem('oppUsernames');
        let opps = JSON.parse(oppsString);
        for (let i = 0; i < opps.length; i++) {
            this._players.push(new Player(opps[i]));
            playerNameEl = document.querySelector(`#player${i + 2} > .player-name`);
            playerNameEl.textContent = this._players[i + 1].username;
        }

        //divide deck for all players' hands
        let start = 0
        let numCards;
        let end = numCards = Math.floor((this._deck.cards.length / this._players.length));
        for (let i = 0; i < this._players.length; i++) {
            this._players[i].hand = this._deck.cards.slice(start, end);
            const playerNumCardsEl = document.querySelector(`#player${i + 1} > .cards-in-hand`);
            // await delay(1000);
            playerNumCardsEl.textContent = `${this._players[i].numCardsInHand()} cards`;
            start = end;
            end = start + numCards;
        }

        //show player's cards
        for (const card of this._players[0].hand) {
            this._displayCard(card, 'hand');
        }
    }

    _displayCard(card, parentId) {
        const cardInHandEl = document.createElement('li');
        // cardInHandEl.style.transform
        cardInHandEl.setAttribute('data-value', `${card.num} ${card.suit}`);
        const pEl = document.createElement('p');
        pEl.setAttribute('data-suit', `${card.suit}`);
        const numEl = document.createElement('span');
        numEl.textContent = `${card.num}`;
        const suitEl = document.createElement('span');
        suitEl.textContent = `${card.suit}`;
        pEl.appendChild(numEl);
        pEl.appendChild(suitEl);
        cardInHandEl.appendChild(pEl);
        const parentEl = document.getElementById(parentId);
        parentEl.appendChild(cardInHandEl);
    }

    play() {}
    playerPlay() {}
    computerPlay() {}
    updatePlayerCards() {}
}

const game = new Game();

function delay(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, milliseconds);
    });
}
