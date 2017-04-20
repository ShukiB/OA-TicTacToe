var express = require('express');
var router = express.Router();
var fs = require("fs");

router.put('/', function(req, res, next) {
    // TODO: update user
});
router.get('/', function(req, res, next) {
    // TODO: get all users from users.json
});
router.post('/', function(req, res, next) {
    // creating array of names in the current game
    var currentUsers = [req.query.X, req.query.O];

    // Reading he raw data from the users file
    fs.readFile('DB/users.json', 'utf8', function (err, data) {
        // We assume the json file already exists but might be empty
        // if no data, users don't exist
        var users, usersToAdd;

        // If the file is empty, we add the array to hold the data
        // Else we give it the previous data from file
        users = data ? JSON.parse(data) : { allUsers: [] };

        // Getting only the names of the users
        var allUserNames = users.allUsers.map(p => p.name);

        // Getting only the players that are new to the game
        usersToAdd = currentUsers.filter(function(element){
            return !allUserNames.includes(element);
        });

        // Adding the new players
        usersToAdd.map(function(element){
            users.allUsers.push({name: element});
        });

        // adding the new users and flushing the users to the user.json file
        fs.writeFile('DB/users.json', JSON.stringify(users), 'utf8', function(err) {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });

    res.send(currentUsers);
    res.end();
});

module.exports = router;