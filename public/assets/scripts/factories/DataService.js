myApp.factory("DataService", ["$http","$window", "$location", function($http, $window, $location){
    var data = {};
    var userData = {};

    var companies = {};

    var getCompanies = function() {
      $http.get('/companies').then(function(response) {
        companies.response = response.data;
        console.log(companies);
      });
    }

    var loginUser = function(user){
      $http.post('/user', user).then(function(response){
        if (response.data === false) {
          $window.location.href = 'views/failure.html';
        } else if (response.data.admin) {
          $location.path('/admin');
        }else {
          userData.response = response.data;
          $location.path('/user');
        }
      });
    };

    var postUser = function(user){
      $http.post('/register', user).then(function(response){
        console.log(response);
        $location.path('/home')
      });
    };

    var postCommuteData = function(commute) {
      console.log(commute);
      $http.post('/commute', commute).then(function(response) {
        console.log(response);
      });
    };

    return {
      user: userData,
      data: data,
      getCompanies: getCompanies,
      postUser: postUser,
      postCommuteData: postCommuteData,
      loginUser: loginUser,
      companies: companies,
    };
}]);
