/** @format */

//book onsite functionality
// user role functionality per site
// payment method online
import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
// eslint-disable-next-line
import logo from "./Logo.jpg";
import { signout, isAuthenticated } from "../auth";
import { allLoyaltyPointsAndStoreStatus } from "../apiCore";
import ReactGA from "react-ga";

const isActive = (history, path) => {
	if (history.location.pathname === path) {
		return {
			color: "white",
			background: "#00326a",
			fontWeight: "bold",
			borderRadius: "6px",
			padding: "5px",
			// textDecoration: "underline",
		};
	} else {
		return { color: "black", fontWeight: "bold" };
	}
};

const isActiveItemsToRight = (history, path) => {
	if (history.location.pathname === path) {
		return {
			color: "white",
			background: "#50a2ff",
			fontWeight: "bold",
			borderRadius: "6px",
			padding: "5px",
			// textDecoration: "underline",
		};
	} else {
		return { color: "black", fontWeight: "bold" };
	}
};

const Navbar = ({ history, language, setLanguage }) => {
	const [
		alreadySetLoyaltyPointsManagement,
		setAlreadySetLoyaltyPointsManagement,
	] = useState("");

	const gettingPreviousLoyaltyPointsManagement = () => {
		allLoyaltyPointsAndStoreStatus().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAlreadySetLoyaltyPointsManagement(data && data[data.length - 1]);
			}
		});
	};

	useEffect(() => {
		gettingPreviousLoyaltyPointsManagement();
		// eslint-disable-next-line
	}, []);

	const storeLogo =
		alreadySetLoyaltyPointsManagement &&
		alreadySetLoyaltyPointsManagement.addStoreLogo &&
		alreadySetLoyaltyPointsManagement.addStoreLogo[0] &&
		alreadySetLoyaltyPointsManagement.addStoreLogo[0].url;
	var index = storeLogo.indexOf("upload");

	var finalLogoUrl =
		storeLogo.substr(0, index + 6) +
		"/e_bgremoval" +
		storeLogo.substr(index + 6);

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		// To Report Page View
		// ReactGA.pageview(window.location.pathname + window.location.search);
		// eslint-disable-next-line
	}, []);

	return (
		<Navbar1
			className='container-fluid'
			dir={language === "Arabic" ? "rtl" : "ltr"}>
			<div className=' py-2  mx-auto'>
				<span className='infiniteAppsLogo'>
					<Link
						to='/'
						onClick={() => {
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}>
						<img
							src={
								storeLogo
									? finalLogoUrl
									: "https://res.cloudinary.com/infiniteapps/image/upload/v1652478256/khankhadija/1652478256239.png"
							}
							alt='Infinite-Apps'
							className='imgLogo'
						/>
					</Link>
				</span>

				<span className='ItemsToRight '>
					<li
						onClick={() => {
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}>
						<Link style={isActive(history, "/")} to='/'>
							{language === "Arabic" ? (
								<span className='linkTextArabic'>الصفحة الرئيسية</span>
							) : (
								"Home"
							)}
						</Link>
					</li>

					<li
						onClick={() => {
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}>
						<Link style={isActive(history, "/listings")} to='/listings'>
							{language === "Arabic" ? (
								<span className='linkTextArabic'>احجز الآن</span>
							) : (
								"Book Now"
							)}
						</Link>
					</li>

					<li
						onClick={() => {
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}>
						<Link
							style={isActive(history, "/khan-khadija-gallery")}
							to='/khan-khadija-gallery'>
							{language === "Arabic" ? (
								<span className='linkTextArabic'> صور الخان</span>
							) : (
								"Khan Gallery"
							)}
						</Link>
					</li>

					<li
						onClick={() => {
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}>
						<Link style={isActive(history, "/contact")} to='/contact'>
							{language === "Arabic" ? (
								<span className='linkTextArabic'>اتصل بنا</span>
							) : (
								"Contact us"
							)}
						</Link>
					</li>
					<li
						onClick={() => {
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}>
						<Link style={isActive(history, "/about")} to='/about'>
							{language === "Arabic" ? (
								<span className='linkTextArabic'>من نحن</span>
							) : (
								"About us"
							)}
						</Link>
					</li>

					{isAuthenticated() && isAuthenticated().user.role === 0 && (
						<li
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								className='DashboardStyling'
								style={isActiveItemsToRight(history, "/dashboard")}
								to='/dashboard'>
								Dashboard
							</Link>
						</li>
					)}

					{isAuthenticated() && isAuthenticated().user.role === 1 && (
						<React.Fragment>
							<li
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								<Link
									className='DashboardStyling'
									style={isActiveItemsToRight(history, "/admin/dashboard")}
									to='/admin/dashboard'>
									Admin Dashboard
								</Link>
							</li>
						</React.Fragment>
					)}

					{isAuthenticated() && isAuthenticated().user.role === 2 && (
						<React.Fragment>
							<li
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								<Link
									className='DashboardStyling'
									style={isActiveItemsToRight(history, "/clerk/dashboard")}
									to='/clerk/dashboard'>
									Clerk Dashboard
								</Link>
							</li>
						</React.Fragment>
					)}

					{!isAuthenticated() && (
						<Fragment>
							<li
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								<Link
									className='LoginStyling'
									style={isActiveItemsToRight(history, "/login")}
									to='/login'>
									{language === "Arabic" ? (
										<span className='linkTextArabic'>تسجيل الدخول</span>
									) : (
										"Login"
									)}
								</Link>
							</li>
						</Fragment>
					)}

					{isAuthenticated() && (
						<li
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<span>
								<span
									className='signoutbutton nav-link'
									style={{
										cursor: "pointer",
										fontWeight: "bold",
										textDecoration: "underline",
										color: "#ffdbda",
										// fontStyle: "italic",
									}}
									onClick={() =>
										signout(() => {
											history.push("/");
											localStorage.removeItem("userHistoryPurchases");
											localStorage.removeItem("order");
										})
									}>
									{language === "Arabic" ? (
										<span className='linkTextArabic'>تسجيل خروج</span>
									) : (
										"Signout"
									)}
								</span>
							</span>
						</li>
					)}

					<li
						className='nav-item ml-5'
						// style={{ marginTop: "150px" }}
						onClick={() => {
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}>
						{/* <span style={{ color: "white", fontWeight: "bold" }}>
							{language === "Arabic" ? "اللغة" : "Language"}
						</span>{" "} */}
						<span className=' ml-2 btn' style={{ padding: "0px" }}>
							{language === "English" ? (
								<span
									style={{
										// background: "#c40000",
										color: "var(--orangePrimary)",
										cursor: "pointer",
										border: "solid 1px white",
										padding: "0px 6px",
									}}
									className='btn '
									onClick={() => {
										setLanguage("Arabic");
										ReactGA.event({
											category: "User Changed Language",
											action: `User Changed Language to ${language}`,
											label: "Language Was Changed",
										});
										// window.location.reload(false);
									}}>
									Arabic
								</span>
							) : (
								<span
									style={{
										// background: "#c40000",
										cursor: "pointer",
										border: "solid 1px white",
										padding: "0px 6px",
										color: "var(--orangePrimary)",
									}}
									className='btn '
									onClick={() => {
										setLanguage("English");
										ReactGA.event({
											category: "User Changed Language",
											action: `User Changed Language to ${language}`,
											label: "Language Was Changed",
										});
										// window.location.reload(false);
									}}>
									English
								</span>
							)}
						</span>
					</li>
				</span>
			</div>
		</Navbar1>
	);
};

export default withRouter(Navbar);

const Navbar1 = styled.nav`
	margin: 0px;
	padding: 0px;
	box-sizing: border-box;
	background-color: white;
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	z-index: 100;
	/* box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1); */
	background-image: linear-gradient(to right, #1e467d, #1e467d);
	/* font-family: "Droid Arabic Kufi"; */

	a {
		color: white !important;
		transition: 0.3s;
		text-decoration: none;
		font-size: 16px;
	}

	li {
		//to display horizontally
		display: inline-block;
		margin: 10px 17px;
	}

	li a:hover {
		background: #047aff;
		color: white !important;
		outline-color: darkgrey;
		transition: 0.3s;
		border-radius: 3px;
		padding: 5px;
		text-decoration: none;
	}

	.brandName {
		margin-left: 5px;
		text-decoration: none;
		font-weight: bold;
		font-size: 13px;
	}

	.infiniteAppsLogo {
		width: 250px;
		height: 80px;
		margin-top: 0px;
		margin-bottom: 0px;
		margin-left: 50px;

		/* border-radius: 15px; */
	}

	.imgLogo {
		width: 250px;
		height: 80px;
		object-fit: cover;
		margin-top: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
		margin-right: 50px;
		border-radius: 15px;
	}

	.ItemsToRight {
		float: right;
		margin-top: 13px;
		margin-bottom: 13px;
		margin-right: 50px;
	}

	.LoginStyling {
		color: white !important;
		/* background: #ffc8c7; */
		font-weight: bold;
		border-radius: 6px;
		padding: 5px;
	}

	.DashboardStyling {
		color: white !important;
		/* background: #5981a2; */
		font-weight: bold;
		border-radius: 6px;
		padding: 5px;
	}

	input {
		border-radius: 5px;
		margin-right: 5px;
	}

	.icon {
		padding: 4px;
		border-radius: 3px;
		border: 0.5px solid black;
		transition: 0.3s;
	}

	.linkTextArabic {
		font-family: "Droid Arabic Kufi" !important;
	}

	@media (max-width: 1370px) {
		li a:hover {
			padding: 2px;
		}
		a {
			font-size: 14px;
		}
		li {
			display: inline-block;
			margin: 3px 10px;
		}
		.myLogo {
			margin-right: 50px;
		}
		input {
			width: 70%;
		}
		input::placeholder {
			font-size: 12px !important;
		}

		.infiniteAppsLogo {
			margin-left: 20px;
		}

		.ItemsToRight {
			margin-right: 10px;
		}
	}

	@media (max-width: 1141px) {
		li a:hover {
			padding: 2px;
		}
		a {
			font-size: 12px;
		}
		li {
			display: inline-block;
			margin: 3px 7px;
		}
		.myLogo {
			margin-right: 50px;
		}
		input {
			width: 70%;
		}
		input::placeholder {
			font-size: 12px !important;
		}

		.infiniteAppsLogo {
			margin-left: 5px;
		}

		.ItemsToRight {
			margin-right: 5px;
		}
	}

	@media (max-width: 950px) {
		input {
			display: none;
		}
		.icon {
			display: none;
		}
	}

	@media (max-width: 950px) {
		display: none;
	}
`;
