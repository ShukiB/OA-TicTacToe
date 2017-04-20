var ticTacToeApp = angular.module('ticTacToeApp', ['ui.bootstrap','ngRoute']);

ticTacToeApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/views/game.html',
        controller: 'gameCtrl'
    }).when('/scoreboard', {
        templateUrl: '/views/scoreboard.html',
        controller: 'scoreboardCtrl'
    }).otherwise({
        redirectTo: '/'
    });
});