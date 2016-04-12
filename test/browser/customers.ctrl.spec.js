describe('CustomersCtrl', function() {
  var $controller, $rootScope, CustomerFactory, $q, $httpBackend, $state;

  beforeEach(module('app'));
  beforeEach(inject(function(_$controller_, _$rootScope_, _CustomerFactory_, _$q_, _$httpBackend_, _$state_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    CustomerFactory = _CustomerFactory_;
    $q = _$q_;
    $httpBackend = _$httpBackend_;
    $state = _$state_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();

  });

  describe('no customers', function() {
    it('sets the scope', function() {
      var $scope = $rootScope.$new();
      spyOn(CustomerFactory, 'fetchAll').and.callFake(function() {
        return $q.when([]);
      });
      $controller('CustomersCtrl', {$scope: $scope});
      $scope.$digest();
      expect($scope.customers.length).toEqual(0);
      expect($scope.message).toEqual('There are no customers');
    });
  });

  describe('there are customers', function() {
    it('sets the scope', function() {
      var $scope = $rootScope.$new();
      var fetchSpy = spyOn(CustomerFactory, 'fetchAll').and.callFake(function() {
        return $q.when([
            {name: 'Moe'},
            {name: 'Larry'},
            {name: 'Curly'},
        ]);
      });
      $controller('CustomersCtrl', {$scope: $scope});
      $scope.$digest();
      expect(fetchSpy).toHaveBeenCalled();
      expect($scope.customers.length).toEqual(3);
      expect($scope.customers[0].name).toEqual('Moe');
      expect($scope.message).toBeFalsy();
    });
  });

  describe('inserting a customer', function() {
    it('calls the insert factory method and goes to detail page', function() {
      var $scope = $rootScope.$new();

      var fetchSpy = spyOn(CustomerFactory, 'fetchAll').and.callFake(function() {
        return $q.when([]);
      });

      var createSpy = spyOn(CustomerFactory, 'create').and.callFake(function() {
        return $q.when({id: 5, name: 'Shep'});
      });

      var stateSpy = spyOn($state, 'go');

      $scope.newCustomer = {name: 'Shep'};
      $controller('CustomersCtrl', {$scope: $scope});
      $scope.insert();
      $scope.$digest();
      expect(fetchSpy).toHaveBeenCalled();
      expect(createSpy).toHaveBeenCalledWith($scope.newCustomer);
      expect(stateSpy).toHaveBeenCalledWith('customer', {id: 5});
    });
  });

  describe('deleting a customer', function() {
    it('calls the delete factory method and reloads data', function() {
      var $scope = $rootScope.$new();

      var fetchSpy = spyOn(CustomerFactory, 'fetchAll').and.callFake(function() {
        return $q.when([
            {name: 'Moe'}
        ]);
      });

      var deleteSpy = spyOn(CustomerFactory, '_delete').and.callFake(function() {
        return $q.when('');
      });

      $controller('CustomersCtrl', {$scope: $scope});
      $scope.$digest();
      $scope._delete($scope.customers[0]);
      $scope.$digest();
      expect(deleteSpy).toHaveBeenCalledWith($scope.customers[0]);
      expect(fetchSpy.calls.count()).toEqual(2);
    });
  });
});
