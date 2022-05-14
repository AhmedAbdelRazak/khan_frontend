/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "antd/dist/antd.min.css";
import { Collapse, DatePicker } from "antd";
import { getTickets } from "../../apiCore";
// import Helmet from "react-helmet";
import moment from "moment";
import { Link } from "react-router-dom";

const { Panel } = Collapse;

const BookNowGeneral_Arabic = ({ language }) => {
	const [allTickets, setAllTickets] = useState([]);
	const [chosenService_Package, setChosenService_Package] = useState("");
	const [serviceDetails, setServiceDetails] = useState("");
	const [chosenDate, setChosenDate] = useState("");
	// eslint-disable-next-line
	const [fullName, setFullName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [countryCallingCode, setCountryCallingCode] = useState("+2");
	const [quantity_Adults, setQuantity_Adults] = useState("");
	const [quantity_Children, setQuantity_Children] = useState("");
	// eslint-disable-next-line
	const [userEmail, setUserEmail] = useState("");

	const gettingAllTickets = () => {
		getTickets().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllTickets(data.filter((i) => i.activeService === true));
			}
		});
	};

	const handleChosenService_Package = (event) => {
		setChosenService_Package(event.target.value);
		const indexOfService =
			event.target.value &&
			allTickets &&
			allTickets
				.map((service) => service.serviceName.toLowerCase())
				.indexOf(event.target.value.toLowerCase());

		const chosenServiceDetails =
			event.target.value && allTickets && indexOfService && indexOfService === 0
				? allTickets[indexOfService]
				: allTickets[indexOfService];

		setServiceDetails(chosenServiceDetails);
	};

	useEffect(() => {
		gettingAllTickets();
		// eslint-disable-next-line
	}, []);

	const disabledDate = (current) => {
		// Can not select days before today and today
		return current < moment();
	};
	// eslint-disable-next-line
	const handleScheduledByUserFullName = (event) => {
		setFullName(event.target.value);
	};
	// eslint-disable-next-line
	const handleScheduledByUserEmail = (event) => {
		setUserEmail(event.target.value);
	};

	const handlePhone = (event) => {
		setPhoneNumber(event.target.value);
	};

	const handleCountryCode = (event) => {
		setCountryCallingCode(event.target.value);
	};

	// eslint-disable-next-line
	const handleQuantityAdults = (event) => {
		setQuantity_Adults(event.target.value);
	};

	// eslint-disable-next-line
	const handleQuantityChildren = (event) => {
		setQuantity_Children(event.target.value);
	};

	return (
		<BookNowGeneralWrapper dir='rtl'>
			<h1 className='titleBookNow my-3'>احجز مقعدك الآن مع خان خديجة</h1>
			{/* <div className='horizline col-md-3 mx-auto my-3'></div> */}
			<Collapse
				style={{ background: "#1E467D" }}
				className='col-md-4 mx-auto'
				accordion>
				<Panel
					showArrow={true}
					collapsible
					style={{ textAlign: "center" }}
					header={
						<span
							// className='mx-auto'
							style={{
								fontWeight: "bold",
								color: "white",
								textTransform: "capitalize",
							}}>
							{serviceDetails
								? serviceDetails.serviceName_Arabic
								: "الرجاء اختيار تذكرة"}
						</span>
					}>
					<select
						onChange={handleChosenService_Package}
						placeholder='Select a Ticket'
						className=' mb-3 col-md-10 mx-auto my-1'
						style={{
							paddingTop: "12px",
							paddingBottom: "12px",
							// paddingRight: "50px",
							// textAlign: "center",
							border: "#cfcfcf solid 1px",
							borderRadius: "10px",
							fontSize: "0.9rem",
							// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
							textTransform: "capitalize",
						}}>
						{chosenService_Package &&
						chosenService_Package !== "الرجاء اختيار تذكرة" ? (
							<option
								className='items text-muted inputFields'
								style={{ textTransform: "capitalize" }}>
								{chosenService_Package}
							</option>
						) : (
							<option className='items text-muted inputFields'>
								الرجاء اختيار تذكرة
							</option>
						)}

						{allTickets &&
							allTickets.map((t, i) => (
								<option
									key={i}
									value={t.serviceName}
									className='items'
									style={{ textTransform: "capitalize", fontWeight: "bold" }}
									onChange={() => setServiceDetails(i)}>
									{t.serviceName_Arabic} {`(${t.servicePriceDiscount} L.E.)`}
								</option>
							))}
					</select>
				</Panel>
				<Panel
					showArrow={true}
					collapsible
					style={{ textAlign: "center" }}
					header={
						<span
							// className='mx-auto'
							style={{
								fontWeight: "bold",
								color: "white",
								textTransform: "capitalize",
							}}>
							{chosenDate ? `التاريخ: ${chosenDate}` : "يرجى تحديد تاريخ"}
						</span>
					}>
					<DatePicker
						className='inputFields'
						onChange={(date) =>
							setChosenDate(new Date(date._d).toLocaleDateString() || date._d)
						}
						disabledDate={disabledDate}
						max
						size='small'
						showToday={true}
						defaultValue={chosenDate || moment()}
						placeholder='Please pick the desired schedule date'
						style={{
							height: "auto",
							width: "85%",
							marginBottom: "30px",
							padding: "10px",
							// boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
							borderRadius: "10px",
						}}
					/>
				</Panel>
				{/* 
				<Panel
					showArrow={true}
					collapsible
					style={{ textAlign: "center" }}
					header={
						<span
							// className='mx-auto'
							style={{
								fontWeight: "bold",
								color: "white",
								textTransform: "capitalize",
							}}>
							{fullName ? `Name: ${fullName}` : "Please Fill In Your Name"}
						</span>
					}>
					<div className='col-md-10 mx-auto my-1'>
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
							onChange={handleScheduledByUserFullName}
							placeholder='(**Required)'
						/>
					</div>
				</Panel> */}
				{/* 
				<Panel
					showArrow={true}
					collapsible
					style={{ textAlign: "center" }}
					header={
						<span
							// className='mx-auto'
							style={{
								fontWeight: "bold",
								color: "white",
								textTransform: "capitalize",
							}}>
							{userEmail ? `Email: ${userEmail}` : "Please Fill In Your Email"}
						</span>
					}>
					<div className='col-md-10 mx-auto my-1'>
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
							value={userEmail}
							onChange={handleScheduledByUserEmail}
							placeholder='(**Required)'
						/>
					</div>
				</Panel> */}

				<Panel
					showArrow={true}
					collapsible
					style={{ textAlign: "center" }}
					header={
						<span
							// className='mx-auto'
							style={{
								fontWeight: "bold",
								color: "white",
								textTransform: "capitalize",
							}}>
							{phoneNumber && countryCallingCode
								? `الهاتف: ${countryCallingCode}${phoneNumber}`
								: "الرجاء إدخال رقم هاتفك"}
						</span>
					}>
					<div className='col-md-10 mx-auto'>
						<div className='row countryCodePhone'>
							<div className='col-md-4'>
								<label
									className='textResizeMain2 mx-auto text-center'
									style={{
										fontWeight: "bold",
										fontSize: "1rem",
										color: "#00407f",
									}}>
									الرقم الدولي
								</label>
								<input
									type='text'
									className='form-control w-100 mx-auto'
									value={countryCallingCode}
									onChange={handleCountryCode}
									required
								/>
							</div>
							<div className='col-md-8'>
								<label
									className='textResizeMain2'
									style={{
										fontWeight: "bold",
										fontSize: "1rem",
										color: "#00407f",
										textAlign: "center",
									}}>
									الهاتف
								</label>

								<input
									type='number'
									className='form-control w-100 mx-auto  '
									value={phoneNumber}
									onChange={handlePhone}
									placeholder='(**Required) Numbers Only'
									required
								/>
							</div>
						</div>
						<div
							className='mt-2'
							style={{ fontWeight: "bold", fontSize: "0.8rem" }}>
							KW Code: +965, EGY Code: +2, Turkey Code: +90, etc...
						</div>
					</div>
				</Panel>

				{/* <Panel
					showArrow={true}
					collapsible
					style={{ textAlign: "center" }}
					header={
						<span
							// className='mx-auto'
							style={{
								fontWeight: "bold",
								color: "white",
								textTransform: "capitalize",
							}}>
							{quantity_Children && quantity_Adults
								? `Adults Count: ${quantity_Adults}, Children Count: ${quantity_Children}`
								: "Tickets Count"}
						</span>
					}>
					<div className='col-md-10 mx-auto my-1'>
						<label
							className='textResizeMain2'
							style={{
								fontWeight: "bold",
								fontSize: "1rem",
								color: "#00407f",
							}}>
							Tickets Count (Adults):
						</label>

						<input
							type='text'
							className='form-control w-75 mx-auto'
							value={quantity_Adults}
							onChange={handleQuantityAdults}
							placeholder='(**Required)'
						/>
					</div>

					<div className='col-md-10 mx-auto my-1'>
						<label
							className='textResizeMain2'
							style={{
								fontWeight: "bold",
								fontSize: "1rem",
								color: "#00407f",
							}}>
							Tickets Count (Children):
						</label>

						<input
							type='text'
							className='form-control w-75 mx-auto'
							value={quantity_Children}
							onChange={handleQuantityChildren}
							placeholder='(**Required)'
						/>
					</div>
				</Panel> */}
			</Collapse>

			<div className='mx-auto text-center mt-3'>
				{chosenService_Package ? (
					<Link
						to={`/book-now/${chosenService_Package.split(" ").join("-")}`}
						onClick={() => {
							const reservationData = {
								fullName: fullName,
								countryCallingCode: countryCallingCode,
								phoneNumber: phoneNumber,
								userEmail: userEmail,
								serviceDetails: serviceDetails,
								chosenService_Package: chosenService_Package,
								chosenDate: chosenDate
									? chosenDate
									: new Date().toLocaleDateString(),
								quantity_Children: quantity_Children ? quantity_Children : 0,
								quantity_Adults: quantity_Adults ? quantity_Adults : 1,
							};
							localStorage.setItem(
								"reservationData",
								JSON.stringify(reservationData),
							);
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}
						className='btn btn-primary '>
						احجز الآن!
					</Link>
				) : (
					<Link
						to='/listings'
						onClick={() => {
							const reservationData = {
								fullName: fullName,
								countryCallingCode: fullName,
								phoneNumber: phoneNumber,
								userEmail: userEmail,
								serviceDetails: serviceDetails,
								chosenService_Package: chosenService_Package,
								chosenDate: chosenDate,
							};
							localStorage.setItem(
								"reservationData",
								JSON.stringify(reservationData),
							);
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}
						className='btn btn-primary '>
						احجز الآن!
					</Link>
				)}
			</div>
		</BookNowGeneralWrapper>
	);
};

export default BookNowGeneral_Arabic;

const BookNowGeneralWrapper = styled.div`
	font-family: "Droid Arabic Kufi";

	.titleBookNow {
		text-align: center;
		font-size: 1.3rem;
		font-weight: bolder;
		/* letter-spacing: 2px; */
		color: var(--mainBlue);
	}

	.horizline {
		border: 2px grey solid;
	}

	svg {
		color: white !important;
		margin-left: 10px;
		float: right;
	}

	.countryCodePhone {
		margin-left: 50px;
	}

	@media (max-width: 1000px) {
		.countryCodePhone {
			margin: 6px 35px;
		}
	}
`;
