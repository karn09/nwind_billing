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
      $controller('CustomerCtrl', {$scope: $scope, customer: { id: 3, name: 'Moe'}});
      //$scope.delete();
      $scope.$digest();
      expect($scope.customer.name).toEqual('Moe');
    });
  });

  describe('deleting a customer', function(){
    it('goes to listing page', function(){
      var $scope = $rootScope.$new();
      var state;
      $controller('CustomerCtrl', {$scope: $scope, customer: { id: 3, name: 'Moe'}});
      spyOn(CustomerFactory, '_delete').and.callFake(function(){
        return $q.when({});
      });
      spyOn($state, 'go').and.callFake(function(_state){
        state = _state; 
      });
      $scope.delete();
      $scope.$digest();
      expect($scope.customer.name).toEqual('Moe');
      expect(state).toEqual('customers');
    });
  });
});
