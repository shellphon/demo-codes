//controller封装module
var memberCtrollers = angular.module('memberControllers',[]);
	memberCtrollers.controller('MembersCtrl',['$scope',function($scope){
		$scope.members=[{name:'dont',info:'front-end',age:20,memberId:12},
			{name:'pm',info:'hold requirements',age:12,memberId:23}];
	}]);
	memberCtrollers.controller('MemberDetailCtrl', ['$scope', '$routeParams',function($scope, $routeParams){
		$scope.memberId = $routeParams.memberId;
		$scope.detail = {name:'dont',info:'front-end',age:20,memberId: $routeParams.memberId};
		$scope.showDetail = function(detail){
			alert('name:'+detail.name+',info:'+detail.info+',age:'+detail.age+',memberId:'+detail.memberId);
		};
	}]);

angular.module('memberFilters',[]).filter('checkage', function(){
	return function(age){
		return age>=18? '成年':'未成年';
	};
});

var app = angular.module('route', ['ngRoute', 'memberControllers', 'memberFilters']).config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/members', {templateUrl: 'route-part/list.html', controller:'MembersCtrl'})
	.when('/member/:memberId', {templateUrl: 'route-part/one.html', controller:'MemberDetailCtrl'})
	.otherwise({redirectTo:'/members'});
}]);
