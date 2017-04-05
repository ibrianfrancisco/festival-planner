(function() {
'use strict';


  angular.module('app')
  .controller('ShowController', ShowController);

  ShowController.$inject = ['$stateParams', 'Festival', '$scope'];

  function ShowController($stateParams, Festival, $scope) {
    var vm = this;

    vm.timeline = ["12:00", "1:00", "2:00",
                   "3:00", "4:00", "5:00",
                   "6:00", "7:00", "8:00",
                   "9:00", "10:00", "11:00",
                   "12:00","1:00", "2:00",
                   "3:00", "4:00", "5:00",
                   "6:00", "7:00", "8:00",
                   "9:00", "10:00", "11:00"];

    vm.festival = Festival.get({id: $stateParams.id});

    vm.addStage = function() {
      Festival.addstage({festId: vm.festival._id, stageName: vm.stageName}, function(festival) {
        vm.festival = festival;
        $('#stage-input').val('');
      });
    }

    vm.deleteAct = function(stage, act) {
      Festival.deleteact({stageId: stage._id, actId: act._id}, function(festival) {
        vm.festival = festival;
      });
    }

    vm.deleteStage = function (stage) {
      Festival.deletestage({stageId: stage._id}, function(festival) {
        vm.festival = festival;
      });
    }

    vm.addAct = function(stage) {
      Festival.addact({
        stageId: stage._id,
        artistName: vm.artistName,
        actStartTime: vm.actStartTime,
        actEndTime: vm.actEndTime
      }, function(festival) {
        vm.festival = festival;
        $('#artist-name').val('');
      });
    }

    vm.leftOffset = function (dateStr) {
      var offsetPerHour = 1080/12;
      var dt = new Date(dateStr);
      var baseDate = new Date(dateStr).setHours(0, 0, 0, 0);
      var hrs = (dt - baseDate) / (1000 * 60 * 60);
      return (hrs * offsetPerHour) + 'px';
    }

    vm.actWidth = function (act) {
      var widthPerHour = 1080/12;
      var diff = (new Date(act.actEndTime).getTime() - new Date(act.actStartTime).getTime());
      diff = diff / (1000 * 60 * 60);
      return (diff * widthPerHour) + 'px';
    }

    vm.formatTime = function(dateStr) {
      var dt = new Date(dateStr);
      if (dt.getHours() > 12) {
        return dt.getHours() - 12 + ':' + ('0' + dt.getMinutes()).slice(-2);
      } else {
        return (dt.getHours()) + ':' + ('0' + dt.getMinutes()).slice(-2);
      }
    }

    $(document).ready(function () {
      $(document).on('mouseenter', '.divbutton', function () {
        $(this).find(":button").show();
      }).on('mouseleave', '.divbutton', function () {
        $(this).find(":button").hide();
      });
    });
  }

})();
