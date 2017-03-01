(function() {
'use strict';

  angular.module('app', ['datetime','ui.router', 'ngAnimate', 'ngResource'])
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

      .state('welcome', {
        url: '/welcome',
        templateUrl: 'templates/welcome.html'
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

      .state('homepage', {
        url: '/home',
        templateUrl: 'templates/users/homepage.html',
        controller: 'FestivalController as festCtrl',
        loginRequired: true
      })

      .state('settings', {
        url: '/settings',
        templateUrl: 'templates/users/settings.html',
        loginRequired: true
      })

      .state('festival', {
        url: '/festival',
        templateUrl: 'templates/festivals/festival.html',
        controller: 'FestivalController as festCtrl',
        loginRequired: true
      })

    $urlRouterProvider.otherwise('/welcome');
  }



})();


