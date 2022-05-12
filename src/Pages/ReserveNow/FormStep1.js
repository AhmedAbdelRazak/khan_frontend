/** @format */

import React, { useEffect } from "react";
import styled from "styled-components";
import { DatePicker } from "antd";
import moment from "moment";

const FormStep1 = ({
	chosenDate,
	setChosenDate,
	setChosenService_Package,
	chosenService_Package,
	setServiceDetails,
	allServices,
	storeClosed_NotClosed,
	storeClosed_NotClosedCustomized,
	chosenCoupon,
	setChosenCoupon,
	availableCoupon,
	allCoupons,
	setChosenCouponDetails,
}) => {
	useEffect(() => {
		setChosenDate(new Date().toLocaleDateString());

		// eslint-disable-next-line
	}, []);

	const disabledDate = (current) => {
		// Can not select days before today and today
		return current < moment();
	};

	// console.log(HistMeetings, "HistMeetings");

	const handleChosenService_Package = (event) => {
		setChosenService_Package(event.target.value);
		const indexOfService =
			event.target.value &&
			allServices &&
			allServices
				.map((service) => service.serviceName.toLowerCase())
				.indexOf(event.target.value.toLowerCase());

		const chosenServiceDetails =
			event.target.value &&
			allServices &&
			indexOfService &&
			indexOfService === 0
				? allServices[indexOfService]
				: allServices[indexOfService];

		setServiceDetails(chosenServiceDetails);
	};

	const handleChosenCoupon = (event) => {
		setChosenCoupon(event.target.value.toUpperCase());

		const indexOfCoupon =
			event.target.value &&
			allCoupons &&
			allCoupons
				.map((coupon) => coupon.name.toUpperCase())
				.indexOf(event.target.value.toUpperCase());

		const chosenCouponDetails =
			event.target.value && allCoupons && indexOfCoupon && indexOfCoupon === 0
				? allCoupons[indexOfCoupon]
				: allCoupons[indexOfCoupon];

		setChosenCouponDetails(chosenCouponDetails);
	};

	return (
		<FormStep1Wrapper>
			<label
				className='dataPointsReview'
				style={{
					fontWeight: "bold",
					fontSize: "1.05rem",
					color: "#32322b",
				}}>
				Select A Package
			</label>
			<br />
			<select
				onChange={handleChosenService_Package}
				className='inputFields mb-3'
				style={{
					paddingTop: "12px",
					paddingBottom: "12px",
					paddingRight: "140px",
					// textAlign: "center",
					border: "#cfcfcf solid 1px",
					borderRadius: "10px",
					width: "50%",
					fontSize: "0.9rem",
					// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
					textTransform: "capitalize",
				}}>
				{chosenService_Package && chosenService_Package !== "Select Package" ? (
					<option
						className='items text-muted inputFields'
						style={{ textTransform: "capitalize" }}>
						{chosenService_Package}
					</option>
				) : (
					<option className='items text-muted inputFields'>
						Select Package
					</option>
				)}

				{allServices &&
					allServices.map((t, i) => (
						<option
							key={i}
							value={t.serviceName}
							className='items'
							style={{ textTransform: "capitalize" }}
							onChange={() => setServiceDetails(i)}>
							{t.serviceName}
						</option>
					))}
			</select>
			<br />
			<br />

			<label
				className='dataPointsReview'
				style={{
					fontWeight: "bold",
					fontSize: "1.05rem",
					color: "#32322b",
				}}>
				Select Booking Date
			</label>
			<br />
			{storeClosed_NotClosed || storeClosed_NotClosedCustomized ? (
				<span style={{ color: "red", fontWeight: "bold", fontSize: "14px" }}>
					We are sorry, Khan Khadija Resort is off on the selected date, Please
					try another date.
					<br />
					<br />
				</span>
			) : null}

			<DatePicker
				className='inputFields'
				onChange={(date) =>
					setChosenDate(new Date(date._d).toLocaleDateString() || date._d)
				}
				disabledDate={disabledDate}
				max
				size='small'
				showToday={true}
				defaultValue={
					!localStorage.getItem("reservationData")
						? moment()
						: moment(
								JSON.parse(
									localStorage.getItem("reservationData") &&
										localStorage.getItem("reservationData"),
								).chosenDate,
						  )
				}
				placeholder='Please pick the desired schedule date'
				style={{
					height: "auto",
					width: "50%",
					marginBottom: "30px",
					padding: "10px",
					// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
					borderRadius: "10px",
				}}
			/>

			<br />
			<br />
			<div className='mx-auto '>
				<label
					className='dataPointsReview '
					style={{
						fontWeight: "bold",
						fontSize: "1.1rem",
						// color: "#00407f",
					}}>
					Apply A Coupon
				</label>

				<input
					style={{
						paddingTop: "12px",
						paddingBottom: "12px",
						paddingRight: "140px",
						// textAlign: "center",
						border: "#cfcfcf solid 1px",
						borderRadius: "10px",
						width: "50%",
						fontSize: "0.9rem",
						// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
						textTransform: "capitalize",
					}}
					type='text'
					className='form-control mx-auto inputFields2'
					value={chosenCoupon}
					onChange={handleChosenCoupon}
					placeholder='(**Optional)'
				/>
				{availableCoupon && chosenCoupon && (
					<div className='coupon-available'>
						Your Coupon is successfully applied
					</div>
				)}
				{!availableCoupon && chosenCoupon && (
					<div className='coupon-unavailable'>
						Sorry, this coupon is unavailable or expired.
					</div>
				)}
			</div>
		</FormStep1Wrapper>
	);
};

export default FormStep1;

const FormStep1Wrapper = styled.div`
	margin: 10px 0px;
	/* text-align: center; */

	.dataPointsReview {
		font-size: 0.8rem;
		text-transform: capitalize;
	}

	.coupon-available {
		margin-top: 10px;
		font-weight: bolder;
		color: darkgreen;
		text-transform: capitalize;
	}

	.coupon-unavailable {
		margin-top: 10px;
		font-weight: bolder;
		color: darkred;
		text-transform: capitalize;
	}

	@media (max-width: 900px) {
		.inputFields {
			padding-top: 9px;
			padding-bottom: 9px;
			text-align: center;
			border: #cfcfcf solid 1px;
			border-radius: 4px !important;
			width: 80% !important;
			font-size: 0.8rem !important;
			/* box-shadow: 2px 2px 2px 2px rgb(0, 0, 0, 0.2); */
			margin-bottom: 15px;
		}
		.inputFields2 {
			padding-top: 9px;
			padding-bottom: 9px;
			padding-right: 20px !important;
			/* text-align: center; */
			border: #cfcfcf solid 1px;
			border-radius: 4px !important;
			width: 80% !important;
			font-size: 0.8rem !important;
			/* box-shadow: 2px 2px 2px 2px rgb(0, 0, 0, 0.2); */
			margin-bottom: 15px;
		}
	}
`;
