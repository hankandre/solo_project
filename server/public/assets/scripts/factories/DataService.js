myApp.factory("DataService", ["$http","$window", "$location", function($http, $window, $location){
    var data = {};
    var companies = [];

    var getUser = function(){
        $http.get("/user").then(function(response){
            data.response = response.data;
        });
    };

    var loginUser = function(user){
      $http.post('/', user).then(function(response){
        if (response.data === false) {
          $location.path('/')
        } else {
          $window.location.href = 'assets/views/routes/user.html'
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
        data: data,
        getUser: getUser,
        postUser: postUser,
        loginUser: loginUser,
        companies: companies,
    };
}]);
