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
      } else if (response.data.strava_id != null) {
        var stravaId = response.data.strava_id;
        console.log(response.data);
        user.response = response.data;
        $location.path('/user');
        callStrava(stravaId);
      } else {
        console.log(response.data);
        user.response = response.data;
        $location.path('/user');
      }
    });
  }

    var postCommuteData = function(commute) {
      user.response.date = commute.date;
      user.response.mode = commute.mode;
      user.response.miles = commute.miles;
      console.log(user.response);
      $http.post('/commute', user.response).then(function(response) {
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
