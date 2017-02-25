(function() {
'use strict';

  angular.module('app')
    .factory('UserService', userService);

  userService.$inject = ['$http'];

  function userService($http) {

    var user = null;

    var service = {
      login,
      logout,
      signup,
      getUser,
      isLoggedIn
    };

    // get logged in user if already exists in server session
    $http.get('/api/users/me').then(function(res) {
      user = res.data;
    });

    function login(credentials) {
      return $http.post('/api/users/login', credentials).then(function(res) {
        user = res.data;
      }, function(res) {
        user = null;
      });
    }

    function logout() {
      return $http.get('/api/users/logout').then(function(res) {
        user = null;
      }, function(res) {
        user = null;
      });
    }

    function signup(userData) {
      return $http.post('/api/users', userData).then(function(res) {
        user = res.data;
      }, function(res) {
        user = null;
      });
    }

    function getUser() {
      return user;
    }

    function isLoggedIn() {
      return !!user;
    }

    return service;
  }


})();
