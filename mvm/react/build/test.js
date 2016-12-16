"use strict";

var Son = React.createClass({
	displayName: "Son",

	render: function render() {
		return React.createElement(
			"p",
			null,
			"son"
		);
	}
});
var Father = React.createClass({
	displayName: "Father",

	componentDidMount: function componentDidMount() {

		var a = React.createElement(Son, null);
		console.log(this.refs.fff instanceof Son);
		console.log(React.isValidElement(a));
		console.log(a instanceof Son);

		console.log(a);
		console.log(a.type === Son);

		/*var script = document.createElement('script');
  script.src = "http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=408841";
  document.body.appendChild(script);*/
	},
	render: function render() {

		return React.createElement(
			"div",
			null,
			React.createElement(
				"h2",
				{ ref: "titit" },
				" ",
				this.props.title,
				" "
			),
			" ",
			React.createElement(Son, { ref: "fff" }),
			React.createElement("script", { src: "http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=408841" })
		);
	}
});

ReactDOM.render(React.createElement(Father, null), document.getElementById('content'));