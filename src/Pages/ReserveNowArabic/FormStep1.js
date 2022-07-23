/** @format */

import React, { useEffect } from "react";
import styled from "styled-components";
import { DatePicker } from "antd";
import moment from "moment";
import ReactGA from "react-ga";

const FormStep1 = ({
	chosenDate,
	setChosenDate,
	setChosenService_Package,
	chosenService_Package,
	setServiceDetails,
	serviceDetails,
	allServices,
	storeClosed_NotClosed,
	storeClosed_NotClosedCustomized,
	chosenCoupon,
	setChosenCoupon,
	availableCoupon,
	allCoupons,
	setChosenCouponDetails,
	availableTickets,
	busStations,
	chosenBusStationDetails,
	setChosenBusStationsDetails,
	busStationChosenTime,
	setBusStationChosenTime,
	quantity,
	setQuantity,
	quantity_Children,
	setQuantity_Children,
	busStationName,
	setBusStationName,
	option1Count,
	option2Count,
	option3Count,
	option4Count,
	setOption1Count,
	setOption2Count,
	setOption3Count,
	setOption4Count,
	busSeatsCount,
	setBusSeatsCount,
}) => {
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

		// ReactGA.event({
		// 	category: "Coupon Was Filled",
		// 	action: "A Client Filled In Coupon " + event.target.value,
		// 	label: "Coupon Was Filled",
		// });
	};

	const handleQuantity = (event) => {
		setQuantity(event.target.value);
		setBusSeatsCount(Number(quantity_Children) + Number(event.target.value));
	};

	const handleQuantityChildren = (event) => {
		setQuantity_Children(event.target.value);
		setBusSeatsCount(Number(quantity) + Number(event.target.value));
	};

	const handleChosenBusStation = (event) => {
		setBusStationName(event.target.value.toLowerCase());

		const indexOfBusStations =
			event.target.value &&
			busStations &&
			busStations
				.map((busstation) => busstation.address.toLowerCase())
				.indexOf(event.target.value.toLowerCase());

		const chosenBusStatioDetails =
			event.target.value &&
			busStations &&
			indexOfBusStations &&
			indexOfBusStations === 0
				? busStations[indexOfBusStations]
				: busStations[indexOfBusStations];

		setChosenBusStationsDetails(chosenBusStatioDetails);
		setBusStationChosenTime(chosenBusStatioDetails.times[0]);
	};

	const handleBusStationChosenTime = (event) => {
		setBusStationChosenTime(event.target.value);
	};

	useEffect(() => {
		if (!localStorage.getItem("reservationData")) {
			setBusStationName(chosenBusStationDetails.address);
			setBusStationChosenTime(chosenBusStationDetails.times[0]);
		}

		// eslint-disable-next-line
	}, []);

	// eslint-disable-next-line
	const handleOption1Count = (event) => {
		setOption1Count(event.target.value);
	};

	// eslint-disable-next-line
	const handleOption2Count = (event) => {
		setOption2Count(event.target.value);
	};

	// eslint-disable-next-line
	const handleOption3Count = (event) => {
		setOption3Count(event.target.value);
	};

	// eslint-disable-next-line
	const handleOption4Count = (event) => {
		setOption4Count(event.target.value);
	};

	const handleBusSeatCount = (event) => {
		setBusSeatsCount(event.target.value);
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
				اختر نوع التذكره
			</label>
			<br />
			<select
				dir='ltr'
				onChange={handleChosenService_Package}
				className='inputFields mb-3'
				style={{
					paddingTop: "12px",
					paddingBottom: "12px",
					// paddingRight: "140px",
					textAlign: "center",
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
					<option className='items ml-2 text-muted inputFields'>
						اختر نوع التذكره
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
				حدد تاريخ الحجز
			</label>
			<br />
			{storeClosed_NotClosed || storeClosed_NotClosedCustomized ? (
				<span style={{ color: "red", fontWeight: "bold", fontSize: "14px" }}>
					معذرة ، منتجع خان خديجة مغلق في التاريخ المحدد من فضلك حاول موعد آخر.
					<br />
					<br />
				</span>
			) : null}

			<DatePicker
				className='inputFields'
				onChange={(date) => {
					setChosenDate(
						new Date(date._d).toLocaleDateString("en-US", {
							timeZone: "Africa/Cairo",
						}) || date._d,
					);

					ReactGA.event({
						category: "Form Filling",
						action: "A Client Filled In Date Field",
						label: "Date Was Added",
					});
				}}
				disabledDate={disabledDate}
				max
				size='small'
				showToday={true}
				defaultValue={
					!localStorage.getItem("reservationData")
						? moment(
								new Date().toLocaleDateString("en-US", {
									timeZone: "Africa/Cairo",
								}),
						  )
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
					ادخال كود الكوبون
				</label>

				<input
					style={{
						paddingTop: "12px",
						paddingBottom: "12px",
						// paddingLeft: "140px",
						textAlign: "center",
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
					placeholder='(**اختياري)'
				/>
				{availableCoupon && chosenCoupon && (
					<div className='coupon-available'>تم تطبيق الكوبون بنجاح</div>
				)}
				{!availableCoupon && chosenCoupon && (
					<div className='coupon-unavailable'>
						عذرا ، الكوبون غير متوفر أو منتهي الصلاحية.
					</div>
				)}
			</div>

			<div className='row'>
				<div className='col-md-5 mx-auto my-4'>
					<label
						className='dataPointsReview'
						style={{
							fontWeight: "bold",
							fontSize: "1.1rem",
							// color: "#00407f",
						}}>
						Ticket Quantity (Adults)
					</label>

					<input
						type='number'
						className='form-control w-75 mx-auto'
						value={quantity}
						onChange={handleQuantity}
						placeholder='How Many Tickets?'
						max={availableTickets()}
					/>
					{Number(quantity) + Number(quantity_Children) >
						availableTickets() && (
						<div
							className='mt-2'
							style={{ fontWeight: "bold", color: "red", fontSize: "13px" }}>
							Not enough tickets are available, please choose another date and
							try again.
						</div>
					)}
				</div>

				<div className='col-md-5 mx-auto my-4'>
					<label
						className='textResizeMain2'
						style={{
							fontWeight: "bold",
							fontSize: "1.1rem",
							// color: "#00407f",
						}}>
						Ticket Quantity (Children)
					</label>

					<input
						type='number'
						className='form-control w-75 mx-auto'
						value={quantity_Children}
						onChange={handleQuantityChildren}
						placeholder='How Many Tickets?'
						max={availableTickets()}
					/>
					{Number(quantity) + Number(quantity_Children) >
						availableTickets() && (
						<div
							className='mt-2'
							style={{ fontWeight: "bold", color: "red", fontSize: "13px" }}>
							Not enough tickets are available, please choose another date and
							try again.
						</div>
					)}
				</div>

				{serviceDetails && serviceDetails.displayBusStationOption ? (
					<div className='col-md-10 mx-auto my-1'>
						<label
							className='textResizeMain2'
							style={{
								fontWeight: "bold",
								fontSize: "1rem",
								color: "#00407f",
							}}>
							وسيلة المواصلات
						</label>
						<br />
						<select
							onChange={handleChosenBusStation}
							className='inputFields mb-3'
							style={{
								paddingTop: "12px",
								paddingBottom: "12px",
								// paddingRight: "130px",
								// textAlign: "center",
								border: "#cfcfcf solid 1px",
								borderRadius: "10px",
								width: "75%",
								fontSize: "0.9rem",
								// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
							}}>
							{busStationName &&
							busStationName !== "Please Select (Required)" ? (
								<option className='items text-muted inputFields'>
									{busStationName}
								</option>
							) : (
								<option className='items text-muted inputFields'>
									يرجى تحديد (مطلوب)
								</option>
							)}
							{busStations &&
								busStations.map((b, i) => {
									return (
										<option
											key={i}
											className='items text-muted inputFields'
											value={b.address}>
											{b.address} ({b.price} L.E.)
										</option>
									);
								})}
						</select>
					</div>
				) : null}

				{chosenBusStationDetails &&
					chosenBusStationDetails.address !== "no bus needed" &&
					chosenBusStationDetails.address !== "NO BUS NEEDED" && (
						<div
							className={
								chosenBusStationDetails
									? "col-md-5 my-3 mx-auto"
									: "col-md-6 my-3 mx-auto"
							}>
							<label
								className='textResizeMain2'
								style={{
									fontWeight: "bold",
									fontSize: "1rem",
									// color: "#00407f",
								}}>
								المواعيد المتاحة لرحلة {chosenBusStationDetails.address}
							</label>
							<br />
							<select
								onChange={handleBusStationChosenTime}
								className='inputFields mb-3'
								style={{
									paddingTop: "12px",
									paddingBottom: "12px",
									// paddingRight: "130px",
									// textAlign: "center",
									border: "#cfcfcf solid 1px",
									borderRadius: "10px",
									width: "75%",
									fontSize: "0.9rem",
									// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
								}}>
								{busStationChosenTime &&
								busStationChosenTime !== "Please Select (Required)" ? (
									<option className='items text-muted inputFields'>
										{busStationChosenTime}
									</option>
								) : (
									<option className='items text-muted inputFields'>
										Please Select (Required)
									</option>
								)}
								{chosenBusStationDetails &&
									chosenBusStationDetails.times &&
									chosenBusStationDetails.times.map((b, i) => {
										return (
											<option
												key={i}
												className='items text-muted inputFields'
												value={b}>
												{b}
											</option>
										);
									})}
							</select>
						</div>
					)}
			</div>

			{chosenBusStationDetails &&
				chosenBusStationDetails.address !== "no bus needed" &&
				chosenBusStationDetails.address !== "NO BUS NEEDED" && (
					<div className='col-md-8 mx-auto my-2'>
						<label
							className='textResizeMain2'
							style={{
								fontWeight: "bold",
								fontSize: "1rem",
								color: "black",
							}}>
							عدد مقاعد الباص
						</label>

						<input
							type='number'
							className='form-control w-75  mx-auto'
							value={busSeatsCount}
							onChange={handleBusSeatCount}
							placeholder='(**Required)'
						/>
					</div>
				)}

			{serviceDetails && serviceDetails.option1_Active ? (
				<div className='col-md-8 mx-auto my-1'>
					<label
						className='textResizeMain2'
						style={{
							fontWeight: "bold",
							fontSize: "1rem",
							// color: "#00407f",
						}}>
						كم عدد {serviceDetails && serviceDetails.option1_Arabic}؟
					</label>

					<input
						type='number'
						className='form-control w-75 mx-auto'
						value={option1Count}
						onChange={handleOption1Count}
					/>
					{Number(option1Count) > 0 ? (
						<div style={{ color: "grey" }}>
							{Number(option1Count) * Number(serviceDetails.option1_Price)} جنيه
						</div>
					) : null}
				</div>
			) : null}

			{serviceDetails && serviceDetails.option2_Active ? (
				<div className='col-md-8 mx-auto my-1'>
					<label
						className='textResizeMain2'
						style={{
							fontWeight: "bold",
							fontSize: "1rem",
							// color: "#00407f",
						}}>
						كم عدد {serviceDetails && serviceDetails.option2_Arabic}؟
					</label>

					<input
						type='number'
						className='form-control w-75 mx-auto'
						value={option2Count}
						onChange={handleOption2Count}
					/>
					{Number(option2Count) > 0 ? (
						<div style={{ color: "grey" }}>
							{Number(option2Count) * Number(serviceDetails.option2_Price)} جنيه
						</div>
					) : null}
				</div>
			) : null}

			{serviceDetails && serviceDetails.option3_Active ? (
				<div className='col-md-8 mx-auto my-1'>
					<label
						className='textResizeMain2'
						style={{
							fontWeight: "bold",
							fontSize: "1rem",
							// color: "#00407f",
						}}>
						كم عدد {serviceDetails && serviceDetails.option3_Arabic}؟
					</label>

					<input
						type='number'
						className='form-control w-75 mx-auto'
						value={option3Count}
						onChange={handleOption3Count}
					/>
					{Number(option3Count) > 0 ? (
						<div style={{ color: "grey" }}>
							{Number(option3Count) * Number(serviceDetails.option3_Price)} جنيه
						</div>
					) : null}
				</div>
			) : null}

			{serviceDetails && serviceDetails.option4_Active ? (
				<div className='col-md-8 mx-auto my-1'>
					<label
						className='textResizeMain2'
						style={{
							fontWeight: "bold",
							fontSize: "1rem",
							color: "",
						}}>
						كم عدد {serviceDetails && serviceDetails.option4_Arabic}؟
					</label>

					<input
						type='number'
						className='form-control w-75 mx-auto'
						value={option4Count}
						onChange={handleOption4Count}
					/>
					{Number(option4Count) > 0 ? (
						<div style={{ color: "grey" }}>
							{Number(option4Count) * Number(serviceDetails.option4_Price)} L.E.
						</div>
					) : null}
				</div>
			) : null}
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

	input {
		text-align: center;
	}

	@media (max-width: 900px) {
		.inputFields {
			padding-top: 9px;
			padding-bottom: 9px;
			/* text-align: center; */
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
			padding-left: 20px !important;
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
