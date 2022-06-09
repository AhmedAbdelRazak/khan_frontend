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
	const [allTickets, setAllTickets] = useState([]);
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
							ADMIN MENU
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
								to='/admin/dashboard'
								className='sidebar-link'
								style={isActive(history, "/admin/dashboard")}
								onClick={() => {
									setClickMenu2(false);
									setClick2(false);
								}}>
								{click2 && clickMenu2 ? (
									<React.Fragment>Admin Dashboard</React.Fragment>
								) : null}
							</Link>
						</li>

						<li
							className='mt-3'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								to='/admin/create-a-ticket'
								className='sidebar-link'
								style={isActive(history, "/admin/create-a-ticket")}
								onClick={() => {
									setClickMenu2(false);
									setClick2(false);
								}}>
								{click2 && clickMenu2 ? (
									<React.Fragment>Add a Ticket/Package</React.Fragment>
								) : null}
							</Link>
						</li>

						<li
							className='mt-3'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								to={`/admin/update-a-ticket/${allTickets[0]}`}
								className='sidebar-link'
								style={isActive(
									history,
									`/admin/update-a-ticket/${allTickets[0]}`,
								)}
								onClick={() => {
									setClickMenu2(false);
									setClick2(false);
								}}>
								{click2 && clickMenu2 ? (
									<React.Fragment>Update a Ticket/Package</React.Fragment>
								) : null}
							</Link>
						</li>

						<li
							className='mt-3'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								to='/admin/tickets-count'
								style={isActive(history, "/admin/tickets-count")}
								className='sidebar-link'
								onClick={() => {
									setClickMenu2(false);
									setClick2(false);
								}}>
								{click2 && clickMenu2 ? (
									<React.Fragment>Set Tickets Count</React.Fragment>
								) : null}
							</Link>
						</li>

						<li
							className='mt-3'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								to='/admin/update-ticket-count'
								style={isActive(history, `/admin/update-ticket-count`)}
								className='sidebar-link'
								onClick={() => {
									setClickMenu2(false);
									setClick2(false);
								}}>
								{click2 && clickMenu2 ? (
									<React.Fragment>Update Tickets Count</React.Fragment>
								) : null}
							</Link>
						</li>

						<li
							className='mt-3'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								to={`/admin/onsite-locations`}
								className='sidebar-link'
								style={isActive(history, `/admin/onsite-locations`)}
								onClick={() => {
									setClickMenu2(false);
									setClick2(false);
								}}>
								{click2 && clickMenu2 ? (
									<React.Fragment> Manage Onsite Locations</React.Fragment>
								) : null}
							</Link>
						</li>

						<li
							className='mt-3'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								to={`/admin/bus-stations`}
								className='sidebar-link'
								style={isActive(history, `/admin/bus-stations`)}
								onClick={() => {
									setClickMenu2(false);
									setClick2(false);
								}}>
								{click2 && clickMenu2 ? (
									<React.Fragment> Manage Bus Stations</React.Fragment>
								) : null}
							</Link>
						</li>

						<li
							className='mt-3'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								to={`/admin/manage-coupons`}
								className='sidebar-link'
								style={isActive(history, `/admin/manage-coupons`)}
								onClick={() => {
									setClickMenu2(false);
									setClick2(false);
								}}>
								{click2 && clickMenu2 ? (
									<React.Fragment> Manage Coupons</React.Fragment>
								) : null}
							</Link>
						</li>

						<li
							className='mt-3'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								to={`/admin/manage-gallery`}
								className='sidebar-link'
								style={isActive(history, `/admin/manage-gallery`)}
								onClick={() => {
									setClickMenu2(false);
									setClick2(false);
								}}>
								{click2 && clickMenu2 ? (
									<React.Fragment> Manage Gallery</React.Fragment>
								) : null}
							</Link>
						</li>
						<li
							className='mt-3'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								to={`/admin/update-profile/${user._id}`}
								className='sidebar-link'
								style={isActive(history, `/admin/update-profile/${user._id}`)}
								onClick={() => {
									setClickMenu2(false);
									setClick2(false);
								}}>
								{click2 && clickMenu2 ? (
									<React.Fragment>Update Your Profile</React.Fragment>
								) : null}
							</Link>
						</li>

						<li
							className='mt-3'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								to={`/admin/create-site-account`}
								className='sidebar-link'
								style={isActive(history, `/admin/create-site-account`)}
								onClick={() => {
									setClickMenu2(false);
									setClick2(false);
								}}>
								{click2 && clickMenu2 ? (
									<React.Fragment>Create A Site Account</React.Fragment>
								) : null}
							</Link>
						</li>

						<li
							className='mt-3'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								to={`/admin/website-edit/aboutus-edit`}
								className='sidebar-link'
								style={isActive(history, `/admin/website-edit/aboutus-edit`)}
								onClick={() => {
									setClickMenu2(false);
									setClick2(false);
								}}>
								{click2 && clickMenu2 ? (
									<React.Fragment>Edit Your Website</React.Fragment>
								) : null}
							</Link>
						</li>

						<li
							className='mt-3'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								to={`/admin/khan-khadija/management`}
								className='sidebar-link'
								style={isActive(history, `/admin/khan-khadija/management`)}
								onClick={() => {
									setClickMenu2(false);
									setClick2(false);
								}}>
								{click2 && clickMenu2 ? (
									<React.Fragment>Khan Khadija Management</React.Fragment>
								) : null}
							</Link>
						</li>

						<li
							className='mt-3'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								to={`/admin/uncomplete-reservation`}
								className='sidebar-link'
								style={isActive(history, `/admin/uncomplete-reservation`)}
								onClick={() => {
									setClickMenu2(false);
									setClick2(false);
								}}>
								{click2 && clickMenu2 ? (
									<React.Fragment>Uncomplete Reservations</React.Fragment>
								) : null}
							</Link>
						</li>

						<li
							className='mt-3'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								to={`/admin/book-for-a-client/${ticketSlug[0]}`}
								className='sidebar-link'
								style={isActive(
									history,
									`/admin/book-for-a-client/:ticketName`,
								)}
								onClick={() => {
									setClickMenu2(false);
									setClick2(false);
								}}>
								{click2 && clickMenu2 ? (
									<React.Fragment>Reserve For A Client</React.Fragment>
								) : null}
							</Link>
						</li>

						{/* <li
							className='mt-3'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								to={`/admin/dev-payments`}
								className='sidebar-link'
								style={isActive(history, `/admin/dev-payments`)}
								onClick={() => {
									setClickMenu2(false);
									setClick2(false);
								}}>
								{click2 && clickMenu2 ? (
									<React.Fragment>Development and Payments</React.Fragment>
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
