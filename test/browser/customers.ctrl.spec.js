describe('CustomersCtrl', function(){
  var $controller, $rootScope, CustomerFactory, $q, $httpBackend, $state;

  beforeEach(module('app'));
  beforeEach(inject(function(_$controller_, _$rootScope_, _CustomerFactory_, _$q_, _$httpBackend_, _$state_){
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    CustomerFactory = _CustomerFactory_;
    $q = _$q_;
    $httpBackend = _$httpBackend_;
    $state = _$state_;
  }));

  afterEach(function(){
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  
  });

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

  describe('inserting a customer', function(){
    it('calls the insert factory method and goes to detail page', function(){
      var $scope = $rootScope.$new();
      var stateArguments;

      spyOn(CustomerFactory, 'fetchAll').and.callFake(function(){
        return $q.when([
            {
              name: 'Moe'
            },
            {},
            {}
        ]);
      });

      var spy = spyOn(CustomerFactory, 'create').and.callFake(function(){
        return $q.when({ id: 5, name: 'Shep'});
      });

      var stateSpy = spyOn($state, 'go');


      $scope.customer = { name: 'Shep'};
      var CustomersCtrl = $controller('CustomersCtrl', {$scope: $scope});
      $scope.insert({name: 'shep'});
      $scope.$digest();
      expect(spy).toHaveBeenCalledWith($scope.customer);
      expect(stateSpy).toHaveBeenCalledWith('customer', {id: 5});

    });
  });

  describe('deleting a customer', function(){
    it('calls the insert factory method and goes to detail page', function(){
      var $scope = $rootScope.$new();
      var stateArguments;

      var fetchSpy = spyOn(CustomerFactory, 'fetchAll').and.callFake(function(){
        return $q.when([
            {
              name: 'Moe'
            },
            {},
            {}
        ]);
      });

      var spy = spyOn(CustomerFactory, '_delete').and.callFake(function(){
        return $q.when('');
      });

      $state.go = function(){
        stateArguments = arguments;
      };

      $scope.customer = { name: 'Shep'};
      $controller('CustomersCtrl', {$scope: $scope});
      $scope.$digest();
      $scope._delete($scope.customers[0]);
      $scope.$digest();
      expect(spy).toHaveBeenCalledWith($scope.customers[0]);
      expect(fetchSpy.calls.count()).toEqual(2);
    });
  });
});
