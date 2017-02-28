(function() {
'use strict';


  angular.module('app')
  .controller('FestivalController', FestivalController);

  FestivalController.$inject = ['$state', 'FestivalService', '$scope'];

  function FestivalController($state, FestivalService, $scope) {
    var vm = this;

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

    vm.createFestival = function(title, stageName, startDate, endDate, artistName, startTime, endTime) {
      FestivalService.save({
        title: vm.title,
        stageName: vm.stageName,
        startDate: vm.startDate,
        endDate: vm.endDate,
        artistName: vm.artistName,
        startTime: vm.startTime,
        endTime: endTime
      }, function(data) {
        console.log(data);
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
