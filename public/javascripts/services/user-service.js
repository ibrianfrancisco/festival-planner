(function() {
'use strict';

  angular.module('app')
    .factory('UserService', userService);

  userService.$inject = ['$http', 'TokenService', '$resource'];

  function userService($http, TokenService, $resource) {

    var user = null;

    var service = {
      login,
      logout,
      signup,
      getUser,
      isLoggedIn,
      removeUser
    };

    // get logged in user if already exists in server session
    $http.get('/api/users/me').then(function(res) {
      user = res.data;
    });

    function login(credentials) {
      return $http.post('/api/users/login', credentials);
    }

    function logout() {
      TokenService.removeToken();
    }

    function signup(userData) {
      return $http.post('/api/users', userData);
    }

    function getUser() {
      return getUserFromToken();
    }

    function isLoggedIn() {
      return !!getUserFromToken();
    }

    function removeUser() {
      return $resource('/api/users/:id', {id: '@_id'});
      // return $resource('users', {}, {
      //   update: {
      //     method: 'PUT'
      //   },
      //   remove: {
      //     method: 'DELETE',
      //     url: '/api/users/:id',
      //     params: {id: '@_id'}
      //   }
      // });
    }

    return service;

    // helper functions

    function getUserFromToken() {
      var token = TokenService.getToken();
      return token ? JSON.parse(atob(token.split('.')[1])).user : null;
    }
  }


})();


// function removeUser(id, cb) {
//   $http({
//     url: '/users/' + id,
//     method: 'DELETE'
//   }).success(function(response) {
//     cb(response);
//   }).error(function(error) {
//     cb(error);
//   });
// }
