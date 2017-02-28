(function() {
'use strict';


  angular.module('app')
    .factory('FestivalService', FestivalService);

  FestivalService.$inject = ['$resource'];

  function FestivalService($resource) {
    return $resource('/api/festivals/:id', {id: '@_id'});
  }

})();
