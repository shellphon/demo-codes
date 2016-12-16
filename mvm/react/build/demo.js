'use strict';

var DemoBox = React.createClass({
	displayName: 'DemoBox',

	getInitialState: function getInitialState() {
		return {
			name: 'ham'
		};
	},
	componentWillMount: function componentWillMount() {
		console.log('will mount call before:  state.name: ' + this.state.name);
		console.log('willmount call setState');
		this.setState({
			name: 'de'
		});
	},
	componentDidMount: function componentDidMount() {
		console.log('did mount');
		this.setState({
			name: 'did'
		});
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		console.log('componentWillReceiveProps');
		console.log('old props name: ', this.props.hello);
	},
	render: function render() {
		console.log('call render');
		return React.createElement(
			'p',
			{ className: 'demo-p' },
			this.state.name
		);
	}
});

ReactDOM.render(React.createElement(DemoBox, { hello: 'world' }), document.getElementById('content'));
ReactDOM.render(React.createElement(DemoBox, { hello: 'noworld' }), document.getElementById('content'));