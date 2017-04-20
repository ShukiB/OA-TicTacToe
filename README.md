# unfinished but overdue

1) Names can be the same in the same game and cause wrong result of game
2) Scoring is defferent then requested but i added logic forthem in the "Scoreboard" view
3) game is saved with the moves for future development of `watch game` feature
4) In files access (ATM) we assume that all files(users & games) are already in the DB folder
5) game is divided into 2 main parts
    * server side - in charge of logic, data manipulation & handles database access
    * client side - in charge of displaying and letting the user play
6) The application was created with "Exspress-Generator" to give basic files for the app
7) package usage
    * Exspress - for navigation
    * router - for dividing modules easier
    * bodyParser - to get data posted better
    * path - creating location paths


## Game instructions
1) the game has 2 main views
    * Playing view
    * Scoreboard view

2) scoreboard displays all player and their game history with scoring


### running
after `npm start` the app is reachable from `localhost:3000`.