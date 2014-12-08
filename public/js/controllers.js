angular.module('myApp')

.controller('HomeController',
        function($scope, $rootScope, $firebase, fbUrl, $window) {

    $scope.languages = [['C', 'Java', 'JavaScript'],
                      ['Python', 'Bash', 'Markdown']];

    $scope.randomColor = function () {
        return {
            'background-color': $window.randomColor({luminosity: 'dark'})
        };
    }

    // Set name
    var ref = $firebase(new Firebase(fbUrl + 'users/' + $rootScope.userId));
    ref.$set('name', $rootScope.userName);
    ref.$set('gravatar', $rootScope.gravatar);

    // Get my score
    ref = new Firebase(fbUrl + 'users/' + $rootScope.userId + '/score');
    var obj = $firebase(ref).$asObject();
    obj.$loaded().then(function() {
        $scope.myScore = (obj.$value || 0);
     });

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
    JSONService.getLevels($scope.language)
        .then(function(response) {
            $scope.levels = response.data;
            $scope.levelsCount = $scope.levels.length;
            $scope.levelsSplitArray = getFlattenArray($scope.levelsCount);
        }, function(error) {
            $window.alert('Language file does not exist!')
            return $location.path('/');
        }).finally(function () {
        });
})

.controller('PracticeController',
        function($scope, $rootScope, $state, $stateParams, $location, JSONService,
                 $firebase, fbUrl, $window) {

    $scope.score = 10;
    $scope.heartCount = 3;
    $scope.selectionIndex = 0;
    $scope.correct = false;
    $scope.wrong = false;
    $scope.help = false;
    $scope.answer = {
        value : null
    };

    $scope.language = $stateParams.language;
    $scope.levelIndex = +($stateParams.level);
    JSONService.getLevels($scope.language)
        .then(function(response) {
            var levels = response.data;
            $scope.levelsCount = levels.length;
            $scope.level = levels[$scope.levelIndex-1];
            $scope.questionsCount = $scope.level.questions.length;
        }, function(error) {
            $window.alert('Language file does not exist!')
            return $location.path('/');
        }).finally(function () {
        });

    $scope.showHelp = function () {
        $scope.help = true;
    }

    $scope.check = function (item) {
        if (item.answer === $scope.answer.value) {
            $scope.correct = true;
            $scope.wrong = false;
        } else {
            $scope.correct = false;
            $scope.wrong = true;
            $scope.heartCount--;
        }

        if ($scope.heartCount < 0) {
            $window.alert('Sorry!. You lost all your hearts. Try again.')
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
            return;
        }

        $scope.help = false;
        $scope.hideHelp = true;
    }

    $scope.continue = function (index) {
        $scope.selectionIndex = index;
        $scope.answer.value = null;
        $scope.correct = false;
        $scope.wrong = false;

        if (index === $scope.questionsCount) {
            $scope.nextLevel = $scope.levelIndex + 1;
            $scope.selectionIndex = 0;
            $scope.completed = true;

            // Store Score
            $scope.score += $scope.heartCount;
            var ref = new Firebase(fbUrl + 'users/' + $rootScope.userId + '/score');
            var obj = $firebase(ref).$asObject();
            obj.$loaded().then(function() {
                obj.$value = (obj.$value || 0) + $scope.score;
                obj.$save();
             });
        }

        if ($scope.levelIndex === $scope.levelsCount) {
            $scope.madeIt = true;
        }
    }

    $scope.repeat = function () {
        $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
    }
});
