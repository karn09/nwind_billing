app.controller('CustomerCtrl', function($scope, $state, customer, CustomerFactory) {
  $scope.customer = customer;
  $scope._delete = function() {
    CustomerFactory._delete($scope.customer)
      .then(function(res) {
        $state.go('customers');
      });
  };

  $scope.update = function() {
    CustomerFactory.update($scope.customer);
  };
});
