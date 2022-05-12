/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../auth";
import Adminsidebar from "./AdminSideBar/Adminsidebar";
import DarkBG from "./AdminSideBar/DarkBG";
// eslint-disable-next-line
import { Button } from "antd";
import { getPreviousBookingsAdmin } from "./apiAdmin";
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
	const [q, setQ] = useState("");

	//Admin Auth
	// eslint-disable-next-line
	const { user, token } = isAuthenticated();

	useEffect(() => {
		setClickMenu2(click2);
	}, [click2, clickMenu2]);

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
				setHistBookings(data.sort(compareTotalAppointments));
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

	useEffect(() => {
		loadHistReservations();

		// eslint-disable-next-line
	}, []);

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
				{/* <div className='my-3'>{DownloadExcel()}</div> */}
				<table
					className='table table-bordered table-md-responsive table-hover table-striped'
					style={{ fontSize: "0.75rem" }}>
					<thead className='thead-light'>
						<tr>
							<th scope='col'>#</th>
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
							<th scope='col'>Status</th>
						</tr>
					</thead>

					<tbody>
						{search(HistBookings).map((s, i) => (
							<tr key={i}>
								<td>{i + 1}</td>
								<td>{s.fullName}</td>
								<td>{s.phoneNumber}</td>
								<td>{s.scheduledByUserEmail}</td>
								<td>{s.quantity}</td>
								<td>{s.quantity_Children}</td>
								<td>{new Date(s.createdAt).toLocaleString()}</td>
								<td>{new Date(s.scheduledDate).toLocaleString()}</td>
								<td>{s.phoneNumber}</td>
								<td>{s.event}</td>
								<td>{s.chosenServiceDetails.serviceName}</td>
								<td>{s.chosenServiceDetails.servicePrice}</td>
								<td>{s.chosenServiceDetails.servicePriceDiscount}</td>
								<td>{s.status}</td>
							</tr>
						))}
					</tbody>
				</table>
			</Summary>
		);
	};

	var todaysReservations =
		HistBookings &&
		HistBookings.filter(
			(i) =>
				new Date().setHours(0, 0, 0, 0) ===
				new Date(i.scheduledDate).setHours(0, 0, 0, 0),
		);

	const showOrdersLength = () => {
		if (HistBookings && HistBookings.length > 0) {
			return (
				<ShowOrderLength>
					<h3 className='overall-schedules1'>
						Overall Reservations: {HistBookings && HistBookings.length}{" "}
						Reservations ({todaysReservations.length} Reservations Today)
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

	console.log(HistBookings, "HistBookings");

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
