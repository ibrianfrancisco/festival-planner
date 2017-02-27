(function() {
'use strict';

  angular.module('app')
    .factory('UserService', userService);

  userService.$inject = ['$http', 'TokenService'];

  function userService($http, TokenService) {

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

    function removeUser(roleid, userid) {
      return $http.delete('/users/' + roleid, {params: {userId: userID}})
      .then(function(response) {
        console.log(response.data);
      })
        // How james deleted an artist back then
      // delete: function(id, callback) {
      //   $http({
      //     url: 'https://agile-chamber-77499.herokuapp.com/artists/' + id,
      //     method: 'DELETE'
      //   }).success(function(response) {
      //     callback(response);
      //   }).error(function(error) {
      //     callback(error);
      //   })
    }

    return service;

    // helper functions

    function getUserFromToken() {
      var token = TokenService.getToken();
      return token ? JSON.parse(atob(token.split('.')[1])).user : null;
    }
  }


})();
