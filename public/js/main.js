angular.module('myApp', [ 'ngSanitize', 'ui.router',  'firebase'  ])

.constant('version', '0.1')
.constant('fbUrl', 'https://duodev.firebaseio.com/')
.constant('fbRef', new Firebase('https://duodev.firebaseio.com'))

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
      controller: 'HomeController'
    })

    .state('language', {
      url: '/languages/:language',
      templateUrl: 'templates/language.html',
      controller: 'LanguageController'
    })

    .state('practice', {
      url: '/languages/:language/:level',
      templateUrl: 'templates/practice.html',
      controller: 'PracticeController'
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

});



