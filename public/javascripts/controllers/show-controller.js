(function() {
'use strict';


  angular.module('app')
  .controller('ShowController', ShowController);

  ShowController.$inject = ['$stateParams', 'Festival', '$scope'];

  function ShowController($stateParams, Festival, $scope) {
    var vm = this;
    vm.edited;
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
      Festival.addstage({festId: vm.festival._id, stageName: vm.stageName}, festival => {
        vm.festival = festival;
        $('#stage-input').val('');
      });
    }

    vm.editAct = function(act) {
      let $actNames = document.querySelectorAll('#artist-box h5');
      $actNames.forEach(actName => {
        if (actName.dataset.num === act._id) {
          $(actName).html(
            `<input type="text" id="edit" value="${act.artistName}" required>`
          );
          vm.actName = document.getElementById('edit').value;
          vm.edited = actName.dataset.num;
        }
      })
    }

    vm.submitEditAct = function(stage) {
      let $actNames = document.querySelectorAll('#artist-box h5');
      vm.actName = document.getElementById('edit').value;
      Festival.editact({
        stageId: stage._id,
        artistName: vm.actName,
        edited: vm.edited
      }, festival => {
        $actNames.forEach(actName => {
          if (actName.dataset.num === vm.edited) {
            $(actName).html(
              `${vm.actName}`
            );
          }
        })
        vm.festival = festival;
      });
    }

    // vm.editStage = function(stage) {
    //   function submitStage() {
    //     let $stageNames = document.querySelectorAll('#fest-stage-row .stage-name-row .stage-name');
    //     vm.stageName = document.getElementById('editStage').value;
    //     Festival.editstage({
    //       stageId: stage._id,
    //       artistName: vm.stageName,
    //       edited: vm.edited
    //     }, festival => {
    //       $stageNames.forEach(stageName => {
    //         if (stageName.dataset.stage === vm.edited) {
    //           $(stageName).html(
    //             `${vm.stageName}`
    //           );
    //         }
    //       })
    //       vm.festival = festival;
    //     });
    //   }

    //   let $stageNames = document.querySelectorAll('#fest-stage-row .stage-name-row .stage-name');
    //   $stageNames.forEach(stageName => {
    //     if (stageName.dataset.stage === stage._id) {
    //       $(stageName).html(
    //         `
    //         <form onsubmit="submitStage()">
    //           <input type="text" id="editStage" value="${stage.stageName}" required>
    //         </form>
    //          `
    //       );
    //       vm.stageName = document.getElementById('editStage').value;
    //       vm.edited = stageName.dataset.stage;
    //     }
    //   })
    // }

    vm.deleteAct = function(stage, act) {
      Festival.deleteact({stageId: stage._id, actId: act._id}, festival => {
        vm.festival = festival;
      });
    }

    vm.deleteStage = function (stage) {
      Festival.deletestage({stageId: stage._id}, festival => {
        vm.festival = festival;
      });
    }

    vm.addAct = function(stage) {
      let $artistName = $('#artist-name');
      let $startTime = $('#act-start-time');
      let $endTime = $('#act-end-time');
      const warningText = document.querySelector('#fest-inputs p.fira-sans');

      if ($artistName.val() === '' || $startTime.val() === '' || $endTime.val() === '') return;
      if (parseFloat($startTime.val()) >= parseFloat($endTime.val())) {
        return warningText.textContent = 'End time must be after Start time';
      }
      Festival.addact({
        stageId: stage._id,
        artistName: vm.artistName,
        actStartTime: vm.actStartTime,
        actEndTime: vm.actEndTime
      }, festival => {
        vm.festival = festival;
        $artistName.val('');
        $startTime.val('');
        $endTime.val('');
        warningText.textContent = '';
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
