///#source 1 1 /blackjackApp/app/models/cardModel.js
(function ($) {
    var ns = window.blackjackApp = window.blackjackApp || {};

    ns.CardModel = function (suit, sign) {
        var self = this;
        self.suit = suit;
        self.sign = sign.name;
        self.values = sign.values;
    };
}(jQuery));

///#source 1 1 /blackjackApp/app/models/deckModel.js
(function ($) {
    var ns = window.blackjackApp = window.blackjackApp || {};

    ns.DeckModel = function (constants) {
        var self = this;
        self.cards = [];

        self.drawCard = function () {
            if (self.cards.length == 0) return null;
            var cardPos = Math.floor(Math.random() * self.cards.length);
            var card = self.cards[cardPos];
            self.cards.splice(cardPos, 1);
            return card;
        };

        function init() {
            for (var sem = 0; sem < constants.SUIT_LIST().length; sem++) {
                for (var sig = 0; sig < constants.SIGNS_LIST().length; sig++) {
                    self.cards.push(new ns.CardModel(constants.SUIT_LIST()[sem],
                        constants.SIGNS_LIST()[sig]));
                }
            }
        };
        init();
    };
}(jQuery));

///#source 1 1 /blackjackApp/app/models/playerModel.js
(function ($) {
    var ns = window.blackjackApp = window.blackjackApp || {};

    ns.PlayerModel = function () {
        var self = this;
        self.cards = [];
        self.points = 0;
        self.isBusted = function () {
            return self.points > 21;
        };
        self.calculatePoints = function () {
            self.points = getPoints(sortPointsList(getPointsList(self.cards)));
        };

        function getPointsList(cards) {
            var results = [0];

            for (var c = 0; c < cards.length; c++) {
                var card = cards[c];

                var length = results.length;
                for (var r = 0; r < length; r++) {
                    var result = results[r];

                    for (var v = 0; v < card.values.length; v++) {
                        var value = card.values[v];

                        if (v == 0) {
                            results[r] = result + value;
                        } else {
                            results.push(result + value);
                        }
                    }
                }
            }
            return results;
        }

        function sortPointsList(results) {
            for (var n = 0; n < results.length - 1; n++) {
                for (var k = n + 1; k < results.length; k++) {
                    if (results[n] < results[k]) {
                        var result = results[n];

                        results[n] = results[k];
                        results[k] = result;
                    }
                }
            }
            return results;
        }

        function getPoints(results) {
            var result = null;

            for (var i = 0; i < results.length; i++) {
                result = results[i];

                if (result <= 21 || i == results.length - 1) {
                    break;
                }
            }
            return result;
        }
    };
}(jQuery));

///#source 1 1 /blackjackApp/app/blackjack.js
angular.module("blackjackApp", [
    "blackjackApp.constants",
    "blackjackApp.controllers",
    "blackjackApp.directives",
    "blackjackApp.services"
]);
angular.module("blackjackApp.constants", []);
angular.module("blackjackApp.controllers", []);
angular.module("blackjackApp.directives", []);
angular.module("blackjackApp.services", []);

///#source 1 1 /blackjackApp/app/constants/const.cardsConstants.js
angular.module("blackjackApp.constants").constant("cardsConstants", {
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
});

///#source 1 1 /blackjackApp/app/controllers/c.blackjackController.js
angular.module("blackjackApp.controllers").controller("blackjackController", ["$scope", "gameService", function ($scope, gameService) {
    $scope.init = function () {
        $scope.deck = gameService.getNewDeck();
        $scope.dealer = gameService.getNewPlayer();
        $scope.player = gameService.getNewPlayer();

        $scope.dealer.cards = [$scope.deck.drawCard()];
        $scope.player.cards = [$scope.deck.drawCard(), $scope.deck.drawCard()];
        $scope.dealer.calculatePoints();
        $scope.player.calculatePoints();
        $scope.isPlayerTurn = true;
    };
    $scope.init();

    $scope.playerWins = function () {
        return $scope.dealer.isBusted();
    };

    $scope.dealerWins = function () {
        return ($scope.isPlayerTurn && $scope.player.isBusted())
            || (!$scope.isPlayerTurn && !$scope.dealer.isBusted()
                && $scope.dealer.points >= $scope.player.points);
    };

    $scope.isEndGame = function () {
        return $scope.dealerWins() || $scope.playerWins();
    };

    $scope.canHit = function () {
        return !$scope.isEndGame() && $scope.player.points < 21;
    };

    $scope.hit = function () {
        drawPlayerCard();
    };

    $scope.canStick = function () {
        return !$scope.isEndGame() && $scope.player.points > $scope.dealer.points;
    };

    $scope.stick = function () {
        $scope.isPlayerTurn = false;
        while (!$scope.isEndGame()) {
            drawDealerCard();
        }
    };

    function drawDealerCard() {
        $scope.dealer.cards.push($scope.deck.drawCard());
        $scope.dealer.calculatePoints();
    }

    function drawPlayerCard() {
        $scope.player.cards.push($scope.deck.drawCard());
        $scope.player.calculatePoints();
    }
}]);

///#source 1 1 /blackjackApp/app/directives/d.playerDirective.js
angular.module("blackjackApp.directives").directive("playerDirective", function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "/blackjackApp/app/directives/d.playerDirective.html",
        scope: {
            player: "=",
        }
    };
});

///#source 1 1 /blackjackApp/app/services/s.gameService.js
angular.module("blackjackApp.services").service("gameService", ["cardsConstants", function (cardsConstants) {
    var ns = window.blackjackApp = window.blackjackApp || {};
    var self = this;

    self.getNewDeck = function () {
        return new ns.DeckModel(cardsConstants);
    };

    self.getNewPlayer = function () {
        return new ns.PlayerModel();
    }
}]);

