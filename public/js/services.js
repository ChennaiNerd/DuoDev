angular.module('myApp')

.service('JSONService', function($http) {
    this.getPictures =  function (language) {
        language = language.toLowerCase();
        return $http.get('data/' + language +'.json');
    }
});