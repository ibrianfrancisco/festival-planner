(function() {
'use strict';


  angular.module('app')
  .controller('ShowController', ShowController);

  ShowController.$inject = ['$stateParams', 'Festival', 'datetime'];

  function ShowController($stateParams, Festival, datetime) {
    var vm = this;
    var parser = datetime("hh:mm a");

    // vm.test = parser.setDate(fes);


    // Margin-left
    // Every 5 minutes is 0.69444444%

    // width is the


    // temporary template used to display timeline
    vm.numbers = ["12:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00"];


    // $stateParams is the id that gets put into the url. then these get and delete things happen from this page
    vm.festival = Festival.get({id: $stateParams.id});

    vm.addStage = function() {
      //assume vm.festival already exists
      // vm.festival = {_id: $stateParams.id};
      // festId goes to controllers/festivals and vm.festival._id is the festival id that's provded already
      // MARKER 2 stageName goes to controllers/festivals // vm.newStageName one comes from the template
      Festival.addStage({festId: vm.festival._id, stageName: vm.stageName}, function(festival) {
        // Now this is how once the user clicks 'save stage', it will automatcally update,
        // because once it goes to the database, it comes right back into this argument
        // and from here , goes to browser template and has the power to call ? idk if get route is needed
        vm.festival = festival;
        $('#stage-input').val('');
        console.log(festival);
        // console.log('stage made');
      });
    }

    vm.addAct = function(stage) {

      console.log('start time');
      console.log(vm.actStartTime);
      console.log('start time with parser');
      console.log(vm.actStartTime);

      // where to convert date to String and stuff for rendering?
      // artist block isn't aligning to 0% left

      Festival.addAct({
        stageId: stage._id,
        artistName: vm.artistName,
        actStartTime: vm.actStartTime,
        actEndTime: vm.actEndTime
      }, function(festival) {
        vm.festival = festival;
        console.log(festival);
        $('#artist-name').val('');
        $('#act-start-time').val('');
        $('#act-end-time').val('');
      });
    }


    vm.leftOffset = function (startTime) {

    }

    vm.widthOffset = function (endTime) {

    }

  }

})();
