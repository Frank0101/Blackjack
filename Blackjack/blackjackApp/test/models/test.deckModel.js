/// <reference path="../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../app/models/cardModel.js" />
/// <reference path="../../app/models/deckModel.js" />

describe("Deck Model:", function () {
    var constants;

    beforeEach(function () {
        constants = {
            SUIT: {
                HEARTS: "hearts",
                DIAMONDS: "diamonds",
                CLUBS: "clubs",
                SPADES: "spades"
            },

            SUIT_LIST: function () {
                return [
                    this.SUIT.HEARTS, this.SUIT.DIAMONDS,
                    this.SUIT.CLUBS, this.SUIT.SPADES
                ];
            },

            SIGNS: {
                ACE: { name: "a", values: [1, 11] },
                CARD_2: { name: "2", values: [2] },
                CARD_3: { name: "3", values: [3] },
                CARD_4: { name: "4", values: [4] },
                CARD_5: { name: "5", values: [5] },
                CARD_6: { name: "6", values: [6] },
                CARD_7: { name: "7", values: [7] },
                CARD_8: { name: "8", values: [8] },
                CARD_9: { name: "9", values: [9] },
                CARD_10: { name: "10", values: [10] },
                JACK: { name: "j", values: [10] },
                QUEEN: { name: "q", values: [10] },
                KING: { name: "k", values: [10] }
            },

            SIGNS_LIST: function () {
                return [
                    this.SIGNS.ACE, this.SIGNS.CARD_2, this.SIGNS.CARD_3,
                    this.SIGNS.CARD_4, this.SIGNS.CARD_5, this.SIGNS.CARD_6,
                    this.SIGNS.CARD_7, this.SIGNS.CARD_8, this.SIGNS.CARD_9,
                    this.SIGNS.CARD_10, this.SIGNS.JACK, this.SIGNS.QUEEN,
                    this.SIGNS.KING
                ];
            }
        };
    });

    describe("When created", function () {
        var model;

        beforeEach(function () {
            var ns = window.blackjackApp;
            model = new ns.DeckModel(constants);
        });

        it("It should have all the cards", function () {
            var counterHearts = 0, counterDiamonds = 0,
                counterClubs = 0, counterSpades = 0,
                counterAces = 0, counterCard2 = 0,
                counterCard3 = 0, counterCard4 = 0,
                counterCard5 = 0, counterCard6 = 0,
                counterCard7 = 0, counterCard8 = 0,
                counterCard9 = 0, counterJacks = 0,
                counterQueens = 0, counterKings = 0;

            model.cards.forEach(function (card) {
                switch (card.suit) {
                    case constants.SUIT.HEARTS:
                        counterHearts++; break;
                    case constants.SUIT.DIAMONDS:
                        counterDiamonds++; break;
                    case constants.SUIT.CLUBS:
                        counterClubs++; break;
                    case constants.SUIT.SPADES:
                        counterSpades++; break;
                }
                switch (card.sign) {
                    case constants.SIGNS.ACE.name:
                        counterAces++; break;
                    case constants.SIGNS.CARD_2.name:
                        counterCard2++; break;
                    case constants.SIGNS.CARD_3.name:
                        counterCard3++; break;
                    case constants.SIGNS.CARD_4.name:
                        counterCard4++; break;
                    case constants.SIGNS.CARD_5.name:
                        counterCard5++; break;
                    case constants.SIGNS.CARD_6.name:
                        counterCard6++; break;
                    case constants.SIGNS.CARD_7.name:
                        counterCard7++; break;
                    case constants.SIGNS.CARD_8.name:
                        counterCard8++; break;
                    case constants.SIGNS.CARD_9.name:
                        counterCard9++; break;
                    case constants.SIGNS.JACK.name:
                        counterJacks++; break;
                    case constants.SIGNS.QUEEN.name:
                        counterQueens++; break;
                    case constants.SIGNS.KING.name:
                        counterKings++; break;
                }
            });

            expect(model.cards.length).toBe(52);
            expect(counterHearts).toBe(13);
            expect(counterDiamonds).toBe(13);
            expect(counterClubs).toBe(13);
            expect(counterSpades).toBe(13);
            expect(counterAces).toBe(4);
            expect(counterCard2).toBe(4);
            expect(counterCard3).toBe(4);
            expect(counterCard4).toBe(4);
            expect(counterCard5).toBe(4);
            expect(counterCard6).toBe(4);
            expect(counterCard7).toBe(4);
            expect(counterCard8).toBe(4);
            expect(counterCard9).toBe(4);
            expect(counterJacks).toBe(4);
            expect(counterQueens).toBe(4);
            expect(counterKings).toBe(4);
        });

        it("it should draw a card", function () {
            var drawnCard = model.drawCard();
            var cardFound = false;

            model.cards.forEach(function (card) {
                if (card.suit == drawnCard.suit && card.sign == drawnCard.sign) {
                    cardFound = true;
                    return;
                }
            });

            expect(drawnCard).not.toBeNull();
            expect(model.cards.length).toBe(51);
            expect(cardFound).toBeFalsy();
        });

        it("it should draw all the cards", function () {
            for (var n = 0; n < 52; n++) {
                model.drawCard();
            }
            expect(model.cards.length).toBe(0);

            var drawnCard = model.drawCard();
            expect(drawnCard).toBeNull();
        });
    });
});
