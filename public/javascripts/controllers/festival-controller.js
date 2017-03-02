(function() {
'use strict';


  angular.module('app')
  .controller('FestivalController', FestivalController);

  FestivalController.$inject = ['$state', 'Festival', '$scope'];

  function FestivalController($state, Festival, $scope) {
    var vm = this;

    // temporary template used to display timeline
    vm.numbers = ["12:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00"];

    $scope.festivals = Festival.query();

    vm.goToFestival = function() {
      $state.go('createfestival');
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

    vm.getFestival = function(festival) {
      var festId = festival;
      Festival.getFestival({festId: festId}, function(festival) {
        console.log(festival);
        console.log('got festival');
        vm.festival = festival;
        $state.go('showfestival', {id: festival._id});
      })
    }

    vm.createFestival = function(title, date, stageName, artistName, actStartTime, actEndTime) {
      Festival.save({
        title: vm.title,
        date: vm.date,
        stageName: vm.stageName,
        artistName: vm.artistName,
        actStartTime: vm.actStartTime,
        actEndTime: vm.actEndTime
      }, function(data) {
        console.log('festival created');
        $state.go('homepage');
      });
    }

    vm.initFestival = function(title, date) {
      Festival.save({
        title: vm.title,
        date: vm.date
      }, function(data) {
        console.log('initialized Festival');
        $state.go('homepage');
      });
    }

    $('#festival-button').hover(
      function(){$(this).children("span").toggleClass('glyphicon-pencil');
    });

  }


})();
