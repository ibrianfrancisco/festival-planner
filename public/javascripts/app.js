(function() {
'use strict';

  angular.module('app', ['ui.router', 'ngAnimate'])
    .config(configRoutes);

  configRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function configRoutes($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'templates/users/login.html',
        controller: 'UserController as userCtrl'
      })

      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/users/signup.html',
        controller: 'UserController as userCtrl'
      })

    $urlRouterProvider.otherwise('/home');
  }



})();


