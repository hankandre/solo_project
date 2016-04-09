myApp.factory("DataService", ["$http","$window", "$location", function($http, $window, $location){
    var data = {};
    var userData = {};

    var companies = {};

    var getUser = function(){
        $http.get("/user").then(function(response){
            data.response = response.data;
        });
    };

    var getCompanies = function() {
      $http.get('/companies').then(function(response) {
        companies.response = response.data;
        console.log(companies);
      });
    }

    var loginUser = function(user){
      $http.post('/', user).then(function(response){
        if (response.data === false) {
          $window.location.href = 'views/failure.html';
        } else {
          $location.path('/user');
          userData.response = response.data;
        }
      });
    };

    var postUser = function(user){
      companies.push(user.company)
      console.log(companies);
      $http.post('/register', user).then(function(response){
        console.log(response);
        $location.path('/home')
      });
    };

    return {
      user: userData,
      data: data,
      getCompanies: getCompanies,
      getUser: getUser,
      postUser: postUser,
      loginUser: loginUser,
      companies: companies,
    };
}]);
