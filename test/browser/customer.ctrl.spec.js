describe('CustomersCtrl', function(){
  var $controller, $rootScope, CustomerFactory, $q, $state;

  beforeEach(module('app'));
  beforeEach(inject(function(_$controller_, _$rootScope_, _CustomerFactory_, _$q_, _$state_){
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    CustomerFactory = _CustomerFactory_;
    $q = _$q_;
    $state = _$state_;
  }));

  describe('scope', function(){
    it('sets the scope', function(){
      var $scope = $rootScope.$new();
      var customer = { id: 3, name: 'Moe'};
      $controller('CustomerCtrl', {$scope: $scope, customer: customer });
      $scope.$digest();
      expect($scope.customer).toEqual(customer);
    });
  });

  describe('deleting a customer', function(){
    it('goes to listing page', function(){
      var $scope = $rootScope.$new();
      var customer = { id: 3, name: 'Moe'};
      $controller('CustomerCtrl', {$scope: $scope, customer: customer });
      var factorySpy = spyOn(CustomerFactory, '_delete').and.callFake(function(){
        return $q.when({});
      });
      var stateSpy = spyOn($state, 'go');
      $scope._delete();
      $scope.$digest();
      expect(factorySpy).toHaveBeenCalledWith($scope.customer);
      expect(stateSpy).toHaveBeenCalledWith('customers');
    });
  });

  describe('updating a customer', function(){
    it('goes to listing page', function(){
      var $scope = $rootScope.$new();
      var customer = { id: 3, name: 'Moe'};
      $controller('CustomerCtrl', {$scope: $scope, customer: customer });
      var factorySpy = spyOn(CustomerFactory, 'update').and.callFake(function(){
        return $q.when({ id: 3, name: 'Moe'});
      });

      $scope.update();
      $scope.$digest();
      expect(factorySpy).toHaveBeenCalledWith($scope.customer);
    });
  });
});
