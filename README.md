# Tic-Tac-Toe

This is a Tic-Tac-Toe game where you play against a computer 

## Getting Started

In terminal: 
```
git clone git@github.com:AndreyGalchevski/tic-tac-toe.git
```

### Prerequisites

node
npm

### Installing

```
npm i
cd client && npm i && cd ..
npm run
```

## Demo

https://xsie-osies.herokuapp.com
If it doesn't start right away it is something to be expected since the free-tier Heroku server "goes to sleep" after 15 minutes of inactivity.

## Built With

* [React]
* [NodeJS]

## About
The app consists of React-based client and Express-based server. 
During the game, when the user clicks on a empty cell, the client sends the current state of the game to the server and the server calculates the opponents' next move (the opponent being the computer). All the logic regarding who's won or lost or whether the game ended in a draw, is computated in the server. The server sends to the client the updated state of the game and the client updates the UI.  
The game board is implemented using a two-dimentional array. This technical choice affected the complexity of the code and I wish I had made a different choice - maybe an object with 9 fields, each representing a cell in a 3 by 3 matrix. But the choice was made and it took more time than expected to implement the server logic and as a result styling was hardly touched, as well as leaderboard feaure which hasn't been impelemntd. If I had more time I would add styling using a third party library like MaterializeCSS and add more complicated AI to the server, instead of the current AI which just looks for the first empty cell in the game board.

## Authors

* **Andrey Galchevski** - (https://github.com/AndreyGalchevski)

