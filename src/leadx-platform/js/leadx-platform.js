
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
// app.js
// loginModal.js


// app.service('loginModal', function ($modal, $rootScope) {

//   function assignCurrentUser (user) {
//     $rootScope.currentUser = user;
//     return user;
//   }

//   return function() {
//     var instance = $modal.open({
//       templateUrl: 'partials/login.html',
//       controller: 'LoginModalCtrl',
//       controllerAs: 'LoginModalCtrl'
//     })

//     return instance.result.then(assignCurrentUser);
//   };

// });

// app.run(function ($rootScope, $state, loginModal) {

//   $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
//     var requireLogin = toState.data.requireLogin;

//     if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
//       event.preventDefault();

//       loginModal()
//         .then(function () {
//           return $state.go(toState.name, toParams);
//         })
//         .catch(function () {
//           return $state.go('signin');
//         });
//     }
//   });

// });

// LoginModalCtrl.js

app.run(function ($rootScope,$location) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;
    if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
      //event.preventDefault();
      //http://brewhouse.io/blog/2014/12/09/authentication-made-simple-in-single-page-angularjs-applications.html
      // get me a login modal!
      //return $location.path('/login');
    }
  });

});


app.controller('LoginModalCtrl', function ($scope) {
  this.submit = function (email, password) {
    alert("OK");
  };
});

// app.config(function ($httpProvider) {

//   $httpProvider.interceptors.push(function ($timeout, $q, $injector) {
//     var loginModal, $http, $state;

//     // this trick must be done so that we don't receive
//     // `Uncaught Error: [$injector:cdep] Circular dependency found`
//     $timeout(function () {
//       loginModal = $injector.get('loginModal');
//       $http = $injector.get('$http');
//       $state = $injector.get('$state');
//     });

//     return {
//       responseError: function (rejection) {
//         if (rejection.status !== 401) {
//           return rejection;
//         }

//         var deferred = $q.defer();

//         loginModal()
//           .then(function () {
//             deferred.resolve( $http(rejection.config) );
//           })
//           .catch(function () {
//             $state.go('welcome');
//             deferred.reject(rejection);
//           });

//         return deferred.promise;
//       }
//     };
//   });

// });


app.controller('customersCtrl', function($scope, $http) {
  //$scope.names = response.records;
});


app.controller('cardLayoutController', function($scope, $http) {
  $scope.names = response.records;
});

app.controller('listLayoutController', function($scope, $http) {
  $scope.names = response.records;
});

app.controller('profileController', function($scope, $http) {
});

app.controller('appControler', function($scope, $http) {
  $scope.names = response.records;
});

app.controller('dashBoardController', function($scope, $http) {
  $scope.names = response.records;
});

