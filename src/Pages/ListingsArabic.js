/** @format */

import React, { useEffect } from "react";
import styled from "styled-components";
import ReactGA from "react-ga";
import OurTicketsArabic from "./HomePageArabic/OurTickets_Arabic";

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
			<OurTicketsArabic language={language} />
		</ListingsArabicWrapper>
	);
};

export default ListingsArabic;

const ListingsArabicWrapper = styled.div`
	min-height: 700px;
`;
