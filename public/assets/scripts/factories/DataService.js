myApp.factory("DataService", ["$http","$window", "$location", function($http, $window, $location){
  var user = {};
  var userData = {};
  var companies = {};
  var employees = {};

    var getCompanies = function() {
      $http.get('/companies').then(function(response) {
        companies.response = response.data;
        console.log(companies);
      });
    }

    var getUser = function(user) {
      $http.get('/user').then(function(response) {
        user.data = response.data;
        console.log(response.data);
      });
    }

    var postUser = function(user){
      $http.post('/register', user).then(function(response){
        console.log(response);
        // $window.location.href = 'views/index.html';
      });
    };
    //
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
      var company = userData.response.company_name.split(' ').join('_').toLowerCase()
      $http.get('/employees/' + company + '').then(function(response) {
        employees.response = response.data;
      });
    }

    return {
      user: userData,
      getUser: getUser,
      getCompanies: getCompanies,
      getEmployees: getEmployees,
      employees: employees,
      postUser: postUser,
      postAdmin: postAdmin,
      postCommuteData: postCommuteData,
      // loginUser: loginUser,
      companies: companies,
    };
}]);
