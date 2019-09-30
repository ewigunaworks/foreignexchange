import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import Header from './components/header'
 
class Main extends Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<Switch>
					<Route exact path="/" component={Home} />
				</Switch>
			</React.Fragment>
		);
	}
}
 
export default Main;