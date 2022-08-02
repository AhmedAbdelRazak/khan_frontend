/** @format */

import React from "react";
import styled from "styled-components";
import CountUp from "react-countup";
import "antd/dist/antd.min.css";

const ExecutiveSummary = ({ historicalBooking, clickedButton }) => {
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

	//Meals

	var LunchMealsAdults =
		nonCancelledReservation &&
		nonCancelledReservation.map((i) =>
			i.chosenServiceDetails.lunch ||
			i.chosenServiceDetails.serviceName === "kings ticket" ||
			i.chosenServiceDetails.serviceName === "happiness ticket" ||
			i.chosenServiceDetails.serviceName === "group reservation"
				? Number(i.quantity)
				: 0,
		);
	const lunchMealsAdultsTotal = LunchMealsAdults.reduce((a, b) => a + b, 0);

	var LunchMealsChildren =
		nonCancelledReservation &&
		nonCancelledReservation.map((i) =>
			i.chosenServiceDetails.lunch ||
			i.chosenServiceDetails.serviceName === "kings ticket" ||
			i.chosenServiceDetails.serviceName === "happiness ticket" ||
			i.chosenServiceDetails.serviceName === "group reservation"
				? Number(i.quantity_Children)
				: 0,
		);

	const lunchMealsChildrenTotal = LunchMealsChildren.reduce((a, b) => a + b, 0);

	var BreakfastMealsAdults =
		nonCancelledReservation &&
		nonCancelledReservation.map((i) =>
			(i.chosenServiceDetails.breakfast ||
				i.chosenServiceDetails.serviceName === "kings ticket") &&
			i.chosenServiceDetails.serviceName !== "happiness ticket"
				? Number(i.quantity)
				: 0,
		);
	const BreakfastMealsAdultsTotal = BreakfastMealsAdults.reduce(
		(a, b) => a + b,
		0,
	);

	var BreakfastMealsChildren =
		nonCancelledReservation &&
		nonCancelledReservation.map((i) =>
			(i.chosenServiceDetails.breakfast ||
				i.chosenServiceDetails.serviceName === "kings ticket") &&
			i.chosenServiceDetails.serviceName !== "happiness ticket"
				? Number(i.quantity_Children)
				: 0,
		);

	const BreakfastMealsChildrenTotal = BreakfastMealsChildren.reduce(
		(a, b) => a + b,
		0,
	);

	var BreakfastMealGroupReservation =
		nonCancelledReservation &&
		nonCancelledReservation.map((i) =>
			i.chosenServiceDetails.serviceName === "group reservation"
				? Number(i.option1Count)
				: 0,
		);

	const BreakfastMealGroupReservationTotal =
		BreakfastMealGroupReservation.reduce((a, b) => a + b, 0);

	var BusSeats =
		nonCancelledReservation &&
		nonCancelledReservation.map((i) =>
			i.busSeatsCount && i.busSeatsCount > 0
				? i.busSeatsCount
				: i.chosenBusStation.address === "NO BUS NEEDED"
				? 0
				: Number(i.quantity) + Number(i.quantity_Children),
		);

	// eslint-disable-next-line
	const BusSeatsTotal = BusSeats.reduce((a, b) => a + b, 0);
	// eslint-disable-next-line
	const allMealsCombined =
		Number(lunchMealsAdultsTotal) +
		Number(lunchMealsChildrenTotal) +
		Number(BreakfastMealsAdultsTotal) +
		Number(BreakfastMealsChildrenTotal) +
		Number(BreakfastMealGroupReservationTotal);

	var servicesOnlyArray =
		nonCancelledReservation &&
		nonCancelledReservation.map((i) =>
			i.chosenServiceDetails.serviceName === "services only"
				? Number(i.quantity_Children) + Number(i.quantity)
				: 0,
		);

	const servicesOnlyArrayTotal = servicesOnlyArray.reduce((a, b) => a + b, 0);
	var busStationBreakDown = [];

	nonCancelledReservation &&
		nonCancelledReservation.reduce(function (res, value) {
			if (!res[value.chosenBusStation.address]) {
				res[value.chosenBusStation.address] = {
					chosenBusStation: value.chosenBusStation.address,
					busSeatsCount: 0,
				};

				busStationBreakDown.push(res[value.chosenBusStation.address]);
			}

			value.busSeatsCount &&
			value.busSeatsCount > 0 &&
			value.chosenBusStation.address !== "NO BUS NEEDED"
				? (res[value.chosenBusStation.address].busSeatsCount += Number(
						value.busSeatsCount,
				  ))
				: value.chosenBusStation.address === "NO BUS NEEDED"
				? (res[value.chosenBusStation.address].busSeatsCount += 0)
				: (res[value.chosenBusStation.address].busSeatsCount +=
						Number(value.quantity_Children) + Number(value.quantity));
			return res;
		}, {});

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
				{clickedButton.includes("Booking") ? null : (
					<h4>
						Selected Date: From{" "}
						{dateFormat(
							new Date(
								scheduledDatesArray[scheduledDatesArray.length - 1],
							).toLocaleString(),
						)}{" "}
						To {dateFormat(new Date(scheduledDatesArray[0]).toLocaleString())}
					</h4>
				)}

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
								<h5> Total Amount (Pounds)</h5>
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
					<br />
					<br />
					<div className='col-md-10 mx-auto'>
						<h4 className='mt-5 mx-auto'>Meals Breakdown</h4>
					</div>

					<div className='col-md-4 text-center mx-auto mt-3'>
						<div className='card' style={{ background: "var(--babyBlue)" }}>
							<div className='card-body'>
								<h5>Breakfast Adults</h5>
								<CountUp
									duration='2'
									delay={0.5}
									end={BreakfastMealsAdultsTotal}
								/>
							</div>
						</div>
					</div>
					<div className='col-md-4 text-center mx-auto mt-3'>
						<div className='card' style={{ background: "var(--babyBlue)" }}>
							<div className='card-body'>
								<h5>Breakfast Children</h5>
								<CountUp
									duration='2.5'
									delay={0.5}
									end={BreakfastMealsChildrenTotal}
									separator=','
								/>
							</div>
						</div>
					</div>

					<div className='col-md-4 text-center mx-auto mt-3'>
						<div className='card' style={{ background: "var(--babyBlue)" }}>
							<div className='card-body'>
								<h5> Group Reservation Breakfast</h5>
								<CountUp
									duration='3.5'
									delay={0.5}
									end={BreakfastMealGroupReservationTotal}
									separator=','
								/>
							</div>
						</div>
					</div>

					<div className='col-md-8 text-center mx-auto mt-3'>
						<div className='card' style={{ background: "var(--babyBlue)" }}>
							<div className='card-body'>
								<h5>Total Breakfast Meals</h5>
								<CountUp
									duration='2.5'
									delay={0.5}
									end={
										Number(BreakfastMealsChildrenTotal) +
										Number(BreakfastMealGroupReservationTotal) +
										Number(BreakfastMealsAdultsTotal)
									}
									separator=','
								/>
							</div>
						</div>
					</div>
					<div className='col-md-6 text-center mx-auto mt-3'>
						<div className='card' style={{ background: "var(--babyBlue)" }}>
							<div className='card-body'>
								<h5>Lunch Adults</h5>
								<CountUp
									duration='3'
									delay={0.5}
									end={lunchMealsAdultsTotal}
									separator=','
								/>
							</div>
						</div>
					</div>
					<div className='col-md-6 text-center mx-auto mt-3'>
						<div className='card' style={{ background: "var(--babyBlue)" }}>
							<div className='card-body'>
								<h5> Lunch Children</h5>
								<CountUp
									duration='3.5'
									delay={0.5}
									end={lunchMealsChildrenTotal}
									separator=','
								/>
							</div>
						</div>
					</div>

					<div className='col-md-8 text-center mx-auto mt-3'>
						<div className='card' style={{ background: "var(--babyBlue)" }}>
							<div className='card-body'>
								<h5> Total Lunch Meals</h5>
								<CountUp
									duration='3.5'
									delay={0.5}
									end={
										Number(lunchMealsAdultsTotal) +
										Number(lunchMealsChildrenTotal)
									}
									separator=','
								/>
							</div>
						</div>
					</div>
					<div className='col-md-5 text-center mx-auto mt-5'>
						<div className='card' style={{ background: "var(--babyBlue)" }}>
							<div className='card-body'>
								<h5> Services Only</h5>
								<CountUp
									duration='3.5'
									delay={0.5}
									end={servicesOnlyArrayTotal}
									separator=','
								/>
							</div>
						</div>
					</div>
				</div>
				<div className='col-md-10 mx-auto'>
					<h4 className='mt-5 mx-auto'>Bus Breakdown</h4>
				</div>
				<table
					className='table table-bordered table-md-responsive table-hover table-striped'
					style={{ fontSize: "0.75rem" }}>
					<thead className='thead-light text-center'>
						<tr>
							<th scope='col'>Location</th>
							<th scope='col'>Reserved Seats</th>
						</tr>
					</thead>
					<tbody>
						{busStationBreakDown &&
							busStationBreakDown.map((i, b) => {
								return (
									<tr key={b}>
										<td>{i.chosenBusStation}</td>
										<td>{i.busSeatsCount}</td>
									</tr>
								);
							})}
					</tbody>
				</table>
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
