/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isAuthenticated } from "../auth";
import {
	readSingleOrder,
	getStatusValues,
	updateOrderStatus,
	UpdateScheduledReservation,
	getTicketsManagement,
	allLoyaltyPointsAndStoreStatus,
	getBusStations,
} from "./apiAdmin";
import moment from "moment";
import { getPreviousBookings, getTickets } from "../apiCore";
import { DatePicker } from "antd";

const SingleReservationPage = (props) => {
	const [loading, setLoading] = useState(true);
	const [singleOrder, setSingleOrder] = useState({});
	const [statusValues, setStatusValues] = useState([]);

	//update the Reservation
	const [allTickets, setAllTickets] = useState([]);
	const [ticketsManagement, setTicketsManagement] = useState([]);
	const [busStations, setBusStations] = useState([]);
	const [chosenDate, setChosenDate] = useState("");
	const [chosenCouponDetails, setChosenCouponDetails] = useState({});
	const [chosenBusStationDetails, setChosenBusStationsDetails] = useState({});
	const [busStationChosenTime, setBusStationChosenTime] = useState("");
	const [chosenService_Package, setChosenService_Package] = useState("");
	const [phone, setPhone] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [quantity_Children, setQuantity_Children] = useState(0);
	const [fullName, setFullName] = useState("");
	const [serviceDetails, setServiceDetails] = useState("");
	const [scheduledByUserEmail, setScheduledByUserEmail] = useState("");
	const [appointmentComment, setAppointmentComment] = useState("");
	const [event_ocassion, setEvent_ocassion] = useState("Day Use");
	const [chosenCoupon, setChosenCoupon] = useState("");
	// eslint-disable-next-line
	const [totalAmount, setTotalAmount] = useState(0);
	// eslint-disable-next-line
	const [totalAmountBeforeDiscount, setTotalAmountBeforeDiscount] = useState(0);
	const [HistBookings, setHistBookings] = useState([]);
	const [
		alreadySetLoyaltyPointsManagement,
		setAlreadySetLoyaltyPointsManagement,
	] = useState("");
	// eslint-disable-next-line
	const [sendOrNot, setsendOrNot] = useState(false);
	const [busStationName, setBusStationName] = useState("");

	//End of Update Reservation
	const { user, token } = isAuthenticated();

	var days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	const loadSingleOrder = (orderId) => {
		setLoading(true);
		readSingleOrder(user._id, token, orderId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setSingleOrder(data);

				setPhone(data.phoneNumber);

				setServiceDetails(data.chosenServiceDetails);
				setChosenService_Package(data.chosenService_Package);

				setQuantity(data.quantity);

				setQuantity_Children(data.quantity_Children);

				setBusStationChosenTime(data.busStationChosenTime);
				setFullName(data.fullName);
				setScheduledByUserEmail(data.scheduledByUserEmail);
				setAppointmentComment(data.appointmentComment);
				setEvent_ocassion(data.event);
				setChosenCoupon(data.chosenCoupon);
				setTotalAmount(data.totalAmount);
				setTotalAmountBeforeDiscount(data.totalAmountBeforeDiscount);
				setChosenDate(moment(new Date(data.scheduledDate))._d);
				setChosenCouponDetails(data.chosenCoupon);
				setChosenBusStationsDetails(data.chosenBusStation);
				setBusStationChosenTime(data.chosenBusStationTime);
				setBusStationName(data.chosenBusStation.address);
				setLoading(false);
			}
		});
	};

	const loadStatusValues = () => {
		getStatusValues(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setStatusValues(data);
			}
		});
	};

	useEffect(() => {
		const orderId = props.match.params.reservationId;
		loadSingleOrder(orderId);
		loadStatusValues();
		// eslint-disable-next-line
	}, []);

	var d = new Date(chosenDate);
	var chosenDateName = days[d.getDay()];

	const gettingAllTickets = () => {
		getTickets().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllTickets(data.filter((i) => i.activeService === true));
			}
		});
	};

	useEffect(() => {
		// eslint-disable-next-line
	}, []);

	// console.log(reservationDataLocalStor, "reservationDataLocalStor");

	const gettingAllTicketsManagement = () => {
		getTicketsManagement().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setTicketsManagement(
					data.filter(
						(ii) =>
							new Date(ii.StockDate).setHours(0, 0, 0, 0) ===
								new Date(chosenDate).setHours(0, 0, 0, 0) &&
							ii.ticket.serviceName === chosenService_Package.toLowerCase(),
					)[0],
				);
			}
		});
	};

	const gettingPreviousLoyaltyPointsManagement = () => {
		allLoyaltyPointsAndStoreStatus().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAlreadySetLoyaltyPointsManagement(data && data[data.length - 1]);
			}
		});
	};

	const loadingHistReservations = () => {
		setLoading(true);
		getPreviousBookings().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setHistBookings(
					data.filter(
						(i) =>
							new Date(i.scheduledDate).setHours(0, 0, 0, 0) ===
								new Date(chosenDate).setHours(0, 0, 0, 0) &&
							i.status !== "Cancelled",
					),
				);
				setLoading(false);
			}
		});
	};

	const loadAllBusStations = () =>
		getBusStations().then((res) => setBusStations(res.data));

	useEffect(() => {
		gettingAllTickets();
		gettingAllTicketsManagement();
		gettingPreviousLoyaltyPointsManagement();
		loadingHistReservations();
		loadAllBusStations();
		// eslint-disable-next-line
	}, [chosenDate, chosenService_Package]);

	const showStatus = (o) => (
		<React.Fragment>
			<div className='form-group'>
				<h3 className='mark mb-4'>Status: {o.status}</h3>
				<select
					className='form-control'
					onChange={(e) => handleStatusChange(e, o._id)}
					style={{
						border: "#cfcfcf solid 1px",
						borderRadius: "10px",
						width: "100%",
						fontSize: "0.9rem",
						boxShadow: "1px 1px 1px 1px rgb(0,0,0,0.1)",
					}}>
					<option>Update Status</option>
					{statusValues.map((status, index) => (
						<option key={index} value={status}>
							{status}
						</option>
					))}
				</select>
			</div>
		</React.Fragment>
	);

	const handleStatusChange = (e, orderId) => {
		updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
			if (data.error) {
				console.log("Status update failed");
			} else {
				window.scrollTo({ top: 0, behavior: "smooth" });
				window.location.reload(false);
			}
		});
	};

	// const showInput = (key, value) => (
	// 	<div className='input-group mb-2 mr-sm-2'>
	// 		<div className='input-group-prepend'>
	// 			<div className='input-group-text'>{key}</div>
	// 		</div>
	// 		<input type='text' value={value} className='form-control' readOnly />
	// 	</div>
	// );

	const updateReservation = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });

		const appointmentData = {
			orderDetails: singleOrder,
			sendOrNot: sendOrNot,
			scheduledByUserEmail: scheduledByUserEmail
				? scheduledByUserEmail
				: singleOrder.scheduledByUserEmail,
			totalAmount: totalPriceAfterDiscount()
				? totalPriceAfterDiscount()
				: singleOrder.totalAmount,
			totalAmountBeforeDiscount: totalPriceBeforeDiscount()
				? totalPriceBeforeDiscount()
				: singleOrder.totalAmountBeforeDiscount,
			chosenServiceDetails: serviceDetails
				? serviceDetails
				: singleOrder.chosenServiceDetails,
			scheduledDate: chosenDate ? chosenDate : singleOrder.scheduledDate,
			chosenBusStation: chosenBusStationDetails
				? chosenBusStationDetails
				: singleOrder.chosenBusStation,
			chosenBusStationTime: busStationChosenTime
				? busStationChosenTime
				: singleOrder.chosenBusStationTime,
			chosenService_Package: chosenService_Package
				? chosenService_Package
				: singleOrder.chosenService_Package,
			quantity: quantity ? quantity : singleOrder.quantity,
			quantity_Children: quantity_Children
				? quantity_Children
				: singleOrder.quantity_Children,
			phoneNumber: phone ? phone : singleOrder.phoneNumber,
			fullName: fullName ? fullName : singleOrder.fullName,
			countryCallingCode: singleOrder.countryCallingCode,
			event: event_ocassion ? event_ocassion : singleOrder.event,
			appointmentComment: appointmentComment
				? appointmentComment
				: singleOrder.appointmentComment,
			chosenPackage_Stock: singleOrder.chosenPackage_Stock,
			bookedFrom: singleOrder.bookedFrom
				? singleOrder.bookedFrom
				: "Updated By An Employee (Scheduled Online)",
			chosenCoupon: chosenCoupon
				? chosenCoupon
				: singleOrder.chosenCoupon
				? singleOrder.chosenCoupon
				: "NoCouponWasAdded",
			availableCoupon: singleOrder.availableCoupon
				? singleOrder.availableCoupon
				: false,
			bookingSource: singleOrder.bookingSource,
		};
		var userId =
			isAuthenticated() && isAuthenticated().user && isAuthenticated().user._id;
		var reservationId = singleOrder._id;

		UpdateScheduledReservation(
			reservationId,
			userId,
			token,
			appointmentData,
		).then((response) => {
			// console.log(response);
			console.log("schedule booked");

			window.scrollTo({ top: 0, behavior: "smooth" });
			localStorage.removeItem("barber");
			// window.location.reload(false);
		});
	};

	const disabledDate = (current) => {
		// Can not select days before today and today
		return current < moment();
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
	};

	var storeClosed_NotClosed =
		alreadySetLoyaltyPointsManagement &&
		alreadySetLoyaltyPointsManagement.daysStoreClosed &&
		alreadySetLoyaltyPointsManagement.daysStoreClosed.length > 0 &&
		alreadySetLoyaltyPointsManagement.daysStoreClosed.indexOf(chosenDateName) >
			-1;

	var storeClosed_NotClosedCustomized =
		alreadySetLoyaltyPointsManagement &&
		alreadySetLoyaltyPointsManagement.datesStoreClosed &&
		alreadySetLoyaltyPointsManagement.datesStoreClosed.length > 0 &&
		alreadySetLoyaltyPointsManagement.datesStoreClosed.indexOf(
			new Date(chosenDate._d || chosenDate).toLocaleDateString(),
		) > -1;

	var availableTickets = () => {
		//Get Array Of All Sold Tickets
		const histBookedTickets =
			HistBookings && HistBookings.map((i) => i.quantity);
		const histBookedTickets_Children =
			HistBookings && HistBookings.map((i) => i.quantity_Children);
		//Get Sum Of All Sold Tickets
		const sum = histBookedTickets.reduce(add, 0); // with initial value to avoid when the array is empty
		const sum_Children = histBookedTickets_Children.reduce(add, 0); // with initial value to avoid when the array is empty
		function add(accumulator, a) {
			return accumulator + a;
		}

		// Check Available Stock added by admin
		const stockInTheChosenDate = ticketsManagement
			? ticketsManagement.TicketAmount
			: alreadySetLoyaltyPointsManagement &&
			  alreadySetLoyaltyPointsManagement.defaultTicketQty;

		//Return the available tickets in the chosen date
		return Number(stockInTheChosenDate) - (Number(sum) + Number(sum_Children));
	};

	const handleScheduledByUserFirstName = (event) => {
		setFullName(event.target.value);
	};

	const handleScheduleByUserEmail = (event) => {
		setScheduledByUserEmail(event.target.value);
	};

	const handlePhone = (event) => {
		setPhone(event.target.value);
	};

	const handleQuantity = (event) => {
		setQuantity(event.target.value);
	};

	const handleEven_Ocassion = (event) => {
		setEvent_ocassion(event.target.value);
	};

	const handleQuantityChildren = (event) => {
		setQuantity_Children(event.target.value);
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
		if (event.target.value.toLowerCase() === "no bus needed") {
			setBusStationChosenTime("00:00");
		}
	};

	const handleBusStationChosenTime = (event) => {
		setBusStationChosenTime(event.target.value);
	};

	const totalPriceBeforeDiscount = () => {
		var price_adults = Number(serviceDetails.servicePrice) * Number(quantity);
		var price_children =
			Number(serviceDetails.servicePrice_Children) * Number(quantity_Children);

		var TransportationFees =
			Number(chosenBusStationDetails.price) *
			(Number(quantity) + Number(quantity_Children));

		setTotalAmountBeforeDiscount(
			Number(price_adults + price_children + TransportationFees).toFixed(2),
		);

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
			Number(chosenBusStationDetails.price) *
			(Number(quantity) + Number(quantity_Children));

		setTotalAmount(
			Number(
				price_adults + price_children + TransportationFees + discountedAmount,
			).toFixed(2),
		);

		return Number(
			price_adults + price_children + TransportationFees + discountedAmount,
		).toFixed(2);
	};

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
		<SingleReservationPageWrapper>
			{loading ? (
				<div>
					<div
						style={{
							fontSize: "2rem",
							textAlign: "center",
							marginTop: "50px",
							color: "darkslategray",
							fontWeight: "bold",
						}}>
						Loading...
					</div>
				</div>
			) : (
				<React.Fragment>
					<div className='row'>
						<div className='col-md-10 mt-3 mx-auto'>
							<Link
								to='/admin/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								<div className='backToAdminDashboard'>
									<i className='fas fa-arrow-alt-circle-left mr-3'></i>
									Back to Admin Dashboard
								</div>
							</Link>
						</div>
						<div className='col-md-8 mx-auto mb-5'>
							<div
								className='mt-3'
								style={{
									border: "3px solid black",
									boxShadow: "4px 4px 2px 2px rgba(0,0,0,0.1)",
								}}>
								<ul className='list-group mb-2'>
									<li className='list-group-item'>{showStatus(singleOrder)}</li>
									{/* {Invoice(o)} */}

									<li className='list-group-item'>
										<strong>
											Payment Status: {singleOrder && singleOrder.status}
										</strong>{" "}
									</li>

									<li className='list-group-item mb-2'>
										<strong>Booked From:</strong>{" "}
										<span
											className='alert alert-info'
											style={{ fontWeight: "bold" }}>
											{singleOrder.bookedFrom}
										</span>
									</li>

									<li
										className='list-group-item'
										style={{
											backgroundColor: "var(--mainBlue)",
											color: "white",
											fontWeight: "bolder",
											letterSpacing: "1px",
											fontSize: "1.1rem",
										}}>
										Total Amount: {singleOrder && singleOrder.totalAmount} L.E.
									</li>

									<li
										className='list-group-item'
										style={{
											backgroundColor: "darkred",
											color: "white",
											fontWeight: "bolder",
											letterSpacing: "1px",
											fontSize: "0.9rem",
										}}>
										Total Amount Before Discount:{" "}
										{singleOrder && singleOrder.totalAmountBeforeDiscount} L.E.
									</li>

									<li
										className='list-group-item'
										style={{
											backgroundColor: "darkgreen",
											color: "white",
											fontWeight: "bolder",
											letterSpacing: "1px",
											fontSize: "0.9rem",
										}}>
										Discounted Amount:{" "}
										{Number(singleOrder.totalAmountBeforeDiscount) -
											Number(singleOrder.totalAmount)}{" "}
										L.E.
									</li>

									<li className='list-group-item'>
										Event Date:{" "}
										{dateFormat(
											new Date(
												singleOrder && singleOrder.scheduledDate,
											).toLocaleString(),
										)}
									</li>

									<li className='list-group-item'>
										Tickets For Adult:{" "}
										<strong>
											{singleOrder && singleOrder.quantity} Individuals
										</strong>
									</li>

									<li className='list-group-item'>
										Tickets For Children:{" "}
										<strong>
											{singleOrder && singleOrder.quantity_Children} Children
										</strong>
									</li>

									{singleOrder.chosenServiceDetails.option1_Active &&
									singleOrder.option1Count > 0 ? (
										<li className='list-group-item'>
											{singleOrder.chosenServiceDetails.option1}:{" "}
											{singleOrder.option1Count} (
											{singleOrder.option1Count *
												singleOrder.chosenServiceDetails.option1_Price}{" "}
											L.E).
										</li>
									) : null}

									{singleOrder.chosenServiceDetails.option2_Active &&
									singleOrder.option2Count > 0 ? (
										<li className='list-group-item'>
											{singleOrder.chosenServiceDetails.option2}:{" "}
											{singleOrder.option2Count} (
											{singleOrder.option2Count *
												singleOrder.chosenServiceDetails.option2_Price}{" "}
											L.E).
										</li>
									) : null}

									{singleOrder.chosenServiceDetails.option3_Active &&
									singleOrder.option3Count > 0 ? (
										<li className='list-group-item'>
											{singleOrder.chosenServiceDetails.option3}:{" "}
											{singleOrder.option3Count} (
											{singleOrder.option3Count *
												singleOrder.chosenServiceDetails.option3_Price}{" "}
											L.E).
										</li>
									) : null}

									{singleOrder.chosenServiceDetails.option4_Active &&
									singleOrder.option4Count > 0 ? (
										<li className='list-group-item'>
											{singleOrder.chosenServiceDetails.option4}:{" "}
											{singleOrder.option4Count} (
											{singleOrder.option4Count *
												singleOrder.chosenServiceDetails.option4_Price}{" "}
											L.E).
										</li>
									) : null}

									<li className='list-group-item'>
										Receipt Number / Invoice Number:{" "}
										{singleOrder && singleOrder._id}
									</li>
									<li className='list-group-item'>
										Ordered by: {singleOrder && singleOrder.fullName}
									</li>
									<li className='list-group-item'>
										Ordered by Email:{" "}
										{singleOrder && singleOrder.scheduledByUserEmail}
									</li>

									<li className='list-group-item'>
										Customer Phone #: +{singleOrder && singleOrder.phoneNumber}
									</li>

									<li className='list-group-item'>
										Customer Comments:{" "}
										{singleOrder && singleOrder.appointmentComment
											? singleOrder.appointmentComment
											: "No Comments Were Added"}
									</li>

									<li className='list-group-item'>
										Paid Transportation Fees:{" "}
										{singleOrder &&
											singleOrder.chosenBusStation &&
											singleOrder.chosenBusStation.price}{" "}
										L.E.
									</li>

									{/* <li className="list-group-item">
                    First Purchase: {singleOrder && singleOrder.appliedCouponData===null && }
                  </li> */}

									<li className='list-group-item'>
										Applied Coupon:{" "}
										{singleOrder &&
										singleOrder.chosenCoupon &&
										singleOrder.chosenCoupon.name
											? singleOrder.chosenCoupon.name
											: "No Coupon"}
									</li>

									<li className='list-group-item'>
										Ordered on:{" "}
										{moment(singleOrder && singleOrder.createdAt).fromNow()} (
										{dateFormat(
											new Date(singleOrder.createdAt).toLocaleString(),
										)}
										)
									</li>

									<li className='list-group-item'>
										Event Name: {singleOrder && singleOrder.event}
									</li>

									<li className='list-group-item'>
										Bus Station Address:{" "}
										{singleOrder &&
										singleOrder.chosenBusStation &&
										singleOrder.chosenBusStation.address
											? singleOrder.chosenBusStation.address
											: "Not Determined"}
									</li>

									<li className='list-group-item'>
										Bus Station Chosen Time:{" "}
										{singleOrder && singleOrder.chosenBusStationTime}
									</li>
								</ul>
								<hr />
								<br />
							</div>
						</div>
					</div>
				</React.Fragment>
			)}

			<div>
				<h3
					style={{
						fontWeight: "bold",
						marginBottom: "15px",
						textAlign: "center",
					}}>
					Update Client's Appointment
				</h3>
			</div>

			<div className='col-md-10 mx-auto text-center'>
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
						// paddingRight: "140px",
						// textAlign: "center",
						border: "#cfcfcf solid 1px",
						borderRadius: "10px",
						width: "50%",
						fontSize: "0.9rem",
						// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
						textTransform: "capitalize",
					}}>
					{chosenService_Package &&
					chosenService_Package !== "Select Package" ? (
						<option
							className='items text-muted inputFields'
							style={{ textTransform: "capitalize" }}>
							{chosenService_Package}
						</option>
					) : (
						<option className='items ml-2 text-muted inputFields'>
							Select Package
						</option>
					)}

					{allTickets &&
						allTickets.map((t, i) => (
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
						We are sorry, Khan Khadija Resort is off on the selected date,
						Please try another date.
						<br />
						<br />
					</span>
				) : null}

				{chosenDate && singleOrder && singleOrder.scheduledDate ? (
					<DatePicker
						className='inputFields'
						onChange={(date) => {
							setChosenDate(new Date(date._d).toLocaleDateString() || date._d);
						}}
						disabledDate={disabledDate}
						max
						size='small'
						showToday={true}
						defaultValue={moment(singleOrder.scheduledDate)}
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
				) : null}

				<br />
				<div className='row'>
					<div className='col-md-6 my-2'>
						<label
							className='textResizeMain2'
							style={{
								fontWeight: "bold",
								fontSize: "1rem",
								// color: "#00407f",
							}}>
							Full Name
						</label>

						<input
							type='text'
							className='form-control w-75 mx-auto'
							value={fullName}
							onChange={handleScheduledByUserFirstName}
							placeholder='(**Required)'
							required
						/>
					</div>

					<div className='col-md-6 my-2'>
						<label
							className='textResizeMain2'
							style={{
								fontWeight: "bold",
								fontSize: "1rem",
								// color: "#00407f",
							}}>
							Phone
						</label>

						<input
							type='number'
							className='form-control w-75 mx-auto'
							value={phone}
							onChange={handlePhone}
							placeholder='(**Required)'
							required
						/>
					</div>

					<div className='col-md-6 my-4'>
						<label
							className='textResizeMain2'
							style={{
								fontWeight: "bold",
								fontSize: "1rem",
								// color: "#00407f",
							}}>
							Email
						</label>

						<input
							type='text'
							className='form-control w-75 mx-auto'
							value={scheduledByUserEmail}
							onChange={handleScheduleByUserEmail}
							placeholder='(**Required)'
						/>
					</div>

					<div className='col-md-6 my-3 mx-auto'>
						<label
							className='textResizeMain2'
							style={{
								fontWeight: "bold",
								fontSize: "1rem",
								// color: "#00407f",
							}}>
							Occasion
						</label>
						<br />
						<select
							onChange={handleEven_Ocassion}
							className='inputFields mb-3'
							style={{
								paddingTop: "12px",
								paddingBottom: "12px",
								paddingRight: "130px",
								// textAlign: "center",
								border: "#cfcfcf solid 1px",
								borderRadius: "10px",
								width: "75%",
								fontSize: "0.9rem",
								// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
							}}>
							{event_ocassion && event_ocassion !== "Select An Occasion" ? (
								<option className='items text-muted inputFields'>
									{event_ocassion}
								</option>
							) : (
								<option className='items text-muted inputFields'>
									Select An Occasion
								</option>
							)}
							<option className='items text-muted inputFields' value='Day Use'>
								Day Use
							</option>
							<option className='items text-muted inputFields' value='Birthday'>
								Birthday
							</option>

							<option
								className='items text-muted inputFields'
								value='Graduation'>
								Graduation
							</option>
							<option
								className='items text-muted inputFields'
								value='Engagement'>
								Engagement
							</option>
							<option className='items text-muted inputFields' value='Wedding'>
								Wedding
							</option>
							<option
								className='items text-muted inputFields'
								value='Anniversary'>
								Anniversary
							</option>
							<option
								className='items text-muted inputFields'
								value='Mardi Gras Celebration'>
								Mardi Gras Celebration
							</option>
							<option
								className='items text-muted inputFields'
								value='Christmas Party'>
								Christmas Party
							</option>
							<option
								className='items text-muted inputFields'
								value='New Years Party'>
								New Years Party
							</option>
							<option
								className='items text-muted inputFields'
								value='Company Event'>
								Company Event
							</option>
							<option className='items text-muted inputFields' value='Other'>
								Other
							</option>
						</select>
					</div>

					<div className='col-md-6 my-4'>
						<label
							className='textResizeMain2'
							style={{
								fontWeight: "bold",
								fontSize: "1rem",
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

					<div className='col-md-6 my-4'>
						<label
							className='textResizeMain2'
							style={{
								fontWeight: "bold",
								fontSize: "1rem",
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
					<div className='col-md-6 my-3 mx-auto'>
						<label
							className='textResizeMain2'
							style={{
								fontWeight: "bold",
								fontSize: "1rem",
								// color: "#00407f",
							}}>
							Transportation / Bus Station
						</label>
						<br />
						<select
							onChange={handleChosenBusStation}
							className='inputFields mb-3'
							style={{
								paddingTop: "12px",
								paddingBottom: "12px",
								paddingRight: "130px",
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
									Please Select (Required)
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

					{busStationName &&
						chosenBusStationDetails &&
						busStationName !== "no bus needed" &&
						busStationName !== "NO BUS NEEDED" && (
							<div className='col-md-6 my-3 mx-auto'>
								<label
									className='textResizeMain2'
									style={{
										fontWeight: "bold",
										fontSize: "1rem",
										// color: "#00407f",
									}}>
									Here is "{busStationName}" Station Available Times
								</label>
								<br />
								<select
									onChange={handleBusStationChosenTime}
									className='inputFields mb-3'
									style={{
										paddingTop: "12px",
										paddingBottom: "12px",
										paddingRight: "130px",
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
				<div className='mx-auto col-md-3  mt-3 mb-5'>
					<button
						className='btn btn-primary btn-block'
						onClick={updateReservation}>
						Update Reservation
					</button>
				</div>
			</div>
		</SingleReservationPageWrapper>
	);
};

export default SingleReservationPage;

const SingleReservationPageWrapper = styled.div`
	min-height: 500px;
`;
