/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isAuthenticated } from "../auth";
import Adminsidebar from "./AdminSideBar/Adminsidebar";
import { toast } from "react-toastify";
import DarkBG from "./AdminSideBar/DarkBG";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
	getTickets,
	getTicketsManagement,
	updateTicketCount,
} from "./apiAdmin";

const UpdateTicketManagement = () => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);
	const [allTickets, setAllTickets] = useState([]);
	const [allTicketsManagement, setAllTicketsManagement] = useState([]);
	const [allTicketsManagementFinal, setAllTicketsManagementFinal] = useState(
		[],
	);
	const [selectedPackage, setSelectedPackage] = useState("");
	const [selectedStockDate, setSelectedStockDate] = useState(null);
	const [selectedTicketManagement, setSelectedTicketManagement] =
		useState(null);

	//main updated package
	const [allTickets_updated, setAllTickets_updated] = useState([]);
	// eslint-disable-next-line
	const [allTicketsManagement_updated, setAllTicketsManagement_updated] =
		useState([]);
	// eslint-disable-next-line
	const [prevAddedTicketIds_updated, setPrevAddedTicketIds_updated] = useState(
		[],
	);
	const [StockDate_updated, setStockDate_updated] = useState(new Date());
	const [ticket_updated, setTicket_updated] = useState("");
	const [ticketId_updated, setTicketId_updated] = useState("");
	const [TicketAmount_updated, setTicketAmount_updated] = useState("");

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
				setAllTickets_updated(data);
			}
		});
	};

	const gettingAllTicketsManagement = () => {
		getTicketsManagement(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllTicketsManagement(
					data.filter(
						(i) =>
							i.ticket.serviceName === selectedPackage &&
							new Date(i.StockDate).setHours(0, 0, 0, 0) >=
								new Date().setHours(0, 0, 0, 0),
					),
				);

				setAllTicketsManagementFinal(
					data.filter(
						(i) =>
							i.ticket.serviceName === selectedPackage &&
							new Date(i.StockDate).setHours(0, 0, 0, 0) ===
								new Date(selectedStockDate).setHours(0, 0, 0, 0),
					),
				);

				//for updated section
				setAllTicketsManagement_updated(
					data.map((i) => new Date(i.StockDate).toLocaleDateString()),
				);

				setPrevAddedTicketIds_updated(
					data
						.filter(
							(ii) =>
								new Date(ii.StockDate).setHours(0, 0, 0, 0) ===
								new Date(StockDate_updated).setHours(0, 0, 0, 0),
						)
						.map((i) => i.ticket.serviceName),
				);

				setStockDate_updated(
					selectedTicketManagement &&
						new Date(selectedTicketManagement.StockDate),
				);

				setTicketAmount_updated(
					selectedTicketManagement && selectedTicketManagement.TicketAmount,
				);
				setTicketId_updated(
					selectedTicketManagement && selectedTicketManagement.ticket._id,
				);

				setTicket_updated(
					selectedTicketManagement &&
						selectedTicketManagement.ticket.serviceName,
				);
			}
		});
	};

	useEffect(() => {
		gettingAllTickets();
		gettingAllTicketsManagement();
		// eslint-disable-next-line
	}, [selectedPackage, selectedStockDate]);

	console.log(allTicketsManagementFinal, "allTicketsManagementFinal");
	console.log(selectedTicketManagement, "selectedTicketManagement");

	const handleChange1 = (e) => {
		console.log(e, "From HandleChange1");
		setStockDate_updated(e);
	};

	const handleChange2 = (e) => {
		setTicket_updated(e.target.value);
		setTicketId_updated(
			allTickets_updated &&
				allTickets_updated.filter((i) => i.serviceName === e.target.value) &&
				allTickets_updated.filter((i) => i.serviceName === e.target.value)[0] &&
				allTickets_updated.filter((i) => i.serviceName === e.target.value)[0]
					._id,
		);
	};

	const handleChange3 = (e) => {
		setTicketAmount_updated(e.target.value);
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		if (!ticket_updated || !StockDate_updated || !TicketAmount_updated) {
			return toast.error("Please fill in all required fields");
		}

		// make request to api to create service
		updateTicketCount(selectedTicketManagement._id, user._id, token, {
			StockDate: StockDate_updated,
			ticket: ticketId_updated,
			TicketAmount: TicketAmount_updated,
		}).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				toast.success("Ticket Stock was successfully Added.");
				window.scrollTo({ top: 0, behavior: "smooth" });
				setSelectedPackage(null);
				setSelectedStockDate(null);
				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			}
		});
	};

	return (
		<UpdateTicketManagementWrapper>
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
			<div className='col-md-10 mx-auto firstLinks'>
				<ul className='text-center'>
					{allTickets &&
						allTickets.map((t, i) => {
							return (
								<li
									className=' ml-4 mt-2'
									key={i}
									style={{
										textTransform: "capitalize",
										fontWeight: "bold",
										// letterSpacing: "1px",
									}}>
									<Link
										to='#'
										onClick={() => {
											setSelectedPackage(t.serviceName);
											setSelectedStockDate(null);
										}}>
										{t.serviceName}
									</Link>
								</li>
							);
						})}
				</ul>
			</div>
			{selectedPackage && allTicketsManagement.length > 0 ? (
				<div className='col-md-10 mx-auto secondLinks mt-4'>
					<div className='row'>
						<div className='col-md-5 mx-auto'>
							<h4 className='my-3' style={{ textTransform: "capitalize" }}>
								Update Stock For "{selectedPackage}"
							</h4>
							<ul>
								{allTicketsManagement &&
									allTicketsManagement.map((tt, ii) => {
										return (
											<li key={ii} className='my-3'>
												<Link
													to='#'
													onClick={() => {
														setSelectedStockDate(tt.StockDate);
														setSelectedTicketManagement(tt);
													}}>
													{new Date(tt.StockDate).toLocaleDateString()}{" "}
													<span className='ml-4' style={{ color: "black" }}>
														Ticket Count: {tt.TicketAmount} Tickets
													</span>
												</Link>
											</li>
										);
									})}
							</ul>
						</div>

						{selectedStockDate &&
						selectedPackage &&
						allTicketsManagementFinal.length > 0 ? (
							<div className='col-md-6 mx-auto'>
								<h4 className='my-3' style={{ textTransform: "capitalize" }}>
									Update Stock on "{new Date(selectedStockDate).toDateString()}"
								</h4>
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
										{ticket_updated && ticket_updated !== "Select Package" ? (
											<option
												className='items text-muted inputFields'
												style={{ textTransform: "capitalize" }}>
												{ticket_updated}
											</option>
										) : (
											<option className='items text-muted inputFields'>
												Select Package
											</option>
										)}

										{allTickets_updated &&
											allTickets_updated.map((t, i) => (
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
										selected={StockDate_updated}
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
										value={TicketAmount_updated}
										required
										placeholder='Count Of Tickets in the selected date'
									/>
								</div>
								<div className='mx-auto text-center w-50'>
									<button
										className='btn btn-outline-primary mb-3 w-50 '
										onClick={clickSubmit}>
										Update
									</button>
								</div>
							</div>
						) : null}
					</div>
				</div>
			) : null}
		</UpdateTicketManagementWrapper>
	);
};

export default UpdateTicketManagement;

const UpdateTicketManagementWrapper = styled.div`
	margin-bottom: 100px;

	.firstLinks ul > li {
		display: inline-block;
	}

	.secondLinks ul > li {
		list-style: none;
	}

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
