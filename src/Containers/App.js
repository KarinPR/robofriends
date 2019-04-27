import React, { Component } from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import ErrorBoundry from '../Components/ErrorBoundry';
import Scroll from '../Components/Scroll';
import Footer from '../Components/Footer';
// import { robots } from './robots';
import './App.css'


class App extends Component {
	constructor () {
		super()
		this.state = {
			robots: [], //Robots refernece missing
			searchfield : ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response =>response.json())
			.then(users => this.setState({robots : users}))	
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })	
	}

	render () {
		const {robots , searchfield} = this.state;
		const filterRobots = robots.filter( robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase())
		});
		return !robots.length ? 
			<h1>Loading</h1> : 
			(
				<div className = 'tc'>
					<h1 className = 'f1'> Robofriends </h1>
					<SearchBox searchChange={this.onSearchChange}/>
					<Scroll>
						<ErrorBoundry>
							<CardList robots={filterRobots}/>
						</ErrorBoundry>
					</Scroll>
					<br/>
					<div className="f6 lh-copy -m h-25 tc" style={{height:'.5rem'}}>
					<Footer/>
					</div>
				</div>
			);
	}
}

export default App;