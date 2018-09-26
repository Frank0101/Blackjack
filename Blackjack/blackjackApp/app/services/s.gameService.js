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
