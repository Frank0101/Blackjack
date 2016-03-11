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
