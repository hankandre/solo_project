userApp.factory("UserService", ["$http","$window", "$location", function($http, $window, $location){
  var user = {};
  var employees = {};
  var loaded = false;

  var getStrava = function() {
    $http.get('/auth/strava').then(function(response) {
      console.log(response);
    })
  }

  var getUser = function(info) {
    $http.get('/user').then(function(response) {
      user.response = response.data;
      if (response.data.admin) {
        $location.path('/admin');
        getEmployees();
      } else {
        $location.path('/user');
      }
    });
  }

    var postCommuteData = function(commute) {
      console.log(commute);
      $http.post('/commute', commute).then(function(response) {
        console.log(response);
      });
    };

    var getEmployees = function() {
      console.log('getEmployees ', user);
      var company = user.response.company_name.split(' ').join('_').toLowerCase()
      $http.get('/employees/' + company + '').then(function(response) {
        employees.response = response.data;
      });
    }

    return {
      user: user,
      getStrava: getStrava,
      getUser: getUser,
      employees: employees,
      loaded : loaded,
      postCommuteData: postCommuteData,
      getEmployees: getEmployees,
    };
}]);
