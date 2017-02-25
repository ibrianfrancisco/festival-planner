(function() {
'use strict';

  angular.module('app', ['ui.router', 'ngAnimate'])
    .config(configRoutes)
    .run(runBlock);

    runBlock.$inject = ['$rootScope', '$state', 'UserService'];

    function runBlock($rootScope, $state, UserService) {
      $rootScope.$on('$stateChangeStart', function(evt, toState) {
        if(toState.loginRequired && !UserService.isLoggedIn()) {
          evt.preventDefault();
          $state.go('login');
        }
      });
    }

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


