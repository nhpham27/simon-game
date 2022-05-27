var colors = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;

// return values from 0-3
function nextSequence() {
    return Math.floor(Math.random()*4);
}

// choose a random color
function randomChosenColor() {
    color = colors[nextSequence()]; 
    playSound(color);
    level++;
    $("#level-title").text("Level " + level);
    $("#" + color).fadeOut(100).fadeIn(100);
    return color;
}

// play the sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// animate the presses
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// start and play the game
function checkAnswer() {
    console.log(userClickPattern);
    console.log(gamePattern);
    for(var i = 0; i < userClickPattern.length; i++){
        if(userClickPattern[i] !== gamePattern[i])
            return false;
    }
    return true;
}

// check for button presses
$(".btn").click(function(event) {
    var userChosenColor = this.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickPattern.push(userChosenColor);
    // if the player wins
    if(checkAnswer() === true) {
        if(userClickPattern.length === gamePattern.length)
            setTimeout(function() {
                userClickPattern = [];
                gamePattern.push(randomChosenColor());
            }, 1000);
    }
    else {
        // otherwise
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        playSound("wrong");
        userClickPattern = [];
        gamePattern = [];
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
    }
});

// detect key presses
$(document).on("keydown", function (event) {
    if($("#level-title").text() === "Press A Key to Start"
        || $("#level-title").text() === "Game Over, Press Any Key to Restart"){
        gamePattern.push(randomChosenColor());
        $("#level-title").text("Level 0");
        level = 0;
    }
});
