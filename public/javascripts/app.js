(function() {
'use strict';

  angular.module('app', ['ui.router', 'ngAnimate', 'ngResource'])
    .config(configRoutes)
    .run(runBlock)
    .run(loginBlock);

    runBlock.$inject = ['$rootScope', '$state', 'UserService'];

    function runBlock($rootScope, $state, UserService) {
      $rootScope.$on('$stateChangeStart', function(evt, toState) {
        if(toState.loginRequired && !UserService.isLoggedIn()) {
          evt.preventDefault();
          $state.go('login');
        }
      });
    }

    loginBlock.$inject = ['$rootScope', '$state', 'UserService'];


    function loginBlock($rootScope, $state, UserService) {
      $rootScope.$on('$stateChangeStart', function(evt, toState) {
        if(toState.loggedIn && UserService.isLoggedIn()) {
          evt.preventDefault();
          $state.go('homepage');
        }
      });
    }

  configRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

  function configRoutes($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push('AuthInterceptor');

    $stateProvider

      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'templates/users/login.html',
        controller: 'UserController as userCtrl',
        loggedIn: true
      })

      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/users/signup.html',
        controller: 'UserController as userCtrl',
        loggedIn: true
      })

    $urlRouterProvider.otherwise('/home');
  }



})();


