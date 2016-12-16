/*data*/
var gData = {
	data:[{
		id:1,
		type:'search',
		link:'http://baidu.com',
		desc:'百度'
	},{
		id:2,
		type:'search',
		link:'http://google.com',
		desc:'google'
	},{
		id:3,
		type:'sns',
		link:'http://facebook.com',
		desc:'facebook'
	},{
		id:4,
		type:'sns',
		link:'http://weibo.com',
		desc:'微博'
	},{
		id:5,
		type:'infos',
		link:'http://qq.com',
		desc:'QQ'
	},{
		id:6,
		type:'infos',
		link:'http://sina.com',
		desc:'渣浪'
	},{
		id:7,
		type:'infos',
		link:'http://yahoo.com',
		desc:'雅虎'
	},{
		id:8,
		type:'knowledge',
		link:'http://sf.gg',
		desc:'sf'
	},{
		id:9,
		type:'knowledge',
		link:'http://zhihu.com',
		desc:'知乎'
	}],
	getTypeList:function(){
		var types=[];
		this.data.forEach((e,i)=>{
			if(types.indexOf(e.type)==-1){
				types.push(e.type);
			}
		});
		return types;
	},
	getByType:function(type){
		//console.log('get list call');
		if(type==undefined||type==""){
			return this.data;
		}
		return this.data.filter(function(e){
			return type==e.type;
		});
	},
	add:function(obj){
		var descData = this.data.slice(0).sort(function(a,b){ return b.id-a.id;});
		//console.log(descData);
		if(descData.length==0){
			descData[0] = {
				id:0
			};
		}
		obj.id = descData[0].id+1;
		console.log(obj.id);
		this.data.push(obj);

	},
	delete:function(id){
		var index = -1;
		this.data.forEach(function(e,i){
			if(e.id==id){
				index = i;
			}
		});
		if(index==-1){
			return;
		}
		this.data.splice(index,1);
	},
	dataAction:function(fnType){
		var arg = [].slice.call(arguments, 1);
		try{

			switch(fnType){
				case 'add':
					this.add(arg[0]);
					break;
				case 'delete':
					this.delete(arg[0]);
					break;
				default:
					return;
			}
		}catch(e){
			return;
		}
		this.refresh();
	},
	refresh:function(){
		return;
		if(window.localStorage){
			localStorage.setItem('urls', JSON.stringify(this.data));
		}
	}
};

/*if(window.localStorage){
	var store = localStorage.getItem('urls');
	try{
		store = JSON.parse(store);
		if(store && store.length){
			gData.data = store;
		}
	}catch(err){
		console.log(err);
	}
}*/
/*end data*/

var app = angular.module('ubApp', []);

app.controller('ubCtrl', function($scope){
	var refreshTypes = function(){
		$scope.types = gData.getTypeList();
		$scope.types2Select = $scope.types.map(function(e,i){
			var typeObj = {};
			typeObj['label'] = e;
			typeObj['key'] = e;
			return typeObj;
		}).concat({
			label:'新增类型',
			key:'add-new'
		});
		$scope.currentType = '';
		//console.log($scope.types.length);
	};

	$scope.list = gData.getByType();
	
	refreshTypes();


	$scope.url = {
		link:'',
		desc:'',
		type:''
	};

	
	//console.log($scope.types2Select);

	//$scope.listType = $scope.types[0];
	//删除item
	$scope.deleteItem = function(id){
		//console.log(id);
		gData.dataAction('delete',id);
		//console.log($scope.list);
		if($scope.list.length==1){
			refreshTypes();
		}
		$scope.list = gData.getByType($scope.currentType);
	};
	//显示新增类型输入框
	$scope.showNewType = $scope.types2Select[0]['key']=='add-new';

	//选择类型响应
	$scope.selectType = function(){
		//console.log($scope.listType); 
		$scope.url.type = '';
		//在删掉某个分类的时候，刷新分类数据，导致dom触发ngChange
		//由于此时ngInit不会执行 ，所以这里要做listType初始化
		if(!$scope.listType){
			$scope.listType = $scope.types2Select[0];
		}
		if($scope.listType.key=='add-new'){
			$scope.showNewType = true;
			return;
		}
		$scope.showNewType = false;
	};

	$scope.showList = function(type){
		$scope.currentType = type;
		$scope.list = gData.getByType(type);
		if($scope.list.length==0){
			refreshTypes();
		}
	};

	//提交新url
	$scope.addUrl = function(url){
		if($scope.listType.key!='add-new'){
			url.type = $scope.listType.key;
			gData.dataAction('add',url);
		}else{
			gData.dataAction('add',url);
			refreshTypes();
		}
		//提交后清空输入框内容
		$scope.url = {
			link:'',
			desc:'',
			type:''
		};
	}
});
