/// <reference path="../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../../scripts/angular.min.js" />
/// <reference path="../../../scripts/angular-mocks.js" />
/// <reference path="../../app/blackjackBundle.js" />

describe("Player Directive:", function () {
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

    describe("When the directive is compiled", function () {
        var $scope, target;

        beforeEach(function () {
            module("blackjackApp.directives");

            inject(function ($rootScope, $templateCache, $compile) {
                var ns = window.blackjackApp;

                $scope = $rootScope.$new();
                $scope.player = {
                    cards: [
                        new ns.CardModel(constants.SUIT.HEARTS, constants.SIGNS.ACE),
                        new ns.CardModel(constants.SUIT.DIAMONDS, constants.SIGNS.CARD_8),
                        new ns.CardModel(constants.SUIT.SPADES, constants.SIGNS.KING)
                    ],
                    points: 12
                };

                var view = $templateCache.get("/blackjackApp/app/directives/d.playerDirective.html");
                if (!view) {
                    $.ajax({
                        type: "GET",
                        async: false,
                        cache: false,
                        url: "../../app/directives/d.playerDirective.html"
                    })
                    .done(function (data) {
                        view = data;
                    });
                    $templateCache.put("/blackjackApp/app/directives/d.playerDirective.html", view);
                }

                target = $compile("<player-directive player='player'></player-directive>")($scope);
                $scope.$digest();
            });
        });

        it("It should be defined", function () {
            expect(target).not.toBeNull();
        });

        it("It should contain the list of cards", function () {
            var cardsList = target.find(".cards-list .card");
            expect(cardsList.length).toBe(3);
            expect($(cardsList[0]).find(".sign").html()).toBe("a");
            expect($(cardsList[0]).find(".suit").html()).toBe("hearts");
            expect($(cardsList[1]).find(".sign").html()).toBe("8");
            expect($(cardsList[1]).find(".suit").html()).toBe("diamonds");
            expect($(cardsList[2]).find(".sign").html()).toBe("k");
            expect($(cardsList[2]).find(".suit").html()).toBe("spades");
        });

        it("It should contain the points value", function () {
            var points = target.find(".points .points-value");
            expect(points.html()).toBe("12");
        });
    });
});
