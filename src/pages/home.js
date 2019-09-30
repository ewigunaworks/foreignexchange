import React, { Component } from "react"
import axios from 'axios'
import $ from 'jquery'
import cc from 'currency-codes'
import Select from 'react-select'

let Config = require('../config')
 
class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			currencies: ['IDR', 'EUR', 'GBP', 'SGD'],
			currency: '10',
			newcurr: '',
			rates: [],
			options: [
				{ value: 'USD', label: 'USD'},
				{ value: 'CAD', label: 'CAD'},
				{ value: 'IDR', label: 'IDR'},
				{ value: 'GBP', label: 'GBP'},
				{ value: 'CHF', label: 'CHF'},
				{ value: 'SGD', label: 'SGD'},
				{ value: 'INR', label: 'INR'},
				{ value: 'MYR', label: 'MYR'},
				{ value: 'JPY', label: 'JPY'},
				{ value: 'KRW', label: 'KRW'},
			]
		}

		this.handleGetCurrency = this.handleGetCurrency.bind(this)
		this.handleChanges = this.handleChanges.bind(this)
		this.handleRemoveCodes = this.handleRemoveCodes.bind(this)
		this.handleChangeSelect = this.handleChangeSelect.bind(this)
	}

	componentDidMount() {
		this.handleGetCurrency()

		$(document).ready(function () {
			$('#currency').keypress(function(event) {
				if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
				    event.preventDefault();
				}
			});

			$('.btn-add-more').on('click', function() {
				$('.select-currencies').removeClass('closed');
				$('.btn-add-more').addClass('closed');
			})
		})
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

	handleChangeSelect(e) {
		this.setState({
			newcurr: e.value
		})
	}

	handleGetRates(codes) {
		let val = this.state.rates[codes]
		return Number(val).toFixed(4)
	}

	handleConvertCurrency(value1, value2) {
		let currencynow = Number(value1) * Number(value2)
		return currencynow.toFixed(2)
	}

	handleRemoveCodes(codes) {
		console.log('want to remove : '+codes)
		let currencies = this.state.currencies
		for(let x in currencies) {
			if(currencies[x] == codes) {
				currencies.splice(x, 1)
			}
		}

		this.setState({
			currencies: currencies
		})
	}

	render() {
		console.log(this.state.newcurr)
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
																<div class="col-6"><p class="mb-0"><b>{data}</b></p></div>
																<div class="col-6"><p class="font-25 mb-0">{this.handleConvertCurrency(this.state.currency, this.handleGetRates(data))}</p></div>
															</div>
															<div class="row">
																<div class="col-12"><p class="mb-0 font-12"><b><em>{data} - {this.handleConvertCodes(data)}</em></b></p></div>
															</div>
															<div class="row">
																<div class="col-12">1 USD = {data} {this.handleGetRates(data)} </div>
															</div>
														</div>
														<div class="col-2">
															<a href="javascript:void(0)" class="btn btn-danger" onClick={() => this.handleRemoveCodes(data) }>-</a>
														</div>
													</div>
												</div>
											</div>
										</div>
									)
								})
							}
						</div>
						<div class="row align-items-center justify-content-center btn-add-more">
							<div class="col-4 text-center">
								<a href="javascript:void(0)" class="btn btn-primary">Add More Currencies</a>
							</div>
						</div>
						<div class="row align-items-center justify-content-center select-currencies closed">
							<div class="col-4">
								<div class="row">
									<div class="col-8 px-1">
										<Select options={this.state.options} onChange={this.handleChangeSelect} />
									</div>
									<div class="col-2 px-0">
										<a href="javascript:void(0)" class="btn btn-success">Submit</a>
									</div>
								</div>
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