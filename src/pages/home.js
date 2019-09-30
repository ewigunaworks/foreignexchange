import React, { Component } from "react"
import axios from 'axios'
import cc from 'currency-codes'

let Config = require('../config')
 
class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			currencies: ['IDR', 'EUR', 'GBP', 'SGD'],
			currency: '10',
			rates: []
		}

		this.handleGetCurrency = this.handleGetCurrency.bind(this)
		this.handleChanges = this.handleChanges.bind(this)
	}

	componentDidMount() {
		console.log(this.handleGetRates('EUR'))
		this.handleGetCurrency()
	}

	handleGetCurrency() {
		let self = this

		axios({
	        url: Config.API_HOST + '?symbols='+this.state.currencies.join(',')+'&base=USD',
	        method: 'GET',
	        timeout: Config.TIMEOUT
	    }).then(function (response) {
	        self.setState({
	        	rates: response.data.rates,
	        	date: response.data.date
	        })
	    })
	}

	handleConvertCodes(codes) {
		return cc.code(codes).currency
	}

	handleChanges(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleGetRates(codes) {
		let val = this.state.rates[codes]
		return Number(val).toFixed(4)
	}

	render() {
		console.log(this.state.rates['EUR'])
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
								<div class="row align-items-center justify-content-center m-2">
									<p class="mb-1"><b>USD&nbsp;&nbsp;&nbsp;</b></p>
									<input class="text-right" type="text" id="currency" name="currency" value={this.state.currency} onChange={this.handleChanges} placeholder="Enter Nominal" />
								</div>
							</div>
							<hr />
						</div>
						<div class="row">
							{
								this.state.currencies.map((data, i) => {
									return(
										<div class="col-lg-4 col-md-6 col-sm-12 mb-1">
											<div class="card">
												<div class="card-body">
													<div class="row">
														<div class="col-10">
															<div class="row">
																<div class="col-6"><b>{data}</b></div>
																<div class="col-6">14400000</div>
															</div>
															<div class="row">
																<div class="col-12"><em>{data} - {this.handleConvertCodes(data)}</em></div>
															</div>
															<div class="row">
																<div class="col-12">1 USD = {data} {this.handleGetRates(data)} </div>
															</div>
														</div>
														<div class="col-2">
															<a href="javascript:void(0)" class="btn btn-primary">-</a>
														</div>
													</div>
												</div>
											</div>
										</div>
									)
								})
							}
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