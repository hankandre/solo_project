myApp.factory("DataService", ["$http","$window", "$location", function($http, $window, $location){
    var userData = {};

    var companies = {};
    var employees= [];

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
          userData.response = response.data;
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
        // $window.location.href = 'views/index.html';
      });
    };

    var postAdmin = function(admin){
      $http.post('/registeradmin', admin).then(function(response){
        console.log(response.data);
        // $window.location.href = 'views/index.html';
      });
    };

    var postCommuteData = function(commute) {
      console.log(commute);
      $http.post('/commute', commute).then(function(response) {
        console.log(response);
      });
    };

    var getEmployees = function() {
      var company = userData.response.company.split(' ').join('_').toLowerCase()
      $http.get('/employees/' + company + '').then(function(response) {
        
        console.log(response.data);
      })
    }

    return {
      user: userData,
      getCompanies: getCompanies,
      getEmployees: getEmployees,
      postUser: postUser,
      postAdmin: postAdmin,
      postCommuteData: postCommuteData,
      loginUser: loginUser,
      companies: companies,
    };
}]);
