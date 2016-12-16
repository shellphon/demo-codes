var app = angular.module('worldApp', []);
app.controller('MemberCtrl', function($scope){
	console.log($scope);
	$scope.members=[{name:'dont',info:'front-end',age:20},
		{name:'pm',info:'hold requirements',age:12}];
});
app.controller('linkCtrl', function($scope){
	$scope.links=[{desc:'dont',link:'http://baidu.com',target:'_blank'},
		{desc:'pm',link:'http://sf.gg',target:'_blank'}];
});
app.controller('dataCtrl', function($scope, $http){
	$http.get('data/data.json').success(function(resp){
		console.log(resp);
		$scope.members = resp.data;
	});
});
