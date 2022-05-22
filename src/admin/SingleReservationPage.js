/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isAuthenticated } from "../auth";
import {
	readSingleOrder,
	getStatusValues,
	updateOrderStatus,
} from "./apiAdmin";
import moment from "moment";

const SingleReservationPage = (props) => {
	const [loading, setLoading] = useState(true);
	const [singleOrder, setSingleOrder] = useState({});
	const [statusValues, setStatusValues] = useState([]);
	const { user, token } = isAuthenticated();

	const loadSingleOrder = (orderId) => {
		setLoading(true);
		readSingleOrder(user._id, token, orderId).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setSingleOrder(data);

				setLoading(false);
			}
		});
	};

	const loadStatusValues = () => {
		getStatusValues(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setStatusValues(data);
			}
		});
	};

	useEffect(() => {
		const orderId = props.match.params.reservationId;
		loadSingleOrder(orderId);
		loadStatusValues();
		// eslint-disable-next-line
	}, []);

	const showStatus = (o) => (
		<React.Fragment>
			<div className='form-group'>
				<h3 className='mark mb-4'>Status: {o.status}</h3>
				<select
					className='form-control'
					onChange={(e) => handleStatusChange(e, o._id)}
					style={{
						border: "#cfcfcf solid 1px",
						borderRadius: "10px",
						width: "100%",
						fontSize: "0.9rem",
						boxShadow: "2px 2px 2px 2px rgb(0,0,0,0.2)",
					}}>
					<option>Update Status</option>
					{statusValues.map((status, index) => (
						<option key={index} value={status}>
							{status}
						</option>
					))}
				</select>
			</div>
		</React.Fragment>
	);

	const handleStatusChange = (e, orderId) => {
		updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
			if (data.error) {
				console.log("Status update failed");
			} else {
				window.scrollTo({ top: 0, behavior: "smooth" });
				window.location.reload(false);
			}
		});
	};

	// const showInput = (key, value) => (
	// 	<div className='input-group mb-2 mr-sm-2'>
	// 		<div className='input-group-prepend'>
	// 			<div className='input-group-text'>{key}</div>
	// 		</div>
	// 		<input type='text' value={value} className='form-control' readOnly />
	// 	</div>
	// );

	return (
		<SingleReservationPageWrapper>
			{loading ? (
				<div>
					<div
						style={{
							fontSize: "2rem",
							textAlign: "center",
							marginTop: "50px",
							color: "darkslategray",
							fontWeight: "bold",
						}}>
						Loading...
					</div>
				</div>
			) : (
				<React.Fragment>
					<div className='row'>
						<div className='col-md-10 mt-3 mx-auto'>
							<Link
								to='/admin/dashboard'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								<div className='backToAdminDashboard'>
									<i className='fas fa-arrow-alt-circle-left mr-3'></i>
									Back to Admin Dashboard
								</div>
							</Link>
						</div>
						<div className='col-md-8 mx-auto mb-5'>
							<div
								className='mt-3'
								style={{
									border: "3px solid black",
									boxShadow: "4px 4px 2px 2px rgba(0,0,0,0.3)",
								}}>
								<ul className='list-group mb-2'>
									<li className='list-group-item'>{showStatus(singleOrder)}</li>
									{/* {Invoice(o)} */}

									<li className='list-group-item'>
										<strong>
											Payment Status: {singleOrder && singleOrder.status}
										</strong>{" "}
									</li>

									<li className='list-group-item mb-2'>
										<strong>Booked From:</strong>{" "}
										<span
											className='alert alert-info'
											style={{ fontWeight: "bold" }}>
											{singleOrder.bookedFrom}
										</span>
									</li>

									<li className='list-group-item'>
										Receipt Number / Invoice Number:{" "}
										{singleOrder && singleOrder._id}
									</li>
									<li className='list-group-item'>
										Ordered by: {singleOrder && singleOrder.fullName}
									</li>
									<li className='list-group-item'>
										Ordered by Email:{" "}
										{singleOrder && singleOrder.scheduledByUserEmail}
									</li>

									<li className='list-group-item'>
										Customer Phone #: {singleOrder && singleOrder.phoneNumber}
									</li>

									<li className='list-group-item'>
										Customer Comments:{" "}
										{singleOrder && singleOrder.appointmentComment
											? singleOrder.appointmentComment
											: "No Comments Were Added"}
									</li>

									<li className='list-group-item'>
										Total Amount Before Discounts:{" "}
										{singleOrder && singleOrder.totalAmountBeforeDiscount} L.E.
									</li>
									<li className='list-group-item'>
										Paid Amount: {singleOrder && singleOrder.totalAmount} L.E.
									</li>
									<li className='list-group-item'>
										Paid Transportation Fees:{" "}
										{singleOrder &&
											singleOrder.chosenBusStation &&
											singleOrder.chosenBusStation.price}{" "}
										L.E.
									</li>

									{/* <li className="list-group-item">
                    First Purchase: {singleOrder && singleOrder.appliedCouponData===null && }
                  </li> */}
									<li className='list-group-item'>
										Discounted Amount:{" "}
										{Number(singleOrder.totalAmountBeforeDiscount) -
											Number(singleOrder.totalAmount)}{" "}
										L.E.
									</li>

									<li className='list-group-item'>
										Applied Coupon:{" "}
										{singleOrder &&
										singleOrder.chosenCoupon &&
										singleOrder.chosenCoupon.name
											? singleOrder.chosenCoupon.name
											: "No Coupon"}
									</li>

									<li className='list-group-item'>
										Ordered on:{" "}
										{moment(singleOrder && singleOrder.createdAt).fromNow()} (
										{new Date(singleOrder.createdAt).toDateString()})
									</li>

									<li className='list-group-item'>
										Event Date:{" "}
										{new Date(
											singleOrder && singleOrder.scheduledDate,
										).toDateString()}
									</li>

									<li className='list-group-item'>
										Event Name: {singleOrder && singleOrder.event}
									</li>

									<li className='list-group-item'>
										Bus Station Name:{" "}
										{singleOrder &&
										singleOrder.chosenBusStation &&
										singleOrder.chosenBusStation.address
											? singleOrder.chosenBusStation.address
											: "Not Determined"}
									</li>

									<li className='list-group-item'>
										Bus Station Chosen Time:{" "}
										{singleOrder && singleOrder.chosenBusStationTime}
									</li>
								</ul>
								<hr />
								<br />
							</div>
						</div>
					</div>
				</React.Fragment>
			)}
		</SingleReservationPageWrapper>
	);
};

export default SingleReservationPage;

const SingleReservationPageWrapper = styled.div`
	min-height: 500px;
`;
