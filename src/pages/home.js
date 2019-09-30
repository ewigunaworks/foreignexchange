import React, { Component } from "react"
import axios from 'axios'
import cc from 'currency-codes'

let Config = require('../config')
 
class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			currencies: ['IDR', 'EUR', 'GBP', 'SGD'],
			defaultcurr: '10'
		}

		this.handleGetCurrency = this.handleGetCurrency.bind(this)
		// this.handleConvertCodes = this.handleConvertCodes.bind(this)
	}

	componentDidMount() {
		console.log(this.handleConvertCodes('USD'))
		this.handleGetCurrency()
	}

	handleGetCurrency() {
		let self = this

		axios({
	        url: Config.API_HOST + '?symbols='+this.state.currencies.join(',')+'&base=USD',
	        method: 'GET',
	        timeout: Config.TIMEOUT
	    }).then(function (response) {
	        console.log(response)
	    })
	}

	handleConvertCodes(codes) {
		return cc.code(codes).currency
	}

	render() {
		return (
		  <React.Fragment>
			<section id="intro">
				<div class="intro-text">
				  <h2>Welcome to</h2>
				  <p>Foreign Exchange Currency Apps</p>
				  <a href="#mainmenu" class="btn-get-started scrollto">Get Started</a>
				</div>
			</section>

			<main id="main">
				<section id="mainmenu" class="section-bg">
					<div class="container-fluid py-4">
						<div class="section-header">
							<h3 class="section-title">Main Menu</h3>
							<span class="section-divider"></span>
							<p class="section-description">
								Foreign Exchange Currency App Exercise
							</p>
						</div>
						<div class="row">
							<div class="col-12 text-center">
								<p class="mb-1"><em>USD - {this.handleConvertCodes('USD')}</em></p>
								<div class="row align-items-center justify-content-center">
									<p class="mb-1"><b>USD&nbsp;&nbsp;&nbsp;</b></p>
									<input class="text-right" type="text" value={this.state.defaultcurr} />
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-lg-6 about-img wow fadeInLeft">
								<img src="img/about-img.jpg" alt="" />
							</div>
							<div class="col-lg-6 content wow fadeInRight">
								<h2>Lorem ipsum dolor sit amet, consectetur adipiscing elite storium paralate</h2>
								<h3>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h3>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</p>
								<ul>
									<li><i class="ion-android-checkmark-circle"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
									<li><i class="ion-android-checkmark-circle"></i> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
									<li><i class="ion-android-checkmark-circle"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</li>
								</ul>
								<p>
									Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Libero justo laoreet sit amet cursus sit amet dictum sit. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>

			<footer id="footer">
				<div class="container">
					<div class="row">
						<div class="col-lg-6 text-lg-left text-center">
							<div class="copyright">
								&copy; 2019 <strong>Erwin Wiguna</strong>.
							</div>
							<div class="credits">
								<p><small>ewings</small></p>
							</div>
						</div>
				  </div>
				</div>
			</footer>
			<a href="#" class="back-to-top"><i class="fa fa-chevron-up"></i></a>
		</React.Fragment>
		);
	}
}
 
export default Home