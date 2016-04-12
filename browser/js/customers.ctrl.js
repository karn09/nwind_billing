app.controller('CustomersCtrl', function($scope, CustomerFactory, $state) {
  CustomerFactory.fetchAll()
    .then(function(res) {
      $scope.customers = res;
      if (res.length === 0) {
        $scope.message = 'There are no customers';
      }
    });

  $scope.insert = function() {
    CustomerFactory.create($scope.newCustomer)
      .then(function(res) {
        $state.go('customer', {id: res.id});
      });
  };

  $scope._delete = function(obj) {
    CustomerFactory._delete(obj)
      .then(function(res) {
        CustomerFactory.fetchAll();
      });
  };
});
