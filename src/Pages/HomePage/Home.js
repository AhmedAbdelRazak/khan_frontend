/** @format */

import React, { useEffect } from "react";
import styled from "styled-components";
import BookNowGeneral from "./BookNowGeneral";
import HeroComponent from "./HeroComponent";
import OurTickets from "./OurTickets";
import Helmet from "react-helmet";
import PowerBySnippet from "../PowerBySnippet";
import KhanGallery from "./KhanGallery";
import KhanMap from "./KhanMap";
import ReactGA from "react-ga";
// eslint-disable-next-line
import GoogleAds from "../../GoogleAdsense/GoogleAds";

const Home = () => {
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
		<HomePageWrapper>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Khan Khadija Resort | The Best Resort In Egypt</title>
				<meta
					name='description'
					content='Khan Khadija, The best resort in Egypt. If you are looking for recovery and fun time, Khan Khadija Resort should be your first choice. Khan Khadija Resort Website was powered by www.infinite-apps.com'
				/>

				<link rel='canonical' href='https://khankhadija.com' />
				<link rel='icon' href='khan_frontend\src\GeneralImgs\favicon.ico' />
			</Helmet>
			<span className='deskTopHero'>
				<HeroComponent />
			</span>
			<BookNowGeneral />

			<div className='col-md-10 mx-auto mt-3'>
				<br />
				<hr />
			</div>
			<div className='ad-class mb-3 text-center mx-auto'>
				{/* add your slot id  */}
				<GoogleAds slot='8388147324' />
			</div>
			<div className='mt-2'>
				<OurTickets />
			</div>
			<br />
			<hr />
			<div className='ad-class mb-3 text-center mx-auto'>
				{/* add your slot id  */}
				<GoogleAds slot='8388147324' />
			</div>

			<span className='khanGalleryStyling'>
				<KhanGallery />
			</span>

			<span className='mt-3'>
				<KhanMap />
			</span>
			<div className='ad-class mb-3 text-center mx-auto'>
				{/* add your slot id  */}
				<GoogleAds slot='8388147324' />
			</div>
			<PowerBySnippet />
			<div className='ad-class mb-3 text-center mx-auto'>
				{/* add your slot id  */}
				<GoogleAds slot='8388147324' />
			</div>
			<span className='phoneBottomHero'>
				<HeroComponent />
			</span>
		</HomePageWrapper>
	);
};

export default Home;

const HomePageWrapper = styled.div`
	overflow: hidden !important;

	.phoneBottomHero {
		display: none;
	}

	.khanGalleryStyling {
		display: none;
	}

	@media (max-width: 900px) {
		.deskTopHero {
			display: none;
		}

		/* .phoneBottomHero {
			display: block;
		} */
		.phoneBottomHero {
			display: none;
		}

		.khanGalleryStyling {
			display: block;
		}
	}
`;
