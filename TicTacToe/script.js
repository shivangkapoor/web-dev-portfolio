$(document).ready(function() {
  var playerOne = true;
  var playerTwo = false;
  var state = "2P";
  var turns = 0;

  var primaryColor = "#60FF90";
  var secondaryColor = "#60CFFF";
  var tertiaryColor = "#FF60CF";

  $("#end").hide();

  $("#xSelect").click(function() {
    $("#begin").hide();
  });
  $("#oSelect").click(function() {
      playerOne = false;
      playerTwo = true;
      $("#begin").hide();
  });

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
      turns++;
      checkWinner();
    } else if(playerTwo) {
      $(this).css("background", secondaryColor);
      $(this).text("");
      $(this).append("<i class='fa fa-circle-o'></i>");
      $(this).addClass("active p2");

      playerOne = true;
      playerTwo = false;
      turns++;
      checkWinner();
    }
  });
  $("#restart").click(function() {
    clearBoard();
  });

  function checkWinner() {
    var board = checkBoard();
    console.log(board + " " + turns);

    //winning conditions
    var rowOne = board[0] + board[1] + board[2];
    var rowTwo = board[3] + board[4] + board[5];
    var rowThree = board[6] + board[7] + board[8];
    var colOne = board[0] + board[3] + board[6];
    var colTwo = board[1] + board[4] + board[7];
    var colThree = board[2] + board[5] + board[8];
    var diagOne = board[2] + board[4] + board[6];
    var diagTwo = board[0] + board[4] + board[8];

    if(rowOne == 6 || rowTwo == 6 || rowThree == 6 ||
          colOne == 6 || colTwo == 6 || colThree == 6 ||
          diagOne == 6 || diagTwo == 6) {

        winnerAlert(1);
      } else if (rowOne == 15 || rowTwo == 15 || rowThree == 15 ||
                  colOne == 15 || colTwo == 15 || colThree == 15 ||
                  diagOne == 15 || diagTwo == 15) {

          winnerAlert(2);
      } else if(turns == 9) {
        winnerAlert(3);
      }
  }

  //creates an array out of the board
  function checkBoard() {
    var elements = Array.prototype.slice.call($("div .tac"));
    var tempArr = [];
    var board = [];
    var count = 0;

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
          board.push(2);
        } else {
          board.push(5);
        }
      }
    });
    return board;
  }
  //Alert box for winning / tie
  function winnerAlert(player) {
    if(player == 3) {
      $("#end").show();
      $("#end p").text("It's a tie.");
      $("#reset").click(function() {
        clearBoard();
      });
    } else if(player == 1) {
      $("#end").show();
      $("#end p").text("Xs Win!");
      $("#reset").click(function() {
        clearBoard();
      });
    } else if(player == 2) {
      $("#end").show();
      $("#end p").text("Circles Win!");
      $("#reset").click(function() {
        clearBoard();
      });
    }
  }
  //reset board function
  function clearBoard() {
    location.reload(false);
  }

});
