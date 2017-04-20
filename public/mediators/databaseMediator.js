ticTacToeApp.factory('databaseMediator', function($http) {
    return {
        saveFinishedGame: function(game) {
            return $http({
                method: 'POST',
                url: window.location.origin + '/game',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: game
            });
        },
        addUsers: function (users) {
            return $http({
                method: 'POST',
                url: window.location.origin + '/user',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: users
            });
        },
        getAllGames: function() {
            return $http({
                method: 'GET',
                url: window.location.origin + '/game',
            });
        }
    }
});