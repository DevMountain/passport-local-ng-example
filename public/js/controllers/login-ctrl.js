angular.module('ProfileViewer').controller('LoginCtrl', function($scope, $location, UserService) {
  $scope.login = function() {
    UserService.login($scope.email, $scope.password)
      .success(function() {
        console.log("SUCCESS");
        //redirect them to profile
        $scope.loginError = false;
        $location.path('/profile');
      })
      .error(function() {
        console.log("FAIL");
        //show error message
        $scope.loginError = true;
      })
  }
});
