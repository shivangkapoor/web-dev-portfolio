$(document).ready(function() {
  var playerOne = true;
  var playerTwo = false;
  var state = "2P";

  var primaryColor = "#60FF90";
  var secondaryColor = "#60CFFF";
  var tertiaryColor = "#FF60CF";

  $("#board .tac").hover(
    function() {
      if(playerOne && !$(this).hasClass("active")) {
        $(this).css("background", primaryColor);
        $(this).append("<i class='fa fa-times'></i>");
      } if(playerTwo && !$(this).hasClass("active")) {
        $(this).css("background", secondaryColor);
        $(this).append("<i class='fa fa-circle-o'></i>");
      }
    },
    function() {
      if(!$(this).hasClass("active")) {
        $(this).css("background", tertiaryColor);
        $(this).text("");
      }
  });
  $("#board .tac").click(function() {
    if(playerOne) {
      $(this).css("background", primaryColor);
      $(this).text("");
      $(this).append("<i class='fa fa-times'></i>");
      $(this).addClass("active p1");

      playerOne = false;
      playerTwo = true;
      checkBoard();
    } else if(playerTwo) {
      $(this).css("background", secondaryColor);
      $(this).text("");
      $(this).append("<i class='fa fa-circle-o'></i>");
      $(this).addClass("active p2");

      playerOne = true;
      playerTwo = false;
      checkBoard();
    }
  });

  //creates an array out of the board
  function checkBoard() {
    var elements = Array.prototype.slice.call($("div .tac"));
    var tempArr = [];
    var board = [];

    elements.forEach(function(element) {
      var temp = element.className.split(' ');
      tempArr.push(temp);
    });

    tempArr.forEach(function(tac) {

      if(tac.length < 3) {
        board.push(0);
      }
      else {
        if(tac[3] === "p1") {
          board.push(1);
        } else {
          board.push(2);
        }
      }
    });
  }

});
