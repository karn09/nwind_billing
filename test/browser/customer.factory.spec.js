describe('CustomerFactory', function(){
  var CustomerFactory, $httpBackend;
  beforeEach(module('app'));
  beforeEach(inject(function(_$httpBackend_, _CustomerFactory_){
    $httpBackend = _$httpBackend_;
    CustomerFactory = _CustomerFactory_;
  }));

  afterEach(function(){
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  
  });

  describe('fetchAll', function(){
    it('returns the customers', function(){
      $httpBackend.when('GET', '/api/customers').respond([
          { name: 'Moe' },
          { name: 'Larry' },
          { name: 'Curly' },
      
      ]);
      $httpBackend.expect('GET', '/api/customers');
      CustomerFactory.fetchAll()
        .then(function(customers){
          expect(customers[0].name).toEqual('Moe');
        });
      $httpBackend.flush();
    });
  });

  describe('fetchById', function(){
    it('returns a customer', function(){
      $httpBackend.when('GET', '/api/customers/3').respond(
          { name: 'Moe' }
      );
      $httpBackend.expect('GET', '/api/customers/3');
      
      CustomerFactory.fetchById(3)
        .then(function(customer){
          expect(customer.name).toEqual('Moe');
        });
      $httpBackend.flush();
    });
  });

  describe('put', function(){
    it('calls put', function(){
      $httpBackend.when('PUT', '/api/customers/3').respond(
          { name: 'Curly' }
      );
      $httpBackend.expect('PUT', '/api/customers/3');
      
      CustomerFactory.update(3, { name: 'Curly'})
        .then(function(customer){
          expect(customer.name).toEqual('Curly');
        });
      $httpBackend.flush();
    });
  });

  describe('create', function(){
    it('calls post', function(){
      $httpBackend.when('POST', '/api/customers').respond(
          { name: 'Shep' }
      );
      $httpBackend.expect('POST', '/api/customers');
      
      CustomerFactory.create({ name: 'Shep'})
        .then(function(customer){
          expect(customer.name).toEqual('Shep');
        });
      $httpBackend.flush();
    });
  });
  describe('delete', function(){
    it('calls delete', function(){
      $httpBackend.when('DELETE', '/api/customers/3').respond(201, '');
      $httpBackend.expect('DELETE', '/api/customers/3');
      
      CustomerFactory._delete({ id: 3, name: 'Curly'})
        .then(function(data){
          expect(data).toEqual('');
        });
      $httpBackend.flush();
    });
  });
});
