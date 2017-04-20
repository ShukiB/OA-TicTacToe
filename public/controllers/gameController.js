ticTacToeApp.controller('gameCtrl', function($scope, $uibModal, $location, gameLogic, databaseMediator) {
    $scope.game = new Game();

    $scope.selectCell = function(cell) {
        // checks if the game ended
        if ($scope.game.end) return;
        // Checking if the we need to fill the cell or keep it as it is
        if (isCellEmpty(cell)) {
            cell.value = $scope.game.currentPlayer.marker;
            // Adds the play to the moves record
            $scope.game.moves.enqueue(new BoardCell(cell.value, cell.location));

            // After each move we need to check if there is a winner
            // Checking only after there is a possibility of winning
            if($scope.game.moves.getSize() >= 5 ) {
                // If someone wins
                if (gameLogic.checkIfWon($scope.game.board)) {
                    weHaveWinner();
                    endGame();
                }
                // If we have a draw
                else if ($scope.game.moves.getSize() >= 9) {
                    endGame();
                }
            }

            // we compare the object of the players so we know what to assign
            if (!$scope.game.end) {
                $scope.game.currentPlayer = $scope.game.currentPlayer === $scope.game.players[0] ?
                    $scope.game.players[1] : $scope.game.players[0];
            }
        }

    };

    $scope.newGame = function() {
        $scope.game = new Game();
        showInsertNameModal();
    };

    $scope.navToScoreboard = function (){
        $location.path("/scoreboard");
    };

    function isCellEmpty(cell) {
        return cell.value === null;
    }

    function weHaveWinner() {
        //set the winner
        $scope.game.winner = $scope.game.currentPlayer;
    }

    function endGame() {
        $scope.game.end = true;
        var gameToSave = {
            players: $scope.game.players,
            winner: $scope.game.winner,
            moves: (function() {
                var moves = [];
                while($scope.game.moves.getSize() > 0) {
                    moves.push($scope.game.moves.dequeue());
                }
                return moves;
            })()
        }
        databaseMediator.saveFinishedGame(gameToSave).then(function(result) {
            // Displaying winner popup after the game was saved
            showWinnerModal();
        }, function (err) {
            console.log("error saving game.", game);
        });
    }

    function showInsertNameModal() {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            templateUrl: '../templates/insertNamesTMP.html',
            size: 'sm',
            keyboard: false,
            backdrop: 'static',
            controller: function ($scope, $uibModalInstance) {
                $scope.confirm = function () {
                    // creates the data of the game for the game object
                    if (this.players.hasOwnProperty("X") && this.players.hasOwnProperty("O")) {
                        // Sending the users to the server for save
                        databaseMediator.addUsers(this.players).then(function(result) {
                            $uibModalInstance.close({"X": result.data[0], "O": result.data[1]});
                        }, function(err) {
                            console.log(err);
                        });
                    }
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss();
                };
            },
            resolve: {}
        });

        // invoked when the modal is closed for any reason
        modalInstance.result.then(function (result) {
            // Setting the players in the game object
            $scope.game.players.push(new Player(result.X, "X"), new Player(result.O, "O"));
            $scope.game.currentPlayer = $scope.game.players[0];
        }, function () {
            // This is just a fallback for rejection of the modal
            console.log("Modal was dismissed at: " + new Date());
        });
    }

    function showWinnerModal() {
        // Opens a modal with  the winner for the user
        $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            templateUrl: '../templates/showWinnerTMP.html',
            size: 'sm',
            keyboard: false,
            backdrop: 'static',
            controller: function ($scope, $uibModalInstance) {
                // Sets the player to display
                $scope.winner = $scope.$resolve.winner;

                $scope.confirm = function () {
                    $uibModalInstance.close();
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss();
                };
            },
            resolve: {
                winner: function() {
                    return $scope.game.winner;
                }
            }
        });
    }
});