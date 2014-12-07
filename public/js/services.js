angular.module('myApp')

.service('JSONService', function($http) {
    this.getLevels =  function (language) {
        language = language.toLowerCase();
        return $http.get('data/' + language +'.json');
    }
});