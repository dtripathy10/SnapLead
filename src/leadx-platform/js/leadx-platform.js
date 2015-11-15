
var response = {
"records":[
{"Name":"Alfreds Futterkiste","City":"Berlin","Country":"Germany"},
{"Name":"Ana Trujillo Emparedados y helados","City":"México D.F.","Country":"Mexico"},
{"Name":"Antonio Moreno Taquería","City":"México D.F.","Country":"Mexico"},
{"Name":"Around the Horn","City":"London","Country":"UK"},
{"Name":"B's Beverages","City":"London","Country":"UK"},
{"Name":"Berglunds snabbköp","City":"Luleå","Country":"Sweden"},
{"Name":"Blauer See Delikatessen","City":"Mannheim","Country":"Germany"},
{"Name":"Blondel père et fils","City":"Strasbourg","Country":"France"},
{"Name":"Bólido Comidas preparadas","City":"Madrid","Country":"Spain"},
{"Name":"Bon app'","City":"Marseille","Country":"France"},
{"Name":"Bottom-Dollar Marketse","City":"Tsawassen","Country":"Canada"},
{"Name":"Cactus Comidas para llevar","City":"Buenos Aires","Country":"Argentina"},
{"Name":"Centro comercial Moctezuma","City":"México D.F.","Country":"Mexico"},
{"Name":"Chop-suey Chinese","City":"Bern","Country":"Switzerland"},
{"Name":"Comércio Mineiro","City":"São Paulo","Country":"Brazil"}
]
} ;

var app = angular.module('myApp', ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('dashBoard', {
            url: '/dashBoard',
            templateUrl: 'partials/dashboard.html',
            data: {
              requireLogin: true
            }
        })
        .state('dashBoard.cardLayout', {
            url: '/cardLayout',
            templateUrl: 'partials/category.card.html',
            controller: 'cardLayoutController',
            data: {
              requireLogin: true
            }
        })
        .state('dashBoard.listLayout', {
            url: '/listLayout',
            templateUrl: 'partials/category.list.html',
            controller: 'listLayoutController',
            data: {
              requireLogin: true
            }
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'partials/profile.html',
            controller: 'profileController',
            data: {
              requireLogin: true
            }
        })
        .state('logout', {
            url: '/login',
            templateUrl: 'partials/login.html',
            controller: 'LogoutModalCtrl',
            data: {
              requireLogin: true
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'partials/login.html',
            controller: 'LoginModalCtrl',

            data: {
              requireLogin: false
            }
        });
    $urlRouterProvider.otherwise('/login');
});


app.filter('inSlicesOf', 
    ['$rootScope',  
    function($rootScope) {
      makeSlices = function(items, count) { 
        if (!count)            
          count = 3;
        
        if (!angular.isArray(items) && !angular.isString(items)) return items;
        
        var array = [];
        for (var i = 0; i < items.length; i++) {
          var chunkIndex = parseInt(i / count, 10);
          var isFirst = (i % count === 0);
          if (isFirst)
            array[chunkIndex] = [];
          array[chunkIndex].push(items[i]);
        }

        if (angular.equals($rootScope.arrayinSliceOf, array))
          return $rootScope.arrayinSliceOf;
        else
          $rootScope.arrayinSliceOf = array;
          
        return array;
      };
      
      return makeSlices; 
    }]
  );
 
 //authentication integration
//http://brewhouse.io/blog/2014/12/09/authentication-made-simple-in-single-page-angularjs-applications.html

app.run(function ($rootScope,$state,$stateParams) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$state = $state;
    if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
      event.preventDefault();
      return $state.go('login');
    }
  });

});


app.controller('LoginModalCtrl', function ($scope,$rootScope,$state) {

  $rootScope.currentUser = undefined;

  $scope.submit = function (email, password) {
    var user = {"email" : email, "password" : password};
    $rootScope.currentUser = user;
    // if(user.email == "demo") {
    //   return $state.go('dashBoard.cardLayout');
    // }else {
    //   alert("User name is demo");
    // }
    $state.go('dashBoard.cardLayout');
  };
});


app.controller('customersCtrl', function($scope, $http) {

});


app.controller('cardLayoutController', function($scope, $http) {
  $scope.names = response.records;
});

app.controller('listLayoutController', function($scope, $http) {
  $scope.names = response.records;
});

app.controller('profileController', function($scope, $http) {
});

app.controller('appControler', function($scope, $http, $location) {
  
});

app.controller('dashBoardController', function($scope, $http) {
  $scope.names = response.records;
});

app.controller('LogoutModalCtrl', function($scope, $rootScope) {
  $rootScope.currentUser = undefined;
});


