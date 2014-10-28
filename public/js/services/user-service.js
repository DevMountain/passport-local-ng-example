angular.module('ProfileViewer').factory('UserService', function($http, $q) {
  return {
    login: function(email, password) {
      return $http({method: 'POST', url:'/api/auth', data: {email: email, password: password}});
    },
    getMyData: function() {
      var deferred = $q.defer();

      $http({method: 'GET', url:'/api/user/me'})
        .success(function(response) {
          console.log('success', response);
          deferred.resolve(response);
        })
        .error(function(err) {
          deferred.reject(err);
        })

      return deferred.promise;
    },
    logout: function() {
      return $http({method: 'POST', url:'/api/logout'});
    }
  }
});
