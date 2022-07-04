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
	setTotalAmount,
	setTotalAmountBeforeDiscount,
	option1Count,
	option2Count,
	option3Count,
	option4Count,
	busStationChosenTime,
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

		var totalOtionsPrice =
			Number(option1Count) *
				Number(
					serviceDetails.option1_Price ? serviceDetails.option1_Price : 0,
				) +
			Number(option2Count) *
				Number(
					serviceDetails.option2_Price ? serviceDetails.option2_Price : 0,
				) +
			Number(option3Count) *
				Number(
					serviceDetails.option3_Price ? serviceDetails.option3_Price : 0,
				) +
			Number(option4Count) *
				Number(serviceDetails.option4_Price ? serviceDetails.option4_Price : 0);

		setTotalAmountBeforeDiscount(
			Number(
				price_adults + price_children + TransportationFees + totalOtionsPrice,
			).toFixed(2),
		);

		return Number(
			price_adults + price_children + TransportationFees + totalOtionsPrice,
		).toFixed(2);
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

		var totalOtionsPrice =
			Number(option1Count) *
				Number(
					serviceDetails.option1_Price ? serviceDetails.option1_Price : 0,
				) +
			Number(option2Count) *
				Number(
					serviceDetails.option2_Price ? serviceDetails.option2_Price : 0,
				) +
			Number(option3Count) *
				Number(
					serviceDetails.option3_Price ? serviceDetails.option3_Price : 0,
				) +
			Number(option4Count) *
				Number(serviceDetails.option4_Price ? serviceDetails.option4_Price : 0);

		setTotalAmount(
			Number(
				price_adults +
					price_children +
					TransportationFees +
					discountedAmount +
					totalOtionsPrice,
			).toFixed(2),
		);

		return Number(
			price_adults +
				price_children +
				TransportationFees +
				discountedAmount +
				totalOtionsPrice,
		).toFixed(2);
	};

	// console.log(chosenDate, "From FormStep3");

	const dateFormat = (x) => {
		var requiredDate = new Date(x);
		var yyyy = requiredDate.getFullYear();
		let mm = requiredDate.getMonth() + 1; // Months start at 0!
		let dd = requiredDate.getDate();

		if (dd < 10) dd = "0" + dd;
		if (mm < 10) mm = "0" + mm;

		return (requiredDate = dd + "/" + mm + "/" + yyyy);
	};

	return (
		<FormStep3Wrapper>
			<div className='row'>
				<h3 className='reviewHeader'>Booking Details</h3>
				<div className='col-md-6 ml-3 mt-2'>
					<div>Name: {fullName}</div>
					<div>
						Phone: ({countryCallingCode}) {phone}
					</div>
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
					{serviceDetails.option1_Active && option1Count > 0 ? (
						<div>
							{serviceDetails.option1}: {option1Count} (
							{option1Count * serviceDetails.option1_Price} L.E).
						</div>
					) : null}
					{serviceDetails.option2_Active && option2Count > 0 ? (
						<div>
							{serviceDetails.option2}: {option2Count} (
							{option2Count * serviceDetails.option2_Price} L.E).
						</div>
					) : null}
					{serviceDetails.option3_Active && option3Count > 0 ? (
						<div>
							{serviceDetails.option3}: {option3Count} (
							{option3Count * serviceDetails.option3_Price} L.E).
						</div>
					) : null}
					{serviceDetails.option4_Active && option4Count > 0 ? (
						<div>
							{serviceDetails.option4}: {option4Count} (
							{option4Count * serviceDetails.option4_Price} L.E).
						</div>
					) : null}

					<div>
						Transportation Fees: {Number(chosenBusStationPrice.price)} L.E.{" "}
					</div>
					<div>Bus Station Time: {busStationChosenTime}</div>

					<div>Booking Date: {dateFormat(chosenDate)}</div>
					<div>Event/Occasion: {event_ocassion} </div>
					{chosenCouponDetails && chosenCouponDetails.name ? (
						<div>
							Coupon Name: {chosenCouponDetails.name} (
							{chosenCouponDetails.discount}% Off){" "}
						</div>
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
					<div
						style={{
							color: "red",
							fontWeight: "bolder",
							marginTop: "5px",
							fontSize: "12px",
							marginLeft: "5px",
						}}>
						(Taxes fee is Included)
					</div>
				</div>
				<div className='col-md-5 mx-auto my-auto'>
					<br />
					<div>
						<label
							className='textResizeMain2 ml-3'
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

	.reviewHeader {
		display: none;
	}

	@media (max-width: 1000px) {
		margin-left: 20px;
		margin: 0px 0px;

		.textResizeMain2 {
			font-size: 0.8rem !important;
			text-shadow: 0px 0px 0px !important;
			font-weight: bold !important;
		}

		.reviewHeader {
			display: block;
			color: var(--orangePrimary);
			font-weight: bolder;
			text-align: center !important;
			margin: 0px auto !important;
		}
	}
`;
