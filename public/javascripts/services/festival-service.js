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
        addstage: {
          method: 'POST',
          url: '/api/festivals/:festId/stages',
          params: {festId: '@festId'},
          stageName: 'stageName'
        },
        getfestival: {
          method: 'GET',
          url: '/api/festivals/:festId',
          params: {festId: '@festId'}
        },
        addact: {
          method: 'POST',
          url: '/api/stages/:stageId/acts',
          params: {stageId: '@stageId'},
          artistName: 'artistName'
        },
        deletestage: {
          method: 'DELETE',
          url: '/api/stages/:stageId',
          params: {stageId: '@stageId'}
        },
        deleteact: {
          method: 'DELETE',
          url: '/api/acts/:stageId/:actId',
          params: {stageId: '@stageId', actId: '@actId'}
        },
        editact: {
          method: 'PUT',
          url: '/api/stages/:stageId/acts',
          params: {stageId: '@stageId'}
        }
      }
    )
  }

})();

