var Son = React.createClass({
	render:function(){
		return (<p>son</p>)
	}
});
var Father = React.createClass({
	componentDidMount: function() {

		var a = <Son /> ;
		console.log(this.refs.fff instanceof Son);
		console.log(React.isValidElement(a));
		console.log(a instanceof Son);
		
		console.log(a);
		console.log(a.type === Son);

		/*var script = document.createElement('script');
		script.src = "http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=408841";
		document.body.appendChild(script);*/
		
	},
	render: function() {

		return ( <div>
			<h2 ref = "titit" > {
				this.props.title
			} </h2> <Son ref = "fff"/>
			<script src="http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=408841"></script>
			</div>)
		}
});

ReactDOM.render(<Father />, document.getElementById('content'));