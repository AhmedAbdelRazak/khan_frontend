/** @format */
// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { states } from "./Utils";

const FormStep2 = ({
	fullName,
	setFullName,
	scheduledByUserEmail,
	setScheduledByUserEmail,
	phone,
	setPhone,
	event_ocassion,
	setEvent_ocassion,
	setCountryCallingCode,
	countryCallingCode,
}) => {
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

	const handleEven_Ocassion = (event) => {
		setEvent_ocassion(event.target.value);
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
								readOnly
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
						<option className='items text-muted inputFields' value='Day Use'>
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
						<option
							className='items text-muted inputFields'
							value='Anniversary'>
							Anniversary
						</option>
						<option
							className='items text-muted inputFields'
							value='Mardi Gras Celebration'>
							Mardi Gras Celebration
						</option>
						<option
							className='items text-muted inputFields'
							value='Christmas Party'>
							Christmas Party
						</option>
						<option
							className='items text-muted inputFields'
							value='New Years Party'>
							New Years Party
						</option>
						<option
							className='items text-muted inputFields'
							value='Company Event'>
							Company Event
						</option>
						<option className='items text-muted inputFields' value='Other'>
							Other
						</option>
					</select>
				</div>
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
