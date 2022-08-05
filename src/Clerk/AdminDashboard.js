/** @format */

import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import Adminsidebar from "./AdminSideBar/Adminsidebar";
import DarkBG from "./AdminSideBar/DarkBG";
// eslint-disable-next-line
import { Button } from "antd";
import { DatePicker } from "antd";
import moment from "moment";
import "antd/dist/antd.min.css";
import ExecutiveSummary from "./ExecutiveSummary";

import {
	getPreviousBookingsEmployee,
	updateOrderStatusEmployee,
	getStatusValuesEmployee,
} from "./apiAdmin";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const AdminDashboard = () => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);
	const [loading, setLoading] = useState(true);
	const [HistBookings, setHistBookings] = useState([]);
	// eslint-disable-next-line
	const [excelDataSet, setExcelDataSet] = useState([]);
	const [statusValues, setStatusValues] = useState([]);
	const [q, setQ] = useState("");
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

	var today = new Date();
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
		getPreviousBookingsEmployee(user._id, token).then((data) => {
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
				} else if (clickedButton === "DatePickerBookingDate") {
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
				} else {
					setHistBookings(data.sort(compareTotalAppointments));
				}

				if (clickedButton === "Select All") {
					setExcelDataSet(
						data.sort(compareTotalAppointments).map((data, i) => {
							return {
								id: i + 1,
								fullName: data.fullName,
								PhoneNumber: data.phoneNumber,
								ClientEmail: data.scheduledByUserEmail,
								TicketsCount_Adults: data.quantity,
								TicketsCount_Children: data.quantity_Children,
								BookedOn: dateFormat(
									new Date(data.createdAt).toLocaleString("en-US", {
										timeZone: "Africa/Cairo",
									}),
								),

								ScheduleDate: new Date(data.scheduledDate).toDateString(),
								Receipt: data.phoneNumber,
								Event: data.event,
								ChosenPackage: data.chosenService_Package,
								BookingSource: data.bookedFrom,
								PackagePrice: data.chosenServiceDetails.servicePrice,
								PackagePrice_Discount:
									data.chosenServiceDetails.servicePriceDiscount,
								Status: data.status,
								totalAmount: data.totalAmount,
								reservationBelongsTo: data.reservationBelongsTo,
								appointmentComment: data.appointmentComment,
								BreakfastMeals:
									data.chosenServiceDetails.breakfast ||
									data.chosenServiceDetails.serviceName === "kings ticket"
										? Number(data.quantity) + Number(data.quantity_Children)
										: data.chosenServiceDetails.serviceName ===
										  "group reservation"
										? data.option1Count
										: 0,

								LunchMeals:
									data.chosenServiceDetails.lunch ||
									data.chosenServiceDetails.serviceName === "kings ticket" ||
									data.chosenServiceDetails.serviceName === "group reservation"
										? Number(data.quantity) + Number(data.quantity_Children)
										: 0,
								busLocation: data.chosenBusStation.address,

								BusSeats:
									data.busSeatsCount && data.busSeatsCount > 0
										? data.busSeatsCount
										: data.chosenBusStation.address === "NO BUS NEEDED"
										? 0
										: Number(data.quantity) + Number(data.quantity_Children),
							};
						}),
					);
				} else if (
					clickedButton === "Today" ||
					clickedButton === "Yesterday" ||
					clickedButton === "Tomorrow" ||
					clickedButton === "DatePicker"
				) {
					setExcelDataSet(
						data
							.filter(
								(i) =>
									new Date(i.scheduledDate).setHours(0, 0, 0, 0) ===
									new Date(selectedDate).setHours(0, 0, 0, 0),
							)
							.sort(compareTotalAppointments)
							.map((data, i) => {
								return {
									id: i + 1,
									fullName: data.fullName,
									PhoneNumber: data.phoneNumber,
									ClientEmail: data.scheduledByUserEmail,
									TicketsCount_Adults: data.quantity,
									TicketsCount_Children: data.quantity_Children,
									BookedOn: dateFormat(
										new Date(data.createdAt).toLocaleString("en-US", {
											timeZone: "Africa/Cairo",
										}),
									),

									ScheduleDate: new Date(data.scheduledDate).toDateString(),
									Receipt: data.phoneNumber,
									Event: data.event,
									ChosenPackage: data.chosenService_Package,
									BookingSource: data.bookedFrom,
									PackagePrice: data.chosenServiceDetails.servicePrice,
									PackagePrice_Discount:
										data.chosenServiceDetails.servicePriceDiscount,
									Status: data.status,
									totalAmount: data.totalAmount,
									reservationBelongsTo: data.reservationBelongsTo,
									appointmentComment: data.appointmentComment,
									BreakfastMeals:
										data.chosenServiceDetails.breakfast ||
										data.chosenServiceDetails.serviceName === "kings ticket"
											? Number(data.quantity) + Number(data.quantity_Children)
											: data.chosenServiceDetails.serviceName ===
											  "group reservation"
											? data.option1Count
											: 0,

									LunchMeals:
										data.chosenServiceDetails.lunch ||
										data.chosenServiceDetails.serviceName === "kings ticket" ||
										data.chosenServiceDetails.serviceName ===
											"group reservation"
											? Number(data.quantity) + Number(data.quantity_Children)
											: 0,
									busLocation: data.chosenBusStation.address,

									BusSeats:
										data.busSeatsCount && data.busSeatsCount > 0
											? data.busSeatsCount
											: data.chosenBusStation.address === "NO BUS NEEDED"
											? 0
											: Number(data.quantity) + Number(data.quantity_Children),
								};
							}),
					);
				} else if (
					clickedButton === "This Week" ||
					clickedButton === "This Month"
				) {
					setExcelDataSet(
						data
							.filter(
								(i) =>
									new Date(i.scheduledDate).setHours(0, 0, 0, 0) <=
										new Date(selectedDate).setHours(0, 0, 0, 0) &&
									new Date(i.scheduledDate).setHours(0, 0, 0, 0) >=
										new Date().setHours(0, 0, 0, 0),
							)
							.sort(compareTotalAppointments)
							.map((data, i) => {
								return {
									id: i + 1,
									fullName: data.fullName,
									PhoneNumber: data.phoneNumber,
									ClientEmail: data.scheduledByUserEmail,
									TicketsCount_Adults: data.quantity,
									TicketsCount_Children: data.quantity_Children,
									BookedOn: dateFormat(
										new Date(data.createdAt).toLocaleString("en-US", {
											timeZone: "Africa/Cairo",
										}),
									),

									ScheduleDate: new Date(data.scheduledDate).toDateString(),
									Receipt: data.phoneNumber,
									Event: data.event,
									ChosenPackage: data.chosenService_Package,
									BookingSource: data.bookedFrom,
									PackagePrice: data.chosenServiceDetails.servicePrice,
									PackagePrice_Discount:
										data.chosenServiceDetails.servicePriceDiscount,
									Status: data.status,
									totalAmount: data.totalAmount,
									reservationBelongsTo: data.reservationBelongsTo,
									appointmentComment: data.appointmentComment,
									BreakfastMeals:
										data.chosenServiceDetails.breakfast ||
										data.chosenServiceDetails.serviceName === "kings ticket"
											? Number(data.quantity) + Number(data.quantity_Children)
											: data.chosenServiceDetails.serviceName ===
											  "group reservation"
											? data.option1Count
											: 0,

									LunchMeals:
										data.chosenServiceDetails.lunch ||
										data.chosenServiceDetails.serviceName === "kings ticket" ||
										data.chosenServiceDetails.serviceName ===
											"group reservation"
											? Number(data.quantity) + Number(data.quantity_Children)
											: 0,
									busLocation: data.chosenBusStation.address,

									BusSeats:
										data.busSeatsCount && data.busSeatsCount > 0
											? data.busSeatsCount
											: data.chosenBusStation.address === "NO BUS NEEDED"
											? 0
											: Number(data.quantity) + Number(data.quantity_Children),
								};
							}),
					);
				} else {
					setExcelDataSet(
						data.sort(compareTotalAppointments).map((data, i) => {
							return {
								id: i + 1,
								fullName: data.fullName,
								PhoneNumber: data.phoneNumber,
								ClientEmail: data.scheduledByUserEmail,
								TicketsCount_Adults: data.quantity,
								TicketsCount_Children: data.quantity_Children,
								BookedOn: dateFormat(
									new Date(data.createdAt).toLocaleString("en-US", {
										timeZone: "Africa/Cairo",
									}),
								),

								ScheduleDate: new Date(data.scheduledDate).toDateString(),
								Receipt: data.phoneNumber,
								Event: data.event,
								ChosenPackage: data.chosenService_Package,
								BookingSource: data.bookedFrom,
								PackagePrice: data.chosenServiceDetails.servicePrice,
								PackagePrice_Discount:
									data.chosenServiceDetails.servicePriceDiscount,
								Status: data.status,
								totalAmount: data.totalAmount,
								reservationBelongsTo: data.reservationBelongsTo,
								appointmentComment: data.appointmentComment,
								BreakfastMeals:
									data.chosenServiceDetails.breakfast ||
									data.chosenServiceDetails.serviceName === "kings ticket"
										? Number(data.quantity) + Number(data.quantity_Children)
										: data.chosenServiceDetails.serviceName ===
										  "group reservation"
										? data.option1Count
										: 0,

								LunchMeals:
									data.chosenServiceDetails.lunch ||
									data.chosenServiceDetails.serviceName === "kings ticket" ||
									data.chosenServiceDetails.serviceName === "group reservation"
										? Number(data.quantity) + Number(data.quantity_Children)
										: 0,
								busLocation: data.chosenBusStation.address,

								BusSeats:
									data.busSeatsCount && data.busSeatsCount > 0
										? data.busSeatsCount
										: data.chosenBusStation.address === "NO BUS NEEDED"
										? 0
										: Number(data.quantity) + Number(data.quantity_Children),
							};
						}),
					);
				}

				setLoading(false);
				window.scrollTo({ top: 0, behavior: "smooth" });
			}
		});
	};

	const loadStatusValues = () => {
		getStatusValuesEmployee(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setStatusValues(data);
			}
		});
	};

	useEffect(() => {
		loadStatusValues();
		loadHistReservations();

		// eslint-disable-next-line
	}, [clickedButton, selectedDate]);

	useEffect(() => {
		if (!q || q === "") {
			setClickedButton("Today");
		}

		// eslint-disable-next-line
	}, [q]);

	function search(orders) {
		return orders.filter((row) => {
			var datesYaba = new Date(row.scheduledDate).toLocaleDateString();
			return (
				row.fullName.toLowerCase().indexOf(q) > -1 ||
				row.phoneNumber.toString().toLowerCase().indexOf(q) > -1 ||
				datesYaba.toString().toLowerCase().indexOf(q) > -1 ||
				row._id.substring(0, 10).toString().toLowerCase().indexOf(q) > -1 ||
				row.scheduledByUserEmail.toString().toLowerCase().indexOf(q) > -1 ||
				row.reservationBelongsTo.toString().toLowerCase().indexOf(q) > -1 ||
				row.bookedFrom.toString().toLowerCase().indexOf(q) > -1 ||
				row.status.toString().toLowerCase().indexOf(q) > -1 ||
				row.chosenBusStation.address.indexOf(q) > -1 ||
				row.phoneNumber.toString().toLowerCase().indexOf(q) > -1 ||
				row.chosenServiceDetails.serviceName
					.toString()
					.toLowerCase()
					.indexOf(q) > -1
			);
		});
	}

	const handleStatusChange = (e, orderId) => {
		updateOrderStatusEmployee(user._id, token, orderId, e.target.value).then(
			(data) => {
				if (data.error) {
					console.log("Status update failed");
				} else {
					window.scrollTo({ top: 0, behavior: "smooth" });
					window.location.reload(false);
				}
			},
		);
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

	// eslint-disable-next-line
	const disabledDate = (current) => {
		// Can not select days before today and today
		return current <= moment() - 2;
	};

	const allReservationsDetails = () => {
		return (
			<Summary>
				<div className='mx-auto text-center mt-3 mb-5'>
					<span
						style={{
							fontSize: "1.3rem",
							fontWeight: "bold",
							marginBottom: "10px",
							marginLeft: "10px",
							color: "var(--mainBlue)",
						}}>
						Filters (Schedule Date):
					</span>
					<br />

					<DatePicker
						className='inputFields'
						onChange={(date) => {
							setClickedButton("DatePicker");
							window.scrollTo({ top: 0, behavior: "smooth" });
							setSelectedDate(
								new Date(date._d).toLocaleDateString() || date._d,
							);
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}
						// disabledDate={disabledDate}
						max
						size='small'
						// showToday={true}
						defaultValue={moment(new Date(selectedDate))}
						placeholder='Please pick the desired schedule date'
						style={{
							height: "auto",
							width: "50%",
							marginLeft: "5px",
							padding: "10px",
							// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
							borderRadius: "10px",
						}}
					/>
				</div>
				<div className='mx-auto text-center mt-3 mb-5'>
					<span
						style={{
							fontSize: "1.3rem",
							fontWeight: "bold",
							marginBottom: "10px",
							marginLeft: "10px",
							color: "var(--mainBlue)",
						}}>
						Filters (Booking Date):
					</span>
					<br />

					<DatePicker
						className='inputFields'
						onChange={(date) => {
							setClickedButton("DatePickerBookingDate");
							window.scrollTo({ top: 0, behavior: "smooth" });
							setSelectedDate(
								new Date(date._d).toLocaleDateString() || date._d,
							);
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}
						// disabledDate={disabledDate}
						max
						size='small'
						// showToday={true}
						defaultValue={moment(new Date(selectedDate))}
						placeholder='Please pick the desired schedule date'
						style={{
							height: "auto",
							width: "50%",
							marginLeft: "5px",
							padding: "10px",
							// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
							borderRadius: "10px",
						}}
					/>
				</div>
				<ExecutiveSummary
					historicalBooking={HistBookings}
					clickedButton={clickedButton}
				/>

				<div className=' mb-3 form-group mx-3 text-center'>
					<label
						className='mt-3 mx-3'
						style={{
							fontWeight: "bold",
							fontSize: "1.05rem",
							color: "black",
							borderRadius: "20px",
						}}>
						Search
					</label>
					<input
						className='p-2 my-5 '
						type='text'
						value={q}
						autoFocus
						onChange={(e) => {
							setClickedButton("Select All");
							setQ(e.target.value.toLowerCase());
						}}
						placeholder='Search By Client Phone, Client Name, Package Name'
						style={{ borderRadius: "20px", width: "50%" }}
					/>
				</div>
				<div className='my-3'>{DownloadExcel()}</div>
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
							<th scope='col'>Client Email</th>
							<th scope='col'>Tickets Count (Adults)</th>
							<th scope='col'>Tickets Count (Children)</th>
							<th scope='col'>Booked On</th>
							<th scope='col'>Schedule Date</th>
							<th scope='col'>Event/Ocassion</th>
							<th scope='col'>Chosen Package</th>
							<th scope='col'>Booking Source</th>
							<th scope='col'>Total Meals (Breakfast)</th>
							<th scope='col'>Total Meals (Lunches)</th>
							<th scope='col'>Bus Location</th>
							<th scope='col'>Bus Reserved Seats</th>
							<th scope='col'>Before Discount (L.E.)</th>
							<th scope='col'>Total Amount (L.E.)</th>
							<th scope='col'>Status</th>
							<th scope='col'>Reservation Belongs To</th>
						</tr>
					</thead>

					<tbody>
						{search(HistBookings).map((s, i) => (
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
										to={`/clerk/update-reservation/${s._id}`}>
										{s.fullName}
									</Link>{" "}
								</td>
								<td>+{s.phoneNumber}</td>

								<td style={{ width: "10px" }}>{s.scheduledByUserEmail}</td>
								<td style={{ width: "10px" }}>{s.quantity}</td>
								<td style={{ width: "10px" }}>{s.quantity_Children}</td>
								<td>
									{dateFormat(
										new Date(s.createdAt).toLocaleString("en-US", {
											timeZone: "Africa/Cairo",
										}),
									)}
								</td>

								<td>
									{new Date(s.scheduledDate).toLocaleString() !== "Invalid Date"
										? dateFormat(
												new Date(s.scheduledDate).toLocaleString("en-US", {
													timeZone: "Africa/Cairo",
												}),
										  )
										: s.scheduledDate}{" "}
									<br />
								</td>
								<td>{s.event}</td>
								<td>{s.chosenServiceDetails.serviceName}</td>
								<td style={{ width: "15px" }}>{s.bookedFrom}</td>

								<td style={{ width: "15px" }}>
									{(s.chosenServiceDetails.breakfast ||
										s.chosenServiceDetails.serviceName === "kings ticket") &&
									s.chosenServiceDetails.serviceName !== "happiness ticket"
										? Number(s.quantity) + Number(s.quantity_Children)
										: s.chosenServiceDetails.serviceName === "group reservation"
										? s.option1Count
										: 0}
								</td>

								<td style={{ width: "15px" }}>
									{s.chosenServiceDetails.lunch ||
									s.chosenServiceDetails.serviceName === "kings ticket" ||
									s.chosenServiceDetails.serviceName === "happiness ticket" ||
									s.chosenServiceDetails.serviceName === "group reservation"
										? Number(s.quantity) + Number(s.quantity_Children)
										: 0}
								</td>
								<td style={{ width: "15px" }}>{s.chosenBusStation.address}</td>
								<td style={{ width: "15px" }}>
									{s.busSeatsCount && s.busSeatsCount > 0
										? s.busSeatsCount
										: s.chosenBusStation.address === "NO BUS NEEDED"
										? 0
										: Number(s.quantity) + Number(s.quantity_Children)}
								</td>
								<td style={{ width: "15px" }}>{s.totalAmountBeforeDiscount}</td>

								<td
									style={{
										background:
											s.status === "Paid"
												? "green"
												: s.status === "Cancelled"
												? "#871402"
												: "var(--mainBlue)",
										color: "white",
										width: "15px",
									}}>
									{s.totalAmount}
								</td>
								<td>
									<select
										className='form-control'
										onChange={(e) => handleStatusChange(e, s._id)}
										style={{
											border: "#cfcfcf solid 1px",
											borderRadius: "5px",
											width: "100%",
											fontSize: "0.8rem",
											padding: "0px",
											// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
										}}>
										<option>{s.status}</option>
										{s.status === "Paid" ? null : (
											<Fragment>
												{statusValues &&
													statusValues.map((status, index) => (
														<option key={index} value={status}>
															{status}
														</option>
													))}
											</Fragment>
										)}
									</select>
								</td>
								<td style={{ width: "10px" }}>{s.reservationBelongsTo}</td>
							</tr>
						))}
					</tbody>
				</table>
			</Summary>
		);
	};

	const DownloadExcel = () => {
		return (
			<ExcelFile
				filename={`Reservations ${new Date().toLocaleString("en-US", {
					timeZone: "Africa/Cairo",
				})}`}
				element={
					<Button
						bsStyle='info'
						style={{
							backgroundColor: "black",
							color: "white",
							borderRadius: "10px",
							marginLeft: "10%",
						}}>
						{" "}
						Download Report{" "}
					</Button>
				}>
				<ExcelSheet data={excelDataSet} name='Reservations'>
					<ExcelColumn label='Id' value='id' />
					<ExcelColumn label='Full Name' value='fullName' />
					<ExcelColumn label='Phone #' value='PhoneNumber' />
					<ExcelColumn label='Customer Email' value='ClientEmail' />
					<ExcelColumn
						label='Reserved Tickets Count Adults'
						value='TicketsCount_Adults'
					/>
					<ExcelColumn
						label='Reserved Tickets Count Children'
						value='TicketsCount_Children'
					/>
					<ExcelColumn label='Booked On' value='BookedOn' />
					<ExcelColumn label='Event Date' value='ScheduleDate' />
					<ExcelColumn label='Event/Ocassion' value='Event' />
					<ExcelColumn label='Chosen Package' value='ChosenPackage' />
					<ExcelColumn label='Booking Source' value='BookingSource' />
					<ExcelColumn label='Price' value='PackagePrice' />
					<ExcelColumn
						label='Price After Discount'
						value='PackagePrice_Discount'
					/>
					<ExcelColumn label='Status' value='Status' />
					<ExcelColumn label='Total Amount' value='totalAmount' />
					<ExcelColumn
						label='Reservation Belongs To'
						value='reservationBelongsTo'
					/>

					<ExcelColumn label='Reservation Comment' value='appointmentComment' />
					<ExcelColumn label='Breakfast' value='BreakfastMeals' />
					<ExcelColumn label='Lunch' value='LunchMeals' />
					<ExcelColumn label='Bus Location' value='busLocation' />
					<ExcelColumn label='Bus Seats' value='BusSeats' />
				</ExcelSheet>
			</ExcelFile>
		);
	};

	const showOrdersLength = () => {
		if (HistBookings && HistBookings.length > 0) {
			return (
				<ShowOrderLength>
					<h3 className='overall-schedules1'>
						Overall Reservations: {HistBookings && HistBookings.length}{" "}
						Reservations
					</h3>
				</ShowOrderLength>
			);
		} else {
			return <h1 className='text-danger mx-auto'>No Reservations</h1>;
		}
	};

	return (
		<AdminDashboardWrapper>
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
				<div
					className='container'
					style={{
						textAlign: "center",
						fontSize: "1.8rem",
						color: "darkslategray",
						fontWeight: "bold",
					}}>
					Loading...
				</div>
			) : (
				<React.Fragment>
					{showOrdersLength()}
					<br />

					{allReservationsDetails()}
				</React.Fragment>
			)}
		</AdminDashboardWrapper>
	);
};

export default AdminDashboard;

const AdminDashboardWrapper = styled.div`
	margin-bottom: 100px;
	min-height: 600px;
`;

const Summary = styled.div`
	margin-right: 20px;
	margin-left: 20px;
	overflow-x: auto;
	@media (max-width: 1100px) {
		font-size: 0.5rem;
		margin-right: 5px;
		margin-left: 5px;
	}
`;

const ShowOrderLength = styled.div`
	.overall-schedules1 {
		font-style: italic;
		font-size: 1.5rem;
		text-align: center;
		font-weight: bold;
		margin-top: 30px;
		background-color: var(--primaryColor);
		padding: 7px;
		border-radius: 20px;
		color: white;
		margin-right: 400px;
		margin-left: 400px;
		border: 2px solid black;
		box-shadow: 3px 2px 2px 2px rgb(0, 0, 0, 0.3);
	}

	@media (max-width: 1100px) {
		.overall-schedules1 {
			margin-left: 10px;
			margin-right: 10px;
			margin-top: 10px;
			margin-bottom: 5px;
			font-size: 1rem;
		}
	}
`;
