$(document).ready(function() {
  var exes = true;
  var ohs = false;
  var computerPlayer = false;
  var playerTurn = true;
  var state = "2P";
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
        $(this).addClass("active p1");

        exes = false;
        ohs = true;
        turns++;
        checkWinner();
      } else if (computerPlayer && playerTurn) {
        $(this).css("background", primaryColor);
        $(this).text("");
        $(this).append("<i class='fa fa-times'></i>");
        $(this).addClass("active p1");

        exes = false;
        ohs = true;
        playerTurn = false;
        turns++;
        checkWinner();
        runComputerTurn();
      }
    } else if(ohs) {
      if(!computerPlayer) {
        $(this).css("background", secondaryColor);
        $(this).text("");
        $(this).append("<i class='fa fa-circle-o'></i>");
        $(this).addClass("active p2");

        exes = true;
        ohs = false;
        turns++;
        checkWinner();
      } else if (computerPlayer && playerTurn) {
        $(this).css("background", secondaryColor);
        $(this).text("");
        $(this).append("<i class='fa fa-circle-o'></i>");
        $(this).addClass("active p2");

        exes = true;
        ohs = false;
        playerTurn = false;
        turns++;
        checkWinner();
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
    var bestMove = getMiniMax(boardState);

    if(exes) {
      /*
      $("#" + bestMove).css("background", primaryColor);
      $("#" + bestMove).text("");
      $("#" + bestMove).append("<i class='fa fa-times'></i>");
      $("#" + bestMove).addClass("active p1");
      */
      console.log("Computer Moves");

      exes = false;
      ohs = true;
      playerTurn = true;
    } else if (ohs) {
      /*
      $("#" + bestMove).css("background", secondaryColor);
      $("#" + bestMove).text("");
      $("#" + bestMove).append("<i class='fa fa-circle-o'></i>");
      $("#" + bestMove).addClass("active p2");
      */
      console.log("Computer Moves")

      exes = true;
      ohs = false;
      playerTurn = true;
    }
  }
  //a function that returns the best move based on the current board state
  function getMiniMax(boardState) {

  }
});
/*
MinMax Algorithm Psudocode
-----------------------------
def minimax(game)
    return score(game) if game.over?
    scores = [] # an array of scores
    moves = []  # an array of moves

    # Populate the scores array, recursing as needed
    game.get_available_moves.each do |move|
        possible_game = game.get_new_state(move)
        scores.push minimax(possible_game)
        moves.push move
    end

    # Do the min or the max calculation
    if game.active_turn == @player
        # This is the max calculation
        max_score_index = scores.each_with_index.max[1]
        @choice = moves[max_score_index]
        return scores[max_score_index]
    else
        # This is the min calculation
        min_score_index = scores.each_with_index.min[1]
        @choice = moves[min_score_index]
        return scores[min_score_index]
    end
end
*/
