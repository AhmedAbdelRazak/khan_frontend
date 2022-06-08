/** @format */

import React from "react";
import styled from "styled-components";
import CountUp from "react-countup";
import "antd/dist/antd.min.css";

const ExecutiveSummary = ({ historicalBooking }) => {
	// function numberWithCommas(x) {
	//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	// }

	function compareSchedueldDates(a, b) {
		const TotalAppointmentsA = a;
		const TotalAppointmentsB = b;
		let comparison = 0;
		if (TotalAppointmentsA < TotalAppointmentsB) {
			comparison = 1;
		} else if (TotalAppointmentsA > TotalAppointmentsB) {
			comparison = -1;
		}
		return comparison;
	}

	const overallReservations = historicalBooking && historicalBooking.length;

	const nonCancelledReservation =
		historicalBooking &&
		historicalBooking.filter((i) => i.status !== "Cancelled");

	const scheduledDatesArray =
		nonCancelledReservation &&
		nonCancelledReservation
			.map((i) => new Date(i.scheduledDate))
			.sort(compareSchedueldDates);

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

	const dateFormat = (x) => {
		var requiredDate = new Date(x);
		var yyyy = requiredDate.getFullYear();
		let mm = requiredDate.getMonth() + 1; // Months start at 0!
		let dd = requiredDate.getDate();

		if (dd < 10) dd = "0" + dd;
		if (mm < 10) mm = "0" + mm;

		return (requiredDate = dd + "/" + mm + "/" + yyyy);
	};

	// console.log(overallAdultsArray, "OverallAdultCount");
	// console.log(overallAdultsArray.reduce((a, b) => a + b, 0));
	// console.log(overallAdultCount, "Adults Total Count");
	// console.log(overallChildrenCount, "Children Total Count");
	// console.log(totalPaidAmount, "Total Paid Amount");
	// console.log(historicalBooking, "historicalBooking");
	// console.log(scheduledDatesArray, "ScheduledDates");
	// console.log(scheduledDatesArray[0], "MaxDate");
	// console.log(scheduledDatesArray[scheduledDatesArray.length - 1], "MinDate");

	return (
		<ExecutiveSummaryWrapper>
			<div className='container'>
				<h4>
					Selected Date: From{" "}
					{dateFormat(
						new Date(
							scheduledDatesArray[scheduledDatesArray.length - 1],
						).toLocaleString(),
					)}{" "}
					To {dateFormat(new Date(scheduledDatesArray[0]).toLocaleString())}
				</h4>

				<div className='row text-center'>
					<div className='col-md-3 text-center mx-auto'>
						<div className='card' style={{ background: "var(--babyBlue)" }}>
							<div className='card-body'>
								<h5>Overall Reservations</h5>
								<CountUp duration='2' delay={0.5} end={overallReservations} />
							</div>
						</div>
					</div>
					<div className='col-md-3 text-center mx-auto'>
						<div className='card' style={{ background: "var(--babyBlue)" }}>
							<div className='card-body'>
								<h5>Total Number Of Adults</h5>
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
						<div className='card' style={{ background: "var(--babyBlue)" }}>
							<div className='card-body'>
								<h5>Total Number Of Children</h5>
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
						<div className='card' style={{ background: "var(--babyBlue)" }}>
							<div className='card-body'>
								<h5> Total Sold Tickets</h5>
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
						<div className='card' style={{ background: "var(--mainBlue)" }}>
							<div className='card-body totalAmount' style={{ color: "white" }}>
								<h5> Total Paid Amount (Pounds)</h5>
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
	);
};

export default ExecutiveSummary;

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
