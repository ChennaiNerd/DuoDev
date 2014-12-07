angular.module('myApp')

.controller('HomeController',
        function($scope, $rootScope, $firebase, fbUrl, $window) {

    $scope.languages = [['Java', 'JavaScript', 'C'],
                      ['Bash', 'Markdown', 'PHP']];

    $scope.randomColor = function () {
        return {
            'background-color': $window.randomColor({luminosity: 'dark'})
        };
    }

    // $scope.newMessage = '';
    // var ref = new Firebase(fbUrl + '/customers');
    // $scope.customers = $firebase(ref).$asArray();

    // var ref = new Firebase(fbUrl + '/operators');
    // $scope.operators = $firebase(ref).$asArray();

    // $scope.openChat = function (customer) {
    //     var ref = new Firebase(fbUrl + '/customers/' + customer.$id + '/messages');
    //     $scope.messages = $firebase(ref).$asArray();
    //     $scope.chatName = customer.name + '(' + customer.email + ')';
    //     $scope.customer = customer;
    // }

    // $scope.closeChat = function () {
    //     $scope.messages = [];
    //     $scope.chatName = null;
    // }

    // $scope.addMessage = function(e) {
    //     if (e.keyCode != 13) {
    //         return;
    //     };
    //     $scope.messages.$add({ body: $scope.newMessage, from: $rootScope.operatorName });
    //     $scope.newMessage = '';
    // }
})

.controller('LanguageController',
        function($scope, $stateParams, $window, JSONService) {

    var getFlattenArray = function (length) {
        if (length === 1) {
            return [[1]];
        } else if (length === 2) {
            return [[1], [2]];
        } else if (length === 3) {
            return [[1], [2, 3]];
        } else if (length === 4) {
            return [[1], [2, 3], [4]];
        } else if (length === 5) {
            return [[1], [2, 3], [4, 5]];
        } else if (length === 6) {
            return [[1], [2, 3], [4, 5, 6]];
        } else if (length === 7) {
            return [[1], [2, 3], [4, 5], [6,7]];
        } else if (length === 8) {
            return [[1], [2, 3], [4, 5], [6,7, 8]];
        } else if (length === 8) {
            return [[1], [2, 3], [4, 5, 6], [7, 8]];
        } else if (length === 9) {
            return [[1], [2, 3], [4, 5, 6], [7, 8, 9]];
        } else if (length === 10) {
            return [[1], [2, 3], [4, 5, 6], [7, 8, 9, 10]];
        }
    }

    $scope.getClass = function (length) {
        // Length must be 1, 2, 3, and 4. Not more than that.
        var gridSize = 12 / length;
        return 'col-sm-' + gridSize;
    }

    $scope.getContainerClass = function (length) {
        return 'levels-container levels-container-' + length;
    }

    $scope.language = $stateParams.language;
    JSONService.getPictures($scope.language)
        .then(function(response) {
            $scope.levels = response.data || [];;
            $scope.levelsCount = $scope.levels.length;
            $scope.levelsSplitArray = getFlattenArray($scope.levelsCount);
        }, function(error) {
            $window.alert('Language file does not exist!')
            return $location.path('/');
        }).finally(function () {
        });
})

.controller('PracticeController',
        function($scope, $rootScope, $firebase, fbUrl) {

    $scope.language = $stateParams.level || 'Unknown';

});