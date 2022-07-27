/** @format */

import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { isAuthenticated } from "../../auth";
import Chart from "react-apexcharts";
import Adminsidebar from "../AdminSideBar/Adminsidebar";
import DarkBG from "../AdminSideBar/DarkBG";
import { getPreviousBookingsOwner } from "../OwnerAPI";
import { DatePicker } from "antd";
import CountUp from "react-countup";
import "antd/dist/antd.min.css";
import moment from "moment";

const DayOverDayOwner = () => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);
	// eslint-disable-next-line
	const [HistBookings, setHistBookings] = useState([]);
	// eslint-disable-next-line
	const [allHistBookings, setAllHistBookings] = useState([]);
	// eslint-disable-next-line
	const [loading, setLoading] = useState(true);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	//Admin Auth
	// eslint-disable-next-line
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
		getPreviousBookingsOwner(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllHistBookings(data.sort(compareTotalAppointments));
				// eslint-disable-next-line
				var nonCancelledReservation = data
					.filter((i) => i.status !== "Cancelled")
					.sort(compareTotalAppointments);

				if (!startDate || !endDate) {
					// setStartDate(
					// 	moment(
					// 		new Date(
					// 			nonCancelledReservation[
					// 				nonCancelledReservation.length - 1
					// 			].scheduledDate,
					// 		),
					// 	),
					// );

					// setEndDate(
					// 	moment(new Date(nonCancelledReservation[0].scheduledDate)),
					// );
					setHistBookings(
						data
							.filter((i) => i.status !== "Cancelled")
							.sort(compareTotalAppointments),
					);
				} else {
					setHistBookings(
						data
							.filter(
								(i) =>
									i.status !== "Cancelled" &&
									new Date(i.scheduledDate).setHours(0, 0, 0, 0) >=
										new Date(startDate).setHours(0, 0, 0, 0) &&
									new Date(i.scheduledDate).setHours(0, 0, 0, 0) <=
										new Date(endDate).setHours(0, 0, 0, 0),
							)
							.sort(compareTotalAppointments),
					);
				}

				setLoading(false);
			}
		});
	};

	useEffect(() => {
		loadHistReservations();

		// eslint-disable-next-line
	}, [startDate, endDate]);

	var DayOverDay_ScheduledDate = [];
	HistBookings &&
		HistBookings.reduce(function (res, value) {
			if (!res[value.scheduledDate]) {
				res[value.scheduledDate] = {
					scheduledDate: value.scheduledDate,
					totalAmount: 0,
				};
				DayOverDay_ScheduledDate.push(res[value.scheduledDate]);
			}
			res[value.scheduledDate].totalAmount += value.totalAmount;
			return res;
		}, {});

	console.log(DayOverDay_ScheduledDate);

	var chartDataTotalAmount = {
		options: {
			chart: {
				id: "line",
			},

			dataLabels: {
				enabled: true,
				enabledOnSeries: undefined,
				formatter: function (val, opts) {
					return val;
				},
			},

			title: {
				text: "نظرة عامة على منتجع خان خديجة يومًا بعد يوم (المبلغ الإجمالي جنيهاً)",
				align: "center",
				margin: 10,
				offsetX: 0,
				offsetY: 0,
				floating: false,
				style: {
					fontSize: "17px",
					fontWeight: "bold",
					// fontFamily: undefined,
					color: "purple",
				},
			},
			xaxis: {
				name: "تاريخ الجدول الزمني",
				categories: DayOverDay_ScheduledDate.map((i) =>
					new Date(i.scheduledDate).toLocaleDateString("en-US", {
						timeZone: "Africa/Cairo",
					}),
				),
			},
		},
		series: [
			{
				name: "إجمالي المبلغ المدفوع",
				data: DayOverDay_ScheduledDate.map((i) => i.totalAmount),
			},
		],
	};

	var DayOverDay_HeadCount = [];
	HistBookings &&
		HistBookings.reduce(function (res, value) {
			if (!res[value.scheduledDate]) {
				res[value.scheduledDate] = {
					scheduledDate: value.scheduledDate,
					quantity: 0,
				};
				DayOverDay_HeadCount.push(res[value.scheduledDate]);
			}
			res[value.scheduledDate].quantity +=
				Number(value.quantity) + Number(value.quantity_Children);
			return res;
		}, {});

	var chartDataHeadCount = {
		options: {
			chart: {
				id: "line",
			},

			dataLabels: {
				enabled: true,
				enabledOnSeries: undefined,
				formatter: function (val, opts) {
					return val;
				},
			},

			title: {
				text: "نظرة عامة على منتجع خان خديجة يومًا بعد يوم (عدد الرؤساء)",
				align: "center",
				margin: 10,
				offsetX: 0,
				offsetY: 0,
				floating: false,
				style: {
					fontSize: "17px",
					fontWeight: "bold",
					// fontFamily: undefined,
					color: "purple",
				},
			},
			xaxis: {
				name: "تاريخ الجدول الزمني",
				categories: DayOverDay_HeadCount.map((i) =>
					new Date(i.scheduledDate).toLocaleDateString("en-US", {
						timeZone: "Africa/Cairo",
					}),
				),
			},
		},
		series: [
			{
				name: "إجمالي المبلغ المدفوع",
				data: DayOverDay_HeadCount.map((i) => i.quantity),
			},
		],
	};

	var OverAllTicket_TotalAmount = [];
	HistBookings &&
		HistBookings.reduce(function (res, value) {
			if (!res[value.chosenService_Package]) {
				res[value.chosenService_Package] = {
					chosenService_Package: value.chosenService_Package,
					totalAmount: 0,
				};
				OverAllTicket_TotalAmount.push(res[value.chosenService_Package]);
			}
			res[value.chosenService_Package].totalAmount += Number(value.totalAmount);
			return res;
		}, {});

	console.log(OverAllTicket_TotalAmount, "Ticket TotalAmount");

	var chartDataTicketsSummary = {
		options: {
			chart: {
				id: "line",
			},

			dataLabels: {
				enabled: true,
				enabledOnSeries: undefined,
				formatter: function (val, opts) {
					return val;
				},
			},

			title: {
				text: "ملخص تذاكر منتجع خان خديجة حسب المبلغ الإجمالي (بالجنيه)",
				align: "center",
				margin: 10,
				offsetX: 0,
				offsetY: 0,
				floating: false,
				style: {
					fontSize: "17px",
					fontWeight: "bold",
					// fontFamily: undefined,
					color: "purple",
				},
			},
			xaxis: {
				name: "تاريخ الجدول الزمني",
				categories: OverAllTicket_TotalAmount.map((i) =>
					i.chosenService_Package.toUpperCase(),
				),
			},
		},
		series: [
			{
				name: "إجمالي المبلغ المدفوع",
				data: OverAllTicket_TotalAmount.map((i) => i.totalAmount),
			},
		],
	};

	// var overAllStatusSummary = [];
	// HistBookings &&
	// 	HistBookings.reduce(function (res, value) {
	// 		if (!res[value.status]) {
	// 			res[value.status] = {
	// 				status: value.status,
	// 				totalAmount: 0,
	// 			};
	// 			overAllStatusSummary.push(res[value.status]);
	// 		}
	// 		res[value.status].totalAmount += Number(value.totalAmount);
	// 		return res;
	// 	}, {});

	// var chartDataStatusSummary = {
	// 	options: {
	// 		chart: {
	// 			id: "line",
	// 		},

	// 		dataLabels: {
	// 			enabled: true,
	// 			enabledOnSeries: undefined,
	// 			formatter: function (val, opts) {
	// 				return val;
	// 			},
	// 		},

	// 		title: {
	// 			text: "ملخص مصدر حجز منتجع خان خديجة بالمبلغ الإجمالي (جنيهاً مصرياً)",
	// 			align: "center",
	// 			margin: 10,
	// 			offsetX: 0,
	// 			offsetY: 0,
	// 			floating: false,
	// 			style: {
	// 				fontSize: "17px",
	// 				fontWeight: "bold",
	// 				// fontFamily: undefined,
	// 				color: "purple",
	// 			},
	// 		},
	// 		xaxis: {
	// 			name: "مصدر الحجز",
	// 			categories: overAllStatusSummary.map((i) => i.status.toUpperCase()),
	// 		},
	// 	},
	// 	series: [
	// 		{
	// 			name: "إجمالي المبلغ المدفوع",
	// 			data: overAllStatusSummary.map((i) => i.totalAmount),
	// 		},
	// 	],
	// };

	// Score Card

	const overallReservations = HistBookings && HistBookings.length;

	const nonCancelledReservation = HistBookings;

	const overallAdultsArray =
		nonCancelledReservation && nonCancelledReservation.map((i) => i.quantity);

	const overallAdultCount = overallAdultsArray.reduce((a, b) => a + b, 0);

	const overallChildrenArray =
		nonCancelledReservation &&
		nonCancelledReservation.map((i) => i.quantity_Children);

	const overallChildrenCount = overallChildrenArray.reduce((a, b) => a + b, 0);

	const totalPaidAmount =
		nonCancelledReservation &&
		nonCancelledReservation
			.map((i) => i.totalAmount)
			.filter((ii) => ii !== undefined);

	const sumOfTotalPaidAmount = totalPaidAmount.reduce((a, b) => a + b, 0);

	const TotalOverAllTickets =
		Number(overallChildrenCount) + Number(overallAdultCount);

	return (
		<DayOverDayWrapper dir='rtl'>
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
					style={{ textAlign: "center", marginTop: "50px", fontSize: "2rem" }}>
					Loading
				</div>
			) : (
				<div className='container text-center'>
					<div className='row my-3'>
						<div className='col-md-6 mx-auto'>
							<div style={{ fontWeight: "bold" }}>تاريخ بدء التقرير</div>
							<DatePicker
								className='inputFields'
								onChange={(date) => {
									setStartDate(
										new Date(date._d).toLocaleDateString() || date._d,
									);
								}}
								// disabledDate={disabledDate}
								max
								size='small'
								showToday={true}
								defaultValue={startDate ? moment(new Date(startDate)) : null}
								placeholder='Please pick the desired start schedule date'
								style={{
									height: "auto",
									width: "80%",
									marginLeft: "5px",
									padding: "10px",
									// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
									borderRadius: "10px",
								}}
							/>
						</div>

						<div className='col-md-6 mx-auto'>
							<div style={{ fontWeight: "bold" }}>تاريخ انتهاء التقرير</div>
							<DatePicker
								className='inputFields'
								onChange={(date) => {
									setEndDate(new Date(date._d).toLocaleDateString() || date._d);
								}}
								// disabledDate={disabledDate}
								max
								size='small'
								showToday={true}
								defaultValue={endDate ? moment(new Date(endDate)) : null}
								placeholder='Please pick the desired end schedule date'
								style={{
									height: "auto",
									width: "80%",
									marginLeft: "5px",
									padding: "10px",
									// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
									borderRadius: "10px",
								}}
							/>
						</div>
					</div>
					<ExecutiveSummaryWrapper>
						<div className='container'>
							<div className='row text-center'>
								<div className='col-md-3 text-center mx-auto'>
									<div
										className='card'
										style={{ background: "var(--babyBlue)" }}>
										<div className='card-body'>
											<h5 style={{ fontSize: "0.9rem" }}>
												الحجوزات (غير ملغاة)
											</h5>
											<CountUp
												duration='2'
												delay={0.5}
												end={overallReservations}
											/>
										</div>
									</div>
								</div>
								<div className='col-md-3 text-center mx-auto'>
									<div
										className='card'
										style={{ background: "var(--babyBlue)" }}>
										<div className='card-body'>
											<h5>إجمالي عدد الراشدين</h5>
											<CountUp
												duration='2.5'
												delay={0.5}
												end={overallAdultCount}
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
											<h5>إجمالي عدد الأطفال</h5>
											<CountUp
												duration='3'
												delay={0.5}
												end={overallChildrenCount}
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
											<h5> إجمالي التذاكر المباعة</h5>
											<CountUp
												duration='3.5'
												delay={0.5}
												end={TotalOverAllTickets}
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
											<h5> المبلغ الإجمالي (جنيه)</h5>
											<CountUp
												duration='4.5'
												delay={0.5}
												end={sumOfTotalPaidAmount}
												separator=','
												// decimals={3}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</ExecutiveSummaryWrapper>
					<div className='mx-auto text-center' style={{ height: "50%" }}>
						<Chart
							options={chartDataTotalAmount.options}
							series={chartDataTotalAmount.series}
							type='line'
							width='90%'
						/>
					</div>
					<div className='mx-auto my-3 text-center' style={{ height: "50%" }}>
						<Chart
							options={chartDataHeadCount.options}
							series={chartDataHeadCount.series}
							type='line'
							width='90%'
						/>
					</div>
					<div className='mx-auto my-3 text-center' style={{ height: "50%" }}>
						<Chart
							options={chartDataTicketsSummary.options}
							series={chartDataTicketsSummary.series}
							type='bar'
							width='90%'
						/>
					</div>

					{/* <div className='mx-auto my-3 text-center' style={{ height: "50%" }}>
						<Chart
							options={chartDataStatusSummary.options}
							series={chartDataStatusSummary.series}
							type='bar'
							width='90%'
						/>
					</div> */}
				</div>
			)}
		</DayOverDayWrapper>
	);
};

export default DayOverDayOwner;

const DayOverDayWrapper = styled.div`
	min-height: 700px;
`;

const ExecutiveSummaryWrapper = styled.div`
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
