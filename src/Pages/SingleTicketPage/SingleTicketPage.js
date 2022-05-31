/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getTickets } from "../../apiCore";
import PackagePhotos2 from "./PackagePhotos2";
import ReactGA from "react-ga";
import Helmet from "react-helmet";
import GoogleAds from "../../GoogleAdsense/GoogleAds";

const SingleTicketPage = ({ match }) => {
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
				<title>{chosenService_Package}</title>
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
			<div className='ad-class'>
				{/* add your slot id  */}
				<GoogleAds slot='8388147324' />
			</div>
			<div className='mx-auto photosWrapperCellPhone'>
				<PackagePhotos2 serviceDetails={serviceDetails} />
			</div>
			<h1 className='titleSingleTicket'>{chosenService_Package}</h1>
			{serviceDetails.servicePrice === serviceDetails.servicePriceDiscount ? (
				<div
					className='mb-2'
					style={{
						fontSize: "17px",
						fontWeight: "bold",
						textAlign: "center",
						textTransform: "capitalize",
					}}>
					Ticket Price (Adults): {serviceDetails.servicePriceDiscount} L.E.
				</div>
			) : (
				<div
					className='mb-2'
					style={{
						fontSize: "17px",
						fontWeight: "bold",
						textAlign: "center",
						textTransform: "capitalize",
					}}>
					Ticket Price (Adults):{" "}
					<s style={{ color: "red" }}> {serviceDetails.servicePrice} L.E.</s>{" "}
					<span className='ml-1'>
						{" "}
						{serviceDetails.servicePriceDiscount} L.E.
					</span>
				</div>
			)}

			{serviceDetails.servicePrice_Children ===
			serviceDetails.servicePriceDiscount_Children ? (
				<div
					className='mb-2'
					style={{
						fontSize: "17px",
						fontWeight: "bold",
						textAlign: "center",
						textTransform: "capitalize",
					}}>
					Ticket Price (Children):{" "}
					{serviceDetails.servicePriceDiscount_Children} L.E.
				</div>
			) : (
				<div
					className='mb-2'
					style={{
						fontSize: "17px",
						fontWeight: "bold",
						textAlign: "center",
						textTransform: "capitalize",
					}}>
					Ticket Price (Children):{" "}
					<s style={{ color: "red" }}>
						{" "}
						{serviceDetails.servicePrice_Children} L.E.
					</s>{" "}
					<span className='ml-1'>
						{" "}
						{serviceDetails.servicePriceDiscount_Children} L.E.
					</span>
				</div>
			)}
			<h3 className='title2 mt-3'>Ticket Details:</h3>
			<br />
			<br />
			<br />
			<div className='ticketDetailsSec'>
				<ul style={{ textTransform: "capitalize" }}>
					<li>{serviceDetails.serviceDescription}</li>
					<div className='col-md-10'>
						<hr />
					</div>
					<li>
						{serviceDetails.serviceDescription2 &&
							serviceDetails.serviceDescription2}
					</li>
					<div className='col-md-10'>
						<hr />
					</div>
					<li>
						{serviceDetails.serviceDescription3 &&
							serviceDetails.serviceDescription3}
					</li>
					<div className='col-md-10'>
						<hr />
					</div>
					<li>
						{serviceDetails.serviceDescription4 &&
							serviceDetails.serviceDescription4}
					</li>
					<div className='col-md-10'>
						<hr />
					</div>
					{serviceDetails.serviceDescription5 !== "Not Added" &&
					serviceDetails.serviceDescription5 !== "not added" &&
					serviceDetails.serviceDescription5 !== "" ? (
						<React.Fragment>
							<li>
								{serviceDetails.serviceDescription5 &&
									serviceDetails.serviceDescription5}
							</li>
							<div className='col-md-10'>
								<hr />
							</div>
						</React.Fragment>
					) : null}

					{serviceDetails.serviceDescription6 !== "Not Added" &&
					serviceDetails.serviceDescription6 !== "not added" &&
					serviceDetails.serviceDescription6 !== "" ? (
						<React.Fragment>
							<li>
								{serviceDetails.serviceDescription6 &&
									serviceDetails.serviceDescription6}
							</li>
							<div className='col-md-10'>
								<hr />
							</div>
						</React.Fragment>
					) : null}

					{serviceDetails.serviceDescription7 !== "Not Added" &&
					serviceDetails.serviceDescription7 !== "not added" &&
					serviceDetails.serviceDescription7 !== "" ? (
						<React.Fragment>
							<li>
								{serviceDetails.serviceDescription7 &&
									serviceDetails.serviceDescription7}
							</li>
							<div className='col-md-10'>
								<hr />
							</div>
						</React.Fragment>
					) : null}

					{serviceDetails.serviceDescription8 !== "Not Added" &&
					serviceDetails.serviceDescription8 !== "not added" &&
					serviceDetails.serviceDescription8 !== "" ? (
						<React.Fragment>
							<li>
								{serviceDetails.serviceDescription8 &&
									serviceDetails.serviceDescription8}
							</li>
							<div className='col-md-10'>
								<hr />
							</div>
						</React.Fragment>
					) : null}

					{serviceDetails.serviceDescription9 !== "Not Added" &&
					serviceDetails.serviceDescription9 !== "not added" &&
					serviceDetails.serviceDescription9 !== "" ? (
						<React.Fragment>
							<li>
								{serviceDetails.serviceDescription9 &&
									serviceDetails.serviceDescription9}
							</li>
							<div className='col-md-10'>
								<hr />
							</div>
						</React.Fragment>
					) : null}

					{serviceDetails.serviceDescription10 !== "Not Added" &&
					serviceDetails.serviceDescription10 !== "not added" &&
					serviceDetails.serviceDescription10 !== "" ? (
						<React.Fragment>
							<li>
								{serviceDetails.serviceDescription10 &&
									serviceDetails.serviceDescription10}
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
					Book Now!
				</Link>
			</div>
			<div className='col-md-6 mx-auto w-75 mb-5'>
				<Link
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					to={`/listings`}
					className='btn btn-primary btn-block text-center '
					style={{
						background: "var(--orangePrimary)",
						border: "1px solid var(--orangePrimary)",
					}}>
					Back To Ticket List
				</Link>
			</div>
		</SingleTicketPageWrapper>
	);
};

export default SingleTicketPage;

const SingleTicketPageWrapper = styled.div`
	min-height: 1650px;
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
		float: left;
		margin-left: 5px;
		font-weight: bolder;
		text-transform: capitalize !important;
	}

	.ticketDetailsSec ul {
		list-style: none;
	}

	.ticketDetailsSec ul li:before {
		content: "✓";
		color: green;
		font-weight: bold;
		margin-right: 10px;
		font-size: 22px;
	}
`;
