/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactGA from "react-ga";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "antd/dist/antd.min.css";
import { Steps, Button, message } from "antd";
import {
	getTickets,
	getTicketsManagement,
	allLoyaltyPointsAndStoreStatus,
	createReservation,
	getPreviousBookings,
} from "../../apiCore";
import { getCoupons, getBusStations } from "../../admin/apiAdmin";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import PackagePhotos from "./PackagePhotos";
const { Step } = Steps;

const BookNow = ({ match }) => {
	const [current, setCurrent] = useState(0);
	// eslint-disable-next-line
	const [reservationDataLocalStor, setReservationDataLocalStor] = useState({});
	const [allTickets, setAllTickets] = useState([]);
	const [ticketsManagement, setTicketsManagement] = useState([]);
	const [allCoupons, setCoupons] = useState([]);
	const [busStations, setBusStations] = useState([]);
	const [chosenDate, setChosenDate] = useState("");
	const [chosenCouponDetails, setChosenCouponDetails] = useState({});
	const [chosenBusStationDetails, setChosenBusStationsDetails] = useState({});
	const [busStationChosenTime, setBusStationChosenTime] = useState("");
	const [chosenService_Package, setChosenService_Package] = useState("");
	const [phone, setPhone] = useState("");
	const [countryCallingCode, setCountryCallingCode] = useState("+2");
	const [quantity, setQuantity] = useState(1);
	const [quantity_Children, setQuantity_Children] = useState(0);
	const [fullName, setFullName] = useState("");
	const [serviceDetails, setServiceDetails] = useState("");
	const [scheduledByUserEmail, setScheduledByUserEmail] = useState("");
	const [appointmentComment, setAppointmentComment] = useState("");
	const [event_ocassion, setEvent_ocassion] = useState("");
	const [chosenCoupon, setChosenCoupon] = useState("");
	const [HistBookings, setHistBookings] = useState([]);
	const [loading, setLoading] = useState(false);
	const [
		alreadySetLoyaltyPointsManagement,
		setAlreadySetLoyaltyPointsManagement,
	] = useState("");
	const [availableCoupon, setAvailableCoupon] = useState(false);

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

	useEffect(() => {
		if (JSON.parse(localStorage.getItem("reservationData"))) {
			setReservationDataLocalStor(
				JSON.parse(
					localStorage.getItem("reservationData") &&
						localStorage.getItem("reservationData"),
				),
			);
			setCountryCallingCode(
				JSON.parse(
					localStorage.getItem("reservationData") &&
						localStorage.getItem("reservationData"),
				).countryCallingCode,
			);

			setPhone(
				JSON.parse(
					localStorage.getItem("reservationData") &&
						localStorage.getItem("reservationData"),
				).phoneNumber,
			);

			setServiceDetails(
				JSON.parse(
					localStorage.getItem("reservationData") &&
						localStorage.getItem("reservationData"),
				).serviceDetails,
			);
			setChosenService_Package(
				JSON.parse(
					localStorage.getItem("reservationData") &&
						localStorage.getItem("reservationData"),
				).chosenService_Package,
			);

			setQuantity(
				JSON.parse(
					localStorage.getItem("reservationData") &&
						localStorage.getItem("reservationData"),
				).quantity_Adults,
			);

			setQuantity_Children(
				JSON.parse(
					localStorage.getItem("reservationData") &&
						localStorage.getItem("reservationData"),
				).quantity_Children,
			);
		}

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

	const steps = [
		{
			title: <div className='FormTitle'>Booking Date/Time</div>,
			content: (
				<FormStep1
					chosenDate={chosenDate}
					setChosenDate={setChosenDate}
					HistBookings={HistBookings && HistBookings}
					chosenService_Package={chosenService_Package}
					setChosenService_Package={setChosenService_Package}
					serviceDetails={serviceDetails}
					setServiceDetails={setServiceDetails}
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
				/>
			),
		},
		{
			title: <div className='FormTitle'>Client Info</div>,
			content: (
				<FormStep2
					fullName={fullName}
					setFullName={setFullName}
					scheduledByUserEmail={scheduledByUserEmail}
					setScheduledByUserEmail={setScheduledByUserEmail}
					phone={phone}
					countryCallingCode={countryCallingCode}
					setCountryCallingCode={setCountryCallingCode}
					setPhone={setPhone}
					quantity={quantity}
					setQuantity={setQuantity}
					quantity_Children={quantity_Children}
					setQuantity_Children={setQuantity_Children}
					event_ocassion={event_ocassion}
					setEvent_ocassion={setEvent_ocassion}
					availableTickets={availableTickets}
					busStations={busStations}
					chosenBusStationDetails={chosenBusStationDetails}
					setChosenBusStationsDetails={setChosenBusStationsDetails}
					busStationChosenTime={busStationChosenTime}
					setBusStationChosenTime={setBusStationChosenTime}
				/>
			),
		},
		{
			title: <div className='FormTitle'>Review Your Data</div>,
			content: (
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
				/>
			),
		},
	];

	// console.log(chosenBusStationDetails.price, "chosenBusStationDetails");

	const next = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	const dataEnter1 = () => {
		if (
			chosenDate &&
			chosenService_Package &&
			!storeClosed_NotClosedCustomized &&
			!storeClosed_NotClosed
		) {
			return false;
		} else {
			return true;
		}
	};

	const dataEnter2 = () => {
		if (chosenDate) {
			return false;
		} else {
			return true;
		}
	};

	const dataEnter3 = () => {
		if (chosenDate && phone) {
			return false;
		} else {
			return true;
		}
	};

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

		if (!phone || !fullName) {
			return toast.error("Please Fill in Your Phone #...");
		}

		if (!countryCallingCode) {
			return toast.error("Please add country calling code");
		}

		if (!quantity) {
			return toast.error("Please add tickets quantity");
		}

		if (Number(quantity) + Number(quantity_Children) > availableTickets()) {
			return toast.error(
				"No enough tickets are available, please choose another reservation date and try again",
			);
		}

		if (!scheduledByUserEmail) {
			return toast.error("Please add your email address");
		}

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
			status: "Not Paid",
			bookedFrom: "Online",
			chosenCoupon: chosenCouponDetails,
			availableCoupon: availableCoupon,
			chosenBusStation: chosenBusStationDetails,
			chosenBusStationTime: busStationChosenTime,
			bookingSource: "Online",
		};

		createReservation(createOrderData).then((response) => {
			// console.log(response);
			// console.log("schedule booked");

			window.scrollTo({ top: 0, behavior: "smooth" });
			toast.success("Your Ticket Was Successfully Booked");
			// window.location.reload(false);
		});
		return setTimeout(function () {
			window.location.href = `/ticket-successfully-reserved`;
		}, 1000);
	};

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		// To Report Page View
		ReactGA.pageview(window.location.pathname + window.location.search);
		// eslint-disable-next-line
	}, []);

	return (
		<BookNowWrapper>
			<Steps current={current}>
				{steps.map((item) => (
					<Step key={item.title} title={item.title} />
				))}
			</Steps>

			<div className='steps-content'>{steps[current].content}</div>
			<div className='text-center mt-2'>
				{current === 0 && !loading && (
					<Button
						disabled={dataEnter1()}
						type='primary'
						className='Buttons'
						style={{
							width: "20%",
							fontWeight: "bold",
							fontSize: "0.9rem",
						}}
						onClick={() => {
							next();
							ReactGA.event({
								category: "First Next was clicked in the form",
								action: "User is adding his/her details ",
								label: "Client Info Is Being Added",
							});
							window.scrollTo({ top: 120, behavior: "smooth" });
						}}>
						Next
					</Button>
				)}

				{current > 0 && !loading && (
					<Button
						className='Buttons'
						style={{
							width: "20%",
							marginRight: "10px",
							backgroundColor: "burlywood",
							color: "white",
							fontWeight: "bold",
							fontSize: "0.9rem",
						}}
						onClick={() => prev()}>
						Previous
					</Button>
				)}
				{current === 1 && !loading && (
					<Button
						disabled={dataEnter2()}
						type='primary'
						className='Buttons'
						style={{
							width: "20%",
							fontWeight: "bold",
							fontSize: "0.9rem",
						}}
						onClick={() => {
							window.scrollTo({ top: 130, behavior: "smooth" });

							next();
							ReactGA.event({
								category: "Second Next was clicked in the form",
								action: "User Is Reviewing His/Her Data",
								label: "Data Reviewing",
							});
						}}>
						Next
					</Button>
				)}
				{current === steps.length - 1 &&
					(!phone || phone.length <= 7 || !countryCallingCode) && (
						<Button
							disabled={dataEnter3()}
							className='Buttons'
							type='success'
							style={{
								width: "20%",
								backgroundColor: "darkgrey",
								color: "white",
								fontWeight: "bold",
								fontSize: "0.9rem",
							}}
							onClick={() => {
								message.success("Processing complete!");
								console.log("Success");
								window.scrollTo({ top: 0, behavior: "smooth" });
								setCurrent(0);
							}}>
							Please Fill In Your Phone
						</Button>
					)}
				{current === steps.length - 1 &&
					phone &&
					phone.length > 7 &&
					!loading &&
					countryCallingCode && (
						<Button
							onClick={() => {
								clickSubmitSchedule_NoPayment();
								ReactGA.event({
									category: "Reserve Now Was Clicked",
									action: "A Client Has Successfully Reserved A Day Use",
									label:
										"Ticket Was Successfully Reserved " + chosenService_Package,
								});
							}}
							disabled={dataEnter2()}
							className='Buttons'
							type='success'
							style={{
								width: "20%",
								backgroundColor: "darkgreen",
								color: "white",
								fontWeight: "bold",
								fontSize: "0.9rem",
							}}>
							Reserve Now (Pay On Gate)
						</Button>
					)}
			</div>
			<div className='mx-auto photosWrapperCellPhone'>
				<PackagePhotos serviceDetails={serviceDetails} />
			</div>
			<div className='mx-auto photosWrapper my-5'>
				<PackagePhotos serviceDetails={serviceDetails} />
			</div>
		</BookNowWrapper>
	);
};

export default BookNow;

const BookNowWrapper = styled.div`
	margin-top: 30px;
	margin-left: 50px;
	margin-right: 50px;
	margin-bottom: 200px;
	overflow: hidden;

	.steps-content {
		min-height: 450px;
		margin-top: 16px;
		padding-top: 20px;
		text-align: center;
		background-color: #fafafa;
		border: 1px dashed #e9e9e9;
		border-radius: 10px;
	}

	.steps-action {
		margin-top: 24px;
	}
	[data-theme="dark"] .steps-content {
		margin-top: 16px;
		border: 1px dashed #303030;
		background-color: rgba(255, 255, 255, 0.04);
		color: rgba(255, 255, 255, 0.65);
		padding-top: 80px;
	}

	.headsupServices {
		font-weight: bold;
	}

	.photosWrapperCellPhone {
		display: none;
	}

	@media (max-width: 1100px) {
		.formSecondStep {
			text-align: left;
		}

		.textResizeMain {
			font-size: 0.9rem !important;
			text-shadow: 0px 0px 0px !important;
			font-weight: bold !important;
		}

		.textResizeMain2 {
			font-size: 0.8rem !important;
			text-shadow: 0px 0px 0px !important;
			font-weight: bold !important;
		}

		.textResizeMessages {
			font-size: 0.65rem !important;
			text-shadow: 0px 0px 0px !important;
		}

		.dataPointsReview {
			font-size: 0.8rem !important;
		}
	}

	@media (max-width: 900px) {
		margin-left: 10px;
		margin-right: 10px;

		.ScheduleNowButton {
			font-size: 0.8rem !important;
			width: 40% !important;
		}

		.photosWrapperCellPhone {
			margin-top: 40px;
			display: block;
		}

		.photosWrapper {
			display: none;
		}

		.headsupServices {
			font-size: 14px;
		}
		.selectaTime {
			width: 80% !important;
		}
		.Buttons {
			width: 46% !important;
			font-size: 0.73rem !important;
		}
		.FormTitle {
			font-size: 0.85rem;
		}
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
		.ant-steps-item-icon {
			font-size: 12px;
			width: 25px;
			height: 25px;
			line-height: 25px;
		}
	}
`;