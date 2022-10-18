// create a variable that holds the level number, starting at zero
var level = 0;

// create an array of buttonColors
var buttonColors = ["red", "blue", "green", "yellow"];

// create an empty array, userClickedPattern, that will ultimately hold the userChosenColors
var userClickedPattern = [];


// create an empty array, gamePattern, that will eventually hold the pattern of correct colors
var gamePattern = [];

// Add event handlers to each button for when it is clicked and calls playSound to play appropriate audio
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});


// create a function nextSequence() that generates a random number between 0-3
function nextSequence() {

  // increment the level and change the h1 text to read the level
  level++;
  $("h1").text("Level " + level);

  var randNumber = Math.floor(Math.random() * 4);

  // create a variable randomChosenColor that uses the randNumber to pick from the buttonColors array
  var randomChosenColor = buttonColors[randNumber];

  // append the randomChosenColor to the end of the gamePattern array
  gamePattern.push(randomChosenColor);

  // make button with appropriate ID appear to blink
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  // call the playSound function
  playSound(randomChosenColor);
}

// create a function, playSound, that will be called when clicked or in nextSequence function
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// create animatePress function that gives the illusion of the button being pressed by changing the css
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

// create a function called checkAnswer that checks if the user has the sequence correct and then calls the nextSequence function
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  }
  // if the user gets it wrong, play the wrong audio, flash red css, and reset the game with startOver function
  else {
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// create a function called startOver that resets all of the necessary variables
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

// when the first key is pressed, call the nextSequence function
$(document).keypress(nextSequence);
