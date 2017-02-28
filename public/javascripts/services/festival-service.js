(function() {
'use strict';


  angular.module('app')
    .factory('FestivalService', FestivalService);

  FestivalService.$inject = ['$resource'];

  function FestivalService($resource) {

    // var service = {
    //   getFestival
    // };


    // function getFestival() {
      // $http({
      //   url: 'https://agile-chamber-77499.herokuapp.com/artists',
      //   method: 'POST',
      //   data: { name: name, description: description }
      // }).success(function(response) {
      //   callback(response);
      // }).error(function(error) {
      //   callback(error);
      // })
      return $resource('/api/festivals/:id', {id: '@_id'});
    // }

    // return service;

  }

})();
