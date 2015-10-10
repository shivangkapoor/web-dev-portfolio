var patternArray = [];
var started = false;
var score = 0;

//jquery page-ready function to handle click events
$(document).ready(function() {
  //set up web audo api
  var AudioContext = window.audioContext || window.webkitAudioContext || false;
  if(!AudoContext) {
    alert("Your browser does not support the Web Audio API. Please download the latest browser version to continue.")
  } else {
    var audio = new AudioContext();
    var frequencies = [330, 261, 220, 200, 165];
    var erro
  }

  $("#score").val(score);

  $("#reset").click(function() {
    resetGame();
  });
  $("#start").click(function() {
      if (!started) {
        startGame();
        started = true;
      }
  });
  $(".tile").click(function() {
    $(this).shake();
    if(checkCorrect()){
      score++;
      $("#score").val(score);
    }
  });
});

function startGame() {
}
function resetGame() {
  started = false;
  score = 0;
  $("#score").val(score);
}
//adds a jquery function that creates a small shake/vibration animation to the tiles
jQuery.fn.shake = function() {
    this.each(function(i) {
        $(this).css({ "position" : "relative" });
        for (var x = 1; x <= 2; x++) {
            $(this).animate({ left: -15 }, 10).animate({ left: 0 }, 50).animate({ left: 15 }, 10).animate({ left: 0 }, 50);
        }
    });
    return this;
}
