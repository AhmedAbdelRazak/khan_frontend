/** @format */

import React, { useEffect } from "react";
import styled from "styled-components";
import BookNowGeneralArabic from "./BookNowGeneral_Arabic";
import HeroComponentArabic from "./HeroComponent_Arabic";
import OurTicketsArabic from "./OurTickets_Arabic";

const Home_Arabic = ({ language }) => {
	useEffect(() => {
		if (window !== "undefined") {
			localStorage.removeItem("reservationData");
		}
	});

	console.log(language, "from home page arabic");
	return (
		<HomePageWrapper>
			<BookNowGeneralArabic language={language} />
			<HeroComponentArabic language={language} />
			<div className='col-md-10 mx-auto mt-3'>
				<br />
				<hr />
			</div>
			<div className='mt-5'>
				<OurTicketsArabic language={language} />
			</div>
		</HomePageWrapper>
	);
};

export default Home_Arabic;

const HomePageWrapper = styled.div`
	overflow: hidden !important;
`;
