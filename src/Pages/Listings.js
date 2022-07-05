/** @format */

import React, { useEffect } from "react";
import styled from "styled-components";
import OurTickets from "./HomePage/OurTickets";
import ReactGA from "react-ga";
import Helmet from "react-helmet";
import PowerBySnippet from "./PowerBySnippet";
// eslint-disable-next-line
import GoogleAds from "../GoogleAdsense/GoogleAds";

const Listings = () => {
	useEffect(() => {
		if (window !== "undefined") {
			localStorage.removeItem("reservationData");
		}
	});

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		// To Report Page View
		ReactGA.pageview(window.location.pathname + window.location.search);
		// eslint-disable-next-line
	}, []);

	return (
		<LinstingsWrapper className='my-5'>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Khan Khadija Resort | Available Tickets And Offers</title>
				<meta
					name='description'
					content='Khan Khadija, The best resort in Egypt. If you are looking for recovery and fun time, Khan Khadija Resort should be your first choice. Khan Khadija Resort Website was powered by www.infinite-apps.com'
				/>
				<link rel='canonical' href='https://khankhadija.com/listings' />
				<link rel='icon' href='khan_frontend\src\GeneralImgs\favicon.ico' />
			</Helmet>

			<OurTickets />

			{/* <div className='ad-class'> */}
			{/* add your slot id  */}
			{/* <GoogleAds slot='8388147324' /> */}
			{/* </div> */}
			<PowerBySnippet />
			{/* <div className='ad-class'> */}
			{/* add your slot id  */}
			{/* <GoogleAds slot='8388147324' /> */}
			{/* </div> */}
		</LinstingsWrapper>
	);
};

export default Listings;

const LinstingsWrapper = styled.div`
	min-height: 700px;
`;
