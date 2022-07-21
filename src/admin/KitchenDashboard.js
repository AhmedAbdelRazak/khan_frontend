/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../auth";
import Adminsidebar from "./AdminSideBar/Adminsidebar";
import DarkBG from "./AdminSideBar/DarkBG";
import { getPreviousBookingsAdmin, getTickets } from "./apiAdmin";
// eslint-disable-next-line
import { DatePicker } from "antd";
// eslint-disable-next-line
import moment from "moment";
import "antd/dist/antd.min.css";
import CountUp from "react-countup";

const KitchenDashboard = () => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);
	const [loading, setLoading] = useState(true);
	// eslint-disable-next-line
	const [allTickets, setAllTickets] = useState([]);
	// eslint-disable-next-line
	const [HistBookings, setHistBookings] = useState([]);
	const [clickedButton, setClickedButton] = useState("Today");
	const [selectedDate, setSelectedDate] = useState(
		new Date().toLocaleString("en-US", {
			timeZone: "Africa/Cairo",
		}),
	);

	//Admin Auth
	// eslint-disable-next-line
	const { user, token } = isAuthenticated();

	useEffect(() => {
		setClickMenu2(click2);
	}, [click2, clickMenu2]);

	var today = new Date().toLocaleDateString("en-US", {
		timeZone: "Africa/Cairo",
	});

	var yesterday = new Date(today);
	var last7Days = new Date(today);
	var last30Days = new Date(today);
	var tomorrow = new Date(today);
	var next7Days = new Date(today);
	var next30Days = new Date(today);

	yesterday.setDate(yesterday.getDate() - 1);
	last7Days.setDate(yesterday.getDate() - 7);
	last30Days.setDate(yesterday.getDate() - 30);
	tomorrow.setDate(yesterday.getDate() + 2);
	next7Days.setDate(yesterday.getDate() + 8);
	next30Days.setDate(yesterday.getDate() + 31);

	// console.log(tomorrow);
	// console.log(selectedDate);

	const loadHistReservations = () => {
		function compareTotalAppointments(a, b) {
			const TotalAppointmentsA = new Date(a.scheduledDate).setHours(0, 0, 0, 0);
			const TotalAppointmentsB = new Date(b.scheduledDate).setHours(0, 0, 0, 0);
			let comparison = 0;
			if (TotalAppointmentsA < TotalAppointmentsB) {
				comparison = 1;
			} else if (TotalAppointmentsA > TotalAppointmentsB) {
				comparison = -1;
			}
			return comparison;
		}

		setLoading(true);
		getPreviousBookingsAdmin(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				if (clickedButton === "Select All") {
					setHistBookings(data.sort(compareTotalAppointments));
				} else if (
					clickedButton === "Today" ||
					clickedButton === "Yesterday" ||
					clickedButton === "Tomorrow" ||
					clickedButton === "DatePicker"
				) {
					setHistBookings(
						data
							.filter(
								(i) =>
									new Date(i.scheduledDate).setHours(0, 0, 0, 0) ===
										new Date(selectedDate).setHours(0, 0, 0, 0) &&
									i.status !== "Cancelled",
							)
							.sort(compareTotalAppointments),
					);
				} else if (
					clickedButton === "This Week" ||
					clickedButton === "This Month"
				) {
					setHistBookings(
						data
							.filter(
								(i) =>
									new Date(i.scheduledDate).setHours(0, 0, 0, 0) <=
										new Date(selectedDate).setHours(0, 0, 0, 0) &&
									new Date(i.scheduledDate).setHours(0, 0, 0, 0) >=
										new Date().setHours(0, 0, 0, 0),
							)
							.sort(compareTotalAppointments),
					);
				} else if (clickedButton === "Select AllBooking") {
					setHistBookings(data.sort(compareTotalAppointments));
				} else if (
					clickedButton === "TodayBooking" ||
					clickedButton === "YesterdayBooking" ||
					clickedButton === "TomorrowBooking" ||
					clickedButton === "DatePickerBooking"
				) {
					setHistBookings(
						data
							.filter(
								(i) =>
									new Date(i.createdAt).setHours(0, 0, 0, 0) ===
									new Date(selectedDate).setHours(0, 0, 0, 0),
							)
							.sort(compareTotalAppointments),
					);
				} else if (
					clickedButton === "This WeekBooking" ||
					clickedButton === "This MonthBooking"
				) {
					setHistBookings(
						data
							.filter(
								(i) =>
									new Date(i.createdAt).setHours(0, 0, 0, 0) <=
										new Date(selectedDate).setHours(0, 0, 0, 0) &&
									new Date(i.createdAt).setHours(0, 0, 0, 0) >=
										new Date().setHours(0, 0, 0, 0),
							)
							.sort(compareTotalAppointments),
					);
				} else {
					setHistBookings(data.sort(compareTotalAppointments));
				}

				setLoading(false);
			}
		});
	};

	const gettingAllTickets = () => {
		setLoading(true);
		getTickets(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllTickets(data);
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		loadHistReservations();
		gettingAllTickets();
		// eslint-disable-next-line
	}, [clickedButton, selectedDate]);

	var DayOverDay_HeadCountAdults = [];
	HistBookings &&
		HistBookings.reduce(function (res, value) {
			if (!res[value.chosenService_Package]) {
				res[value.chosenService_Package] = {
					chosenService_Package: value.chosenService_Package,
					quantity: 0,
				};
				DayOverDay_HeadCountAdults.push(res[value.chosenService_Package]);
			}
			res[value.chosenService_Package].quantity += Number(value.quantity);
			return res;
		}, {});

	var DayOverDay_HeadCountChildren = [];
	HistBookings &&
		HistBookings.reduce(function (res, value) {
			if (!res[value.chosenService_Package]) {
				res[value.chosenService_Package] = {
					chosenService_Package: value.chosenService_Package,
					quantity: 0,
				};
				DayOverDay_HeadCountChildren.push(res[value.chosenService_Package]);
			}
			res[value.chosenService_Package].quantity += Number(
				value.quantity_Children,
			);
			return res;
		}, {});

	var allTicketsNames = allTickets && allTickets.map((i) => i.serviceName);

	//Calculating Lunches For Adults & Children
	var allLunchArrayAdults = DayOverDay_HeadCountAdults.filter(
		(i) =>
			allTicketsNames.indexOf(i.chosenService_Package) > -1 &&
			allTickets[allTicketsNames.indexOf(i.chosenService_Package)].lunch ===
				true,
	);

	var allLunchArrayChildren = DayOverDay_HeadCountChildren.filter(
		(i) =>
			allTicketsNames.indexOf(i.chosenService_Package) > -1 &&
			allTickets[allTicketsNames.indexOf(i.chosenService_Package)].lunch ===
				true,
	);

	//Calculating Breakfasts For Adults & Children
	var allBreakfastArrayAdults = DayOverDay_HeadCountAdults.filter(
		(i) =>
			allTicketsNames.indexOf(i.chosenService_Package) > -1 &&
			allTickets[allTicketsNames.indexOf(i.chosenService_Package)].breakfast ===
				true,
	);

	var allBreakfastArrayChildren = DayOverDay_HeadCountChildren.filter(
		(i) =>
			allTicketsNames.indexOf(i.chosenService_Package) > -1 &&
			allTickets[allTicketsNames.indexOf(i.chosenService_Package)].breakfast ===
				true,
	);

	const overallBreakfastAdultsArray =
		allBreakfastArrayAdults && allBreakfastArrayAdults.map((i) => i.quantity);

	const overallBreakfastChildrenArray =
		allBreakfastArrayChildren &&
		allBreakfastArrayChildren.map((i) => i.quantity);

	const overallBreakfastAdultsArraySum = overallBreakfastAdultsArray.reduce(
		(a, b) => a + b,
		0,
	);
	const overallBreakfastChildrenArraySum = overallBreakfastChildrenArray.reduce(
		(a, b) => a + b,
		0,
	);

	const overallLunchAdultsArray =
		allLunchArrayAdults && allLunchArrayAdults.map((i) => i.quantity);

	const overallLunchChildrenArray =
		allLunchArrayChildren && allLunchArrayChildren.map((i) => i.quantity);

	const overallLunchAdultsArraySum = overallLunchAdultsArray.reduce(
		(a, b) => a + b,
		0,
	);
	const overallLunchChildrenArraySum = overallLunchChildrenArray.reduce(
		(a, b) => a + b,
		0,
	);

	// Group Reservation Breakfasts
	const overAllGroupReservationBreakfasts =
		HistBookings && HistBookings.map((i) => i.option1Count);
	const overAllGroupReservationBreakfastsSum =
		overAllGroupReservationBreakfasts.reduce((a, b) => a + b, 0);

	// Group Reservation Lunches
	const overAllGroupReservationLunches =
		HistBookings && HistBookings.map((i) => i.option2Count);
	const overAllGroupReservationBreakLunchesSum =
		overAllGroupReservationLunches.reduce((a, b) => a + b, 0);

	const OverAllTotalMeals =
		Number(overallLunchAdultsArraySum) +
		Number(overallLunchChildrenArraySum) +
		Number(overallBreakfastAdultsArraySum) +
		Number(overallBreakfastChildrenArraySum) +
		Number(overAllGroupReservationBreakfastsSum) +
		Number(overAllGroupReservationBreakLunchesSum);

	return (
		<KitchenDashboardWrapper>
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
			{loading ? (
				<div className='MainTitle'> Loading....</div>
			) : (
				<>
					<div className='MainTitle'>Break Down Of All Meals</div>
					<div className='mx-auto text-center mt-3 mb-5'>
						<span
							style={{
								fontSize: "1.3rem",
								fontWeight: "bold",
								marginBottom: "10px",
								marginLeft: "10px",
								color: "var(--mainBlue)",
							}}>
							Schedule Date:
						</span>
						<br />

						<button
							onClick={() => {
								setClickedButton("Today");
								setSelectedDate(today);
							}}
							style={{
								color: "black",
								backgroundColor: "var(--orangePrimary)",
								border: "none",
							}}
							className='ml-1 p-2 '>
							Today
						</button>
						<button
							onClick={() => {
								setClickedButton("Tomorrow");
								setSelectedDate(tomorrow);
							}}
							style={{
								color: "white",
								backgroundColor: "black",
								border: "none",
							}}
							className='ml-1 p-2'>
							Tomorrow
						</button>
						<button
							onClick={() => {
								setClickedButton("Yesterday");
								setSelectedDate(yesterday);
							}}
							style={{
								color: "black",
								backgroundColor: "var(--babyBlue)",
								border: "none",
							}}
							className='ml-1 p-2'>
							Yesterday
						</button>

						{/* <DatePicker
							className='inputFields'
							onChange={(date) => {
								setClickedButton("DatePicker");
								setSelectedDate(
									new Date(date._d).toLocaleDateString() || date._d,
								);
							}}
							// disabledDate={disabledDate}
							max
							size='small'
							showToday={true}
							defaultValue={moment(new Date(selectedDate))}
							placeholder='Please pick the desired schedule date'
							style={{
								height: "auto",
								width: "20%",
								marginLeft: "5px",
								padding: "10px",
								// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
								borderRadius: "10px",
							}}
						/> */}
						<div className='container my-4'>
							<div className='row text-center'>
								<div className='col-md-3 text-center mx-auto'>
									<div
										className='card'
										style={{ background: "var(--babyBlue)" }}>
										<div className='card-body'>
											<h5>Adults Breakfasts</h5>
											<CountUp
												duration='2'
												delay={0.5}
												end={overallBreakfastAdultsArraySum}
											/>
										</div>
									</div>
								</div>
								<div className='col-md-3 text-center mx-auto'>
									<div
										className='card'
										style={{ background: "var(--babyBlue)" }}>
										<div className='card-body'>
											<h5>Children Breakfasts</h5>
											<CountUp
												duration='2.5'
												delay={0.5}
												end={overallBreakfastChildrenArraySum}
												separator=','
											/>
										</div>
									</div>
								</div>
								<div className='col-md-3 text-center mx-auto'>
									<div
										className='card'
										style={{ background: "var(--babyBlue)" }}>
										<div className='card-body'>
											<h5>Adults Lunch</h5>
											<CountUp
												duration='3'
												delay={0.5}
												end={overallLunchAdultsArraySum}
												separator=','
											/>
										</div>
									</div>
								</div>
								<div className='col-md-3 text-center mx-auto'>
									<div
										className='card'
										style={{ background: "var(--babyBlue)" }}>
										<div className='card-body'>
											<h5> Children Lunch</h5>
											<CountUp
												duration='3.5'
												delay={0.5}
												end={overallLunchChildrenArraySum}
												separator=','
											/>
										</div>
									</div>
								</div>

								<div className='col-md-5 text-center mx-auto my-2'>
									<div
										className='card'
										style={{ background: "var(--babyBlue)" }}>
										<div className='card-body'>
											<h5> Group Reservation Breakfast</h5>
											<CountUp
												duration='3.5'
												delay={0.5}
												end={overAllGroupReservationBreakfastsSum}
												separator=','
											/>
										</div>
									</div>
								</div>

								<div className='col-md-5 text-center mx-auto  my-2'>
									<div
										className='card'
										style={{ background: "var(--babyBlue)" }}>
										<div className='card-body'>
											<h5> Group Reservation Lunches</h5>
											<CountUp
												duration='3.5'
												delay={0.5}
												end={overAllGroupReservationBreakLunchesSum}
												separator=','
											/>
										</div>
									</div>
								</div>

								<div className='col-md-5 text-center mx-auto mt-3'>
									<div
										className='card'
										style={{ background: "var(--mainBlue)" }}>
										<div
											className='card-body totalAmount'
											style={{ color: "white" }}>
											<h5> Total Meals</h5>
											<CountUp
												duration='4.5'
												delay={0.5}
												end={OverAllTotalMeals}
												separator=','
												// decimals={3}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</KitchenDashboardWrapper>
	);
};

export default KitchenDashboard;

const KitchenDashboardWrapper = styled.div`
	min-height: 650px;

	.MainTitle {
		margin-top: 5px;
		text-align: center;
		font-weight: bolder;
		font-size: 1.5rem;
	}

	margin-bottom: 100px;
	margin-top: 20px;

	h5 {
		font-size: 1rem;
	}

	h4 {
		font-size: 1.3rem;
		margin-bottom: 20px;
	}

	.totalAmount h5 {
		color: white;
		font-size: 1.4rem;
	}

	.totalAmount span {
		font-size: 1.8rem !important;
	}

	.card-body {
		font-weight: bolder;
	}

	.card-body span {
		font-size: 1.5rem;
	}
`;
