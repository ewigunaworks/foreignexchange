import React from 'react'

export default class extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			login: false
		}
	}
	
	componentDidMount() {
		let user = localStorage.getItem('user')
		if (user) {
			this.setState({
				login: true
			})
		}
	}
	
	render() {
		return (
			<React.Fragment>
				<header id="header">
				    <div class="container">

				      <div id="logo" class="pull-left">
				        <h1 class="d-none d-xl-block"><a href="#intro" class="scrollto">Foreign Exchange</a></h1>
				        <h3 class="d-xl-none"><a href="#intro" class="scrollto">Foreign Exchange</a></h3>
				      </div>

				      <nav id="nav-menu-container">
				        <ul class="nav-menu">
				          <li class="menu-active"><a href="#mainmenu">Home</a></li>
				        </ul>
				      </nav>
				    </div>
				  </header>
			</React.Fragment>
		)
	}
}