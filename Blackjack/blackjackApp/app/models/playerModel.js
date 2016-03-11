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
