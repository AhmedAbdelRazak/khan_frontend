/** @format */

import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import Adminsidebar from "./AdminSideBar/Adminsidebar";
import DarkBG from "./AdminSideBar/DarkBG";
// eslint-disable-next-line
import { Button } from "antd";
import {
	getPreviousBookingsAdmin,
	updateOrderStatus,
	getStatusValues,
} from "./apiAdmin";
// import ReactExport from "react-export-excel";

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const AdminDashboard = () => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);
	const [loading, setLoading] = useState(true);
	const [HistBookings, setHistBookings] = useState([]);
	// eslint-disable-next-line
	const [excelDataSet, setExcelDataSet] = useState([]);
	const [statusValues, setStatusValues] = useState([]);
	const [q, setQ] = useState("");
	const [clickedButton, setClickedButton] = useState("Select All");
	const [selectedDate, setSelectedDate] = useState(new Date());

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
			const TotalAppointmentsA = a.scheduledDate;
			const TotalAppointmentsB = b.scheduledDate;
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
					setHistBookings(
						data
							.filter(
								(i) =>
									new Date(i.scheduledDate).setHours(0, 0, 0, 0) <=
										new Date(selectedDate).setHours(0, 0, 0, 0) ||
									new Date(i.scheduledDate).setHours(0, 0, 0, 0) >
										new Date(selectedDate).setHours(0, 0, 0, 0),
							)
							.sort(compareTotalAppointments),
					);
				} else if (clickedButton === "Today" || clickedButton === "Yesterday") {
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
				} else {
					setHistBookings(data.sort(compareTotalAppointments));
				}

				setExcelDataSet(
					data.sort(compareTotalAppointments) &&
						data.sort(compareTotalAppointments).map((data, i) => {
							return {
								id: i + 1,
								fullName: data.fullName,
								PhoneNumber: data.phoneNumber,
								ClientEmail: data.scheduledByUserEmail,
								TicketsCount: data.quantity,
								BookedOn: new Date(data.createdAt).toDateString(),
								ScheduleDate: new Date(data.scheduledDate).toDateString(),
								Receipt: data.phoneNumber,
								Event: data.event,
								ChosenPackage: data.chosenService_Package,
								PackagePrice: data.chosenServiceDetails.servicePrice,
								PackagePrice_Discount:
									data.chosenServiceDetails.servicePriceDiscount,
								Status: data.status,
							};
						}),
				);

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
		loadStatusValues();
		loadHistReservations();

		// eslint-disable-next-line
	}, [clickedButton]);

	function search(orders) {
		return orders.filter((row) => {
			var datesYaba = new Date(row.scheduledDate).toLocaleDateString();
			return (
				row.fullName.toLowerCase().indexOf(q) > -1 ||
				row.phoneNumber.toString().toLowerCase().indexOf(q) > -1 ||
				datesYaba.toString().toLowerCase().indexOf(q) > -1 ||
				row._id.substring(0, 10).toString().toLowerCase().indexOf(q) > -1 ||
				row.scheduledByUserEmail.toString().toLowerCase().indexOf(q) > -1 ||
				row.status.toString().toLowerCase().indexOf(q) > -1 ||
				row.phoneNumber.toString().toLowerCase().indexOf(q) > -1
			);
		});
	}

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

	const allReservationsDetails = () => {
		return (
			<Summary>
				<div>
					<span
						style={{
							fontSize: "1.3rem",
							fontWeight: "bold",
							marginBottom: "10px",
							marginLeft: "10px",
							color: "var(--mainBlue)",
						}}>
						Filters:
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
						className='ml-1 p-2'>
						Select All
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
						className='ml-1 p-2'>
						Today
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
						This Week
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
						This Month
					</button>
				</div>

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
						onChange={(e) => setQ(e.target.value.toLowerCase())}
						placeholder='Search By Client Phone, Client Name, Package Name'
						style={{ borderRadius: "20px", width: "50%" }}
					/>
				</div>
				{/* <div className='my-3'>{DownloadExcel()}</div> */}
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
							<th scope='col'>Receipt #</th>
							<th scope='col'>Event/Ocassion</th>
							<th scope='col'>Chosen Package</th>
							<th scope='col'>Package Price (L.E.)</th>
							<th scope='col'>Package Price Discount (L.E.)</th>
							<th scope='col'>Before Discount (L.E.)</th>
							<th scope='col'>Total Amount (L.E.)</th>
							<th scope='col'>Status</th>
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
								<td>{s.scheduledByUserEmail}</td>
								<td style={{ width: "10px" }}>{s.quantity}</td>
								<td style={{ width: "10px" }}>{s.quantity_Children}</td>
								<td>{new Date(s.createdAt).toLocaleString()}</td>
								<td>
									{new Date(s.scheduledDate).toLocaleString()} <br />
								</td>
								<td>+{s.phoneNumber}</td>
								<td>{s.event}</td>
								<td>{s.chosenServiceDetails.serviceName}</td>
								<td style={{ width: "15px" }}>
									{s.chosenServiceDetails.servicePrice}
								</td>
								<td style={{ width: "15px" }}>
									{s.chosenServiceDetails.servicePriceDiscount}
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
							</tr>
						))}
					</tbody>
				</table>
			</Summary>
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
			return <h1 className='text-danger'>No Schedules</h1>;
		}
	};

	// const DownloadExcel = () => {
	// 	return (
	// 		<ExcelFile
	// 			filename={`Appointments ${new Date().toLocaleString()}`}
	// 			element={
	// 				<Button
	// 					bsStyle='info'
	// 					style={{
	// 						backgroundColor: "black",
	// 						color: "white",
	// 						borderRadius: "10px",
	// 						marginLeft: "10%",
	// 					}}>
	// 					{" "}
	// 					Download Report{" "}
	// 				</Button>
	// 			}>
	// 			<ExcelSheet data={excelDataSet} name='Appointments'>
	// 				<ExcelColumn label='Id' value='id' />
	// 				<ExcelColumn label='First Name' value='FirstName' />
	// 				<ExcelColumn label='Last Name' value='LastName' />
	// 				<ExcelColumn label='Phone #' value='PhoneNumber' />
	// 				<ExcelColumn label='Customer Email' value='ClientEmail' />
	// 				<ExcelColumn label='Reserved Tickets Count' value='TicketsCount' />
	// 				<ExcelColumn label='Booked On' value='BookedOn' />
	// 				<ExcelColumn label='Reservation Date' value='ScheduleDate' />
	// 				<ExcelColumn label='Receipt' value='Receipt' />
	// 				<ExcelColumn label='Event/Ocassion' value='Event' />
	// 				<ExcelColumn label='Chosen Package' value='ChosenPackage' />
	// 				<ExcelColumn label='Price' value='PackagePrice' />
	// 				<ExcelColumn
	// 					label='Price After Discount'
	// 					value='PackagePrice_Discount'
	// 				/>
	// 				<ExcelColumn label='Status' value='Status' />
	// 			</ExcelSheet>
	// 		</ExcelFile>
	// 	);
	// };

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
