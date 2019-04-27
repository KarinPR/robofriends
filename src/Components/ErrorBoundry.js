import React , {Component} from 'react';

class ErrorBooundry extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError : false
		}
	}
	componentDidCatch(error, info) {
		this.setState({hasError :true});
	}

	render() {
		if (this.state.hasError){
			return <h1> Oooooops. No GOOD!! </h1>
		}
		return this.props.children;
	}
}

export default ErrorBooundry;