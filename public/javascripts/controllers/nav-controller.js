(function() {
'use strict';

  angular.module('app')
  .controller('NavController', NavController);

  NavController.$inject = ['$state', 'UserService'];

  function NavController($state, UserService) {
    var vm = this;

    vm.logout = function() {
      UserService.logout();
      $state.go('welcome');
    };

    vm.getUser = UserService.getUser;
    vm.isLoggedIn = UserService.isLoggedIn;

    vm.deleteUser = function (user) {
      var alert = confirm(`You're about to delete you account, are you sure?`);
      if (alert == true) {
        user.$delete(function() {
          console.log('hello');
          console.log(user);
        })
      }
    }

  }

})();
