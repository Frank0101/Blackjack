(function ($) {
    var ns = window.blackjackApp = window.blackjackApp || {};

    ns.CardModel = function (suit, sign) {
        var self = this;
        self.suit = suit;
        self.sign = sign.name;
        self.values = sign.values;
    };
}(jQuery));
