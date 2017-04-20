const consts = {
    GAME_WIN: 2,
    GAME_DRAW: 1,
    GAME_LOSE: 0
};
var express = require('express');
var router = express.Router();
var fs = require("fs");

router.get('/', function(req, res, next) {
    // Getting the games file
    fs.readFile('DB/games.json', 'utf8', function (err, data) {
        // We assume the json file already exists but might be empty
        // Setting the games array and the return dictionary
        var games = data ? JSON.parse(data) : { allGames: [] };
        var playersScores = {};

        // Build the scoreboard only if we had games before
        if(games.allGames.length) {
            games.allGames.reduce(function (ps, game) {
                // 
                for (var i = 0; i< game.players.length; i++) {
                    // Setting values for the update of the row
                    var playerName = game.players[i].name;
                    var prevRow = ps[playerName];
                    var playerRow = getPlayerRowForGame(game.winner, playerName);
                    // Checking if we need to set a new row or update the previous one
                    if (!prevRow) {
                        ps[playerName] = playerRow;
                    } else {
                        prevRow.wins += playerRow.wins;
                        prevRow.draws += playerRow.draws;
                        prevRow.losses += playerRow.losses;
                        prevRow.score += playerRow.score;

                        ps[playerName] = prevRow;
                    }
                }
                return ps;
            }, playersScores);
        }

        res.send(playersScores);
        res.end();
    });
}); 
router.get('/:id', function(req, res, next) {
    // TODO: get a specific game by it's id
});
router.post('/', function(req, res, next) {
    // Setting the game for the game.json
    var game = {
        winner: JSON.parse(req.query.winner),
        players: req.query.players.map(x => JSON.parse(x)),
        moves: req.query.moves.map(x => JSON.parse(x))
    };
    // Reading he raw data from the users file
    fs.readFile('DB/games.json', 'utf8', function (err, data) {
        // We assume the json file already exists but might be empty
        // Setting our data array or creating it
        var games = data ? JSON.parse(data) : { allGames: [] };

        // Setting the highest ID for the game
        game.id = !games.allGames.length ? 1 : (games.allGames[games.allGames.length - 1].id + 1);

        // Appending the new game to the allGames array
        games.allGames.push(game);

        // adding the new users and flushing the users to the user.json file
        fs.writeFile('DB/games.json', JSON.stringify(games), 'utf8', function(err) {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });
    
    res.send(game);
    res.end();
});

module.exports = router;

function getPlayerRowForGame(winner, playerName, prevRow) {
    // Setting the player object
    var playerRow = {
        name: playerName,
        score: 0,
        wins: 0,
        draws: 0,
        losses: 0
    };
    if (!winner) {
        playerRow.score += consts.GAME_DRAW;
        playerRow.draws++;
    } else if (winner.name !== playerName){
        playerRow.score += consts.GAME_LOSE;
        playerRow.losses++;
    } else {
        playerRow.score += consts.GAME_WIN;
        playerRow.wins++;
    }
    // Returning the score for the player in the game
    return playerRow;
}
