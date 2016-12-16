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
		if(type==undefined||type==""){
			return this.data;
		}
		return this.data.filter(function(e){
			return type==e.type;
		});
	},
	getById:function(id){
		if(id==''){
			return null;
		}
		return this.data.filter(function(e){
			return e.id == id;
		})[0];

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
		this.data.push(obj);

	},
	edit:function(obj){
		if(!obj.id){
			return;
		}
		var index = -1;
		this.data.forEach(function(e,i){
			if(e.id==obj.id){
				index = i;
			}
		});
		if(index>=0){
			this.data.splice(index,1,obj);
		}
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
				case 'edit':
					this.edit(arg[0]);
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
		if(window.localStorage){
			localStorage.setItem('urls', JSON.stringify(this.data));
		}
	}
};

if(window.localStorage){
	var store = localStorage.getItem('urls');
	try{
		store = JSON.parse(store);
		if(store && store.length){
			gData.data = store;
		}
	}catch(err){
		console.log(err);
	}
}

/*
 form
 list > item -delete
*/
var Form = React.createClass({
	getInitialState:function(){
		var item = this.props.editObj || {};
		//console.log(this.props.editObj);
		var def = {
			showNew:false,
			link:'',
			desc:'',
			newType:''
		};
		return Object.assign(def, item);
	},
	componentWillReceiveProps:function(nextProps){
		var item = nextProps.editObj;
		
		var def = {
			showNew:false,
			link:'',
			desc:'',
			newType:''
		};
		//console.log(item);

		this.setState(Object.assign(def, item));
	},
	addUrl:function(e){
		var obj = {},
		newType = document.getElementById('new_type_input').value;
		obj.link = document.getElementById('url_input').value;
		obj.desc = document.getElementById('desc_input').value;
		obj.type = document.getElementById('type_input').value;
		if(obj.link==''){
			alert('链接不能为空');
			return;
		}
		if(obj.link.indexOf('http://')==-1||obj.link.indexOf('https://')){
			obj.link = 'http://'+obj.link;
		}
		if(obj.desc==''){
			alert('描述不能为空');
			return;
		}
		if(obj.type==''){
			alert('类型不能为空');
			return;
		}
		if(obj.type=='add-new'){
			if(newType==''){
				alert('新类型不能为空');
				return;
			}else if(this.props.typeList.indexOf(newType)!=-1){
				alert("已存在类型！");
				return;
			}
			
			obj.type = newType;
		}
		gData.dataAction('add',obj);
		//console.log(gData.data);

		this.props.addForm&&this.props.addForm();
		this.setState({
			showNew:false,
			link:'',
			newType:'',
			desc:''
		});
	},
	addNewType:function(e){
		//console.log(e.target.value);
		var selectedType = e.target.value;
		if(!this.state.showNew){
			if(selectedType=='add-new'){
				this.setState({
					showNew:true
				});
			}
		}else if(selectedType!=='add-new'){
			this.setState({
				showNew:false
			});
		}
	},
	componentDidUpdate:function(){
		//console.log(this.state);
		if(this.state.type){
			this.refs.selectType.value = this.state.type;
		}
	},
	handleUrlChange:function(e){
		this.setState({link:e.target.value});
	},
	handleDescChange:function(e){
		this.setState({desc:e.target.value});
	},
	handleNewTypeChange:function(e){
		this.setState({newType:e.target.value});
	},
	render:function(){
		//console.log(this.state.showNew);
		return (<div className="add-form">
			<div className="form-line"><label htmlFor="url_input">URL&ensp;:</label><input id="url_input" type="text" value={this.state.link} onChange={this.handleUrlChange} placeholder="请输入url"/></div>
			<div className="form-line"><label htmlFor="desc_input">描述:</label><input id="desc_input" type="text" value={this.state.desc} onChange={this.handleDescChange} placeholder="请输入描述"/></div>
			<div className="form-line"><div className="styled-select blue semi-square"><select ref="selectType" defaultValue={this.props.typeList.length?this.props.typeList[0]:''} id="type_input" onChange={this.addNewType} placeholder="请选择类型">
				<option key="0" value="add-new">新增其他</option>
				{this.props.typeList.map((e,i)=>{
					if(i==0){
						return (<option key={i+1} value={e}>{e}</option>);
					}
					return (<option key={i+1} value={e}>{e}</option>);
				})}
				</select></div></div>
			<div className={this.state.showNew?'form-line':'form-line hidden'}><label htmlFor="new_type_input">类型:</label><input id="new_type_input" value={this.state.newType} onChange={this.handleNewTypeChange} type="text" placeholder="请输入新类型"/></div>
			<button className="btn" onClick={this.addUrl}>提交</button>
		 </div>);
	}
});

var Item = React.createClass({
	
	render: function(){
		return (
			<p className="item"><a href={this.props.link}>{this.props.children}</a>
			<a className='close' href="#" data-type={this.props.type} data-id={this.props.dataId} onClick={this.props.clickHandle}>删除</a>
			<a className='edit' href="#" data-type={this.props.type} data-id={this.props.dataId} onClick={this.props.editHandle}>编辑</a></p>
			);
	}
});

var List = React.createClass({
	render: function(){
		var dataTmp = this.props.data.map((e,i) => {
			return (<Item link={e.link} key={e.id} dataId={e.id} type={e.type} editHandle={this.props.editHandle} clickHandle={this.props.clickHandle}>
					{e.desc}
				</Item>);
		});
		return (<div className="list">{dataTmp}</div>);
	}
});

var CustomList = React.createClass({
	getInitialState:function(){
	    //console.log(gData.getTypeList());
		return {
			data:gData.getByType(this.props.type),
			types: gData.getTypeList(),
			currentType:this.props.type
		}
	},
/*	shouldComponentUpdate:function(nextProps, nextStates){
		console.log(nextProps,this.props);
		console.log(nextStates, this.state);
		return !Object.is(nextProps,this.props)||!Object.is(nextStates, this.state);
	},*/
	deleteItem:function(e){
		e.preventDefault();
		var itemType = e.target.getAttribute('data-type');
		gData.dataAction('delete',e.target.getAttribute('data-id'));
		//console.log(gData.getByType(this.state.currentType));

		//判断删除时如果删除的类别已无数据，则更新类别
		if(this.state.currentType==''){
			if(gData.getByType(itemType).length==0){
				this.setState({
					data:gData.getByType(''),
					types: gData.getTypeList()
				});
				return;
			}
		}else{
			if(gData.getByType(this.state.currentType).length==0){
				this.setState({
					data: gData.getByType(''),
					types: gData.getTypeList(),
					currentType:''
				});
				return;
			}
		}
		//删除没有影响类别等情况，则更新列表数据
		this.setState({
			data:gData.getByType(this.state.currentType)
		});
	},
	changeType:function(e){
		e.preventDefault();
		var type = e.target.getAttribute('data-type');
		this.props.changeFatherType(type);
		this.setState({
			data:gData.getByType(type),
			currentType:type
		});
	},
	componentWillReceiveProps:function(nextProps){
		var type=nextProps.type;
		this.setState({
			data:gData.getByType(type),
			types: gData.getTypeList(),
			currentType:type
		});
	},
	render:function(){
		//console.log(this.state.currentType);
		return (<div className="all-list">
					<div className="list-type">{
						this.state.types.map((type,i)=>{
							if(type==this.state.currentType){
								return (<a className="type-item active" key={i} data-type={type} onClick={this.changeType} >{type}</a>);
							}
							return (<a className="type-item" key={i} data-type={type} onClick={this.changeType} >{type}</a>);
						})
					}</div>
					 <List data={this.state.data} clickHandle={this.deleteItem} editHandle={this.props.editHandle}/>
				</div>);
	}
});

var UrlBox = React.createClass({
	getInitialState:function(){
		return {
			type:""
		};
	},
	refreshForm:function(){
		this.setState({
			type:""
		});
	},
	changeType:function(type){
		this.setState({
			type:type
		});
	},
	editItem:function(e){
		var id = e.target.getAttribute('data-id');
		//console.log(id);
		var obj = gData.getById(id);

		this.setState({
			editObj:obj
		});
	},
	render:function(){
		return (<div className="url-box">
				<Form editObj={this.state.editObj} addForm={this.refreshForm} typeList={gData.getTypeList()}/>
				<CustomList type={this.state.type} changeFatherType={this.changeType} editHandle={this.editItem} />
			</div>);
	}
});
//ReactDOM.render(<CustomList type="search"/>, document.getElementById('content'));
ReactDOM.render(<UrlBox />, document.getElementById('content'));