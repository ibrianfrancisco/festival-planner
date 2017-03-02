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
          // this is connected to the routes, it's only called this because the params left side is called that. the @festId is just
          // like a variable name, but it comes automatically from the festival and transfers it to the server controller
          // it's under params because that's the paramaters that it comes with.. like a function
          url: '/api/festivals/:festId/stages',
          params: {festId: '@festId'},
          // right side, comes from browser transfer to client contrller. it's just along for the ride
          stageName: 'stageName'
        },

        getFestival: {
          method: 'GET',
          url: '/api/festivals/:festId',
          params: {festId: '@festId'}
        }
      }
    )
  }

// I forget where these comes
})();
