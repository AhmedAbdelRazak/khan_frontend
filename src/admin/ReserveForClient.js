/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../auth";
import Adminsidebar from "./AdminSideBar/Adminsidebar";
import DarkBG from "./AdminSideBar/DarkBG";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "antd/dist/antd.min.css";
import FormStep1 from "./ReserveNow/FormStep1";
import FormStep2 from "./ReserveNow/FormStep2";
import FormStep3 from "./ReserveNow/FormStep3";
import ReactGA from "react-ga";
import {
	getTickets,
	getTicketsManagement,
	allLoyaltyPointsAndStoreStatus,
	getPreviousBookings,
} from "../apiCore";
import {
	getCoupons,
	getBusStations,
	createReservationDataEntry,
} from "./apiAdmin";

const ReserveForClient = ({ match }) => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);
	const [allTickets, setAllTickets] = useState([]);
	const [ticketsManagement, setTicketsManagement] = useState([]);
	const [allCoupons, setCoupons] = useState([]);
	const [busStations, setBusStations] = useState([]);
	const [chosenDate, setChosenDate] = useState("");
	const [chosenCouponDetails, setChosenCouponDetails] = useState({});
	const [chosenBusStationDetails, setChosenBusStationsDetails] = useState({
		_id: "62859115e6e76c6625432018",
		address: "NO BUS NEEDED",
		price: 0,
		times: ["00:00", "00:15"],
		createdAt: "2022-05-19T00:36:37.593+00:00",
		updatedAt: "2022-05-19T00:36:37.593+00:00",
	});
	const [busStationChosenTime, setBusStationChosenTime] = useState("");
	const [reservationStatus, setReservationStatus] = useState("Not Paid");
	const [chosenService_Package, setChosenService_Package] = useState("");
	const [phone, setPhone] = useState("");
	const [countryCallingCode, setCountryCallingCode] = useState("+2");
	const [quantity, setQuantity] = useState(1);
	const [quantity_Children, setQuantity_Children] = useState(0);
	const [fullName, setFullName] = useState("");
	const [serviceDetails, setServiceDetails] = useState("");
	const [scheduledByUserEmail, setScheduledByUserEmail] = useState("");
	const [appointmentComment, setAppointmentComment] = useState("");
	const [event_ocassion, setEvent_ocassion] = useState("Day Use");
	const [chosenCoupon, setChosenCoupon] = useState("");
	const [totalAmount, setTotalAmount] = useState(0);
	const [totalAmountBeforeDiscount, setTotalAmountBeforeDiscount] = useState(0);
	const [HistBookings, setHistBookings] = useState([]);
	// eslint-disable-next-line
	const [loading, setLoading] = useState(false);
	const [
		alreadySetLoyaltyPointsManagement,
		setAlreadySetLoyaltyPointsManagement,
	] = useState("");
	const [availableCoupon, setAvailableCoupon] = useState(false);
	const [busStationName, setBusStationName] = useState("");
	const [option1Count, setOption1Count] = useState(0);
	const [option2Count, setOption2Count] = useState(0);
	const [option3Count, setOption3Count] = useState(0);
	const [option4Count, setOption4Count] = useState(0);
	const [reservationBelongsTo, setReservationBelongsTo] = useState(
		"Semi Colon and Infinite-Apps",
	);

	var days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

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

	var today = new Date().toLocaleDateString("en-US", {
		timeZone: "Africa/Cairo",
	});
	var tomorrow = new Date(today);
	var yesterday = new Date(today);

	tomorrow.setDate(yesterday.getDate() + 1);

	//Admin Auth
	// eslint-disable-next-line
	const { user, token } = isAuthenticated();

	useEffect(() => {
		setClickMenu2(click2);
	}, [click2, clickMenu2]);

	const settingChosenPackage = () => {
		getTickets().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				const serviceNameParams =
					match.params.ticketName.split("-").join(" ") &&
					match.params.ticketName.split("-").join(" ").toLowerCase();

				setChosenService_Package(serviceNameParams);
				const indexOfService =
					serviceNameParams &&
					data &&
					data
						.map((service) => service.serviceName.toLowerCase())
						.indexOf(serviceNameParams.toLowerCase());

				const chosenServiceDetails =
					serviceNameParams && data && indexOfService && indexOfService === 0
						? data[indexOfService]
						: data[indexOfService];

				setServiceDetails(chosenServiceDetails);
			}
		});
	};

	useEffect(() => {
		settingChosenPackage();
		// eslint-disable-next-line
	}, []);

	// eslint-disable-next-line
	var role =
		isAuthenticated() && isAuthenticated().user && isAuthenticated().user.role;

	// console.log(role, "role");

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

	// console.log(HistBookings, "HistBooking");

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
		gettingAllTickets();
		gettingAllTicketsManagement();
		gettingPreviousLoyaltyPointsManagement();
		loadingHistReservations();
		loadAllCoupons();
		loadAllBusStations();
		// eslint-disable-next-line
	}, [chosenDate, chosenService_Package]);

	// console.log(allCoupons, "allCoupons");

	useEffect(() => {
		settingChosenPackage();
		// eslint-disable-next-line
	}, []);

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

	// console.log(ticketsManagement, "ticketsManagement");
	// console.log(availableTickets(), "AvailableTickets");

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

	const clickSubmitSchedule_NoPayment = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		if (!chosenService_Package) {
			return toast.error(`Please select a package`);
		}

		if (storeClosed_NotClosedCustomized || storeClosed_NotClosed) {
			return toast.error(
				`Khan Khadija is closed on the selected date, Please choose another date`,
			);
		}
		// console.log("scheduleSubmitted");

		if (!fullName) {
			return toast.error("Please Fill in Your Full Name");
		}

		if (!phone) {
			return toast.error("Please Fill in Your Phone #...");
		}
		if (phone.length !== 11) {
			return toast.error("Your Phone Number Should Be 11 Digits");
		}

		if (!countryCallingCode) {
			return toast.error("Please add country calling code");
		}

		if (!quantity || quantity <= 0) {
			return toast.error("Please add tickets quantity");
		}

		if (quantity_Children < 0) {
			return toast.error("Quantity Should be 0 Or More Than 0");
		}

		if (Number(quantity) + Number(quantity_Children) > availableTickets()) {
			return toast.error(
				"No enough tickets are available, please choose another reservation date and try again",
			);
		}

		if (!busStationChosenTime) {
			return toast.error("Please add time for bus station pickup");
		}

		if (!chosenDate) {
			return toast.error("Please add Scheduled On Date");
		}

		const bookedByUser =
			isAuthenticated() &&
			isAuthenticated().user &&
			isAuthenticated().user.name;

		const createOrderData = {
			fullName: fullName,
			scheduledByUserEmail: scheduledByUserEmail,
			phoneNumber: countryCallingCode + phone,
			countryCallingCode: countryCallingCode,
			quantity: quantity,
			quantity_Children: quantity_Children ? quantity_Children : 0,
			event: event_ocassion ? event_ocassion : "Not Added",
			appointmentComment: appointmentComment,
			chosenService_Package: chosenService_Package,
			chosenServiceDetails: serviceDetails,
			chosenPackage_Stock: ticketsManagement ? ticketsManagement : null,
			scheduledDate: chosenDate,
			status: reservationStatus,
			bookedFrom: bookedByUser
				? `Booked By Clerk ${bookedByUser} (Data Entry)`
				: "Online",
			chosenCoupon: chosenCouponDetails,
			availableCoupon: availableCoupon,
			chosenBusStation: chosenBusStationDetails,
			chosenBusStationTime:
				chosenBusStationDetails.address === "NO BUS NEEDED"
					? "00:00"
					: busStationChosenTime,
			bookingSource: bookedByUser
				? `Booked By Clerk ${bookedByUser} (Data Entry)`
				: "Online",
			totalAmount: totalAmount,
			totalAmountBeforeDiscount: totalAmountBeforeDiscount,
			option1Count: option1Count,
			option2Count: option2Count,
			option3Count: option3Count,
			option4Count: option4Count,
			reservationBelongsTo: reservationBelongsTo
				? reservationBelongsTo
				: "Semi Colon and Infinite-Apps",
		};

		createReservationDataEntry(createOrderData).then((response) => {
			// console.log(response);
			// console.log("schedule booked");

			window.scrollTo({ top: 0, behavior: "smooth" });
			toast.success("Your Ticket Was Successfully Booked");
			// window.location.reload(false);
		});
		return setTimeout(function () {
			window.location.reload(false);
		}, 1500);
	};

	return (
		<ReserveForClientWrapper>
			{click2 && clickMenu2 ? (
				<DarkBG setClick2={setClick2} setClickMenu2={setClickMenu2} />
			) : null}
			<div className='mx-auto'>
				<Adminsidebar
					click2={click2}
					setClick2={setClick2}
					clickMenu2={clickMenu2}
					setClickMenu2={setClickMenu2}
				/>
			</div>
			<div className='mt-5 mx-auto text-center'>
				<FormStep1
					chosenDate={chosenDate}
					setChosenDate={setChosenDate}
					HistBookings={HistBookings && HistBookings}
					chosenService_Package={chosenService_Package}
					setChosenService_Package={setChosenService_Package}
					serviceDetails={serviceDetails}
					setServiceDetails={setServiceDetails}
					reservationStatus={reservationStatus}
					setReservationStatus={setReservationStatus}
					allServices={allTickets}
					alreadySetLoyaltyPointsManagement={alreadySetLoyaltyPointsManagement}
					storeClosed_NotClosed={storeClosed_NotClosed}
					storeClosed_NotClosedCustomized={storeClosed_NotClosedCustomized}
					availableTickets={availableTickets}
					availableCoupon={availableCoupon}
					chosenCoupon={chosenCoupon}
					setChosenCoupon={setChosenCoupon}
					allCoupons={allCoupons}
					chosenCouponDetails={chosenCouponDetails}
					setChosenCouponDetails={setChosenCouponDetails}
					busStations={busStations}
					chosenBusStationDetails={chosenBusStationDetails}
					setChosenBusStationsDetails={setChosenBusStationsDetails}
					busStationChosenTime={busStationChosenTime}
					setBusStationChosenTime={setBusStationChosenTime}
					quantity={quantity}
					setQuantity={setQuantity}
					quantity_Children={quantity_Children}
					setQuantity_Children={setQuantity_Children}
					busStationName={busStationName}
					setBusStationName={setBusStationName}
					option1Count={option1Count}
					option2Count={option2Count}
					option3Count={option3Count}
					option4Count={option4Count}
					setOption1Count={setOption1Count}
					setOption2Count={setOption2Count}
					setOption3Count={setOption3Count}
					setOption4Count={setOption4Count}
				/>
			</div>

			<div className='mt-5'>
				<FormStep2
					fullName={fullName}
					setFullName={setFullName}
					scheduledByUserEmail={scheduledByUserEmail}
					setScheduledByUserEmail={setScheduledByUserEmail}
					phone={phone}
					countryCallingCode={countryCallingCode}
					setCountryCallingCode={setCountryCallingCode}
					setPhone={setPhone}
					event_ocassion={event_ocassion}
					setEvent_ocassion={setEvent_ocassion}
					serviceDetails={serviceDetails}
				/>
			</div>

			<div className='my-5'>
				<FormStep3
					appointmentComment={appointmentComment}
					setAppointmentComment={setAppointmentComment}
					fullName={fullName}
					scheduledByUserEmail={scheduledByUserEmail}
					phone={phone}
					chosenDate={chosenDate}
					event_ocassion={event_ocassion}
					chosenService_Package={chosenService_Package}
					serviceDetails={serviceDetails}
					chosenPackage_Stock={ticketsManagement}
					countryCallingCode={countryCallingCode}
					quantity={quantity}
					quantity_Children={quantity_Children}
					chosenBusStationPrice={chosenBusStationDetails}
					chosenCouponDetails={chosenCouponDetails}
					totalAmount={totalAmount}
					totalAmountBeforeDiscount={totalAmountBeforeDiscount}
					setTotalAmount={setTotalAmount}
					setTotalAmountBeforeDiscount={setTotalAmountBeforeDiscount}
					option1Count={option1Count}
					option2Count={option2Count}
					option3Count={option3Count}
					option4Count={option4Count}
					setOption1Count={setOption1Count}
					setOption2Count={setOption2Count}
					setOption3Count={setOption3Count}
					setOption4Count={setOption4Count}
					busStationChosenTime={busStationChosenTime}
					reservationBelongsTo={reservationBelongsTo}
					setReservationBelongsTo={setReservationBelongsTo}
				/>
			</div>
			<button
				onClick={() => {
					clickSubmitSchedule_NoPayment();

					if (phone.length === 11) {
						ReactGA.event({
							category: "Reserve Now Was Clicked From Data Entry",
							action:
								"A Client Has Successfully Reserved A Day Use From Data Entry",
							label:
								"Ticket Was Successfully Reserved " + chosenService_Package,
							value: totalAmount,
						});
					} else {
						ReactGA.event({
							category: "Reserve Now Was Clicked From Data Entry",
							action:
								"A Client Has Unsuccessfully Reserved A Day Use Because of his phone number",
							label:
								"Ticket Was Unsuccessfully Reserved " + chosenService_Package,
						});
					}
				}}
				className='btn btn-primary btn-block mx-auto'
				type='success'
				style={{
					width: "20%",
					backgroundColor: "var(--mainBlue)",
					color: "white",
					fontWeight: "bold",
					fontSize: "0.9rem",
				}}>
				Reserve Now
			</button>
		</ReserveForClientWrapper>
	);
};

export default ReserveForClient;

const ReserveForClientWrapper = styled.div`
	min-height: 600px;
`;
