/// <reference path="../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../app/models/cardModel.js" />
/// <reference path="../../app/models/playerModel.js" />

describe("Player Model:", function () {
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
        var ns = window.blackjackApp;
        var model;

        beforeEach(function () {
            model = new ns.PlayerModel();
        });

        it("It should calculate the points", function () {
            model.cards = [
                new ns.CardModel(constants.SUIT.DIAMONDS, constants.SIGNS.CARD_8),
                new ns.CardModel(constants.SUIT.SPADES, constants.SIGNS.KING)
            ];
            model.calculatePoints();
            expect(model.points).toBe(18);

            model.cards = [
                new ns.CardModel(constants.SUIT.HEARTS, constants.SIGNS.ACE),
                new ns.CardModel(constants.SUIT.DIAMONDS, constants.SIGNS.CARD_8)
            ];
            model.calculatePoints();
            expect(model.points).toBe(19);

            model.cards = [
                new ns.CardModel(constants.SUIT.HEARTS, constants.SIGNS.ACE),
                new ns.CardModel(constants.SUIT.DIAMONDS, constants.SIGNS.CARD_8),
                new ns.CardModel(constants.SUIT.SPADES, constants.SIGNS.KING)
            ];
            model.calculatePoints();
            expect(model.points).toBe(19);

            model.cards = [
                new ns.CardModel(constants.SUIT.HEARTS, constants.SIGNS.ACE),
                new ns.CardModel(constants.SUIT.DIAMONDS, constants.SIGNS.CARD_8),
                new ns.CardModel(constants.SUIT.SPADES, constants.SIGNS.KING),
                new ns.CardModel(constants.SUIT.CLUBS, constants.SIGNS.CARD_3)
            ];
            model.calculatePoints();
            expect(model.points).toBe(22);
        });

        it("It should calculate if is busted", function () {
            model.cards = [
                new ns.CardModel(constants.SUIT.DIAMONDS, constants.SIGNS.CARD_8),
                new ns.CardModel(constants.SUIT.SPADES, constants.SIGNS.KING)
            ];
            model.calculatePoints();
            expect(model.isBusted()).toBeFalsy();

            model.cards = [
                new ns.CardModel(constants.SUIT.HEARTS, constants.SIGNS.ACE),
                new ns.CardModel(constants.SUIT.DIAMONDS, constants.SIGNS.CARD_8)
            ];
            model.calculatePoints();
            expect(model.isBusted()).toBeFalsy();

            model.cards = [
                new ns.CardModel(constants.SUIT.HEARTS, constants.SIGNS.ACE),
                new ns.CardModel(constants.SUIT.DIAMONDS, constants.SIGNS.CARD_8),
                new ns.CardModel(constants.SUIT.SPADES, constants.SIGNS.KING)
            ];
            model.calculatePoints();
            expect(model.isBusted()).toBeFalsy();

            model.cards = [
                new ns.CardModel(constants.SUIT.HEARTS, constants.SIGNS.ACE),
                new ns.CardModel(constants.SUIT.DIAMONDS, constants.SIGNS.CARD_8),
                new ns.CardModel(constants.SUIT.SPADES, constants.SIGNS.KING),
                new ns.CardModel(constants.SUIT.CLUBS, constants.SIGNS.CARD_3)
            ];
            model.calculatePoints();
            expect(model.isBusted()).toBeTruthy();
        });
    });
});
