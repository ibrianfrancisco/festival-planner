(function() {
'use strict';


  angular.module('app')
  .controller('FestivalController', FestivalController);

  FestivalController.$inject = ['$state'];

  function FestivalController($state) {
    var vm = this;


    vm.test = moment();

  }


})();
