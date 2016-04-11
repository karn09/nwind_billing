describe('states', function(){
  var $state;
  beforeEach(module('app'));
  beforeEach(inject(function(_$state_){
    $state = _$state_;
  }));

  describe('customers', function(){
    it('has a url of /customers', function(){
      var state = $state.get('customers');
      expect(state.url).toEqual('/customers');
      expect(state.controller).toEqual('CustomersCtrl');
    });
  });

  describe('customer', function(){
    it('has a url of /customers/:id', function(){
      var state = $state.get('customer');
      var url = $state.href(state, { id: 3});
      expect(url).toEqual('#/customers/3');
      expect(typeof state.resolve.customer === 'function').toEqual(true);
    });
  });
});
