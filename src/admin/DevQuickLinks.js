/** @format */
// eslint-disable-next-line
import React, { Fragment, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// eslint-disable-next-line
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import styled from "styled-components";
import Adminsidebar from "./AdminSideBar/Adminsidebar";
import DarkBG from "./AdminSideBar/DarkBG";

const DevQuickLinks = () => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);
	//
	const makeAPayment = () => {
		window.open("https://infinite-apps.com/business-dashboard");
	};

	//
	const supportTikcet = () => {
		window.open("https://infinite-apps.com/client/ticketing-system");
	};

	//
	const feedBack = () => {
		window.open("https://infinite-apps.com/client/add-comment");
	};

	//
	const cancelSubscription = () => {
		window.open("https://infinite-apps.com/contact");
	};
	useEffect(() => {
		setClickMenu2(click2);
	}, [click2, clickMenu2]);

	return (
		<DevQuickLinksWrapper>
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
			<div
				className='col-md-6 col-sm-6 offset-md-2 mt-5 mx-auto p-3'
				style={{
					border: "1px black solid",
					borderRadius: "20px",
					marginBottom: "260px",
				}}>
				<h3 className='my-5 text-center'>
					Check your payment details, offers or support tickets.
				</h3>
				<div className='row text-center'>
					<div className='col-md-5 mx-auto '>
						<strong>User Name:</strong> DemoCustomer@Infinite-apps.com
					</div>
					<div className='col-md-5 mx-auto'>
						{" "}
						<strong>Password:</strong> infinite-apps123
					</div>
				</div>
				<div className='boxOptions' onClick={makeAPayment}>
					Make Your Payment / Check Offers
				</div>
				<div className='boxOptions' onClick={supportTikcet}>
					Create A Support Ticket
				</div>
				<div className='boxOptions' onClick={feedBack}>
					Leave your rating for Infinite-Apps
				</div>
				<div className='boxOptions' onClick={cancelSubscription}>
					Contact Infinite-Apps To Cancel Subscription
				</div>
				<ToastContainer />
			</div>
		</DevQuickLinksWrapper>
	);
};

export default DevQuickLinks;

const DevQuickLinksWrapper = styled.div`
	.boxOptions {
		padding: 10px;
		text-align: center;
		margin: 30px 30px;
		border: solid 2px darkGrey;
		border-radius: 10px;
		cursor: pointer;
		font-size: 1.2rem;
		font-weight: bold;
		letter-spacing: 3px;
		background: darkred;
		color: white;
		transition: 0.5s;
	}

	.boxOptions:hover {
		transition: 0.5s;
		padding: 20px;
		background: darkslategray;
	}
`;
