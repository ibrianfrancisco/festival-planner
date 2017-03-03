(function() {
'use strict';


  angular.module('app')
  .controller('FestivalController', FestivalController);

  FestivalController.$inject = ['$state', 'Festival', '$scope'];

  function FestivalController($state, Festival, $scope) {
    var vm = this;

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

    vm.deleteStage = function (festival) {
      festival.$delete(function() {
        $scope.festivals.stages.splice($scope.festivals.stages.findIndex(t => t._id), 1);
        console.log('yes');
      })
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
