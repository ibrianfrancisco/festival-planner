(function() {
'use strict';


  angular.module('app')
  .controller('FestivalController', FestivalController);

  FestivalController.$inject = ['$state', 'FestivalService', '$scope'];

  function FestivalController($state, FestivalService, $scope) {
    var vm = this;

    // temporary template used to display timeline
    vm.numbers = ["12:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00"];

    $scope.festivals = FestivalService.query();

    vm.goToFestival = function() {
      $state.go('festival');
    }

    vm.deleteFestival = function (festival) {
      var alert = confirm(`You're about to delete this festival, are you sure?`);
      if (alert == true) {
        festival.$delete(function() {
          $scope.festivals.splice($scope.festivals.findIndex(t => t._id), 1);
        });
      } else {
        return
      }
    }

    vm.createFestival = function(title, date, stageName, stageStartTime, stageEndTime, artistName, actStartTime, actEndTime) {
      FestivalService.save({
        title: vm.title,
        date: vm.date,
        stageName: vm.stageName,
        stageStartTime: vm.stageStartTime,
        stageEndTime: vm.stageEndTime,
        artistName: vm.artistName,
        actStartTime: vm.actStartTime,
        actEndTime: vm.actEndTime
      }, function(data) {
        console.log('festival created');
        $state.go('homepage');
      });
    }

    // vm.test = moment();

    $('#festival-button').hover(
      function(){$(this).children("span").toggleClass('glyphicon-pencil');
    });

  }


})();
