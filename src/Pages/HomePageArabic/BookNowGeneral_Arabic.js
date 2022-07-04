/** @format */

import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import "antd/dist/antd.min.css";
import { Collapse, DatePicker } from "antd";
import { getTickets } from "../../apiCore";
import moment from "moment";
import ReactGA from "react-ga";
import { Link } from "react-router-dom";
import TicketIcon from "../../GeneralImgs/ticketIcon.png";
import DateIcon from "../../GeneralImgs/dateIcon.png";
import TicketCountIcon from "../../GeneralImgs/ticketCountIcon.png";
import PhoneIcon from "../../GeneralImgs/phoneIcon.png";
import { getCoupons, getBusStations } from "../../admin/apiAdmin";

const { Panel } = Collapse;

const mountedStyle = { animation: "inAnimation 600ms ease-in" };
const unmountedStyle = {
	animation: "outAnimation 600ms ease-out",
	animationFillMode: "forwards",
};

const BookNowGeneral_Arabic = ({ language }) => {
	const [allTickets, setAllTickets] = useState([]);
	const [chosenService_Package, setChosenService_Package] = useState("");
	const [serviceDetails, setServiceDetails] = useState("");
	const [chosenDate, setChosenDate] = useState("");
	// eslint-disable-next-line
	const [fullName, setFullName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [countryCallingCode, setCountryCallingCode] = useState("+2");
	const [quantity_Adults, setQuantity_Adults] = useState(1);
	const [quantity_Children, setQuantity_Children] = useState(0);
	// eslint-disable-next-line
	const [chosenCouponDetails, setChosenCouponDetails] = useState({});
	const [allCoupons, setCoupons] = useState([]);
	const [chosenCoupon, setChosenCoupon] = useState("");
	const [availableCoupon, setAvailableCoupon] = useState(false);
	const [option1Count, setOption1Count] = useState(0);
	const [option2Count, setOption2Count] = useState(0);
	const [option3Count, setOption3Count] = useState(0);
	const [option4Count, setOption4Count] = useState(0);
	const [displayOptions, setDisplayOptions] = useState(false);
	const [busStations, setBusStations] = useState([]);
	const [chosenBusStationDetails, setChosenBusStationsDetails] = useState({
		_id: "62859115e6e76c6625432018",
		address: "NO BUS NEEDED",
		price: 0,
		times: ["00:00", "00:15"],
		createdAt: "2022-05-19T00:36:37.593+00:00",
		updatedAt: "2022-05-19T00:36:37.593+00:00",
	});

	// eslint-disable-next-line
	const [busStationChosenTime, setBusStationChosenTime] = useState("");
	const [busStationName, setBusStationName] = useState("NO BUS NEEDED");

	// eslint-disable-next-line
	const [userEmail, setUserEmail] = useState("");

	var today = new Date();
	var tomorrow = new Date(today);
	var yesterday = new Date(today);

	tomorrow.setDate(yesterday.getDate() + 1);

	const dateFormat = (x) => {
		var requiredDate = new Date(x);
		var yyyy = requiredDate.getFullYear();
		let mm = requiredDate.getMonth() + 1; // Months start at 0!
		let dd = requiredDate.getDate();

		if (dd < 10) dd = "0" + dd;
		if (mm < 10) mm = "0" + mm;

		return (requiredDate = dd + "/" + mm + "/" + yyyy);
	};

	const gettingAllTickets = () => {
		getTickets().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllTickets(data.filter((i) => i.activeService === true));
			}
		});
	};

	const handleChosenService_Package = (event) => {
		setChosenService_Package(event.target.value);
		const indexOfService =
			event.target.value &&
			allTickets &&
			allTickets
				.map((service) => service.serviceName.toLowerCase())
				.indexOf(event.target.value.toLowerCase());

		const chosenServiceDetails =
			event.target.value && allTickets && indexOfService && indexOfService === 0
				? allTickets[indexOfService]
				: allTickets[indexOfService];

		setServiceDetails(chosenServiceDetails);
		ReactGA.event({
			category: "Ticket Was Picked For Reservation",
			action: `Ticket Was Picked From Home Page (${event.target.value})`,
			label: "User Selected his desired Ticket",
		});
	};

	const loadAllCoupons = () =>
		getCoupons().then((res) => {
			setCoupons(
				res.data.filter(
					(i) =>
						new Date(i.expiry).setHours(0, 0, 0, 0) >=
						new Date().setHours(0, 0, 0, 0),
				),
			);
		});

	const loadAllBusStations = () =>
		getBusStations().then((res) => setBusStations(res.data));

	useEffect(() => {
		loadAllCoupons();
		gettingAllTickets();
		loadAllBusStations();

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (
			(serviceDetails.option1_Active &&
				serviceDetails.option2_Active &&
				!serviceDetails.option3_Active &&
				!serviceDetails.option4_Active) ||
			(serviceDetails.option1_Active &&
				!serviceDetails.option2_Active &&
				!serviceDetails.option3_Active &&
				!serviceDetails.option4_Active)
		) {
			return setDisplayOptions(true);
		} else {
			return null;
		}
		// eslint-disable-next-line
	}, [serviceDetails]);

	const disabledDate = (current) => {
		// Can not select days before today and today
		return current < moment();
	};
	// eslint-disable-next-line
	const handleScheduledByUserFullName = (event) => {
		setFullName(event.target.value);
	};
	// eslint-disable-next-line
	const handleScheduledByUserEmail = (event) => {
		setUserEmail(event.target.value);
	};

	// eslint-disable-next-line
	const handlePhone = (event) => {
		setPhoneNumber(event.target.value);
	};

	// eslint-disable-next-line
	const handleCountryCode = (event) => {
		setCountryCallingCode(event.target.value);
	};

	// eslint-disable-next-line
	const handleQuantityAdults = (event) => {
		setQuantity_Adults(event.target.value);
	};

	// eslint-disable-next-line
	const handleQuantityChildren = (event) => {
		setQuantity_Children(event.target.value);
	};

	const handleOption1Count = (event) => {
		setOption1Count(event.target.value);
	};
	const handleOption2Count = (event) => {
		setOption2Count(event.target.value);
	};
	const handleOption3Count = (event) => {
		setOption3Count(event.target.value);
	};
	const handleOption4Count = (event) => {
		setOption4Count(event.target.value);
	};

	const couponValidation = () => {
		var existLogic =
			allCoupons.map((i) => i.name) &&
			allCoupons.map((i) => i.name).indexOf(chosenCoupon);
		if (existLogic > -1 && chosenCoupon) {
			setAvailableCoupon(true);
		} else {
			setAvailableCoupon(false);
		}
	};

	useEffect(() => {
		couponValidation();
		// eslint-disable-next-line
	}, [chosenCoupon]);

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
		setBusStationName(chosenBusStationDetails.address);
		setBusStationChosenTime(chosenBusStationDetails.times[0]);
		// eslint-disable-next-line
	}, []);

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

	const totalPriceBeforeDiscount = () => {
		var price_adults_fn =
			Number(serviceDetails.servicePrice) * Number(quantity_Adults);
		var price_children_fn =
			Number(serviceDetails.servicePrice_Children) * Number(quantity_Children);

		var TransportationFees =
			Number(chosenBusStationDetails.price) *
			(Number(quantity_Adults) + Number(quantity_Children));

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

		return Number(
			price_adults_fn +
				price_children_fn +
				TransportationFees +
				totalOtionsPrice,
		).toFixed(2);
	};

	const totalPriceAfterDiscount = () => {
		var CouponDiscount =
			chosenCouponDetails && chosenCouponDetails.discount
				? chosenCouponDetails.discount
				: 0;

		var price_adults_fn =
			Number(serviceDetails.servicePriceDiscount) * Number(quantity_Adults);

		var price_children_fn =
			Number(serviceDetails.servicePriceDiscount_Children) *
			Number(quantity_Children);

		var discountedAmount =
			Number(price_adults_fn + price_children_fn) *
			Number(CouponDiscount / 100).toFixed(2) *
			-1;

		var TransportationFees =
			Number(chosenBusStationDetails.price) *
			(Number(quantity_Adults) + Number(quantity_Children));

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

		return Number(
			price_adults_fn +
				price_children_fn +
				TransportationFees +
				discountedAmount +
				totalOtionsPrice,
		).toFixed(2);
	};

	return (
		<BookNowGeneralWrapper dir='rtl'>
			<h1 className='titleBookNow my-3'>احجز مقعدك الآن مع خان خديجة</h1>
			{/* <div className='horizline col-md-3 mx-auto my-3'></div> */}
			<Collapse
				style={{
					background: "white",
					borderRadius: "20px",
					// border: "1px red solid",
				}}
				className='col-md-6 mx-auto'
				accordion>
				<Panel
					showArrow={true}
					collapsible
					style={{
						textAlign: "center",
						border: "6px var(--orangePrimary) solid",
						borderRadius: "20px 20px 0px 0px",
					}}
					header={
						<span
							// className='mx-auto'
							style={{
								fontWeight: "bold",
								color: "black",
								textTransform: "capitalize",
							}}>
							{serviceDetails ? (
								<span>
									<img
										src={TicketIcon}
										alt='Khan Khadija'
										className='BookingIcons'
									/>
									<span className='mr-2 mainTitles' style={{ float: "right" }}>
										{serviceDetails.serviceName_Arabic}
									</span>
								</span>
							) : (
								<span>
									<img
										src={TicketIcon}
										alt='Khan Khadija'
										className='BookingIcons'
									/>
									<span
										className='mr-2 mainTitles'
										style={{ float: "right", fontWeight: "lighter" }}>
										الرجاء تحديد تذكرة
									</span>
								</span>
							)}
						</span>
					}>
					<select
						onChange={handleChosenService_Package}
						placeholder='Select a Ticket'
						className=' mb-3 col-md-10 mx-auto my-1'
						style={{
							paddingTop: "12px",
							paddingBottom: "12px",
							// paddingRight: "50px",
							// textAlign: "center",
							border: "#cfcfcf solid 1px",
							borderRadius: "10px",
							fontSize: "0.9rem",
							// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
							textTransform: "capitalize",
						}}>
						{chosenService_Package &&
						chosenService_Package !== "الرجاء اختيار تذكرة" ? (
							<option
								className='items text-muted inputFields'
								style={{ textTransform: "capitalize" }}>
								{chosenService_Package}
							</option>
						) : (
							<option className='items text-muted inputFields'>
								الرجاء اختيار تذكرة
							</option>
						)}

						{allTickets &&
							allTickets.map((t, i) => (
								<option
									key={i}
									value={t.serviceName}
									className='items'
									style={{ textTransform: "capitalize", fontWeight: "bold" }}
									onChange={() => setServiceDetails(i)}>
									{t.serviceName_Arabic} {`(${t.servicePriceDiscount} جنيه)`}
								</option>
							))}
					</select>
					{serviceDetails ? (
						<div
							className='text-capitalize'
							dir='rtl'
							style={serviceDetails ? mountedStyle : unmountedStyle}
							// style={{ marginLeft: "26%" }}
						>
							<h1 style={{ fontSize: "1.1rem" }}>وصف التذكرة:</h1>
							<div>
								{serviceDetails && serviceDetails.serviceDescription_Arabic}
							</div>
							<div>
								{serviceDetails && serviceDetails.serviceDescription2_Arabic}
							</div>
							<div>
								{serviceDetails && serviceDetails.serviceDescription3_Arabic}
							</div>
							<div>
								{serviceDetails && serviceDetails.serviceDescription4_Arabic}
							</div>
							{serviceDetails && serviceDetails.serviceDescription5_Arabic ? (
								<div>
									{serviceDetails && serviceDetails.serviceDescription5_Arabic}
								</div>
							) : null}
							{serviceDetails && serviceDetails.serviceDescription6_Arabic ? (
								<div>
									{serviceDetails && serviceDetails.serviceDescription6_Arabic}
								</div>
							) : null}
							{serviceDetails && serviceDetails.serviceDescription7_Arabic ? (
								<div>
									{serviceDetails && serviceDetails.serviceDescription7_Arabic}
								</div>
							) : null}
							{serviceDetails && serviceDetails.serviceDescription8_Arabic ? (
								<div>
									{serviceDetails && serviceDetails.serviceDescription8_Arabic}
								</div>
							) : null}
							<h1 style={{ fontSize: "1.1rem" }} className='mt-2'>
								السعر:
							</h1>
							<div>
								{serviceDetails.servicePrice ===
								serviceDetails.servicePriceDiscount ? (
									<div
										className='mb-2'
										style={{
											fontSize: "17px",
											fontWeight: "bold",
											textAlign: "center",
											textTransform: "capitalize",
										}}>
										سعر التذكرة (الكبار): {serviceDetails.servicePriceDiscount}{" "}
										جنيه
									</div>
								) : (
									<div
										className='mb-2'
										style={{
											fontSize: "17px",
											fontWeight: "bold",
											textAlign: "center",
											textTransform: "capitalize",
										}}>
										سعر التذكرة (الكبار):{" "}
										<s style={{ color: "red" }}>
											{" "}
											{serviceDetails.servicePrice} جنيه
										</s>{" "}
										<span className='mr-1'>
											{" "}
											{serviceDetails.servicePriceDiscount} جنيه
										</span>
									</div>
								)}

								{serviceDetails.servicePrice_Children ===
								serviceDetails.servicePriceDiscount_Children ? (
									<div
										className='mb-2'
										style={{
											fontSize: "17px",
											fontWeight: "bold",
											textAlign: "center",
											textTransform: "capitalize",
										}}>
										سعر التذكرة (للاطفال):{" "}
										{serviceDetails.servicePriceDiscount_Children} جنيه
									</div>
								) : (
									<div
										className='mb-2'
										style={{
											fontSize: "17px",
											fontWeight: "bold",
											textAlign: "center",
											textTransform: "capitalize",
										}}>
										سعر التذكرة (للاطفال):{" "}
										<s style={{ color: "red" }}>
											{" "}
											{serviceDetails.servicePrice_Children} جنيه
										</s>{" "}
										<span className='mr-1'>
											{" "}
											{serviceDetails.servicePriceDiscount_Children} جنيه
										</span>
									</div>
								)}
							</div>
						</div>
					) : null}
				</Panel>
				<Panel
					showArrow={true}
					collapsible
					style={{
						textAlign: "center",
						border: "6px var(--orangePrimary) solid",
						borderRadius: "0px 0px 0px 0px",
						marginTop: "-5px",
					}}
					header={
						<span
							// className='mx-auto'
							style={{
								fontWeight: "bold",
								color: "black",
								textTransform: "capitalize",
							}}>
							{chosenDate ? (
								<span>
									<img
										src={DateIcon}
										alt='Khan Khadija'
										className='BookingIcons'
									/>
									<span className='mr-2 mainTitles' style={{ float: "right" }}>
										التاريخ: {dateFormat(chosenDate)}
									</span>
								</span>
							) : (
								<span>
									<img
										src={DateIcon}
										alt='Khan Khadija'
										className='BookingIcons'
									/>
									<span
										className='mr-2  mainTitles'
										style={{ float: "right", fontWeight: "lighter" }}>
										يرجى تحديد التاريخ
									</span>
								</span>
							)}
						</span>
					}>
					<DatePicker
						className='inputFields'
						onChange={(date) => {
							setChosenDate(
								new Date(date._d).toLocaleDateString("en-US", {
									timeZone: "Africa/Cairo",
								}) || date._d,
							);
							ReactGA.event({
								category: "Date Was Filled For Reservation",
								action: `Date Was Filled From Home Page ${new Date(
									date._d,
								).toLocaleDateString("en-US", {
									timeZone: "Africa/Cairo",
								})}`,
								label: "User Filled In Scheduling Date",
							});
						}}
						disabledDate={disabledDate}
						max
						size='small'
						showToday={false}
						defaultValue={moment(
							new Date().toLocaleDateString("en-US", {
								timeZone: "Africa/Cairo",
							}),
						)}
						placeholder='Please pick the desired schedule date'
						style={{
							height: "auto",
							width: "85%",
							marginBottom: "30px",
							padding: "10px",
							// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
							borderRadius: "10px",
						}}
					/>
				</Panel>

				<Panel
					showArrow={true}
					collapsible
					style={{
						textAlign: "center",
						border: "6px var(--orangePrimary) solid",
						borderRadius: "0px 0px 0px 0px",
						marginTop: "-5px",
					}}
					header={
						<span
							// className='mx-auto'
							style={{
								fontWeight: "bold",
								color: "black",
								textTransform: "capitalize",
							}}>
							<img
								src={PhoneIcon}
								alt='Khan Khadija'
								className='BookingIcons'
							/>

							<span
								className='mr-2 mainTitles'
								style={{ float: "right", fontWeight: "lighter" }}>
								{chosenCoupon
									? `الكوبون: ${chosenCoupon}`
									: "		ادخال كود الكوبون"}
							</span>
						</span>
					}>
					<div className='mx-auto '>
						<input
							style={{
								paddingTop: "12px",
								paddingBottom: "12px",
								// paddingRight: "140px",
								// textAlign: "center",
								border: "#cfcfcf solid 1px",
								borderRadius: "10px",
								width: "75%",
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
							<div className='coupon-available'>تم تطبيق الكوبون بنجاح</div>
						)}
						{!availableCoupon && chosenCoupon && (
							<div className='coupon-unavailable'>
								عذرا ، هذا الكوبون غير متوفر أو منتهي الصلاحية.
							</div>
						)}
					</div>
				</Panel>

				<Panel
					showArrow={true}
					collapsible
					style={{
						textAlign: "center",
						border: "6px var(--orangePrimary) solid",
						borderRadius: "0px 0px 0px 0px",
						marginTop: "-5px",
					}}
					header={
						<span
							// className='mx-auto'
							style={{
								fontWeight: "bold",
								color: "black",
								textTransform: "capitalize",
							}}>
							<img
								src={TicketCountIcon}
								alt='Khan Khadija'
								className='BookingIcons'
							/>
							<span
								className='mr-2 mainTitles'
								style={{ float: "right", fontWeight: "lighter" }}>
								{quantity_Children && quantity_Adults
									? `عدد الكبار: ${quantity_Adults}, عدد الأطفال: ${quantity_Children}`
									: "عدد التذاكر"}
							</span>
						</span>
					}>
					<div className='row'>
						<div
							className={
								serviceDetails.option1_Active ? "col-md-6 mt-3" : "col-md-11"
							}>
							<div className='col-md-10 mx-auto my-1'>
								<label
									className='textResizeMain2'
									style={{
										fontWeight: "bold",
										fontSize: "1rem",
										color: "#00407f",
									}}>
									عدد التذاكر (الكبار):
								</label>

								<input
									type='number'
									className='form-control w-75 mx-auto'
									value={quantity_Adults}
									onChange={handleQuantityAdults}
									placeholder='(**Required)'
								/>
							</div>

							<div className='col-md-10 mx-auto my-1'>
								<label
									className='textResizeMain2'
									style={{
										fontWeight: "bold",
										fontSize: "1rem",
										color: "#00407f",
									}}>
									عدد التذاكر (للأطفال):
								</label>

								<input
									type='number'
									className='form-control w-75 mx-auto'
									value={quantity_Children}
									onChange={handleQuantityChildren}
									placeholder='(**Required)'
								/>
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

							<div className='col-md-10 mx-auto my-1'>
								{busStationName &&
									chosenBusStationDetails &&
									busStationName !== "no bus needed" &&
									busStationName !== "NO BUS NEEDED" && (
										<div className=' mx-auto'>
											<label
												className='textResizeMain2'
												style={{
													fontWeight: "bold",
													fontSize: "1rem",
													color: "#00407f",
												}}>
												المواعيد المتاحة لرحلة {busStationName}
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
														يرجى تحديد (مطلوب)
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
						</div>
						{serviceDetails.option1_Active ? (
							<div
								className='col-md-6'
								style={{ marginTop: "20px", color: "#00407f" }}>
								<span
									style={{
										fontWeight: "bold",
										fontSize: "1rem",
									}}>
									اختياري*
								</span>
								<span
									className='mr-2'
									style={{
										fontSize: "12px",
										color: "red",
										fontWeight: "bolder",
									}}>
									ستضاف إلى فاتورتك
								</span>
								<br />
								{(serviceDetails.option1_Active &&
									serviceDetails.option2_Active &&
									!serviceDetails.option3_Active &&
									!serviceDetails.option4_Active) ||
								(serviceDetails.option1_Active &&
									!serviceDetails.option2_Active &&
									!serviceDetails.option3_Active &&
									!serviceDetails.option4_Active) ? null : (
									<button
										style={{
											border: "1px solid var(--mainBlue)",
											background: "var(--orangePrimary)",
											color: "black",
											// fontWeight: "bold",
											cursor: "pointer",
										}}
										onClick={() => setDisplayOptions(!displayOptions)}>
										{" "}
										{displayOptions
											? "إخفاء الاختيارات"
											: "	عرض الاختيارات المتاحة"}
									</button>
								)}

								{displayOptions ? (
									<Fragment>
										<div className='col-md-10 mx-auto my-1'>
											<label
												className='textResizeMain2'
												style={{
													fontWeight: "bold",
													fontSize: "1rem",
													color: "#00407f",
												}}>
												كم العدد {serviceDetails.option1_Arabic}
											</label>

											<input
												type='number'
												className='form-control w-75 mx-auto'
												value={option1Count}
												onChange={handleOption1Count}
											/>
											{Number(option1Count) > 0 ? (
												<div style={{ color: "grey" }}>
													{Number(option1Count) *
														Number(serviceDetails.option1_Price)}{" "}
													جنيه
												</div>
											) : null}
										</div>
										{serviceDetails.option2_Active ? (
											<div className=''>
												<div className='col-md-10 mx-auto my-1'>
													<label
														className='textResizeMain2'
														style={{
															fontWeight: "bold",
															fontSize: "1rem",
															color: "#00407f",
														}}>
														كم العدد {serviceDetails.option2_Arabic}
													</label>

													<input
														type='number'
														className='form-control w-75 mx-auto'
														value={option2Count}
														onChange={handleOption2Count}
													/>
													{Number(option2Count) > 0 ? (
														<div style={{ color: "grey" }}>
															{Number(option2Count) *
																Number(serviceDetails.option2_Price)}{" "}
															جنيه
														</div>
													) : null}
												</div>
											</div>
										) : null}

										{serviceDetails.option3_Active ? (
											<div className=''>
												<div className='col-md-10 mx-auto my-1'>
													<label
														className='textResizeMain2'
														style={{
															fontWeight: "bold",
															fontSize: "1rem",
															color: "#00407f",
														}}>
														كم العدد {serviceDetails.option3_Arabic}
													</label>

													<input
														type='number'
														className='form-control w-75 mx-auto'
														value={option3Count}
														onChange={handleOption3Count}
													/>
													{Number(option3Count) > 0 ? (
														<div style={{ color: "grey" }}>
															{Number(option3Count) *
																Number(serviceDetails.option3_Price)}{" "}
															جنيه
														</div>
													) : null}
												</div>
											</div>
										) : null}

										{serviceDetails.option4_Active ? (
											<div className=''>
												<div className='col-md-10 mx-auto my-1'>
													<label
														className='textResizeMain2'
														style={{
															fontWeight: "bold",
															fontSize: "1rem",
															color: "#00407f",
														}}>
														كم العدد {serviceDetails.option4_Arabic}?
													</label>

													<input
														type='number'
														className='form-control w-75 mx-auto'
														value={option4Count}
														onChange={handleOption4Count}
													/>

													{Number(option4Count) > 0 ? (
														<div style={{ color: "grey" }}>
															{Number(option4Count) *
																Number(serviceDetails.option4_Price)}{" "}
															جنيه
														</div>
													) : null}
												</div>
											</div>
										) : null}
										{(serviceDetails.option1_Active &&
											serviceDetails.option2_Active &&
											!serviceDetails.option3_Active &&
											!serviceDetails.option4_Active) ||
										(serviceDetails.option1_Active &&
											!serviceDetails.option2_Active &&
											!serviceDetails.option3_Active &&
											!serviceDetails.option4_Active) ? (
											<div
												className='mx-auto mt-3'
												style={{
													fontSize: "1.3rem",
													fontWeight: "bold",
													color: "var(--mainBlue)",
													textAlign: "center",
												}}>
												المبلغ الإجمالي:{" "}
												{totalPriceBeforeDiscount() ===
												totalPriceAfterDiscount() ? (
													<span style={{ color: "green", fontWeight: "bold" }}>
														{totalPriceAfterDiscount()} جنيه
													</span>
												) : (
													<span style={{ color: "green", fontWeight: "bold" }}>
														<s style={{ color: "red", fontWeight: "bold" }}>
															{totalPriceBeforeDiscount()} جنيه
														</s>{" "}
														{totalPriceAfterDiscount()} جنيه
													</span>
												)}{" "}
											</div>
										) : null}
									</Fragment>
								) : null}
							</div>
						) : null}

						{(serviceDetails &&
							serviceDetails.option1_Active &&
							serviceDetails.option2_Active &&
							serviceDetails.option3_Active) ||
						(serviceDetails &&
							!serviceDetails.option1_Active &&
							!serviceDetails.option2_Active &&
							!serviceDetails.option3_Active &&
							!serviceDetails.option4_Active) ? (
							<div
								className='mx-auto mt-3'
								style={{
									fontSize: "1.3rem",
									fontWeight: "bold",
									color: "var(--mainBlue)",
									textAlign: "center",
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
									</span>
								)}{" "}
							</div>
						) : null}
					</div>
				</Panel>
			</Collapse>

			<div
				className='mx-auto text-center mt-1 col-md-6 bookNowBtn'
				style={{
					textAlign: "center",
					border: "6px var(--orangePrimary) solid",
					borderRadius: "0px 0px 20px 20px",
					marginTop: "-5px",
					background: "var(--mainBlue)",
				}}>
				{chosenService_Package ? (
					<Link
						to={`/book-now/${chosenService_Package.split(" ").join("-")}`}
						onClick={() => {
							const reservationData = {
								fullName: fullName,
								countryCallingCode: countryCallingCode,
								phoneNumber: phoneNumber,
								chosenBusStationDetails: chosenBusStationDetails
									? chosenBusStationDetails
									: chosenBusStationDetails,
								busStationChosenTime: busStationChosenTime,
								option1Count: option1Count ? option1Count : 0,
								option2Count: option2Count ? option2Count : 0,
								option3Count: option3Count ? option3Count : 0,
								option4Count: option4Count ? option4Count : 0,
								totalPriceAfterDiscount: totalPriceAfterDiscount()
									? totalPriceAfterDiscount()
									: 0,
								totalPriceBeforeDiscount: totalPriceBeforeDiscount()
									? totalPriceBeforeDiscount()
									: 0,
								userEmail: userEmail,
								serviceDetails: serviceDetails,
								chosenService_Package: chosenService_Package,
								chosenDate: chosenDate
									? chosenDate
									: new Date().toLocaleDateString("en-US", {
											timeZone: "Africa/Cairo",
									  }),
								quantity_Children: quantity_Children ? quantity_Children : 0,
								quantity_Adults: quantity_Adults ? quantity_Adults : 1,
								chosenCoupon: chosenCoupon,
								chosenCouponDetails: chosenCouponDetails,
								currentPage: 1,
							};
							localStorage.setItem(
								"reservationData",
								JSON.stringify(reservationData),
							);
							window.scrollTo({ top: 300, behavior: "smooth" });
							ReactGA.event({
								category: "Booked Now Button Was Clicked From Home Page",
								action: `Booked Now Button Was Clicked From The Form With Orange in the home page`,
								label: "Booked Now Was Clicked",
							});
						}}
						className='btn btn-block'>
						احجز الآن!
					</Link>
				) : (
					<Link
						to='/listings'
						onClick={() => {
							window.scrollTo({ top: 300, behavior: "smooth" });
						}}
						className='btn btn-block'>
						احجز الآن!
					</Link>
				)}
			</div>
		</BookNowGeneralWrapper>
	);
};

export default BookNowGeneral_Arabic;

const BookNowGeneralWrapper = styled.div`
	font-family: "Droid Arabic Kufi";
	margin-top: 40px;

	.titleBookNow {
		text-align: center;
		font-size: 1.3rem;
		font-weight: bolder;
		/* letter-spacing: 2px; */
		color: var(--mainBlue);
	}

	.horizline {
		border: 2px grey solid;
	}

	svg {
		color: white !important;
		margin-left: 10px;
		float: right;
		display: none;
	}

	/* .countryCodePhone {
		margin-left: 50px;
	} */

	.BookingIcons {
		height: 4%;
		width: 4%;
		float: right;
		margin: 0px !important;
		padding: 0px !important;
	}

	.bookNowBtn,
	a {
		color: white;
		font-size: 1.2rem;
		font-weight: bold;
	}

	.bookNowBtn:hover {
		background: var(--orangePrimary) !important;
		transition: 0.5s;
	}

	.bookNowBtn {
		transition: 0.5s;
	}

	@media (max-width: 1000px) {
		margin-left: 30px;
		margin-right: 30px;

		img {
			width: 7% !important;
			height: 7% !important;
		}

		/* .countryCodePhone {
			margin: 6px 35px;
		} */

		.mainTitles {
			font-size: 0.8rem;
		}
	}
`;
