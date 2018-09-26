/// <reference path="../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../../scripts/angular.min.js" />
/// <reference path="../../../scripts/angular-mocks.js" />
/// <reference path="../../app/blackjackBundle.js" />

describe("Game Service", function () {
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

    describe("When the service is created", function () {
        var target;

        beforeEach(function () {
            module(function ($provide) {
                $provide.value("cardsConstants", constants);
            });

            module("blackjackApp.services");
            inject(function ($injector) {
                target = $injector.get("gameService");
            });
        });

        it("It should return new deck", function () {
            var deck = target.getNewDeck();
            expect(deck).not.toBeNull();
        });

        it("It should return new player", function () {
            var player = target.getNewPlayer();
            expect(player).not.toBeNull();
        });
    });
});
