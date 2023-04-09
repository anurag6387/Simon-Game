
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var clicked_pattern = [];
var started = false;
var level = 0;

$("#start").click(function () {
   if (!started) {
      $("#heading").text("level " + level);
      nextSequence();
      started = true;
      $("#start").hide();
      $(".side").hide();

   }
});

$(".btn").click(function () {
   var userChosen = $(this).attr("id");
   clicked_pattern.push(userChosen);
   playSOund(userChosen);
   animation(userChosen);
   //call check answer function
   checkAnswer(clicked_pattern.length - 1)
});
// check answer function 
function checkAnswer(currentLevel) {
   if (gamePattern[currentLevel] === clicked_pattern[currentLevel]) {
      console.log("Success");
      if (clicked_pattern.length === gamePattern.length) {
         setTimeout(function () {
            nextSequence()
         }, 800)
      }
   }
   else {

      console.log("wrong");
      playSOund("wrong");
      $("#heading").text("GAME OVER !!! Click on start to restart the game");
      $("body").addClass("game_over");
      setTimeout(function () {
         $("body").removeClass("game_over")
      }, 1000);
      $("#start").show();
      $(".side").show();
      startOver();
   }
}

// next sequence function 
function nextSequence() {
   clicked_pattern = [];
   level++;
   $("#heading").text("level " + level);
   var randomNumber = (Math.floor(Math.random() * 4));
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);

   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSOund(randomChosenColour);
}



// sound play
function playSOund(name) {
   var sound = new Audio(name + ".mp3")
   sound.play();
}
// animation effect 
function animation(class_name) {
   $("#" + class_name).addClass("pressed");
   mytimeout = setTimeout(function () {
      $("#" + class_name).removeClass("pressed");
   }, 100);
}

function startOver() {
   level = 0;
   gamePattern = [];
   started = false
}


