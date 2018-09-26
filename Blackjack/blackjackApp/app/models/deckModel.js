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
