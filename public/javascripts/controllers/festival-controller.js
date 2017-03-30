(function() {
'use strict';


  angular.module('app')
  .controller('FestivalController', FestivalController);

  FestivalController.$inject = ['$state', 'Festival', '$scope'];

  function FestivalController($state, Festival, $scope) {
    var vm = this;

    $scope.festivals = Festival.query();

    vm.deleteFestival = function(festival) {
      var alert = confirm(`You're about to delete this festival, are you sure?`);
      if (alert == true) {
        $scope.festivals.splice($scope.festivals.findIndex(f => f._id === festival._id), 1);
        festival.$delete();
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

    vm.createFestival = function(title, date) {
      Festival.save({
        title: vm.title,
        date: vm.date
      }, function(data) {
        console.log('initialized Festival');
        $state.go('homepage');
        window.location.reload();
      });
    }

    $('#home-add-fest').hover(
      function(){$(this).children("span").toggleClass('glyphicon-pencil');
    });

  }

})();
