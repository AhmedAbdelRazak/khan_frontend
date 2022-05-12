/** @format */

import React, { useEffect } from "react";
import styled from "styled-components";
import BookNowGeneral from "./BookNowGeneral";
import HeroComponent from "./HeroComponent";
import OurTickets from "./OurTickets";
import Helmet from "react-helmet";

const Home = () => {
	useEffect(() => {
		if (window !== "undefined") {
			localStorage.removeItem("reservationData");
		}
	});
	return (
		<HomePageWrapper>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Khan Khadija | The Best Resort In Egypt</title>
				<meta
					name='description'
					content='Welcome to Infinite Apps, your number one source for web design and development. We are committed to offering an innovative platform essential to helping small businesses succeed with quality website designs with a focus on Customer Satisfaction.'
				/>
				<link rel='canonical' href='https://khankhadija.com' />
				<link rel='icon' href='khan_frontend\src\GeneralImgs\favicon.ico' />
			</Helmet>
			<BookNowGeneral />
			<HeroComponent />
			<div className='col-md-10 mx-auto mt-3'>
				<br />
				<hr />
			</div>
			<div className='mt-5'>
				<OurTickets />
			</div>
		</HomePageWrapper>
	);
};

export default Home;

const HomePageWrapper = styled.div`
	overflow: hidden !important;
`;
