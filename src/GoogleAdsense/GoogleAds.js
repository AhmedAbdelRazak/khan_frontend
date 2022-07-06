/** @format */

import React, { Component } from "react";
import styled from "styled-components";

class GoogleAds extends Component {
	componentDidMount() {
		(window.adsbygoogle = window.adsbygoogle || []).push({});
	}

	render() {
		return (
			<AdsenseWrapper style={{ textAlign: "center" }}>
				<ins
					className='adsbygoogle'
					style={{
						display: "inline-block",
						width: "728px",
						height: "90px",
						// margin: "auto",
						textAlign: "center",
					}}
					data-ad-client='ca-pub-2490851164394283'
					data-ad-slot='8388147324'
					data-ad-format='auto'
					data-full-width-responsive='true'></ins>
			</AdsenseWrapper>
		);
	}
}

export default GoogleAds;

const AdsenseWrapper = styled.div`
	text-align: center;

	@media (max-width: 1000px) {
		.adsbygoogle {
			width: 100% !important;
			height: 100% !important;
			text-align: center;
		}
	}
`;
