/*

   JavaScript state based game implementation.
   Author: David Daly

   Game.js main file. Handles the following functionality:
    -  state change operations, eg: changing states, adding new states and removing states from the game.
    -  the main game loop function, which calls the draw and update functions from each state.
    -  the keyEvent handling and passes these events to the current gamestate.
    -  determining the current gamestate and managing the gamestates array.

   Each state should implent the following functions:
   -  enter(game): Called when the state is entered immediately after the state becomes active.
   -  draw(game, delta, context): The draw function for that state. Draws to the canvas and is called each draw cycle.
   -  update(game,delta): The update function for that state. Called each update cycle and handles logic for that state.
   -  leave(game): Called when the state is exited.
   -  keyDown(game,keycode): Handles the keyDown events for each state.
   -  keyUp(game,keycode): Handles the keyUp events for each state.

*/

// Game constructor
function Game(constants) {
    this.constants = constants;
    this.score = 0;
    this.states = [];
    this.keysPressed = {};
    this.canvas = document.getElementById('game-canvas');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.framesDrawn = 0;
};

//Changes game state and removes the previous state from the states array
Game.prototype.changeState = function(state) {
    if(this.getCurrentState() && this.getCurrentState().leave) {
        this.getCurrentState().leave(game);
        this.states.pop();
    }

    if(state.enter) {
        state.enter(game);
    }

    this.states.pop();
    this.states.push(state);
};

//Adds a new state to the game states array without removing the previous one.
//Used in certain situations where the previous one should not get removed, eg: pause and play state combo
Game.prototype.addState = function(state) {
    if(state.enter) {
        state.enter(game);
    }
    this.states.push(state);
};

//Removes state from the games state array without the need to add a new one first.
//Used in certain situations where the previous one should not get removed, eg: pause and play state combo
Game.prototype.removeState = function(state){
    if(this.getCurrentState()) {
        if(this.getCurrentState().leave) {
            this.getCurrentState().leave(game);
        }

        this.states.pop();
    }
};

//Returns the current game state
Game.prototype.getCurrentState = function() {
    if(this.states.length) {
        return this.states[this.states.length-1]
    }
    else return null;
};

//Starts the game by starting the gameloop
Game.prototype.start = function() {
    this.addState(new InitialState());
    var game = this;

    // Start gameloop and set FPS to 60
    this.intervalId = setInterval(function() {
        GameLoop(game);
    }, 1000 / 60)
};

//Records keys pressed in the game
Game.prototype.keyDown = function(keyCode) {
    this.keysPressed[keyCode] = true;

    if(this.getCurrentState() && this.getCurrentState().keyDown) {
        this.getCurrentState().keyDown(this, keyCode);
    }
};

//Records keys released in the game
Game.prototype.keyUp = function(keyCode) {
    //Remove keyCode from the keysPressed array
    delete this.keysPressed[keyCode];

    if(this.getCurrentState() && this.getCurrentState().keyUp) {
        this.getCurrentState().keyUp(this, keyCode);
    }
};

//GameLoop function. Calls draw and update functions from the current gamestate if they are defined
function GameLoop(game) {
    var currentState = game.getCurrentState();

    if(currentState) {
        var delta = 1 / 60;
        var context = game.canvas.getContext("2d");

        if(currentState.update) {
            currentState.update(game, delta);
        }
        if(currentState.draw) {
            currentState.draw(game, delta, context);
        }
    }
    game.framesDrawn++
}
