'use strict';

var gData = {
	data: [{
		id: 1,
		type: 'search',
		link: 'http://baidu.com',
		desc: '百度'
	}, {
		id: 2,
		type: 'search',
		link: 'http://google.com',
		desc: 'google'
	}, {
		id: 3,
		type: 'sns',
		link: 'http://facebook.com',
		desc: 'facebook'
	}, {
		id: 4,
		type: 'sns',
		link: 'http://weibo.com',
		desc: '微博'
	}, {
		id: 5,
		type: 'infos',
		link: 'http://qq.com',
		desc: 'QQ'
	}, {
		id: 6,
		type: 'infos',
		link: 'http://sina.com',
		desc: '渣浪'
	}, {
		id: 7,
		type: 'infos',
		link: 'http://yahoo.com',
		desc: '雅虎'
	}, {
		id: 8,
		type: 'knowledge',
		link: 'http://sf.gg',
		desc: 'sf'
	}, {
		id: 9,
		type: 'knowledge',
		link: 'http://zhihu.com',
		desc: '知乎'
	}],
	getTypeList: function getTypeList() {
		var types = [];
		this.data.forEach(function (e, i) {
			if (types.indexOf(e.type) == -1) {
				types.push(e.type);
			}
		});
		return types;
	},
	getByType: function getByType(type) {
		if (type == undefined || type == "") {
			return this.data;
		}
		return this.data.filter(function (e) {
			return type == e.type;
		});
	},
	getById: function getById(id) {
		if (id == '') {
			return null;
		}
		return this.data.filter(function (e) {
			return e.id == id;
		})[0];
	},
	add: function add(obj) {
		var descData = this.data.slice(0).sort(function (a, b) {
			return b.id - a.id;
		});
		//console.log(descData);
		if (descData.length == 0) {
			descData[0] = {
				id: 0
			};
		}
		obj.id = descData[0].id + 1;
		this.data.push(obj);
	},
	edit: function edit(obj) {
		if (!obj.id) {
			return;
		}
		var index = -1;
		this.data.forEach(function (e, i) {
			if (e.id == obj.id) {
				index = i;
			}
		});
		if (index >= 0) {
			this.data.splice(index, 1, obj);
		}
	},
	delete: function _delete(id) {
		var index = -1;
		this.data.forEach(function (e, i) {
			if (e.id == id) {
				index = i;
			}
		});
		if (index == -1) {
			return;
		}
		this.data.splice(index, 1);
	},
	dataAction: function dataAction(fnType) {
		var arg = [].slice.call(arguments, 1);
		try {

			switch (fnType) {
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
		} catch (e) {
			return;
		}
		this.refresh();
	},
	refresh: function refresh() {
		if (window.localStorage) {
			localStorage.setItem('urls', JSON.stringify(this.data));
		}
	}
};

if (window.localStorage) {
	var store = localStorage.getItem('urls');
	try {
		store = JSON.parse(store);
		if (store && store.length) {
			gData.data = store;
		}
	} catch (err) {
		console.log(err);
	}
}

/*
 form
 list > item -delete
*/
var Form = React.createClass({
	displayName: 'Form',

	getInitialState: function getInitialState() {
		var item = this.props.editObj || {};
		//console.log(this.props.editObj);
		var def = {
			showNew: false,
			link: '',
			desc: '',
			newType: ''
		};
		return Object.assign(def, item);
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		var item = nextProps.editObj;

		var def = {
			showNew: false,
			link: '',
			desc: '',
			newType: ''
		};
		//console.log(item);

		this.setState(Object.assign(def, item));
	},
	addUrl: function addUrl(e) {
		var obj = {},
		    newType = document.getElementById('new_type_input').value;
		obj.link = document.getElementById('url_input').value;
		obj.desc = document.getElementById('desc_input').value;
		obj.type = document.getElementById('type_input').value;
		if (obj.link == '') {
			alert('链接不能为空');
			return;
		}
		if (obj.link.indexOf('http://') == -1 || obj.link.indexOf('https://')) {
			obj.link = 'http://' + obj.link;
		}
		if (obj.desc == '') {
			alert('描述不能为空');
			return;
		}
		if (obj.type == '') {
			alert('类型不能为空');
			return;
		}
		if (obj.type == 'add-new') {
			if (newType == '') {
				alert('新类型不能为空');
				return;
			} else if (this.props.typeList.indexOf(newType) != -1) {
				alert("已存在类型！");
				return;
			}

			obj.type = newType;
		}
		gData.dataAction('add', obj);
		//console.log(gData.data);

		this.props.addForm && this.props.addForm();
		this.setState({
			showNew: false,
			link: '',
			newType: '',
			desc: ''
		});
	},
	addNewType: function addNewType(e) {
		//console.log(e.target.value);
		var selectedType = e.target.value;
		if (!this.state.showNew) {
			if (selectedType == 'add-new') {
				this.setState({
					showNew: true
				});
			}
		} else if (selectedType !== 'add-new') {
			this.setState({
				showNew: false
			});
		}
	},
	componentDidUpdate: function componentDidUpdate() {
		//console.log(this.state);
		if (this.state.type) {
			this.refs.selectType.value = this.state.type;
		}
	},
	handleUrlChange: function handleUrlChange(e) {
		this.setState({ link: e.target.value });
	},
	handleDescChange: function handleDescChange(e) {
		this.setState({ desc: e.target.value });
	},
	handleNewTypeChange: function handleNewTypeChange(e) {
		this.setState({ newType: e.target.value });
	},
	render: function render() {
		//console.log(this.state.showNew);
		return React.createElement(
			'div',
			{ className: 'add-form' },
			React.createElement(
				'div',
				{ className: 'form-line' },
				React.createElement(
					'label',
					{ htmlFor: 'url_input' },
					'URL :'
				),
				React.createElement('input', { id: 'url_input', type: 'text', value: this.state.link, onChange: this.handleUrlChange, placeholder: '请输入url' })
			),
			React.createElement(
				'div',
				{ className: 'form-line' },
				React.createElement(
					'label',
					{ htmlFor: 'desc_input' },
					'描述:'
				),
				React.createElement('input', { id: 'desc_input', type: 'text', value: this.state.desc, onChange: this.handleDescChange, placeholder: '请输入描述' })
			),
			React.createElement(
				'div',
				{ className: 'form-line' },
				React.createElement(
					'div',
					{ className: 'styled-select blue semi-square' },
					React.createElement(
						'select',
						{ ref: 'selectType', defaultValue: this.props.typeList.length ? this.props.typeList[0] : '', id: 'type_input', onChange: this.addNewType, placeholder: '请选择类型' },
						React.createElement(
							'option',
							{ key: '0', value: 'add-new' },
							'新增其他'
						),
						this.props.typeList.map(function (e, i) {
							if (i == 0) {
								return React.createElement(
									'option',
									{ key: i + 1, value: e },
									e
								);
							}
							return React.createElement(
								'option',
								{ key: i + 1, value: e },
								e
							);
						})
					)
				)
			),
			React.createElement(
				'div',
				{ className: this.state.showNew ? 'form-line' : 'form-line hidden' },
				React.createElement(
					'label',
					{ htmlFor: 'new_type_input' },
					'类型:'
				),
				React.createElement('input', { id: 'new_type_input', value: this.state.newType, onChange: this.handleNewTypeChange, type: 'text', placeholder: '请输入新类型' })
			),
			React.createElement(
				'button',
				{ className: 'btn', onClick: this.addUrl },
				'提交'
			)
		);
	}
});

var Item = React.createClass({
	displayName: 'Item',


	render: function render() {
		return React.createElement(
			'p',
			{ className: 'item' },
			React.createElement(
				'a',
				{ href: this.props.link },
				this.props.children
			),
			React.createElement(
				'a',
				{ className: 'close', href: '#', 'data-type': this.props.type, 'data-id': this.props.dataId, onClick: this.props.clickHandle },
				'删除'
			),
			React.createElement(
				'a',
				{ className: 'edit', href: '#', 'data-type': this.props.type, 'data-id': this.props.dataId, onClick: this.props.editHandle },
				'编辑'
			)
		);
	}
});

var List = React.createClass({
	displayName: 'List',

	render: function render() {
		var _this = this;

		var dataTmp = this.props.data.map(function (e, i) {
			return React.createElement(
				Item,
				{ link: e.link, key: e.id, dataId: e.id, type: e.type, editHandle: _this.props.editHandle, clickHandle: _this.props.clickHandle },
				e.desc
			);
		});
		return React.createElement(
			'div',
			{ className: 'list' },
			dataTmp
		);
	}
});

var CustomList = React.createClass({
	displayName: 'CustomList',

	getInitialState: function getInitialState() {
		//console.log(gData.getTypeList());
		return {
			data: gData.getByType(this.props.type),
			types: gData.getTypeList(),
			currentType: this.props.type
		};
	},
	/*	shouldComponentUpdate:function(nextProps, nextStates){
 		console.log(nextProps,this.props);
 		console.log(nextStates, this.state);
 		return !Object.is(nextProps,this.props)||!Object.is(nextStates, this.state);
 	},*/
	deleteItem: function deleteItem(e) {
		e.preventDefault();
		var itemType = e.target.getAttribute('data-type');
		gData.dataAction('delete', e.target.getAttribute('data-id'));
		//console.log(gData.getByType(this.state.currentType));

		//判断删除时如果删除的类别已无数据，则更新类别
		if (this.state.currentType == '') {
			if (gData.getByType(itemType).length == 0) {
				this.setState({
					data: gData.getByType(''),
					types: gData.getTypeList()
				});
				return;
			}
		} else {
			if (gData.getByType(this.state.currentType).length == 0) {
				this.setState({
					data: gData.getByType(''),
					types: gData.getTypeList(),
					currentType: ''
				});
				return;
			}
		}
		//删除没有影响类别等情况，则更新列表数据
		this.setState({
			data: gData.getByType(this.state.currentType)
		});
	},
	changeType: function changeType(e) {
		e.preventDefault();
		var type = e.target.getAttribute('data-type');
		this.props.changeFatherType(type);
		this.setState({
			data: gData.getByType(type),
			currentType: type
		});
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		var type = nextProps.type;
		this.setState({
			data: gData.getByType(type),
			types: gData.getTypeList(),
			currentType: type
		});
	},
	render: function render() {
		var _this2 = this;

		//console.log(this.state.currentType);
		return React.createElement(
			'div',
			{ className: 'all-list' },
			React.createElement(
				'div',
				{ className: 'list-type' },
				this.state.types.map(function (type, i) {
					if (type == _this2.state.currentType) {
						return React.createElement(
							'a',
							{ className: 'type-item active', key: i, 'data-type': type, onClick: _this2.changeType },
							type
						);
					}
					return React.createElement(
						'a',
						{ className: 'type-item', key: i, 'data-type': type, onClick: _this2.changeType },
						type
					);
				})
			),
			React.createElement(List, { data: this.state.data, clickHandle: this.deleteItem, editHandle: this.props.editHandle })
		);
	}
});

var UrlBox = React.createClass({
	displayName: 'UrlBox',

	getInitialState: function getInitialState() {
		return {
			type: ""
		};
	},
	refreshForm: function refreshForm() {
		this.setState({
			type: ""
		});
	},
	changeType: function changeType(type) {
		this.setState({
			type: type
		});
	},
	editItem: function editItem(e) {
		var id = e.target.getAttribute('data-id');
		//console.log(id);
		var obj = gData.getById(id);

		this.setState({
			editObj: obj
		});
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'url-box' },
			React.createElement(Form, { editObj: this.state.editObj, addForm: this.refreshForm, typeList: gData.getTypeList() }),
			React.createElement(CustomList, { type: this.state.type, changeFatherType: this.changeType, editHandle: this.editItem })
		);
	}
});
//ReactDOM.render(<CustomList type="search"/>, document.getElementById('content'));
ReactDOM.render(React.createElement(UrlBox, null), document.getElementById('content'));