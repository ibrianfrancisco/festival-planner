(function() {
'use strict';

  angular.module('app')
    .factory('TokenService', TokenService);

  TokenService.$inject = [];

  function TokenService() {
    var service = {
      removeToken,
      getToken,
      setToken
    };

    function removeToken() {
      localStorage.removeItem('token');
    }

    function getToken() {
      var token = localStorage.getItem('token');
      if (token) {
        // check if expired, remove if it is
        var payload = JSON.parse(atob(token.split('.')[1]));
        // console.log(payload);
        if (payload.exp < Date.now() / 1000) {
          localStorage.removeItem('token');
          token = null;
        }
      }
      return token;
    }

    function setToken(token) {
      // gotta make sure that we have a token to pass otherwise it'll be null
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    }

    return service;

  }


})();
