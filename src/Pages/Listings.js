/** @format */

import React, { useEffect } from "react";
import OurTickets from "./HomePage/OurTickets";

const Listings = () => {
	useEffect(() => {
		if (window !== "undefined") {
			localStorage.removeItem("reservationData");
		}
	});
	return (
		<div className='my-5'>
			<OurTickets />
		</div>
	);
};

export default Listings;
