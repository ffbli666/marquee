/*
    good angular coding style : https://github.com/johnpapa/angular-styleguide
 */
(function() {
    "use strict";

    angular
        .module("my.marquee.directive", [])
        .directive("myMqrquee", myMarquee);

    function myMarquee() {
        var directive = {
            restrict: "E",
            templateUrl: "../component/angular/marquee.html",
            scope: {
                messages: "="
            },
            link: link,
            controller: myMarqueeCtrl,
            controllerAs: "vm",
            bindToController: true
        };

        return directive;

        function link(scope, el, attr, ctrl) {
        }
    }

    var Marquee = function(vm) {
        var index = -1;
        vm.title = [];

        var next = function() {
            vm.title[0] = vm.messages[getIndex()];
            vm.title[1] = vm.messages[getIndex()];
        };

        var getIndex = function() {
            if (++index >= vm.messages.length) index = 0;
            return index;
        };

        return {
            next: next
        };
    };

    myMarqueeCtrl.$inject = ["$scope", "$timeout"];

    function myMarqueeCtrl($scope, $timeout) {
        var vm = this;
        var marquee = new Marquee(vm);
        marquee.next();
        //use timeout to get rendered DOM
        $timeout(function() {
            var item = document.querySelector(".marquee-item");
            item.addEventListener("animationiteration", function(){
                marquee.next();
                //use $scope.$apply call angular update, because addEventListener not in angular watch list
                $scope.$apply();
            });
        }, 0);
    }
})();
