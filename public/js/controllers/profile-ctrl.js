angular.module('ProfileViewer').controller('ProfileCtrl', function($scope, UserService, $location, user) {
  $scope.user = user;
  $scope.logout = function() {
    UserService.logout().then(function() {
      $location.path('/login');
    })
  }
});
