/** @format */

import React from "react";
import styled from "styled-components";

const FormStep3 = ({
	appointmentComment,
	setAppointmentComment,
	scheduledByUserEmail,
	fullName,
	phone,
	chosenDate,
	event_ocassion,
	chosenService_Package,
	serviceDetails,
	countryCallingCode,
	quantity,
	quantity_Children,
	chosenBusStationPrice,
	chosenCouponDetails,
}) => {
	const handleMeetingComment = (event) => {
		setAppointmentComment(event.target.value);
	};

	// console.log(chosenBusStationPrice.price, "from Step 3");

	const totalPriceBeforeDiscount = () => {
		var price_adults = Number(serviceDetails.servicePrice) * Number(quantity);
		var price_children =
			Number(serviceDetails.servicePrice_Children) * Number(quantity_Children);

		var TransportationFees =
			Number(chosenBusStationPrice.price) *
			(Number(quantity) + Number(quantity_Children));

		return Number(price_adults + price_children + TransportationFees).toFixed(
			2,
		);
	};

	// console.log(chosenCouponDetails, "chosenCouponDetails");

	const totalPriceAfterDiscount = () => {
		var CouponDiscount =
			chosenCouponDetails && chosenCouponDetails.discount
				? chosenCouponDetails.discount
				: 0;

		var price_adults =
			Number(serviceDetails.servicePriceDiscount) * Number(quantity);

		var price_children =
			Number(serviceDetails.servicePriceDiscount_Children) *
			Number(quantity_Children);

		var discountedAmount =
			Number(price_adults + price_children) *
			Number(CouponDiscount / 100).toFixed(2) *
			-1;

		var TransportationFees =
			Number(chosenBusStationPrice.price) *
			(Number(quantity) + Number(quantity_Children));

		return Number(
			price_adults + price_children + TransportationFees + discountedAmount,
		).toFixed(2);
	};

	// console.log(chosenDate, "From FormStep3");

	return (
		<FormStep3Wrapper>
			<div className='row'>
				<div className='col-md-6'>
					<div>Name: {fullName}</div>
					<div>Phone: {countryCallingCode + phone}</div>
					<div>
						Scheduled By Email:{" "}
						{scheduledByUserEmail ? scheduledByUserEmail : "Not Filled"}
					</div>
					<div style={{ textTransform: "capitalize" }}>
						Booked Package: {chosenService_Package}{" "}
					</div>
					<div>
						Package Price (Adults):{" "}
						{serviceDetails.servicePrice ===
						serviceDetails.servicePriceDiscount ? (
							<span>{serviceDetails.servicePriceDiscount} L.E.</span>
						) : (
							<span style={{ color: "green", fontWeight: "bold" }}>
								<s style={{ color: "red", fontWeight: "bold" }}>
									{serviceDetails.servicePrice} L.E.
								</s>{" "}
								{serviceDetails.servicePriceDiscount} L.E.
							</span>
						)}{" "}
					</div>

					<div>
						Package Price (Children):{" "}
						{serviceDetails.servicePrice_Children ===
						serviceDetails.servicePriceDiscount_Children ? (
							<span>{serviceDetails.servicePriceDiscount_Children} L.E.</span>
						) : (
							<span style={{ color: "black", fontWeight: "" }}>
								<s style={{ color: "black", fontWeight: "" }}>
									{serviceDetails.servicePrice_Children} L.E.
								</s>{" "}
								{serviceDetails.servicePriceDiscount_Children} L.E.
							</span>
						)}{" "}
					</div>

					<div>
						Tickets Count: {Number(quantity) + Number(quantity_Children)}{" "}
						Tickets
					</div>
					<div>
						Transportation Fees: {Number(chosenBusStationPrice.price)} L.E.{" "}
					</div>

					<div>Booking Date: {chosenDate}</div>
					<div>Event/Occasion: {event_ocassion} </div>
					{chosenCouponDetails && chosenCouponDetails.name ? (
						<div>Coupon Name: {chosenCouponDetails.name} </div>
					) : null}

					<div
						style={{
							fontSize: "1rem",
							fontWeight: "bold",
							color: "var(--mainBlue)",
						}}>
						Total Amount:{" "}
						{totalPriceBeforeDiscount() === totalPriceAfterDiscount() ? (
							<span style={{ color: "green", fontWeight: "bold" }}>
								{totalPriceAfterDiscount()} L.E.
							</span>
						) : (
							<span style={{ color: "green", fontWeight: "bold" }}>
								<s style={{ color: "red", fontWeight: "bold" }}>
									{totalPriceBeforeDiscount()} L.E.
								</s>{" "}
								{totalPriceAfterDiscount()} L.E.
							</span>
						)}{" "}
					</div>
				</div>
				<div className='col-md-5 mx-auto my-auto'>
					<br />
					<div>
						<label
							className='textResizeMain2'
							style={{
								fontWeight: "bold",
								fontSize: "1rem",
								color: "#00407f",
							}}>
							*Optional: If you have any further comments, Please consider
							addressing them here
						</label>

						<textarea
							type='text'
							rows='5'
							className='form-control '
							value={appointmentComment}
							onChange={handleMeetingComment}
							placeholder='If you have any further comments, Please add them here...'
							// autoFocus
						/>
					</div>
				</div>
			</div>
		</FormStep3Wrapper>
	);
};

export default FormStep3;

const FormStep3Wrapper = styled.div`
	margin: 30px 0px;
	text-align: left;
	margin-left: 100px;

	@media (max-width: 1000px) {
		margin-left: 20px;

		.textResizeMain2 {
			font-size: 0.8rem !important;
			text-shadow: 0px 0px 0px !important;
			font-weight: bold !important;
		}
	}
`;
