(function() {
'use strict';


  angular.module('app')
    .factory('Festival', FestivalService);

  FestivalService.$inject = ['$resource'];

  function FestivalService($resource) {

    return $resource(
      '/api/festivals/:id',
      {id: '@_id'},
      {
        addStage: {
          method: 'POST',
          url: '/api/festivals/:festId/stages',
          params: {festId: '@festId'},
          stageName: 'stageName'
        };
      };
    );
  }

// I forget where these comes from
})();
