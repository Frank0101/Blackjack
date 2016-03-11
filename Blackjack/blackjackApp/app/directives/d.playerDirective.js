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
