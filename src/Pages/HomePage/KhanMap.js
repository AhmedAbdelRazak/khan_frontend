/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import ReactGA from "react-ga";

const KhanMap = () => {
	// eslint-disable-next-line
	const [latitude, setLatitude] = useState("30.989970");
	// eslint-disable-next-line
	const [longitude, setLongitude] = useState("29.872110");

	var img_url_close = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=12&size=700x300&sensor=false&markers=color:red%7C${latitude},${longitude}&key=${process.env.REACT_APP_MAPS_API_KEY}`;

	var img_url_far = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=8&size=700x300&sensor=false&markers=color:red%7C${latitude},${longitude}&key=${process.env.REACT_APP_MAPS_API_KEY}`;

	const openMaps = () => {
		window.open("https://maps.google.com?q=" + latitude + "," + longitude);

		ReactGA.event({
			category: "Client Asked For Direction",
			action: "Map Was Clicked",
			label: "Map Was Clicked As A Client Is Asking For Direction",
		});
	};

	return (
		<KhanMapWrapper className='mt-5'>
			<h1
				// data-aos='fade-up'
				className='titleBookNow2'>
				Khan Khadija Location
			</h1>
			<br />
			<div className='my-2 col-md-12 mx-auto text-center'>
				{latitude && longitude ? (
					<div onClick={openMaps}>
						<img src={img_url_close} alt='GoogleMaps' />
					</div>
				) : null}
			</div>
			<div className='my-3 col-md-12 mx-auto text-center'>
				{latitude && longitude ? (
					<div onClick={openMaps}>
						<img src={img_url_far} alt='GoogleMaps' />
					</div>
				) : null}
			</div>
		</KhanMapWrapper>
	);
};

export default KhanMap;

const KhanMapWrapper = styled.div`
	margin-bottom: 50px;

	.titleBookNow2 {
		text-align: center;
		font-size: 1.5rem !important;
		font-weight: bolder;
		/* letter-spacing: 2px; */
		color: var(--orangePrimary);
		/* float: left; */
		font-weight: bolder;
		text-transform: capitalize !important;
	}

	@media (max-width: 1000px) {
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
`;
