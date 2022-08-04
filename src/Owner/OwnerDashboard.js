/** @format */

// eslint-disable-next-line
import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../auth";
import "antd/dist/antd.min.css";
import { Link } from "react-router-dom";
import Adminsidebar from "./AdminSideBar/Adminsidebar";
// eslint-disable-next-line
import { toast } from "react-toastify";
import DarkBG from "./AdminSideBar/DarkBG";
// eslint-disable-next-line
import { Button } from "antd";
import { getPreviousBookingsOwner, getStatusValues } from "./OwnerAPI";
import ExecutiveSummary from "./ExecutiveSummary";
import { DatePicker } from "antd";
import moment from "moment";

import ReactExport from "react-export-excel";
// import ExcelToJson from "./ExcelToJson";

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
	// eslint-disable-next-line
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

	const dateFormat = (x) => {
		var requiredDate = new Date(x);
		var yyyy = requiredDate.getFullYear();
		let mm = requiredDate.getMonth() + 1; // Months start at 0!
		let dd = requiredDate.getDate();

		if (dd < 10) dd = "0" + dd;
		if (mm < 10) mm = "0" + mm;

		return (requiredDate = dd + "/" + mm + "/" + yyyy);
	};

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
		getPreviousBookingsOwner(user._id, token).then((data) => {
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
								Event: data.event,
								ChosenPackage: data.chosenService_Package,
								BookingSource: data.bookedFrom,
								PackagePrice: data.chosenServiceDetails.servicePrice,
								PackagePrice_Discount:
									data.chosenServiceDetails.servicePriceDiscount,
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
									Event: data.event,
									ChosenPackage: data.chosenService_Package,
									BookingSource: data.bookedFrom,
									PackagePrice: data.chosenServiceDetails.servicePrice,
									PackagePrice_Discount:
										data.chosenServiceDetails.servicePriceDiscount,
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
									Event: data.event,
									ChosenPackage: data.chosenService_Package,
									BookingSource: data.bookedFrom,
									PackagePrice: data.chosenServiceDetails.servicePrice,
									PackagePrice_Discount:
										data.chosenServiceDetails.servicePriceDiscount,
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
								Event: data.event,
								ChosenPackage: data.chosenService_Package,
								BookingSource: data.bookedFrom,
								PackagePrice: data.chosenServiceDetails.servicePrice,
								PackagePrice_Discount:
									data.chosenServiceDetails.servicePriceDiscount,
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
			}
		});
	};

	// console.log(excelDataSet, "excelDataSet");

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
		loadStatusValues();
		loadHistReservations();

		// eslint-disable-next-line
	}, [clickedButton, selectedDate]);

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

	const allReservationsDetails = () => {
		return (
			<Summary>
				<div className=' mb-3 form-group mx-3 text-center'>
					<label
						className='mt-3 mx-3'
						style={{
							fontWeight: "bold",
							fontSize: "1.05rem",
							color: "black",
							borderRadius: "20px",
						}}>
						البحث
					</label>
					<input
						className='p-2 my-5 '
						type='text'
						value={q}
						onChange={(e) => setQ(e.target.value.toLowerCase())}
						placeholder='البحث عن طريق هاتف العميل واسم العميل واسم التذكرة'
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
							<th scope='col'>الاسم الكامل</th>
							<th scope='col'>رقم الهاتف</th>
							<th scope='col'>البريد الإلكتروني للعميل</th>
							<th scope='col'>عدد التذاكر (الكبار)</th>
							<th scope='col'>عدد التذاكر (للأطفال)</th>
							<th scope='col'>حجزت في التاريخ</th>
							<th scope='col'>تاريخ وصول العميل</th>
							<th scope='col'>الحدث / المناسبة</th>
							<th scope='col'>التذكرة</th>
							<th scope='col'>مصدر الحجز</th>
							<th scope='col'>إجمالي الوجبات (الإفطار)</th>
							<th scope='col'>إجمالي الوجبات (وجبات الغداء)</th>
							<th scope='col'>موقع الحافلة</th>
							<th scope='col'>مقاعد الحافلات المحجوزة</th>
							<th scope='col'>قبل الخصم (بالجنية)</th>
							<th scope='col'>المبلغ الإجمالي (جنيه)</th>
							<th scope='col'>الحجز يعود إلى</th>
						</tr>
					</thead>

					<tbody>
						{search(HistBookings).map((s, i) => {
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
											to={`/admin/update-reservation/${s._id}`}>
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
										{new Date(s.scheduledDate).toLocaleString() !==
										"Invalid Date"
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
											: s.chosenServiceDetails.serviceName ===
											  "group reservation"
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
									<td style={{ width: "15px" }}>
										{s.chosenBusStation.address}
									</td>
									<td style={{ width: "15px" }}>
										{s.busSeatsCount && s.busSeatsCount > 0
											? s.busSeatsCount
											: s.chosenBusStation.address === "NO BUS NEEDED"
											? 0
											: Number(s.quantity) + Number(s.quantity_Children)}
									</td>
									<td style={{ width: "15px" }}>
										{s.totalAmountBeforeDiscount}
									</td>

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

									<td style={{ width: "10px" }}>{s.reservationBelongsTo}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</Summary>
		);
	};

	// const showOrdersLength = () => {
	// 	if (HistBookings && HistBookings.length > 0) {
	// 		return (
	// 			<ShowOrderLength>
	// 				<h3 className='overall-schedules1'>
	// 					Overall Reservations: {HistBookings && HistBookings.length}{" "}
	// 					Reservations
	// 				</h3>
	// 			</ShowOrderLength>
	// 		);
	// 	} else {
	// 		return <h1 className='text-danger'>No Schedules</h1>;
	// 	}
	// };

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

	// console.log(
	// 	HistBookings.filter(
	// 		(i) =>
	// 			new Date(i.scheduledDate).setHours(0, 0, 0, 0) >=
	// 				new Date(last7Days).setHours(0, 0, 0, 0) &&
	// 			new Date(i.scheduledDate).setHours(0, 0, 0, 0) <
	// 				new Date(today).setHours(0, 0, 0, 0),
	// 	),
	// 	"HistBookings",
	// );

	// const disabledDate = (current) => {
	// 	// Can not select days before today and today
	// 	return current <= moment();
	// };

	return (
		<AdminDashboardWrapper dir='rtl'>
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
					<div className='mx-auto text-center mt-3 mb-5'>
						<span
							style={{
								fontSize: "1.3rem",
								fontWeight: "bold",
								marginBottom: "10px",
								marginLeft: "10px",
								color: "var(--mainBlue)",
							}}>
							تاريخ الوصول:
						</span>
						<br />
						<button
							onClick={() => {
								setClickedButton("Select All");
								setSelectedDate(today);
							}}
							style={{
								color: "white",
								backgroundColor: "var(--mainBlue)",
								border: "none",
							}}
							className='ml-1 p-2 mt-3'>
							اختر الكل
						</button>
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
							الامس
						</button>
						<button
							onClick={() => {
								setClickedButton("This Week");
								setSelectedDate(next7Days);
							}}
							style={{
								color: "black",
								backgroundColor: "#d9f9fe",
								border: "none",
							}}
							className='ml-1 p-2'>
							هذا الاسبوع
						</button>
						<button
							onClick={() => {
								setClickedButton("This Month");
								setSelectedDate(next30Days);
							}}
							style={{
								color: "white",
								backgroundColor: "#fc3e84",
								border: "none",
							}}
							className='ml-1 p-2'>
							هذا الشهر
						</button>
						<DatePicker
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
						/>
					</div>

					<ExecutiveSummary
						historicalBooking={HistBookings}
						clickedButton={clickedButton}
					/>
					<hr />
					{/* <ExcelToJson /> */}
					{/* {showOrdersLength()} */}
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

	hr {
		margin: 0px 200px;
	}
`;

const Summary = styled.div`
	margin-right: 20px;
	margin-left: 20px;
	overflow-x: auto;

	.deleteButton {
		padding: 5px;
		border: none;
		border-radius: 3px;
		cursor: pointer;
		color: black;
		background: #ffcfcf;
	}

	@media (max-width: 1100px) {
		font-size: 0.5rem;
		margin-right: 5px;
		margin-left: 5px;
	}
`;

// eslint-disable-next-line
const ShowOrderLength = styled.div`
	.overall-schedules1 {
		/* font-style: italic; */
		font-size: 1.5rem;
		text-align: center;
		font-weight: bold;
		margin-top: 30px;
		background-color: var(--orangePrimary);
		padding: 7px;
		border-radius: 10px;
		color: white;
		margin-right: 400px;
		margin-left: 400px;
		/* border: 2px solid black; */
		box-shadow: 3px 2px 2px 2px rgb(0, 0, 0, 0.2);
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
