/** @format */

import React, { Fragment } from "react";
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
				<h3 className='reviewHeader'>تفاصيل الحجز</h3>
				<div className='col-md-6 mt-3'>
					<div className='toBeAlignedRight'>الاسم: {fullName}</div>
					<br />
					<div className='toBeAlignedRight'>
						الهاتف:{" "}
						<span dir='ltr'>
							({countryCallingCode}) {phone}
						</span>
					</div>
					<br />
					<div className='toBeAlignedRight'>
						بريد الالكتروني:{" "}
						{scheduledByUserEmail ? scheduledByUserEmail : "Not Filled"}
					</div>
					<br />

					<div
						className='toBeAlignedRight'
						style={{ textTransform: "capitalize" }}>
						اسم التذكرة: {chosenService_Package}{" "}
					</div>
					<br />

					<div className='toBeAlignedRight'>
						سعر التذكرة (الكبار):{" "}
						{serviceDetails.servicePrice ===
						serviceDetails.servicePriceDiscount ? (
							<span>{serviceDetails.servicePriceDiscount} جنيه</span>
						) : (
							<span style={{ color: "green", fontWeight: "bold" }}>
								<s style={{ color: "red", fontWeight: "bold" }}>
									{serviceDetails.servicePrice} جنيه
								</s>{" "}
								{serviceDetails.servicePriceDiscount} جنيه
							</span>
						)}{" "}
					</div>
					<br />

					<div className='toBeAlignedRight'>
						سعر التذكرة (للأطفال):{" "}
						{serviceDetails.servicePrice_Children ===
						serviceDetails.servicePriceDiscount_Children ? (
							<span>{serviceDetails.servicePriceDiscount_Children} جنيه</span>
						) : (
							<span style={{ color: "black", fontWeight: "" }}>
								<s style={{ color: "black", fontWeight: "" }}>
									{serviceDetails.servicePrice_Children} جنيه
								</s>{" "}
								{serviceDetails.servicePriceDiscount_Children} جنيه
							</span>
						)}{" "}
					</div>
					<br />

					<div className='toBeAlignedRight'>
						عدد التذاكر: {Number(quantity) + Number(quantity_Children)} تذكرة
					</div>
					<br />

					<div className='toBeAlignedRight'>
						رسوم المواصلات: {Number(chosenBusStationPrice.price)} جنيه{" "}
					</div>
					<br />
					{serviceDetails.option1_Active && option1Count > 0 ? (
						<Fragment>
							<div className='toBeAlignedRight'>
								{serviceDetails.option1_Arabic}: {option1Count} (
								{option1Count * serviceDetails.option1_Price} جنيه).
							</div>
							<br />
						</Fragment>
					) : null}

					{serviceDetails.option2_Active && option2Count > 0 ? (
						<Fragment>
							<div className='toBeAlignedRight'>
								{serviceDetails.option2_Arabic}: {option2Count} (
								{option2Count * serviceDetails.option2_Price} جنيه).
							</div>
							<br />
						</Fragment>
					) : null}
					{serviceDetails.option3_Active && option3Count > 0 ? (
						<Fragment>
							<div className='toBeAlignedRight'>
								{serviceDetails.option3_Arabic}: {option3Count} (
								{option3Count * serviceDetails.option3_Price} جنيه).
							</div>
							<br />
						</Fragment>
					) : null}
					{serviceDetails.option4_Active && option4Count > 0 ? (
						<Fragment>
							<div className='toBeAlignedRight'>
								{serviceDetails.option4_Arabic}: {option4Count} (
								{option4Count * serviceDetails.option4_Price} جنيه).
							</div>
							<br />
						</Fragment>
					) : null}

					<div className='toBeAlignedRight'>
						تاريخ الحجز: {dateFormat(chosenDate)}
					</div>
					<br />

					<div className='toBeAlignedRight'>
						الحدث / المناسبة: {event_ocassion}{" "}
					</div>
					<br />

					{chosenCouponDetails && chosenCouponDetails.name ? (
						<div className='toBeAlignedRight'>
							اسم الكوبون: {chosenCouponDetails.name} (
							{chosenCouponDetails.discount}% Off){" "}
						</div>
					) : null}
					<br />

					<div
						className='toBeAlignedRight'
						style={{
							fontSize: "1rem",
							fontWeight: "bold",
							color: "var(--mainBlue)",
						}}>
						المبلغ الإجمالي:{" "}
						{totalPriceBeforeDiscount() === totalPriceAfterDiscount() ? (
							<span style={{ color: "green", fontWeight: "bold" }}>
								{totalPriceAfterDiscount()} جنيه
							</span>
						) : (
							<span style={{ color: "green", fontWeight: "bold" }}>
								<s style={{ color: "red", fontWeight: "bold" }}>
									{totalPriceBeforeDiscount()} جنيه
								</s>{" "}
								{totalPriceAfterDiscount()} جنيه
								<span style={{ color: "black", fontSize: "12px" }}>
									{" "}
									(شامل رسوم الضرائب)
								</span>
							</span>
						)}{" "}
					</div>
					<br />
					<br />
					<div
						className='toBeAlignedRight'
						style={{ color: "red", fontWeight: "bolder" }}></div>
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
							لاضافه اي تعليقات.الرجاء كتابتها هنا
						</label>

						<textarea
							type='text'
							rows='5'
							className='form-control '
							value={appointmentComment}
							onChange={handleMeetingComment}
							placeholder='إذا كان لديك أي تعليقات أخرى ، يرجى إضافتها هنا ...'
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
	margin-left: 100px;

	.toBeAlignedRight {
		float: right;
		margin-right: 150px;
	}

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

		.toBeAlignedRight {
			float: right;
			margin-right: 20px;
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
