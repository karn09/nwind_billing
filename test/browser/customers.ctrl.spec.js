describe('CustomersCtrl', function(){
  var $controller, $rootScope, CustomerFactory, $q;

  beforeEach(module('app'));
  beforeEach(inject(function(_$controller_, _$rootScope_, _CustomerFactory_, _$q_){
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    CustomerFactory = _CustomerFactory_;
    $q = _$q_;
  }));

  describe('no customers', function(){
    it('sets the scope', function(){
      var $scope = $rootScope.$new();
      spyOn(CustomerFactory, 'fetchAll').and.callFake(function(){
        return $q.when([]);
      });
      var CustomersCtrl = $controller('CustomersCtrl', {$scope: $scope});
      $scope.$digest();
      expect($scope.customers.length).toEqual(0);
      expect($scope.message).toEqual('There are no customers');
    });
  });

  describe('there are customers', function(){
    it('sets the scope', function(){
      var $scope = $rootScope.$new();
      spyOn(CustomerFactory, 'fetchAll').and.callFake(function(){
        return $q.when([
            {
              name: 'Moe'
            },
            {},
            {}
        ]);
      });
      var CustomersCtrl = $controller('CustomersCtrl', {$scope: $scope});
      $scope.$digest();
      expect($scope.customers.length).toEqual(3);
      expect($scope.customers[0].name).toEqual('Moe');
      expect($scope.message).toBeFalsy();
    });
  });
});
