/** @format */

import React, { useEffect } from "react";
import styled from "styled-components";
import KhanMap from "../HomePage/KhanMap";
import PowerBySnippet from "../PowerBySnippet";
import BookNowGeneralArabic from "./BookNowGeneral_Arabic";
import HeroComponentArabic from "./HeroComponent_Arabic";
import KhanGalleryArabic from "./KhanGallery_Arabic";
import OurTicketsArabic from "./OurTickets_Arabic";
import ReactGA from "react-ga";
import Helmet from "react-helmet";
// eslint-disable-next-line
import GoogleAds from "../../GoogleAdsense/GoogleAds";

const Home_Arabic = ({ language }) => {
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
				<title>منتجع خان خديجة | أفضل منتجع في مصر</title>
				<meta
					name='description'
					content='خان خديجة أفضل منتجع في مصر. إذا كنت تبحث عن وقت للشفاء والمرح ، فيجب أن يكون منتجع خان خديجة هو خيارك الأول. تم تشغيل موقع منتجع خان خديجة بواسطة www.infinite-apps.com'
				/>
				<link rel='canonical' href='https://khankhadija.com' />
				<link rel='icon' href='khan_frontend\src\GeneralImgs\favicon.ico' />
			</Helmet>
			<span className='deskTopHero'>
				<HeroComponentArabic language={language} />
			</span>

			<BookNowGeneralArabic language={language} />

			<div className='col-md-10 mx-auto mt-3'>
				<br />
				<hr />
			</div>
			{/* <div className='ad-class mb-3'> */}
			{/* add your slot id  */}
			<GoogleAds slot='8388147324' />
			{/* </div> */}
			<div className='mt-2'>
				<OurTicketsArabic language={language} />
			</div>
			<div className='col-md-10 mx-auto mt-3'>
				<hr />
			</div>

			{/* <div className='ad-class mb-3'> */}
			{/* add your slot id  */}
			<GoogleAds slot='8388147324' />
			{/* </div> */}

			<span className='khanGalleryStyling'>
				<KhanGalleryArabic />
			</span>

			<span className='mt-3'>
				<KhanMap />
			</span>
			<div className='ad-class'>
				{/* add your slot id  */}
				<GoogleAds slot='8388147324' />
			</div>
			<PowerBySnippet />
			<div className='ad-class'>
				{/* add your slot id  */}
				<GoogleAds slot='8388147324' />
			</div>

			<span className='phoneBottomHero'>
				<HeroComponentArabic language={language} />
			</span>
		</HomePageWrapper>
	);
};

export default Home_Arabic;

const HomePageWrapper = styled.div`
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

		.phoneBottomHero {
			display: block;
		}

		.phoneBottomHero {
			display: none;
		}

		.khanGalleryStyling {
			display: block;
		}
	}
`;
