'use strict';

var DemoBox = React.createClass({
	getInitialState:function(){
		return {
			name:'ham'
		}
	},
	componentWillMount:function(){
		console.log('will mount call before:  state.name: '+this.state.name);
		console.log('willmount call setState');
		this.setState({
			name:'de'
		});
	},
	componentDidMount:function(){
		console.log('did mount');
		this.setState({
			name:'did' 
		});
	},
	componentWillReceiveProps:function(nextProps){
		console.log('componentWillReceiveProps');
		console.log('old props name: ', this.props.hello);
	},
	render:function(){
		console.log('call render');
		return (<p className="demo-p">{this.state.name}</p>);
	}
});

ReactDOM.render(<DemoBox hello="world"/>, document.getElementById('content'));
ReactDOM.render(<DemoBox hello="noworld"/>, document.getElementById('content'));