var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];



var started = false;

var level = 0;

   
// keyboard key press

$(document).keypress(function(){

      if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});

// button clicked

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  // calling function for playing song while button click

  playSound(userChosenColour);
  animatePress(userChosenColour);
  
  userClickedPattern.push(userChosenColour);

  checkAnswer(userClickedPattern.length-1)

});

// function

function startOver(params) {
  level = 0;
  started = false;
  gamePattern = [];
}

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
 
    if (gamePattern.length===userClickedPattern.length) {
        setTimeout(function () {
          nextSequence();
        },1000)
    }
  }else{
    var wrong = new Audio("./sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200)

    $("#level-title").text("Game Over, Press Any Key to Restart")

    startOver();
  }

 
}

function nextSequence() {  
   userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];

    // calling function for playing song while random color occur
    playSound(randomChosenColour);

    gamePattern.push(randomChosenColour);
   

    // flashing button

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

    

};

// function for playing sound

function playSound(name) {
    
    var sound = new Audio("./sounds/" + name +".mp3");
    sound.play();
 
}

function animatePress(currentColour) {
    
$("#" + currentColour).addClass("pressed");
setTimeout(function(){$("#" + currentColour).removeClass("pressed");
},100);

}
