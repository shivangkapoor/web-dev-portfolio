$(document).ready(function() {
  var playerOne = true;

  var primaryColor = "#fff";
  var secondaryColor = "#60CFFF";
  var tertiaryColor = "#FF60CF";

  $("#board .btn").hover(
    function() {
      if(playerOne) {
        $(this).css("background", primaryColor);
      } if(!playerOne) {
        $(this).css("background", tertiaryColor);
      }
    },
    function() {
      $(this).css("background", secondaryColor);
  });
  
});
