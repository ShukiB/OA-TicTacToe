ticTacToeApp.controller('scoreboardCtrl', function($scope, $location, databaseMediator) {
    $scope.back = function() {
        $location.path("/");
    };

    $scope.getScoreboard = function() {
        databaseMediator.getAllGames().then(function(result){
            // Converting the object to array
            $scope.scoreboard = Object.keys(result.data).map(function(name) {
                return result.data[name];
            });
        }, function (err) {
            
        });
    };
    $scope.getScoreboard();

    $scope.calculateWinsRatio = function (player) {
        if (!player.wins && !player.draws && !player.losses) return '---';
        return parseInt(player.wins / (player.wins + player.losses + player.draws) * 100) +  " %";
    };
});