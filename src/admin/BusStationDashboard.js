/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isAuthenticated } from "../auth";
import Adminsidebar from "./AdminSideBar/Adminsidebar";
import DarkBG from "./AdminSideBar/DarkBG";
import { getPreviousBookingsAdmin } from "./apiAdmin";

const BusStationDashboard = () => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);
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

	useEffect(() => {
		setClickMenu2(click2);
	}, [click2, clickMenu2]);

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
									i.chosenBusStation.address !== "NO BUS NEEDED",
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

	useEffect(() => {
		loadHistReservations();

		// eslint-disable-next-line
	}, [clickedButton, selectedDate]);

	return (
		<BusStationDashboardWrapper>
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
				<div style={{ textAlign: "center", fontSize: "20px" }}>Loading</div>
			) : (
				<div className='container'>
					<div
						className='my-4 text-center'
						style={{ fontWeight: "bold", fontSize: "15px" }}>
						Selected Date: {new Date(selectedDate).toLocaleDateString()}
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
					</div>

					<table
						className='table table-bordered table-md-responsive table-hover table-striped'
						style={{ fontSize: "0.75rem" }}>
						<thead className='thead-light text-center'>
							<tr>
								<th scope='col'>
									<span className=''>#</span>{" "}
								</th>
								<th scope='col'>Full Name</th>
								<th scope='col'>Phone Number</th>
								<th scope='col'>Tickets Count (Adults)</th>
								<th scope='col'>Tickets Count (Children)</th>
								<th scope='col'>Bus Location</th>
								<th scope='col'>Bus Reserved Seats</th>
							</tr>
						</thead>

						<tbody>
							{HistBookings.map((s, i) => {
								return (
									<tr
										key={i}
										style={{
											background:
												s.status === "Paid"
													? "green"
													: s.status === "Cancelled"
													? "#871402"
													: "",
											color:
												s.status === "Paid" || s.status === "Cancelled"
													? "white"
													: "",
											width: "15px",
										}}>
										<td>{i + 1}</td>
										<td>
											{" "}
											<Link
												onClick={() => {
													window.scrollTo({ top: 0, behavior: "smooth" });
												}}
												style={{
													background:
														s.status === "Paid"
															? "green"
															: s.status === "Cancelled"
															? "#871402"
															: "",
													color:
														s.status === "Paid" || s.status === "Cancelled"
															? "white"
															: "",
												}}
												to={`#`}>
												{s.fullName}
											</Link>{" "}
										</td>
										<td>+{s.phoneNumber}</td>

										<td
										// style={{ width: "10px" }}
										>
											{s.quantity}
										</td>
										<td
										// style={{ width: "10px" }}
										>
											{s.quantity_Children}
										</td>

										<td
										// style={{ width: "15px" }}
										>
											{s.chosenBusStation.address}
										</td>
										<td
										// style={{ width: "15px" }}
										>
											{s.busSeatsCount && s.busSeatsCount > 0
												? s.busSeatsCount
												: s.chosenBusStation.address === "NO BUS NEEDED"
												? 0
												: Number(s.quantity) + Number(s.quantity_Children)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</BusStationDashboardWrapper>
	);
};

export default BusStationDashboard;

const BusStationDashboardWrapper = styled.div`
	min-height: 700px;
`;
