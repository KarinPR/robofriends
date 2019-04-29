import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import ErrorBoundry from '../Components/ErrorBoundry';
import Scroll from '../Components/Scroll';
import Footer from '../Components/Footer';
// import { robots } from './robots';
import './App.css'

import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
	return {
		searchfield : state.searchRobots.searchfield ,
		robots : state.requestRobots.robots,
		isPending : state.requestRobots.isPending,
		error : state.requestRobots.error
	}
}   
const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange : (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots : () => dispatch(requestRobots())
	}
}

class App extends Component {

	componentDidMount() {
		this.props.onRequestRobots();
	}

	render () {
		const { robots , searchfield , onSearchChange , isPending } = this.props
		const filterRobots = robots.filter( robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase())
		});
		return isPending ? 
			<h1>Loading</h1> : 
			(
				<div className = 'tc'>
					<h1 className = 'f1'> Robofriends </h1>
					<SearchBox searchChange={onSearchChange}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);