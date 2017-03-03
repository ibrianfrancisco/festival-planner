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
        },
        getFestival: {
          method: 'GET',
          url: '/api/festivals/:festId',
          params: {festId: '@festId'}
        },
        addAct: {
          method: 'POST',
          url: '/api/stages/:stageId/acts',
          params: {stageId: '@stageId'},
          artistName: 'artistName'
        }
      }
    )
  }

})();

