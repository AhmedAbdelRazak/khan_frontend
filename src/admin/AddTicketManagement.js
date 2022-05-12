/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Adminsidebar from "./AdminSideBar/Adminsidebar";
import DarkBG from "./AdminSideBar/DarkBG";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
	createTicketCount,
	getTickets,
	getTicketsManagement,
} from "./apiAdmin";
import { isAuthenticated } from "../auth";

const AddTicketManagement = () => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);
	const [allTickets, setAllTickets] = useState([]);
	const [allTicketsManagement, setAllTicketsManagement] = useState([]);
	const [prevAddedTicketIds, setPrevAddedTicketIds] = useState([]);
	const [StockDate, setStockDate] = useState(new Date());
	const [ticket, setTicket] = useState("");
	const [ticketId, setTicketId] = useState("");
	const [TicketAmount, setTicketAmount] = useState("");

	// destructure user and token from localstorage
	// eslint-disable-next-line
	const { user, token } = isAuthenticated();

	useEffect(() => {
		setClickMenu2(click2);
	}, [click2, clickMenu2]);

	const gettingAllTickets = () => {
		getTickets(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllTickets(data);
			}
		});
	};

	const gettingAllTicketsManagement = () => {
		getTicketsManagement(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllTicketsManagement(
					data.map((i) => new Date(i.StockDate).toLocaleDateString()),
				);

				setPrevAddedTicketIds(
					data
						.filter(
							(ii) =>
								new Date(ii.StockDate).setHours(0, 0, 0, 0) ===
								new Date(StockDate).setHours(0, 0, 0, 0),
						)
						.map((i) => i.ticket.serviceName),
				);
			}
		});
	};

	useEffect(() => {
		gettingAllTickets();
		gettingAllTicketsManagement();
		// eslint-disable-next-line
	}, [StockDate]);

	const handleChange1 = (e) => {
		setStockDate(e);
	};

	const handleChange2 = (e) => {
		setTicket(e.target.value);
		setTicketId(
			allTickets &&
				allTickets.filter((i) => i.serviceName === e.target.value) &&
				allTickets.filter((i) => i.serviceName === e.target.value)[0] &&
				allTickets.filter((i) => i.serviceName === e.target.value)[0]._id,
		);
	};

	const handleChange3 = (e) => {
		setTicketAmount(e.target.value);
	};

	// console.log(StockDate);
	// console.log(ticketId, "ticketId");
	// console.log(allTicketsManagement, "allTicketsManagement");
	// console.log(prevAddedTicketIds, "prevAddedTicketIds");

	const ticketManagementForm = () => {
		return (
			<form onSubmit={clickSubmit}>
				<div className='row'>
					<div className='form-group col-md-10 mx-auto'>
						<label className='text-muted'>Select a Package</label>
						<br />
						<select
							onChange={handleChange2}
							placeholder='Select a Time'
							className='inputFields mb-3'
							style={{
								paddingTop: "8px",
								paddingBottom: "8px",
								paddingRight: "140px",
								// textAlign: "center",
								border: "#cfcfcf solid 1px",
								borderRadius: "10px",
								width: "100%",
								fontSize: "0.9rem",
								// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
								textTransform: "capitalize",
							}}>
							{ticket && ticket !== "Select Package" ? (
								<option
									className='items text-muted inputFields'
									style={{ textTransform: "capitalize" }}>
									{ticket}
								</option>
							) : (
								<option className='items text-muted inputFields'>
									Select Package
								</option>
							)}

							{allTickets &&
								allTickets.map((t, i) => (
									<option
										key={i}
										value={t.serviceName}
										className='items'
										style={{ textTransform: "capitalize" }}
										// onChange={() => setServiceDetails(i)}
									>
										{t.serviceName}
									</option>
								))}
						</select>
					</div>

					<div className='form-group col-md-10 mx-auto'>
						<label className='text-muted'>Stock Date</label>
						<DatePicker
							selected={StockDate}
							onChange={handleChange1}
							minDate={new Date()}
							// maxDate={}
							// filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0} //To exclude weekends
							isClearable={true}
							showYearDropdown
							scrollableMonthYearDropdown
						/>
					</div>

					<div className='form-group col-md-10 mx-auto mt-3 mb-5'>
						<label className='text-muted'>Total Amount/Count</label>
						<input
							type='number'
							className='form-control'
							onChange={handleChange3}
							value={TicketAmount}
							required
							placeholder='Count Of Tickets in the selected date'
						/>
					</div>
				</div>
				<div className='mx-auto text-center w-50'>
					<button className='btn btn-outline-primary mb-3 w-50 '>
						Add Ticket Stock
					</button>
				</div>
			</form>
		);
	};

	let matchingDate =
		allTicketsManagement &&
		allTicketsManagement.indexOf(new Date(StockDate).toLocaleDateString()) !==
			-1;

	let matchingServiceName =
		prevAddedTicketIds && prevAddedTicketIds.indexOf(ticket) !== -1;

	const clickSubmit = (e) => {
		e.preventDefault();
		if (!ticket || !StockDate || !TicketAmount) {
			return toast.error("Please fill in all required fields");
		}

		if (matchingDate && matchingServiceName) {
			return toast.error(
				"Stock Date Was Already Added, Please select another date",
			);
		}

		// make request to api to create service
		createTicketCount(user._id, token, {
			StockDate,
			ticket: ticketId,
			TicketAmount,
		}).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				toast.success("Ticket Stock was successfully Added.");
				window.scrollTo({ top: 0, behavior: "smooth" });
				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			}
		});
	};

	return (
		<AddTicketManagementWrapper>
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
			<div
				className='col-md-8 col-sm-6 offset-md-2 mt-3 mx-auto p-3'
				style={{
					border: "1px black solid",
					borderRadius: "20px",
					marginBottom: "200px",
				}}>
				<h3 className='mt-1 mb-3 text-center'>Set Tickets / Packages Stock</h3>
				<ToastContainer />

				{ticketManagementForm()}
			</div>
		</AddTicketManagementWrapper>
	);
};

export default AddTicketManagement;

const AddTicketManagementWrapper = styled.div`
	margin-bottom: 100px;
	.react-datepicker__input-container input {
		width: 100% !important;
		padding: 5px 0px;
		border: 1px solid lightGrey;
	}

	.react-datepicker__input-container input {
		width: 100% !important;
		padding: 5px 10px;
		border: 1px solid lightGrey;
		border-radius: 10px;
	}

	.react-datepicker__close-icon::after {
		cursor: pointer;
		background-color: black;
		color: #fff;
		border-radius: 50%;
		height: 20px;
		width: 20px;
		padding: 5px;
		font-size: 12px;
		line-height: 1;
		text-align: center;
		display: table-cell;
		vertical-align: middle;
		content: "×";
	}

	input {
		padding: 5px 10px;
		border-radius: 10px;
	}
`;
