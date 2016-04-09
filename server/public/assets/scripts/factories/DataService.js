myApp.factory("DataService", ["$http","$window", "$location", function($http, $window, $location){
    var data = {};
    var userData = {};

    var companies = ['Prime'];

    var getUser = function(){
        $http.get("/user").then(function(response){
            data.response = response.data;
        });
    };

    var loginUser = function(user){
      $http.post('/', user).then(function(response){
        if (response.data === false) {
          $location.path('/failure')
        } else {
          // setTimeout($window.location.href = 'assets/views/logged_in/user.html', 10000);
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
      getUser: getUser,
      postUser: postUser,
      loginUser: loginUser,
      companies: companies,
    };
}]);
