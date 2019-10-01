import React from 'react'
import $ from 'jquery'

export default class PopupNotification extends React.Component {
	constructor(props) {
		super(props)

        this.handleClick = this.handleClick.bind(this)
	}
	
	componentDidMount() {
        $('.popup-notification').click(function() {
            $('.popup-bottom-notification').removeClass('closed')
            $('.popup-center-content').removeClass('slide-out-bottom')
            setTimeout(() => {
                $('.popup-bottom-notification').addClass('closed')
            }, 3000);
        })

        $('.popup-bottom-backdrop-share').click(function() {
            $('.popup-center-content').addClass('slide-out-bottom')
            $('.popup-bottom-notification').addClass('closed')
        })

        $('.popup-bottom-notification-close').click(function() {
            $('.popup-bottom-notification').addClass('closed')
        })

        if(this.props.isError) {
            $('.popup-bottom-notification').removeClass('closed')   
        } 
	}

    handleClick() {
        this.props.handleFromParent(false, false)
        $('.popup-bottom-notification').addClass('closed')
    }
 
	render() {
		return (
			<div>
				<div class="popup-bottom popup-bottom-notification closed">
					<div class="popup-bottom-backdrop popup-bottom-backdrop-share"></div>
					<div class="popup-center-content rounded bottom-error">
                        <div class="p-2 text-white">
                            <div class="d-flex justify-content-center">
                                <div class="d-flex align-items-center justify-content-end">
                                    <p class="mb-0 pr-3">{this.props.message}</p>
                                    <h3 class="popup-bottom-notification-close mb-0" onClick={this.handleClick}>OK</h3>
                                </div>
                            </div>
                        </div>
					</div>
				</div>
			</div>
		)
	}
}