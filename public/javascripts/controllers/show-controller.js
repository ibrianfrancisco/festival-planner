(function() {
'use strict';


  angular.module('app')
  .controller('ShowController', ShowController);

  ShowController.$inject = ['$stateParams', 'Festival'];

  function ShowController($stateParams, Festival) {
    var vm = this;

    // $stateParams is the id that gets put into the url. then these get and delete things happen from this page

    vm.festival = Festival.get({id: $stateParams.id});

    vm.addStage = function() {
      //assume vm.festival already exists
      vm.festival = {_id: $stateParams.id};
      // festId goes to controllers/festivals and vm.festival._id is the festival id that's provded already
      // MARKER 2 stageName goes to controllers/festivals // vm.newStageName one comes from the template
      Festival.addStage({festId: vm.festival._id, stageName: vm.stageName}, function(festival) {
        // Now this is how once the user clicks 'save stage', it will automatcally update,
        // because once it goes to the database, it comes right back into this argument
        // and from here , goes to browser template and has the power to call ? idk if get route is needed
        vm.festival = festival;
      });
    }


  }

})();
