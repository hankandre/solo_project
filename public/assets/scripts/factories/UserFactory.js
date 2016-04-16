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
      if (response.data.admin) {
        console.log(response.data);
        user.response = response.data;
        $location.path('/admin');
        getEmployees();
      } else {
        console.log(response.data);
        user.response = response.data;
        $location.path('/user');
        callStrava(response.data.strava_id);
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

    // var getStrava = function() {
    //   var id = user.response.strava_id;
    //   $http.get('/stravainfo/' + id + '').then(function(response) {
    //     callStrava(id);
    //   });
    // }

    var callStrava = function(id) {
      $http.get('/callStrava/' + id + '').then(function(response){
        user.stravaInfo = response.data;
        console.log(user.stravaInfo);
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
