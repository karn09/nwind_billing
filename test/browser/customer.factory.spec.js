describe('CustomerFactory', function(){
  beforeEach(module('app'));
  describe('fetchAll', function(){
    it('returns the customers', function(){
      expect(customers.length).toEqual(3);
    });
  });
});
