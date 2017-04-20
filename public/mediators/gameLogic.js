ticTacToeApp.factory('gameLogic', function() {
   return {
       checkIfWon: function(board) {
           for (var row = 0 , col =0 ; row < 3; row++, col++){
               if (board[row][0].value !== null &&
                   board[row][0].value == board[row][1].value &&
                   board[row][0].value == board[row][2].value) {
                   return true;
               }
               if (board[0][col].value !== null &&
                   board[0][col].value == board[1][col].value &&
                   board[0][col].value == board[2][col].value){
                   return true;
               }
           }
           if (board[0][0].value !== null &&
               board[0][0].value == board[1][1].value &&
               board[0][0].value == board[2][2].value){
               return true;
           }
           return board[0][2].value !== null &&
               board[0][2].value == board[1][1].value &&
               board[0][2].value == board[2][0].value; 
       }
   }
});