/** @format */

import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
// import { Link } from "react-router-dom";
import {
	Document,
	Page,
	Text,
	StyleSheet,
	PDFDownloadLink,
	Image,
	View,
} from "@react-pdf/renderer";
import { getPreviousBookings } from "../../apiCore";

const styles = StyleSheet.create({
	body: {
		paddingTop: 25,
		paddingBottom: 25,
		paddingHorizontal: 25,
	},
	title: {
		fontSize: 19,
		textAlign: "center",
		marginBottom: 15,
	},
	author: {
		fontSize: 15,
		textAlign: "center",
		marginBottom: 40,
		marginTop: 10,
		textDecoration: "underline",
	},
	subtitle: {
		fontSize: 16,
		margin: 12,
	},
	text: {
		marginTop: 20,
		marginBottom: 15,
		fontSize: 13,
		textAlign: "justify",
	},
	// image: {
	//   marginVertical: 15,
	//   marginHorizontal: 100,
	// },
	header: {
		fontSize: 12,
		marginBottom: 15,
		textAlign: "center",
		color: "grey",
	},
	footer: {
		padding: "100px",
		fontSize: 12,
		marginBottom: 20,
		textAlign: "center",
		color: "grey",
	},
	pageNumber: {
		position: "absolute",
		fontSize: 12,
		bottom: 30,
		left: 0,
		right: 0,
		textAlign: "center",
		color: "grey",
	},
	image: {
		height: "70px",
		width: "150px",
	},
	logo: {
		fontSize: 10,
		fontWeight: "bold",
	},
});

const SuccessfullyPaid = () => {
	const [reservationData, setReservationData] = useState({});
	const [HistBookings, setHistBookings] = useState([]);
	const [loading, setLoading] = useState(true);

	const loadingHistReservations = () => {
		setLoading(true);
		setReservationData(
			JSON.parse(
				localStorage.getItem("confirmationData") &&
					localStorage.getItem("confirmationData"),
			),
		);

		var localStorageData = JSON.parse(
			localStorage.getItem("confirmationData") &&
				localStorage.getItem("confirmationData"),
		);

		console.log(localStorageData, "inside Fn");

		getPreviousBookings().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setHistBookings(
					data.filter(
						(i) =>
							new Date(i.scheduledDate).setHours(0, 0, 0, 0) ===
								new Date(localStorageData.chosenDate).setHours(0, 0, 0, 0) &&
							i.status !== "Cancelled" &&
							i.fullName === localStorageData.fullName.toLowerCase() &&
							Number(i.totalAmount).toFixed(2) ===
								Number(localStorageData.totalAmount).toFixed(2),
					),
				);
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		loadingHistReservations();

		// eslint-disable-next-line
	}, []);

	console.log(HistBookings);

	const Invoice = (order) => {
		return (
			<PDFDownloadLink
				document={
					<Document>
						<Page style={styles.body}>
							{/* <View
					style={{
					  border: 2,
					  borderColor: "black",
					  borderStyle: "solid",
					  padding: "5px",
					}}
				  > */}
							<View>
								<Image
									style={styles.image}
									src='https://res.cloudinary.com/infiniteapps/image/upload/v1652478055/khankhadija/1652478055110.png'
									alt='images'
								/>
								<Text style={styles.logo}>Khan Khadija Resort</Text>
								{/* <Text style={{ fontSize: 11, marginTop: "12px" }}>
									Ship To Address:
									{"\n"}
									{order.user.name}
									{"\n"}
									{order.address}
									{"\n"} {order.city}, {order.state}, {order.zipcode}
								</Text> */}
							</View>
							<Text style={styles.header} fixed>
								~ {new Date().toLocaleString()} ~
							</Text>
							<Text style={styles.title}>Reservation Receipt</Text>
							{/* <Text style={styles.author}>Puristic Lyf LLC.</Text> */}
							{/* <Text style={styles.subtitle}>Order Summary</Text> */}

							<Text style={styles.text}>
								<Text>
									Purchased:{" "}
									{new Date(
										HistBookings && HistBookings[0].createdAt,
									).toLocaleString()}
								</Text>
								{"\n"}
								{"\n"}
								<Text>
									Receipt Number: {HistBookings && HistBookings[0]._id}
								</Text>
								{"\n"}
								{"\n"}

								<Text>
									Ticket Name: {reservationData.serviceDetails.serviceName}
								</Text>
								{"\n"}
								{"\n"}

								<Text>
									Client Name: {reservationData && reservationData.fullName}
								</Text>
								{"\n"}
								{"\n"}

								<Text>Phone #: {reservationData && reservationData.phone}</Text>
								{"\n"}
								{"\n"}

								<Text>
									Bus Station:{" "}
									{reservationData &&
										reservationData.chosenBusStationDetails.address}
								</Text>
								{"\n"}
								{"\n"}
								<Text>
									Bus Station Time:{" "}
									{reservationData && reservationData.chosenBusStationTime}
								</Text>
								{"\n"}
								{"\n"}
								<Text>
									Transportation Fees:{" "}
									{Number(reservationData.chosenBusStationPrice)} L.E.
								</Text>
								{"\n"}
								{"\n"}

								<Text>
									Total Discount:
									{(
										reservationData.totalAmountBeforeDiscount -
										reservationData.totalAmount
									).toFixed(2)}{" "}
									L.E.
								</Text>
								{"\n"}
								{"\n"}

								<Text>Total Amount: {reservationData.totalAmount} L.E.</Text>
								{"\n"}
								{"\n"}
								<Text>Reservation Status: Not Paid</Text>
							</Text>
							<Text style={styles.footer}>
								{" "}
								~ Thank you for choosing Khan Khadija Resort ~{" "}
							</Text>
							{/* </View> */}
						</Page>
					</Document>
				}
				fileName='Khan Khadija Resort.pdf'
				className='btn btn-sm btn-block btn-outline-primary w-75 mx-auto my-4'>
				Download Booking Receipt
			</PDFDownloadLink>
		);
	};

	return (
		<SchedulePage>
			{loading ? (
				<div
					style={{
						textAlign: "center",
						fontSize: "2rem",
						color: "red",
						marginTop: "10%",
					}}>
					Loading
				</div>
			) : (
				<Fragment>
					<div
						style={{
							fontSize: "2rem",
							textAlign: "center",
							marginTop: "15px",
							fontWeight: "bold",
							letterSpacing: "2px",
							color: "#000034",
						}}>
						Thank you for choosing Khan Khadija Resort!
					</div>
					<div
						className='mt-3'
						style={{
							fontSize: "1.5rem",
							textAlign: "center",
							fontWeight: "bold",
							color: "darkgreen",
						}}>
						Your ticket was successfully reserved.
					</div>
					<div
						style={{
							fontSize: "1.5rem",
							textAlign: "center",
							marginTop: "15px",
							fontWeight: "bold",
							letterSpacing: "2px",
							color: "#871402",
							textTransform: "capitalize",
						}}>
						Please take a snapshot or download your receipt
					</div>
					<div
						className='col-md-4 mx-auto mt-4 '
						style={{ fontWeight: "bolder" }}>
						<div>Name: {reservationData.fullName}</div>
						<div className='mt-2'>
							Phone: ({reservationData.countryCallingCode}){" "}
							{reservationData.phone}
						</div>
						<div className='mt-2'>
							Scheduled By Email:{" "}
							{reservationData.scheduledByUserEmail
								? reservationData.scheduledByUserEmail
								: "Not Filled"}
						</div>
						<div className='mt-2' style={{ textTransform: "capitalize" }}>
							Booked Package: {reservationData.chosenService_Package}{" "}
						</div>
						<div className='mt-2'>
							Package Price (Adults):{" "}
							{reservationData &&
							reservationData.serviceDetails &&
							reservationData.serviceDetails.servicePrice === reservationData &&
							reservationData.serviceDetails &&
							reservationData.serviceDetails.servicePriceDiscount ? (
								<span>
									{reservationData.serviceDetails.servicePriceDiscount} L.E.
								</span>
							) : (
								<span style={{ color: "black", fontWeight: "" }}>
									<s style={{ color: "black", fontWeight: "" }}>
										{reservationData &&
											reservationData.serviceDetails &&
											reservationData.serviceDetails.servicePrice}{" "}
										L.E.
									</s>{" "}
									{reservationData &&
										reservationData.serviceDetails &&
										reservationData.serviceDetails.servicePriceDiscount}{" "}
									L.E.
								</span>
							)}{" "}
						</div>

						<div className='mt-2'>
							Package Price (Children):{" "}
							{reservationData &&
							reservationData.serviceDetails &&
							reservationData.serviceDetails.servicePrice_Children ===
								reservationData &&
							reservationData.serviceDetails &&
							reservationData.serviceDetails.servicePriceDiscount_Children ? (
								<span>
									{reservationData &&
										reservationData.serviceDetails &&
										reservationData.serviceDetails
											.servicePriceDiscount_Children}{" "}
									L.E.
								</span>
							) : (
								<span style={{ color: "black", fontWeight: "" }}>
									<s style={{ color: "black", fontWeight: "" }}>
										{reservationData &&
											reservationData.serviceDetails &&
											reservationData.serviceDetails.servicePrice_Children}{" "}
										L.E.
									</s>{" "}
									{reservationData &&
										reservationData.serviceDetails &&
										reservationData.serviceDetails
											.servicePriceDiscount_Children}{" "}
									L.E.
								</span>
							)}{" "}
						</div>

						<div className='mt-2'>
							Tickets Count:{" "}
							{Number(reservationData.quantity) +
								Number(reservationData.quantity_Children)}{" "}
							Tickets
						</div>
						<div className='mt-2'>
							Transportation Fees:{" "}
							{Number(reservationData.chosenBusStationPrice)} L.E.{" "}
						</div>

						<div className='mt-2'>
							Booking Date: {reservationData.chosenDate}
						</div>
						<div className='mt-2'>
							Event/Occasion: {reservationData.event_ocassion}{" "}
						</div>
						{reservationData.chosenCouponDetails &&
						reservationData.chosenCouponDetails.name ? (
							<div className='mt-2'>
								Coupon Name: {reservationData.chosenCouponDetails.name} (
								{reservationData.chosenCouponDetails.discount}% Off){" "}
							</div>
						) : null}

						<div
							className='mt-2'
							style={{
								fontSize: "1rem",
								fontWeight: "bold",
								color: "var(--mainBlue)",
							}}>
							Total Amount:{" "}
							{reservationData.totalAmountBeforeDiscount ===
							reservationData.totalAmount ? (
								<span style={{ color: "green", fontWeight: "bold" }}>
									{reservationData.totalAmount} L.E.
								</span>
							) : (
								<span style={{ color: "green", fontWeight: "bold" }}>
									<s style={{ color: "red", fontWeight: "bold" }}>
										{reservationData.totalAmountBeforeDiscount} L.E.
									</s>{" "}
									{reservationData.totalAmount} L.E.
								</span>
							)}{" "}
						</div>
						{Invoice(reservationData)}
					</div>
				</Fragment>
			)}
		</SchedulePage>
	);
};

export default SuccessfullyPaid;

const SchedulePage = styled.div`
	background-color: var(--babyBlue);
	padding-top: 20px;
	padding-bottom: 120px;
	margin: auto 5px;
	min-height: 700px;

	@media (max-width: 1000px) {
	}
`;