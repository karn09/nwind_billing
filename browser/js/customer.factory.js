app.factory('CustomerFactory', function($http) {
  return {
    fetchAll: function() {
      return $http.get('/api/customers')
        .then(function(res) {
          return res.data;
        });
    },
    fetchById: function(id) {
      return $http.get('/api/customers/' + id)
        .then(function(res) {
          return res.data;
        });
    },
    update: function(id, obj) {
      return $http.put('/api/customers/' + id, obj)
        .then(function(res) {
          return res.data;
        });
    },
    create: function(obj) {
      return $http.post('/api/customers', obj)
        .then(function(res) {
          return res.data;
        });
    },
    _delete: function(obj) {
      return $http.delete('/api/customers/' + obj.id, obj.name)
        .then(function(res) {
          return res.data;
        });
    }
  };
});
