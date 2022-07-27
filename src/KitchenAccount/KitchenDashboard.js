/** @format */

import React, { useEffect, useState } from "react";
// eslint-disable-next-line
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isAuthenticated } from "../auth";
import { getPreviousBookingsKitchen } from "./KitchenAPI";
import CountUp from "react-countup";

const KitchenDashboard2 = () => {
	// eslint-disable-next-line
	const [loading, setLoading] = useState(true);
	const [HistBookings, setHistBookings] = useState([]);
	const [clickedButton, setClickedButton] = useState("Today");
	const [selectedDate, setSelectedDate] = useState(
		new Date().toLocaleString("en-US", {
			timeZone: "Africa/Cairo",
		}),
	);

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

	const { user, token } = isAuthenticated();

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
		getPreviousBookingsKitchen(user._id, token).then((data) => {
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
									new Date(selectedDate).setHours(0, 0, 0, 0),
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

	const nonCancelledReservation =
		HistBookings && HistBookings.filter((i) => i.status !== "Cancelled");

	//Meals

	var LunchMealsAdults =
		nonCancelledReservation &&
		nonCancelledReservation.map((i) =>
			i.chosenServiceDetails.lunch ||
			i.chosenServiceDetails.serviceName === "kings ticket" ||
			i.chosenServiceDetails.serviceName === "happiness ticket" ||
			i.chosenServiceDetails.serviceName === "group reservation"
				? Number(i.quantity)
				: 0,
		);
	const lunchMealsAdultsTotal = LunchMealsAdults.reduce((a, b) => a + b, 0);

	var LunchMealsChildren =
		nonCancelledReservation &&
		nonCancelledReservation.map((i) =>
			i.chosenServiceDetails.lunch ||
			i.chosenServiceDetails.serviceName === "kings ticket" ||
			i.chosenServiceDetails.serviceName === "happiness ticket" ||
			i.chosenServiceDetails.serviceName === "group reservation"
				? Number(i.quantity_Children)
				: 0,
		);

	const lunchMealsChildrenTotal = LunchMealsChildren.reduce((a, b) => a + b, 0);

	var BreakfastMealsAdults =
		nonCancelledReservation &&
		nonCancelledReservation.map((i) =>
			(i.chosenServiceDetails.breakfast ||
				i.chosenServiceDetails.serviceName === "kings ticket") &&
			i.chosenServiceDetails.serviceName !== "happiness ticket"
				? Number(i.quantity)
				: 0,
		);
	const BreakfastMealsAdultsTotal = BreakfastMealsAdults.reduce(
		(a, b) => a + b,
		0,
	);

	var BreakfastMealsChildren =
		nonCancelledReservation &&
		nonCancelledReservation.map((i) =>
			(i.chosenServiceDetails.breakfast ||
				i.chosenServiceDetails.serviceName === "kings ticket") &&
			i.chosenServiceDetails.serviceName !== "happiness ticket"
				? Number(i.quantity_Children)
				: 0,
		);

	const BreakfastMealsChildrenTotal = BreakfastMealsChildren.reduce(
		(a, b) => a + b,
		0,
	);

	var BreakfastMealGroupReservation =
		nonCancelledReservation &&
		nonCancelledReservation.map((i) =>
			i.chosenServiceDetails.serviceName === "group reservation"
				? Number(i.option1Count)
				: 0,
		);

	const BreakfastMealGroupReservationTotal =
		BreakfastMealGroupReservation.reduce((a, b) => a + b, 0);

	var servicesOnlyArray =
		nonCancelledReservation &&
		nonCancelledReservation.map((i) =>
			i.chosenServiceDetails.serviceName === "services only"
				? Number(i.quantity_Children) + Number(i.quantity)
				: 0,
		);

	const servicesOnlyArrayTotal = servicesOnlyArray.reduce((a, b) => a + b, 0);

	useEffect(() => {
		loadHistReservations();

		// eslint-disable-next-line
	}, [clickedButton, selectedDate]);

	return (
		<BusStationDashboardWrapper dir='rtl'>
			{loading ? (
				<div style={{ textAlign: "center", fontSize: "20px" }}>Loading</div>
			) : (
				<div className='container'>
					<div
						className='my-4 text-center'
						style={{ fontWeight: "bold", fontSize: "15px" }}>
						التاريخ المحدد: {new Date(selectedDate).toLocaleDateString()}
					</div>
					<div className='my-3'>
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
							اليوم
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
							الغد
						</button>
					</div>

					<div className='row text-center'>
						<div className='col-md-10 mx-auto'>
							<h4 className='mt-5 mx-auto'>توزيع الوجبات</h4>
						</div>

						<div className='col-md-4 text-center mx-auto mt-3'>
							<div className='card' style={{ background: "var(--babyBlue)" }}>
								<div className='card-body'>
									<h5>الإفطار للكبار</h5>
									<CountUp
										duration='2'
										delay={0.5}
										end={BreakfastMealsAdultsTotal}
									/>
								</div>
							</div>
						</div>
						<div className='col-md-4 text-center mx-auto mt-3'>
							<div className='card' style={{ background: "var(--babyBlue)" }}>
								<div className='card-body'>
									<h5>أطفال الإفطار</h5>
									<CountUp
										duration='2.5'
										delay={0.5}
										end={BreakfastMealsChildrenTotal}
										separator=','
									/>
								</div>
							</div>
						</div>

						<div className='col-md-4 text-center mx-auto mt-3'>
							<div className='card' style={{ background: "var(--babyBlue)" }}>
								<div className='card-body'>
									<h5> إفطار جماعي للحجز</h5>
									<CountUp
										duration='3.5'
										delay={0.5}
										end={BreakfastMealGroupReservationTotal}
										separator=','
									/>
								</div>
							</div>
						</div>

						<div className='col-md-8 text-center mx-auto mt-3'>
							<div className='card' style={{ background: "var(--babyBlue)" }}>
								<div className='card-body'>
									<h5>إجمالي وجبات الإفطار</h5>
									<CountUp
										duration='2.5'
										delay={0.5}
										end={
											Number(BreakfastMealsChildrenTotal) +
											Number(BreakfastMealsChildrenTotal) +
											Number(BreakfastMealsAdultsTotal)
										}
										separator=','
									/>
								</div>
							</div>
						</div>
						<div className='col-md-6 text-center mx-auto mt-3'>
							<div className='card' style={{ background: "var(--babyBlue)" }}>
								<div className='card-body'>
									<h5>غداء للكبار</h5>
									<CountUp
										duration='3'
										delay={0.5}
										end={lunchMealsAdultsTotal}
										separator=','
									/>
								</div>
							</div>
						</div>
						<div className='col-md-6 text-center mx-auto mt-3'>
							<div className='card' style={{ background: "var(--babyBlue)" }}>
								<div className='card-body'>
									<h5> غداء للأطفال</h5>
									<CountUp
										duration='3.5'
										delay={0.5}
										end={lunchMealsChildrenTotal}
										separator=','
									/>
								</div>
							</div>
						</div>

						<div className='col-md-8 text-center mx-auto mt-3'>
							<div className='card' style={{ background: "var(--babyBlue)" }}>
								<div className='card-body'>
									<h5> إجمالي وجبات الغداء</h5>
									<CountUp
										duration='3.5'
										delay={0.5}
										end={
											Number(lunchMealsAdultsTotal) +
											Number(lunchMealsChildrenTotal)
										}
										separator=','
									/>
								</div>
							</div>
						</div>
						<div className='col-md-5 text-center mx-auto mt-5'>
							<div className='card' style={{ background: "var(--babyBlue)" }}>
								<div className='card-body'>
									<h5> الخدمات فقط</h5>
									<CountUp
										duration='3.5'
										delay={0.5}
										end={servicesOnlyArrayTotal}
										separator=','
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</BusStationDashboardWrapper>
	);
};

export default KitchenDashboard2;

const BusStationDashboardWrapper = styled.div`
	min-height: 700px;

	margin-bottom: 100px;
	margin-top: 20px;
	text-align: center;

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
