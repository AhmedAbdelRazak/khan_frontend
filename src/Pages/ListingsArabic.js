/** @format */

import React, { useEffect } from "react";
import OurTicketsArabic from "./HomePageArabic/OurTickets_Arabic";

const ListingsArabic = ({ language }) => {
	useEffect(() => {
		if (window !== "undefined") {
			localStorage.removeItem("reservationData");
		}
	});
	return (
		<div className='my-5'>
			<OurTicketsArabic language={language} />
		</div>
	);
};

export default ListingsArabic;
