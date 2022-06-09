/** @format */
// eslint-disable-next-line
import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../auth";
import "antd/dist/antd.min.css";
import { Link } from "react-router-dom";
import Adminsidebar from "./AdminSideBar/Adminsidebar";
import { toast } from "react-toastify";
import DarkBG from "./AdminSideBar/DarkBG";
// eslint-disable-next-line
import { Button } from "antd";
import {
	getPreviousBookingsAdmin,
	updateOrderStatus,
	getStatusValues,
	removeReservation,
	getPreviousUncompleteBookingsAdmin,
} from "./apiAdmin";
import ExecutiveSummary from "./ExecutiveSummary";

import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const UncompleteForm = () => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);
	const [loading, setLoading] = useState(true);
	// eslint-disable-next-line
	const [HistBookings, setHistBookings] = useState([]);
	// eslint-disable-next-line
	const [secondNextClicked, setSecondNextClicked] = useState([]);
	const [uncompleteClients, setUncompleteClients] = useState([]);
	// eslint-disable-next-line
	const [excelDataSet, setExcelDataSet] = useState([]);
	// eslint-disable-next-line
	const [statusValues, setStatusValues] = useState([]);
	const [q, setQ] = useState("");

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
		getPreviousBookingsAdmin(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setHistBookings(data.sort(compareTotalAppointments));

				getPreviousUncompleteBookingsAdmin(user._id, token).then((data2) => {
					setLoading(true);

					if (data2.error) {
						console.log(data2.error);
					} else {
						setSecondNextClicked(data2.sort(compareTotalAppointments));

						setUncompleteClients(
							data2
								.filter(
									(x) =>
										!data.map((y) => y.phoneNumber).includes(x.phoneNumber),
								)
								.sort(compareTotalAppointments),
						);

						setLoading(false);
					}
				});

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
	}, []);

	// console.log(secondNextClicked);
	// console.log(uncompleteClients, "uncompleteClients");

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
				row.phoneNumber.toString().toLowerCase().indexOf(q) > -1 ||
				row.chosenServiceDetails.serviceName
					.toString()
					.toLowerCase()
					.indexOf(q) > -1
			);
		});
	}

	// eslint-disable-next-line
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

	// eslint-disable-next-line
	const handleRemove = (reservationId) => {
		if (window.confirm("Delete Reservation?")) {
			setLoading(true);
			removeReservation(reservationId, user._id, token)
				.then((res) => {
					loadHistReservations(); // load all Reservations
					setLoading(false);
					toast.error(`Reservation "${res.data.name}" deleted`);
				})
				.catch((err) => console.log(err));
		}
	};

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
							<th scope='col'>Receipt #</th>
							<th scope='col'>Event/Ocassion</th>
							<th scope='col'>Chosen Package</th>
							<th scope='col'>Package Price (L.E.)</th>
							<th scope='col'>Package Price Discount (L.E.)</th>
							<th scope='col'>Before Discount (L.E.)</th>
							<th scope='col'>Total Amount (L.E.)</th>
						</tr>
					</thead>

					<tbody>
						{search(uncompleteClients).map((s, i) => {
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
									<td>{s.scheduledByUserEmail}</td>
									<td style={{ width: "10px" }}>{s.quantity}</td>
									<td style={{ width: "10px" }}>{s.quantity_Children}</td>
									<td>
										{dateFormat(
											new Date(s.createdAt).toLocaleString("en-US", {
												timeZone: "Africa/Cairo",
											}),
										)}
									</td>
									{/* <td>
										{new Date(s.scheduledDate).toLocaleDateString() !==
										"Invalid Date"
											? dateFormat(new Date(s.scheduledDate).toLocaleString())
											: dateFormat(
													new Date(s.createdAt).toLocaleString("en-US", {
														timeZone: "Africa/Cairo",
													}),
											  )}{" "}
										<br />
									</td> */}

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
									<td>+{s.phoneNumber}</td>
									<td>{s.event}</td>
									<td>{s.chosenServiceDetails.serviceName}</td>
									<td style={{ width: "15px" }}>
										{s.chosenServiceDetails.servicePrice}
									</td>
									<td style={{ width: "15px" }}>
										{s.chosenServiceDetails.servicePriceDiscount}
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
										}}>
										{s.totalAmount}
									</td>
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
					<ExcelColumn label='Receipt' value='Receipt' />
					<ExcelColumn label='Event/Ocassion' value='Event' />
					<ExcelColumn label='Chosen Package' value='ChosenPackage' />
					<ExcelColumn label='Price' value='PackagePrice' />
					<ExcelColumn
						label='Price After Discount'
						value='PackagePrice_Discount'
					/>
					<ExcelColumn label='Status' value='Status' />
					<ExcelColumn label='Total Amount' value='totalAmount' />
				</ExcelSheet>
			</ExcelFile>
		);
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
					<ExecutiveSummary historicalBooking={uncompleteClients} />
					<hr />

					{/* {showOrdersLength()} */}
					<br />
					{allReservationsDetails()}
				</React.Fragment>
			)}
		</AdminDashboardWrapper>
	);
};

export default UncompleteForm;

const AdminDashboardWrapper = styled.div`
	margin-bottom: 100px;
	min-height: 600px;

	h4 {
		display: none !important;
	}

	hr {
		margin: 0px 200px;
	}

	button {
		display: none;
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
