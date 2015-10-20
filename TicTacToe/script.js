$(document).ready(function() {
  var exes = true;
  var ohs = false;
  var computerPlayer = false;
  var playerTurn = true;
  var turns = 0;

  var primaryColor = "#60FF90";
  var secondaryColor = "#60CFFF";
  var tertiaryColor = "#FF60CF";

  $("#end").hide();
  $("#begin-select").hide();

  $("#xSelect").click(function() {
    $("#begin").hide();
    $("#begin-select").show();
  });
  $("#oSelect").click(function() {
      exes = false;
      ohs = true;
      $("#begin").hide();
      $("#begin-select").show();
  });
  $("#twoPlayer").click(function() {
    $("#begin-select").hide();
  });
  $("#singlePlayer").click(function() {
    computerPlayer = true;
    $("#begin-select").hide();
  })

  $("#board .tac").hover(
    function() {
      if(exes && !$(this).hasClass("active") && playerTurn) {
        $(this).css("background", primaryColor);
        $(this).append("<i class='fa fa-times'></i>");
      } if(ohs && !$(this).hasClass("active") && playerTurn) {
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
    if(exes) {
      if (!computerPlayer) {
        $(this).css("background", primaryColor);
        $(this).text("");
        $(this).append("<i class='fa fa-times'></i>");
        $(this).addClass("active ex");

        turns++;
        checkWinner();
        exes = false;
        ohs = true;
      } else if (computerPlayer && playerTurn) {
        $(this).css("background", primaryColor);
        $(this).text("");
        $(this).append("<i class='fa fa-times'></i>");
        $(this).addClass("active ex");

        turns++;
        checkWinner();
        exes = false;
        ohs = true;
        playerTurn = false;
        runComputerTurn();
      }
    } else if(ohs) {
      if(!computerPlayer) {
        $(this).css("background", secondaryColor);
        $(this).text("");
        $(this).append("<i class='fa fa-circle-o'></i>");
        $(this).addClass("active oh");

        turns++;
        checkWinner();
        exes = true;
        ohs = false;
      } else if (computerPlayer && playerTurn) {
        $(this).css("background", secondaryColor);
        $(this).text("");
        $(this).append("<i class='fa fa-circle-o'></i>");
        $(this).addClass("active oh");

        turns++;
        checkWinner();
        exes = true;
        ohs = false;
        playerTurn = false;
        runComputerTurn();
      }
    }
  });
  //click event for restarting a new game after a winner is found
  $("#restart").click(function() {
    clearBoard();
  });
  //function that checks the state of the board and sees if there is a winner
  //if found, triggers the win event
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
      } else {
        if(tac[3] === "ex") {
          board.push(2);
        } else if(tac[3] === "oh") {
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
      $("#end p").text("Exes Win!");
      $("#reset").click(function() {
        clearBoard();
      });
    } else if(player == 2) {
      $("#end").show();
      $("#end p").text("Ohs Win!");
      $("#reset").click(function() {
        clearBoard();
      });
    }
  }
  //reset board function that reloads the page from the browser cache
  function clearBoard() {
    location.reload(false);
  }
  //function that handles the computer's move and then changes the board UI to reflect that
  function runComputerTurn() {
    var boardState = checkBoard();
    var compTile = ohs ? "ohs" : "exes";
    var bestMove = findBestMove(boardState, compTile);

    if(exes) {
      $("#" + bestMove).css("background", primaryColor);
      $("#" + bestMove).text("");
      $("#" + bestMove).append("<i class='fa fa-times'></i>");
      $("#" + bestMove).addClass("active ex");

      turns++;
      checkWinner();
      exes = false;
      ohs = true;
      playerTurn = true;
    } else if (ohs) {
      $("#" + bestMove).css("background", secondaryColor);
      $("#" + bestMove).text("");
      $("#" + bestMove).append("<i class='fa fa-circle-o'></i>");
      $("#" + bestMove).addClass("active oh");

      turns++;
      checkWinner();
      exes = true;
      ohs = false;
      playerTurn = true;
    }
  }
  //a function that returns a preferred move based on the current board state
  function findBestMove(boardState, compTile) {
    var maxPlayer = (compTile === "exes") ? 2 : 5;
    var minPlayer = (maxPlayer == 2) ? 5 : 2;
    var bestMove = -100;
    var move = 0;

    for(var i = 0; i < boardState.length; i++) {
      var newBoard = testMove(boardState, i, maxPlayer);
      if(newBoard) {
        var predictedMove = minValue(newBoard, minPlayer, maxPlayer);
        if(predictedMove > bestMove) {
          bestMove = predictedMove;
          move = i;
        }
      }
    }
    return move;
  }
  function minValue(testBoard, minPlayer, maxPlayer) {
    if(testWinner(testBoard, maxPlayer)) {
      return 1;
    } else if (testWinner(testBoard, minPlayer)) {
      return -1;
    } else if (testTie(testBoard)) {
      return 0;
    } else {
      var bestMove = 100;
      for (var i = 0; i < testBoard.length; i++) {
        var newBoard = testMove(testBoard, i, minPlayer);
        if(newBoard) {
          var predictedMove = maxValue(newBoard, minPlayer, maxPlayer);
          if (predictedMove < bestMove) {
            bestMove = predictedMove;
          }
        }
      }
      return bestMove;
    }
  }
  function maxValue(testBoard, minPlayer, maxPlayer) {
    if (testWinner(testBoard, maxPlayer)) {
      return 1;
    } else if(testWinner(testBoard, minPlayer)) {
      return -1;
    } else if (testTie(testBoard)) {
      return 0;
    } else {
      var bestMove = -100;
      for(var i = 0; i < testBoard.length; i++) {
        var newBoard = testMove(testBoard, i, maxPlayer);
        if(newBoard) {
          var predictedMove = minValue(newBoard, minPlayer, maxPlayer);
          if (predictedMove > bestMove) {
            bestMove = predictedMove;
          }
        }
      }
      return bestMove;
    }
  }
  function copyBoard(board) {
    return board.slice(0);
  }
  function testMove(boardState, move, player) {
    var testBoard = copyBoard(boardState);

    if(testBoard[move] == 0) {
      testBoard[move] = player;
      return testBoard;
    } else {
      return null;
    }
  }
  function testWinner(board, player) {
    if (  (board[0] == player && board[1] == player && board[2] == player) ||
          (board[3] == player && board[4] == player && board[5] == player) ||
          (board[6] == player && board[7] == player && board[8] == player) ||
          (board[0] == player && board[3] == player && board[6] == player) ||
          (board[1] == player && board[4] == player && board[7] == player) ||
          (board[2] == player && board[5] == player && board[8] == player) ||
          (board[0] == player && board[4] == player && board[8] == player) ||
          (board[2] == player && board[4] == player && board[6] == player) ) {
              return true;
    } else {
              return false;
    }
  }
  function testTie(board) {
    for (var i = 0; i < board.length; i++) {
      if (board[i] == 0) {
        return false;
      }
    }
    return true;
  }
});
