/** @format */

import React, { Component } from "react";

class GoogleAds extends Component {
	componentDidMount() {
		(window.adsbygoogle = window.adsbygoogle || []).push({});
	}

	render() {
		return (
			<div>
				<ins
					className='adsbygoogle'
					style={{ display: "inline-block", width: "728px", height: "90px" }}
					data-ad-client='ca-pub-2490851164394283'
					data-ad-slot='8388147324'
					data-ad-format='auto'
					data-full-width-responsive='true'></ins>
			</div>
		);
	}
}

export default GoogleAds;
