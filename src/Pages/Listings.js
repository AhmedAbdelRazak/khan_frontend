/** @format */

import React, { useEffect } from "react";
import styled from "styled-components";
import OurTickets from "./HomePage/OurTickets";
import ReactGA from "react-ga";

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
			<OurTickets />
		</LinstingsWrapper>
	);
};

export default Listings;

const LinstingsWrapper = styled.div`
	min-height: 700px;
`;
