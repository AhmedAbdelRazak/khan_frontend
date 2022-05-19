/** @format */

import React, { useState } from "react";
import styled from "styled-components";
// import { states } from "./Utils";

const FormStep2 = ({
	fullName,
	setFullName,
	scheduledByUserEmail,
	setScheduledByUserEmail,
	phone,
	setPhone,
	quantity,
	setQuantity,
	quantity_Children,
	setQuantity_Children,
	event_ocassion,
	setEvent_ocassion,
	setCountryCallingCode,
	countryCallingCode,
	availableTickets,
	busStations,
	chosenBusStationDetails,
	setChosenBusStationsDetails,
	busStationChosenTime,
	setBusStationChosenTime,
}) => {
	const [busStationName, setBusStationName] = useState("");

	const handleScheduledByUserFirstName = (event) => {
		setFullName(event.target.value);
	};

	const handleScheduleByUserEmail = (event) => {
		setScheduledByUserEmail(event.target.value);
	};

	const handlePhone = (event) => {
		setPhone(event.target.value);
	};
	const handleCountryCode = (event) => {
		setCountryCallingCode(event.target.value);
	};

	const handleQuantity = (event) => {
		setQuantity(event.target.value);
	};

	const handleEven_Ocassion = (event) => {
		setEvent_ocassion(event.target.value);
	};

	const handleQuantityChildren = (event) => {
		setQuantity_Children(event.target.value);
	};

	const handleChosenBusStation = (event) => {
		setBusStationName(event.target.value.toLowerCase());

		const indexOfBusStations =
			event.target.value &&
			busStations &&
			busStations
				.map((busstation) => busstation.address.toLowerCase())
				.indexOf(event.target.value.toLowerCase());

		const chosenBusStatioDetails =
			event.target.value &&
			busStations &&
			indexOfBusStations &&
			indexOfBusStations === 0
				? busStations[indexOfBusStations]
				: busStations[indexOfBusStations];

		setChosenBusStationsDetails(chosenBusStatioDetails);
	};

	const handleBusStationChosenTime = (event) => {
		setBusStationChosenTime(event.target.value);
	};

	return (
		<FormStep2Wrapper>
			<div className='row'>
				<div className='col-md-6 my-2'>
					<label
						className='textResizeMain2'
						style={{
							fontWeight: "bold",
							fontSize: "1rem",
							color: "#00407f",
						}}>
						Full Name
					</label>

					<input
						type='text'
						className='form-control w-75 mx-auto'
						value={fullName}
						onChange={handleScheduledByUserFirstName}
						placeholder='(**Required)'
						required
					/>
				</div>

				<div className='col-md-6 my-4 mx-auto'>
					<div className='row countryCodePhone'>
						<div className='col-3'>
							<label
								className='textResizeMain2 mx-auto text-center'
								style={{
									fontWeight: "bold",
									fontSize: "1rem",
									color: "#00407f",
								}}>
								Code
							</label>
							<input
								type='text'
								className='form-control w-100 mx-auto'
								value={countryCallingCode}
								onChange={handleCountryCode}
								required
							/>
						</div>
						<div className='col-9'>
							<label
								className='textResizeMain2'
								style={{
									fontWeight: "bold",
									fontSize: "1rem",
									color: "#00407f",
									textAlign: "center",
								}}>
								Phone
							</label>

							<input
								type='number'
								className='form-control w-100 mx-auto  '
								value={phone}
								onChange={handlePhone}
								placeholder='(**Required) Numbers Only'
								required
							/>
						</div>
					</div>
					<div
						className='mt-2'
						style={{ fontWeight: "bold", fontSize: "0.8rem" }}>
						EGY Code: +2
					</div>
				</div>
				<div className='col-md-6 my-4'>
					<label
						className='textResizeMain2'
						style={{
							fontWeight: "bold",
							fontSize: "1rem",
							color: "#00407f",
						}}>
						Email
					</label>

					<input
						type='text'
						className='form-control w-75 mx-auto'
						value={scheduledByUserEmail}
						onChange={handleScheduleByUserEmail}
						placeholder='(**Required)'
					/>
				</div>

				<div className='col-md-6 my-3 mx-auto'>
					<label
						className='textResizeMain2'
						style={{
							fontWeight: "bold",
							fontSize: "1rem",
							color: "#00407f",
						}}>
						Occasion
					</label>
					<br />
					<select
						onChange={handleEven_Ocassion}
						className='inputFields mb-3'
						style={{
							paddingTop: "12px",
							paddingBottom: "12px",
							paddingRight: "130px",
							// textAlign: "center",
							border: "#cfcfcf solid 1px",
							borderRadius: "10px",
							width: "75%",
							fontSize: "0.9rem",
							// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
						}}>
						{event_ocassion && event_ocassion !== "Select An Occasion" ? (
							<option className='items text-muted inputFields'>
								{event_ocassion}
							</option>
						) : (
							<option className='items text-muted inputFields'>
								Select An Occasion
							</option>
						)}
						<option className='items text-muted inputFields' value='Birthday'>
							Day Use
						</option>
						<option className='items text-muted inputFields' value='Birthday'>
							Birthday
						</option>

						<option className='items text-muted inputFields' value='Graduation'>
							Graduation
						</option>
						<option className='items text-muted inputFields' value='Engagement'>
							Engagement
						</option>
						<option className='items text-muted inputFields' value='Wedding'>
							Wedding
						</option>
						<option className='items text-muted inputFields' value='Wedding'>
							Anniversary
						</option>
						<option className='items text-muted inputFields' value='Wedding'>
							Mardi Gras Celebration
						</option>
						<option className='items text-muted inputFields' value='Wedding'>
							Christmas Party
						</option>
						<option className='items text-muted inputFields' value='Wedding'>
							New Years Party
						</option>
						<option className='items text-muted inputFields' value='Graduation'>
							Company Event
						</option>
						<option className='items text-muted inputFields' value='Graduation'>
							Other
						</option>
					</select>
				</div>

				<div className='col-md-6 my-4'>
					<label
						className='textResizeMain2'
						style={{
							fontWeight: "bold",
							fontSize: "1rem",
							color: "#00407f",
						}}>
						Ticket Quantity (Adults)
					</label>

					<input
						type='number'
						className='form-control w-75 mx-auto'
						value={quantity}
						onChange={handleQuantity}
						placeholder='How Many Tickets?'
						max={availableTickets()}
					/>
					{Number(quantity) + Number(quantity_Children) >
						availableTickets() && (
						<div
							className='mt-2'
							style={{ fontWeight: "bold", color: "red", fontSize: "13px" }}>
							Not enough tickets are available, please choose another date and
							try again.
						</div>
					)}
				</div>

				<div className='col-md-6 my-4'>
					<label
						className='textResizeMain2'
						style={{
							fontWeight: "bold",
							fontSize: "1rem",
							color: "#00407f",
						}}>
						Ticket Quantity (Children)
					</label>

					<input
						type='number'
						className='form-control w-75 mx-auto'
						value={quantity_Children}
						onChange={handleQuantityChildren}
						placeholder='How Many Tickets?'
						max={availableTickets()}
					/>
					{Number(quantity) + Number(quantity_Children) >
						availableTickets() && (
						<div
							className='mt-2'
							style={{ fontWeight: "bold", color: "red", fontSize: "13px" }}>
							Not enough tickets are available, please choose another date and
							try again.
						</div>
					)}
				</div>
				<div className='col-md-6 my-3 mx-auto'>
					<label
						className='textResizeMain2'
						style={{
							fontWeight: "bold",
							fontSize: "1rem",
							color: "#00407f",
						}}>
						Transportation / Bus Station
					</label>
					<br />
					<select
						onChange={handleChosenBusStation}
						className='inputFields mb-3'
						style={{
							paddingTop: "12px",
							paddingBottom: "12px",
							paddingRight: "130px",
							// textAlign: "center",
							border: "#cfcfcf solid 1px",
							borderRadius: "10px",
							width: "75%",
							fontSize: "0.9rem",
							// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
						}}>
						{busStationName && busStationName !== "Please Select (Required)" ? (
							<option className='items text-muted inputFields'>
								{busStationName}
							</option>
						) : (
							<option className='items text-muted inputFields'>
								Please Select (Required)
							</option>
						)}
						{busStations &&
							busStations.map((b, i) => {
								return (
									<option
										key={i}
										className='items text-muted inputFields'
										value={b.address}>
										{b.address} ({b.price} L.E.)
									</option>
								);
							})}
					</select>
				</div>

				{busStationName &&
					chosenBusStationDetails &&
					busStationName !== "no bus needed" && (
						<div className='col-md-6 my-3 mx-auto'>
							<label
								className='textResizeMain2'
								style={{
									fontWeight: "bold",
									fontSize: "1rem",
									color: "#00407f",
								}}>
								Here is "{busStationName}" Station Available Times
							</label>
							<br />
							<select
								onChange={handleBusStationChosenTime}
								className='inputFields mb-3'
								style={{
									paddingTop: "12px",
									paddingBottom: "12px",
									paddingRight: "130px",
									// textAlign: "center",
									border: "#cfcfcf solid 1px",
									borderRadius: "10px",
									width: "75%",
									fontSize: "0.9rem",
									// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
								}}>
								{busStationChosenTime &&
								busStationChosenTime !== "Please Select (Required)" ? (
									<option className='items text-muted inputFields'>
										{busStationChosenTime}
									</option>
								) : (
									<option className='items text-muted inputFields'>
										Please Select (Required)
									</option>
								)}
								{chosenBusStationDetails &&
									chosenBusStationDetails.times &&
									chosenBusStationDetails.times.map((b, i) => {
										return (
											<option
												key={i}
												className='items text-muted inputFields'
												value={b}>
												{b}
											</option>
										);
									})}
							</select>
						</div>
					)}
			</div>
		</FormStep2Wrapper>
	);
};

export default FormStep2;

const FormStep2Wrapper = styled.div`
	margin: 30px 0px;
	text-align: center;

	.countryCodePhone {
		margin-left: 100px;
	}

	@media (max-width: 1000px) {
		.textResizeMain2 {
			font-size: 0.8rem !important;
			text-shadow: 0px 0px 0px !important;
			font-weight: bold !important;
		}
		.countryCodePhone {
			margin: 6px 35px;
		}
	}
`;
