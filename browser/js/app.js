var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider) {
  $stateProvider.state('customers', {
    url: '/customers',
    controller: 'CustomersCtrl'
  });
  $stateProvider.state('customer', {
    url: '/customers/:id',
    resolve: {
      customer: function($stateParams) {
        return $http.get('/api/customers' + $stateParams.id);
      }
    }
  });
});
