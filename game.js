var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern = [];
var level = 0;
var highScore = 0;

$(document).on("keydown",nextSequence);

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour=buttonColors[randomNumber];
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    $("h1").text("Level : "+level);
    highScoref(level);
    level++;
}

$(".btn").click(function() {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

}); 

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("h1").text("Game Over, Press Any Key to Restart! Your high score is :"+highScore);
      startOver();
    }

}

function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
}

function highScoref(level){
    if(highScore<level){
    highScore=level;
    }
    else
    highScore=highScore;
    return highScore;
}