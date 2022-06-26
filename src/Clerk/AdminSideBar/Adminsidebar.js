/** @format */
import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { getTickets } from "../apiAdmin";
import { isAuthenticated } from "../../auth/index";

const isActive = (history, path) => {
	if (history.location.pathname === path) {
		return {
			// color: "white !important",
			background: "#ead6d6",
			fontWeight: "bold",
			// textDecoration: "underline",
		};
	} else {
		return { color: "black", fontWeight: "bold" };
	}
};

const Adminsidebar = ({
	click2,
	clickMenu2,
	setClick2,
	setClickMenu2,
	history,
	match,
}) => {
	// eslint-disable-next-line
	const [allTickets, setAllTickets] = useState([]);
	// eslint-disable-next-line
	const [ticketSlug, setTicketSlug] = useState([]);
	const [click, setClick] = useState(true);
	const [clickMenu, setClickMenu] = useState(true);
	// eslint-disable-next-line
	const { token, user } = isAuthenticated();

	const handleSidebar = () => {
		setClick(!click);
		setClickMenu(!clickMenu);
	};

	const gettingAllTickets = () => {
		getTickets(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllTickets(data.map((serviceId) => serviceId._id));
				setTicketSlug(data.map((s) => s.serviceName.split(" ").join("-")));
			}
		});
	};

	useEffect(() => {
		gettingAllTickets();
		// eslint-disable-next-line
	}, []);

	return (
		<OverallSidebarWrapper>
			<div
				className=''
				onClick={() => {
					setClick2(!click2);
					setClickMenu2(!clickMenu2);
				}}
				style={{
					// minHeight: click && clickMenu ? "1200px" : "0px",
					// backgroundColor: click && clickMenu ? "#e8e6e9" : "#f7f7f6",
					padding: "5px",
					fontWeight: "bold",
					fontSize: "22px",
				}}>
				{click2 ? (
					<i
						className='far fa-window-close'
						onClick={handleSidebar}
						style={{
							color: "black",
							marginLeft: "30px",
							marginTop: "20px",
							fontSize: "22px",
							fontWeight: "bold",
						}}></i>
				) : (
					<i
						className='fa fa-bars'
						onClick={handleSidebar}
						style={{
							color: "black",
							marginLeft: "30px",
							marginTop: "20px",
						}}>
						<span
							className='my-auto ml-1'
							style={{ fontSize: "15px", cursor: "pointer" }}>
							CLERK MENU
						</span>
					</i>
				)}
				<SideWrapper show={clickMenu2}>
					<ul>
						<li
							className='mt-3'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								to='/clerk/dashboard'
								className='sidebar-link'
								style={isActive(history, "/clerk/dashboard")}
								onClick={() => {
									setClickMenu2(false);
									setClick2(false);
								}}>
								{click2 && clickMenu2 ? (
									<React.Fragment>Clerk Dashboard</React.Fragment>
								) : null}
							</Link>
						</li>

						{/* <li
							className='mt-3'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								to={`/clerk/book-for-a-client/${ticketSlug[0]}`}
								className='sidebar-link'
								style={isActive(
									history,
									`/clerk/book-for-a-client/${ticketSlug[0]}`,
								)}
								onClick={() => {
									setClickMenu2(false);
									setClick2(false);
								}}>
								{click2 && clickMenu2 ? (
									<React.Fragment>Reserve For A Client</React.Fragment>
								) : null}
							</Link>
						</li> */}
					</ul>
				</SideWrapper>
			</div>
		</OverallSidebarWrapper>
	);
};

export default withRouter(Adminsidebar);

const SideWrapper = styled.nav`
	position: fixed;
	top: 95px;
	left: 0;
	width: 70%;
	height: 100%;
	background: #f7f7f6;
	z-index: 100;
	border-right: 3px solid darkgrey;
	transition: 0.5s;
	transform: ${(props) => (props.show ? "translateX(0)" : "translateX(-100%)")};
	/*transform: translateX(-100%);*/ /**this will hide the side bar */
	ul {
		list-style-type: none;
		padding: 0 !important;
	}
	.sidebar-link {
		display: block;
		font-size: 0.8rem;
		text-transform: capitalize;
		color: black;
		padding: 0.2rem 0.2rem;
		margin-left: 10px;
		background: transparent;
		transition: 0.3s;
	}
	.sidebar-link:hover {
		background: #727272;
		color: whitesmoke !important;
		/* padding: 1rem 2rem 1rem 2rem; */
		text-decoration: none;
	}

	@media (min-width: 600px) {
		width: 20rem;
	}
	@media (max-width: 600px) {
		font-size: 0.8rem !important;
		.sidebar-link {
			font-size: 0.75rem !important;
			margin-left: 5px;
		}
	}
`;

const OverallSidebarWrapper = styled.div`
	height: 100%;
	z-index: 200;

	a {
		text-decoration: none;
	}
`;
