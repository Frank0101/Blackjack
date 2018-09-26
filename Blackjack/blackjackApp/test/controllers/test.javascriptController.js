/// <reference path="../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../../scripts/angular.min.js" />
/// <reference path="../../../scripts/angular-mocks.js" />
/// <reference path="../../app/blackjackBundle.js" />

describe("Blackjack Controller", function () {
    var constants;
    var gameService;

    beforeEach(function () {
        var ns = window.blackjackApp;

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

        gameService = {
            drawnSign: constants.SIGNS.CARD_5,
            getNewDeck: function () {
                var _this = this;
                return {
                    drawCard: function () {
                        return new ns.CardModel(constants.SUIT.HEARTS, _this.drawnSign);
                    }
                }
            },
            getNewPlayer: function () {
                this.getNewPlayerCallCount++;
                return new ns.PlayerModel();
            },
            getNewPlayerCallCount: 0
        };
    });

    describe("When the service is created", function () {
        var $scope, target;

        beforeEach(function () {
            module("blackjackApp.controllers");
            inject(function ($controller, $rootScope) {
                $scope = $rootScope.$new();

                spyOn(gameService, "getNewDeck").and.callThrough();
                spyOn(gameService, "getNewPlayer").and.callThrough();

                target = $controller("blackjackController", {
                    "$scope": $scope,
                    "gameService": gameService
                });
            });
        });

        it("It should have a deck", function () {
            expect($scope.deck).not.toBeNull();
            expect(gameService.getNewDeck).toHaveBeenCalled();
        });

        it("It should have a dealer", function () {
            expect($scope.dealer).not.toBeNull();
            expect(gameService.getNewPlayer).toHaveBeenCalled();
        });

        it("It should have a player", function () {
            expect($scope.player).not.toBeNull();
            expect(gameService.getNewPlayer).toHaveBeenCalled();
            expect(gameService.getNewPlayerCallCount).toBe(2);
        });

        it("It should be possible to win", function () {
            $scope.hit(); $scope.hit();
            expect($scope.player.points).toBe(20);

            gameService.drawnSign = constants.SIGNS.KING;
            $scope.stick();
            expect($scope.dealer.points).toBe(25);
            expect($scope.isEndGame()).toBeTruthy();
            expect($scope.playerWins()).toBeTruthy();
            expect($scope.dealerWins()).toBeFalsy();
        });

        it("It should be possible to lose", function () {
            gameService.drawnSign = constants.SIGNS.CARD_8;
            $scope.hit();
            expect($scope.player.points).toBe(18);

            gameService.drawnSign = constants.SIGNS.CARD_5;
            $scope.stick();
            expect($scope.dealer.points).toBe(20);
            expect($scope.isEndGame()).toBeTruthy();
            expect($scope.playerWins()).toBeFalsy();
            expect($scope.dealerWins()).toBeTruthy();
        });
    });
});
