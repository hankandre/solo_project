"use strict";

userApp.factory("UserService", ["$http", "$window", "$location", function ($http, $window, $location) {
  var user = {};
  var employees = {};
  var loaded = false;

  // var getStrava = function() {
  //   $http.get('/auth/strava').then(function(response) {
  //     console.log(response);
  //   })
  // }

  var getUser = function getUser() {
    return $http.get('/user').then(function (response) {
      console.log(response.data);
      user.response = response.data;
      if (response.data.admin) {
        $location.path('/admin');
        getEmployees();
      }
    });
  };

  var postCommuteData = function postCommuteData(commute) {
    user.response.date = commute.date;
    user.response.mode = commute.mode;
    user.response.miles = commute.miles;
    console.log(user.response);
    $http.post('/commute', user.response).then(function (response) {
      console.log(response);
    });
  };

  var getEmployees = function getEmployees() {
    console.log('getEmployees ', user);
    return $http.get('/employees').then(function (response) {
      employees.response = response.data;
    });
  };

  // var getStrava = function() {
  //   var id = user.response.strava_id;
  //   $http.get('/stravainfo/' + id + '').then(function(response) {
  //     callStrava(id);
  //   });
  // }

  var callStrava = function callStrava() {
    return $http.get('/callstrava/').then(function (response) {
      user.stravaInfo = response.data;
      console.log(user.stravaInfo);
    });
  };

  return {
    user: user,
    callStrava: callStrava,
    getUser: getUser,
    employees: employees,
    loaded: loaded,
    postCommuteData: postCommuteData,
    getEmployees: getEmployees
  };
}]);