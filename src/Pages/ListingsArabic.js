/** @format */

import React, { useEffect } from "react";
import styled from "styled-components";
import ReactGA from "react-ga";
import OurTicketsArabic from "./HomePageArabic/OurTickets_Arabic";
import Helmet from "react-helmet";
import PowerBySnippet from "./PowerBySnippet";
import GoogleAds from "../GoogleAdsense/GoogleAds";

const ListingsArabic = ({ language }) => {
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
		<ListingsArabicWrapper className='my-5'>
			<Helmet>
				<meta charSet='utf-8' />
				<title>منتجع خان خديجة | التذاكر والعروض المتوفرة</title>
				<meta
					name='description'
					content='خان خديجة أفضل منتجع في مصر. إذا كنت تبحث عن وقت للشفاء والمرح ، فيجب أن يكون منتجع خان خديجة هو خيارك الأول. تم تشغيل موقع منتجع خان خديجة بواسطة www.infinite-apps.com'
				/>
				<link rel='canonical' href='https://khankhadija.com/listings' />
				<link rel='icon' href='khan_frontend\src\GeneralImgs\favicon.ico' />
			</Helmet>

			<OurTicketsArabic language={language} />
			<div className='ad-class'>
				{/* add your slot id  */}
				<GoogleAds slot='8388147324' />
			</div>
			<PowerBySnippet />
			<div className='ad-class'>
				{/* add your slot id  */}
				<GoogleAds slot='8388147324' />
			</div>
		</ListingsArabicWrapper>
	);
};

export default ListingsArabic;

const ListingsArabicWrapper = styled.div`
	min-height: 700px;
`;
