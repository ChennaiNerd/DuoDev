angular.module('myApp')

.controller('HomeController',
        function($scope, $rootScope, $firebase, fbUrl) {

    $scope.newMessage = '';
    var ref = new Firebase(fbUrl + '/customers');
    $scope.customers = $firebase(ref).$asArray();

    var ref = new Firebase(fbUrl + '/operators');
    $scope.operators = $firebase(ref).$asArray();

    $scope.openChat = function (customer) {
        var ref = new Firebase(fbUrl + '/customers/' + customer.$id + '/messages');
        $scope.messages = $firebase(ref).$asArray();
        $scope.chatName = customer.name + '(' + customer.email + ')';
        $scope.customer = customer;
    }

    $scope.closeChat = function () {
        $scope.messages = [];
        $scope.chatName = null;
    }

    $scope.addMessage = function(e) {
        if (e.keyCode != 13) {
            return;
        };
        $scope.messages.$add({ body: $scope.newMessage, from: $rootScope.operatorName });
        $scope.newMessage = '';
    }
})

.controller('LanguageController',
        function($scope, $rootScope, $firebase, fbUrl) {

})

.controller('LevelController',
        function($scope, $rootScope, $firebase, fbUrl) {

});