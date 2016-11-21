function ExampleGameState() {
    this.stateName = "ExampleGameState";
    console.log("Any variables or objects used in this state should be defined here");
}

ExampleGameState.prototype.enter = function(game) {
    console.log("entered ExampleGameState. Any required for this state should be done here");
};

ExampleGameState.prototype.update = function(game, delta) {
    console.log("ExampleGameState update. Game update logic should be handled here");
};

ExampleGameState.prototype.draw = function(game, delta, context) {
    console.log("ExampleGameState draw. This is where the drawing for this state should be handled");
    context.clearRect(0,0,game.width,game.height);
};

ExampleGameState.prototype.leave = function(game) {
    console.log("ExampleGameState leave. Any leave state logic / actions should be handled here");
};

ExampleGameState.prototype.keyDown = function(game, keycode) {
    console.log("ExampleGameState keyDown. keyDown logic for this stat should be handled here");
};

ExampleGameState.prototype.keyUp = function(game, keycode) {
    console.log("ExampleGameState keyUp. keyUp logic for this stat should be handled here");
};
