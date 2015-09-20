//Angular Controller
var streamingApp = angular.module("TwitchEm", []);
streamingApp.controller("MainCtrl", function($scope, $http) {

  $scope.allUsers = [];
  $scope.onlineUsers = [];
  $scope.offlineUsers = [];

  var STREAMERS = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb",
                        "thomasballinger","noobs2ninjas","beohoff", "brunofin", "comster404",
                        "RiotGamesBrazil", "FragbiteLive", "realkraftyy", "medryBW"];
  var TWITCH_URL = "https://api.twitch.tv/kraken/";

  STREAMERS.forEach(function(stream) {
    var obj = {};

    $.getJSON(TWITCH_URL + "streams/" + stream).success(function(data) {
      var streaming = (data.stream === null) ? false : true;

      if (streaming) {
        obj.status = "fa fa-check";
        obj.title = data.stream.channel.status;
      } else {
        obj.status = "fa fa-exclamation";
        data.title = "";
      }
      obj.username = stream;

      $.getJSON(TWITCH_URL + "users/" + stream).success(function(data) {
        obj.name = data.display_name;
        obj.logo = data.logo;

        $scope.allUsers.push(obj);
        if (streaming) {
          $scope.onlineUsers.push(obj);
        } else {
          $scope.offlineUsers.push(obj);
        }
        $scope.profile = $scope.allUsers;
        $scope.$apply();
      });
    });
  });

  $('#menu li').on('click', function() {
    if ($(this).data('display') === 'allUsersUsers') {
      $scope.profile = $scope.allUsersUsers;
    } else if ($(this).data('display') === 'onlineUsersUsers') {
      $scope.profile = $scope.onlineUsersUsers;
    } else {
      $scope.profile = $scope.offlineUsersUsers;
    }
    $scope.$apply();
  })
});

streamingApp.directive("errSrc", function() {
  return {
    link: function(scope, element, attrs) {
      scope.$watch(function() {
        return attrs["ngSrc"];
      }, function(value) {
        if(!value) {
          element.attr("src", attrs.errSrc);
        }
      });

      element.bind("error", function() {
        element.attr("src", attrs.errSrc);
      });
    }
  }
});
