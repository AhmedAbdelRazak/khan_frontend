/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getTickets } from "../../apiCore";
import PackagePhotos2 from "./PackagePhotos2";
import ReactGA from "react-ga";
import Helmet from "react-helmet";
// eslint-disable-next-line
import GoogleAds from "../../GoogleAdsense/GoogleAds";

const SingleTicketPageArabic = ({ match }) => {
	// eslint-disable-next-line
	const [chosenService_Package, setChosenService_Package] = useState("");
	const [serviceDetails, setServiceDetails] = useState("");

	const settingChosenPackage = () => {
		getTickets().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				const serviceNameParams =
					match.params.ticketslug.split("-").join(" ") &&
					match.params.ticketslug.split("-").join(" ").toLowerCase();

				setChosenService_Package(serviceNameParams);
				const indexOfService =
					serviceNameParams &&
					data &&
					data
						.map((service) => service.serviceName.toLowerCase())
						.indexOf(serviceNameParams.toLowerCase());

				const chosenServiceDetails =
					serviceNameParams && data && indexOfService && indexOfService === 0
						? data[indexOfService]
						: data[indexOfService];

				setServiceDetails(chosenServiceDetails);
			}
		});
	};

	useEffect(() => {
		settingChosenPackage();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		// To Report Page View
		ReactGA.pageview(window.location.pathname + window.location.search);
		// eslint-disable-next-line
	}, []);

	return (
		<SingleTicketPageWrapper>
			<Helmet>
				<meta charSet='utf-8' />
				<title>{serviceDetails.serviceName_Arabic}</title>
				<meta
					name='description'
					content='Khan Khadija, The best resort in Egypt. If you are looking for recovery and fun time, Khan Khadija Resort should be your first choice. Khan Khadija Resort Website was powered by www.infinite-apps.com'
				/>
				<link rel='icon' href='khan_frontend\src\GeneralImgs\favicon.ico' />
				<link
					rel='canonical'
					href={`https://khankhadija.com/ticket/${match.params.ticketslug}`}
				/>
			</Helmet>
			{/* <div className='ad-class'> */}
			{/* add your slot id  */}
			{/* <GoogleAds slot='8388147324' /> */}
			{/* </div> */}
			<div className='mx-auto photosWrapperCellPhone'>
				<PackagePhotos2 serviceDetails={serviceDetails} />
			</div>
			<h1 className='titleSingleTicket'>{serviceDetails.serviceName_Arabic}</h1>
			{serviceDetails.servicePrice === serviceDetails.servicePriceDiscount ? (
				<div
					className='mb-2 mr-4'
					style={{
						fontSize: "17px",
						fontWeight: "bold",
						textAlign: "right",
						textTransform: "capitalize",
					}}>
					سعر التذكرة (الكبار): {serviceDetails.servicePriceDiscount} جنيه
				</div>
			) : (
				<div
					className='mb-2 mr-4'
					style={{
						fontSize: "17px",
						fontWeight: "bold",
						textAlign: "right",
						textTransform: "capitalize",
					}}>
					سعر التذكرة (الكبار):{" "}
					<s style={{ color: "red" }}> {serviceDetails.servicePrice} جنيه</s>{" "}
					<span className='ml-1'>
						{" "}
						{serviceDetails.servicePriceDiscount} جنيه
					</span>
				</div>
			)}

			{serviceDetails.servicePrice_Children ===
			serviceDetails.servicePriceDiscount_Children ? (
				<div
					className='mb-2 mr-4'
					style={{
						fontSize: "17px",
						fontWeight: "bold",
						textAlign: "right",
						textTransform: "capitalize",
					}}>
					سعر التذكرة (للأطفال): {serviceDetails.servicePriceDiscount_Children}{" "}
					جنيه
				</div>
			) : (
				<div
					className='mb-2 mr-4'
					style={{
						fontSize: "17px",
						fontWeight: "bold",
						textAlign: "right",
						textTransform: "capitalize",
					}}>
					سعر التذكرة (للأطفال):{" "}
					<s style={{ color: "red" }}>
						{" "}
						{serviceDetails.servicePrice_Children} جنيه
					</s>{" "}
					<span className='ml-1'>
						{" "}
						{serviceDetails.servicePriceDiscount_Children} جنيه
					</span>
				</div>
			)}
			<h3 className='title2 mt-3'>:تفاصيل التذكرة</h3>
			<br />
			<br />
			<br />
			<div className='ticketDetailsSec' dir='rtl'>
				<ul style={{ textTransform: "capitalize" }}>
					<li>{serviceDetails.serviceDescription_Arabic}</li>
					<div className='col-md-10'>
						<hr />
					</div>
					<li>
						{serviceDetails.serviceDescription2_Arabic &&
							serviceDetails.serviceDescription2_Arabic}
					</li>
					<div className='col-md-10'>
						<hr />
					</div>
					<li>
						{serviceDetails.serviceDescription3_Arabic &&
							serviceDetails.serviceDescription3_Arabic}
					</li>
					<div className='col-md-10'>
						<hr />
					</div>
					<li>
						{serviceDetails.serviceDescription4_Arabic &&
							serviceDetails.serviceDescription4_Arabic}
					</li>
					<div className='col-md-10'>
						<hr />
					</div>
					{serviceDetails.serviceDescription5_Arabic !== "Not Added" &&
					serviceDetails.serviceDescription5_Arabic !== "not added" &&
					serviceDetails.serviceDescription5_Arabic !== "" ? (
						<React.Fragment>
							<li>
								{serviceDetails.serviceDescription5_Arabic &&
									serviceDetails.serviceDescription5_Arabic}
							</li>
							<div className='col-md-10'>
								<hr />
							</div>
						</React.Fragment>
					) : null}

					{serviceDetails.serviceDescription6_Arabic !== "Not Added" &&
					serviceDetails.serviceDescription6_Arabic !== "not added" &&
					serviceDetails.serviceDescription6_Arabic !== "" ? (
						<React.Fragment>
							<li>
								{serviceDetails.serviceDescription6_Arabic &&
									serviceDetails.serviceDescription6_Arabic}
							</li>
							<div className='col-md-10'>
								<hr />
							</div>
						</React.Fragment>
					) : null}

					{serviceDetails.serviceDescription7_Arabic !== "Not Added" &&
					serviceDetails.serviceDescription7_Arabic !== "not added" &&
					serviceDetails.serviceDescription7_Arabic !== "" ? (
						<React.Fragment>
							<li>
								{serviceDetails.serviceDescription7_Arabic &&
									serviceDetails.serviceDescription7_Arabic}
							</li>
							<div className='col-md-10'>
								<hr />
							</div>
						</React.Fragment>
					) : null}

					{serviceDetails.serviceDescription8_Arabic !== "Not Added" &&
					serviceDetails.serviceDescription8_Arabic !== "not added" &&
					serviceDetails.serviceDescription8_Arabic !== "" ? (
						<React.Fragment>
							<li>
								{serviceDetails.serviceDescription8_Arabic &&
									serviceDetails.serviceDescription8_Arabic}
							</li>
							<div className='col-md-10'>
								<hr />
							</div>
						</React.Fragment>
					) : null}

					{serviceDetails.serviceDescription9_Arabic !== "Not Added" &&
					serviceDetails.serviceDescription9_Arabic !== "not added" &&
					serviceDetails.serviceDescription9_Arabic !== "" ? (
						<React.Fragment>
							<li>
								{serviceDetails.serviceDescription9_Arabic &&
									serviceDetails.serviceDescription9_Arabic}
							</li>
							<div className='col-md-10'>
								<hr />
							</div>
						</React.Fragment>
					) : null}

					{serviceDetails.serviceDescription10_Arabic !== "Not Added" &&
					serviceDetails.serviceDescription10_Arabic !== "not added" &&
					serviceDetails.serviceDescription10_Arabic !== "" ? (
						<React.Fragment>
							<li>
								{serviceDetails.serviceDescription10_Arabic &&
									serviceDetails.serviceDescription10_Arabic}
							</li>
							<div className='col-md-10'>
								<hr />
							</div>
						</React.Fragment>
					) : null}
				</ul>
			</div>
			<div className='col-md-6 mx-auto w-75'>
				<Link
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					to={`/book-now/${match.params.ticketslug
						.split(" ")
						.join("-")
						.toLowerCase()}`}
					className='btn btn-primary btn-block my-4 text-center '
					style={{
						background: "var(--mainBlue)",
						border: "1px solid var(--mainBlue)",
					}}>
					!احجز الآن
				</Link>
			</div>
			<div className='col-md-6 mx-auto w-75'>
				<Link
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					to={`/listings`}
					className='btn btn-primary btn-block text-center '
					style={{
						background: "var(--orangePrimary)",
						border: "1px solid var(--orangePrimary)",
					}}>
					العودة إلى قائمة التذاكر
				</Link>
			</div>
			<div className='ad-class my-3 text-center mx-auto'>
				{/* add your slot id  */}
				<GoogleAds slot='8388147324' />
			</div>
		</SingleTicketPageWrapper>
	);
};

export default SingleTicketPageArabic;

const SingleTicketPageWrapper = styled.div`
	min-height: 1200px;
	font-family: "Droid Arabic Kufi";
	overflow: hidden !important;

	.titleSingleTicket {
		text-align: center;
		font-size: 1.5rem !important;
		font-weight: bolder;
		/* letter-spacing: 2px; */
		color: var(--orangePrimary);
		/* float: left; */
		/* margin-left: 20px; */
		font-weight: bolder;
		text-transform: capitalize !important;
	}

	.title2 {
		/* text-align: center; */
		font-size: 1.3rem !important;
		font-weight: bolder;
		/* letter-spacing: 2px; */
		color: var(--mainBlue);
		float: right;
		margin-right: 20px;
		font-weight: bolder;
		text-transform: capitalize !important;
	}

	.ticketDetailsSec ul {
		list-style: none;
		text-align: right;
	}

	.ticketDetailsSec ul li:before {
		content: "✓";
		color: green;
		font-weight: bold;
		margin-left: 10px;
		font-size: 22px;
		float: right;
		text-align: center;
	}
`;
