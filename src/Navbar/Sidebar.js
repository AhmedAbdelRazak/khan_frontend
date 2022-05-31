/** @format */
import React, { Fragment, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import styled from "styled-components";
// eslint-disable-next-line
import logo from "./Logo.jpg";
import { allLoyaltyPointsAndStoreStatus } from "../apiCore";
import ReactGA from "react-ga";

const mountedStyle = { animation: "inAnimation 600ms ease-in" };
const unmountedStyle = {
	animation: "outAnimation 600ms ease-out",
	animationFillMode: "forwards",
};

const Sidebar = ({
	history,
	click,
	setClick,
	clickMenu,
	setClickMenu,
	language,
	setLanguage,
}) => {
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

	const handleSidebar = () => {
		setClick(!click);
	};

	const storeLogo2 =
		"https://res.cloudinary.com/infiniteapps/image/upload/v1652480319/khankhadija/LogoSideBar_YusufSidebar_gfw40c.png";

	// eslint-disable-next-line
	var index2 = storeLogo2.indexOf("upload");

	// var finalLogoUrl2 =
	// 	storeLogo2.substr(0, index2 + 6) +
	// 	"/e_bgremoval" +
	// 	storeLogo2.substr(index2 + 6);

	var finalLogoUrl2 = storeLogo2;

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		// To Report Page View
		// ReactGA.pageview(window.location.pathname + window.location.search);
		// eslint-disable-next-line
	}, []);

	return (
		<Nav
			className=' navbar  navbar-expand-lg nav-center py-1 overAllSidebar'
			style={
				{
					// backgroundColor: "white",
					// boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.2)",
				}
			}>
			<div className='infiniteAppsLogo'>
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
						alt='Khan Khadija'
						style={click ? unmountedStyle : mountedStyle}
						className={click ? "imgLogo" : "imgLogo"}
					/>
					{/* <div className='logo-type' style={{ color: "black" }}>
						Grooming Brand <br />
					</div> */}
				</Link>
			</div>
			{click ? (
				<i
					className='fa fa-window-close nav-icon faaa-bars'
					onClick={handleSidebar}
					style={{
						color: "var(--orangePrimary)",
						fontWeight: "bolder",
						fontSize: "1.6rem",
						display: "none",
					}}></i>
			) : (
				<span className='nav-icon mt-2'>
					{language === "Arabic" ? (
						<span
							className='nav-item mx-2 navLanguage'
							style={{ marginTop: "0px" }}
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
								ReactGA.event({
									category: "User Changed Language",
									action: `User Changed Language to ${language}`,
									label: "Language Was Changed",
								});
							}}>
							<span className=' mr-0 btn mb-2' style={{ padding: "0px" }}>
								{language === "English" ? (
									<span
										style={{
											// background: "#c40000",
											cursor: "pointer",
											// borderBottom: "solid 1px white",
											textDecoration: "underline",
											padding: "0px 5px",
											color: "var(--orangePrimary)",
											// position: "absolute",
											// top: "30px",
											// right: "13%",

											fontSize: "0.9rem",
										}}
										className='btn '
										onClick={() => {
											setLanguage("Arabic");
											setClickMenu(false);
											setClick(false);
											// window.location.reload(false);
										}}>
										عربي
									</span>
								) : (
									<span
										style={{
											// background: "#c40000",
											cursor: "pointer",
											border: "solid 1px white",
											padding: "0px 2px",
											color: "var(--orangePrimary)",
											fontSize: "14px",
										}}
										className='btn '
										onClick={() => {
											setLanguage("English");
											setClickMenu(false);
											setClick(false);
											// window.location.reload(false);
										}}>
										En
									</span>
								)}
							</span>
						</span>
					) : (
						<span
							className='nav-item mx-2 navLanguage'
							style={{ marginTop: "0px" }}
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
								ReactGA.event({
									category: "User Changed Language",
									action: `User Changed Language to ${language}`,
									label: "Language Was Changed",
								});
							}}>
							<span className=' mr-0 btn mb-2' style={{ padding: "1px" }}>
								{language === "English" ? (
									<span
										style={{
											// background: "#c40000",
											cursor: "pointer",
											// borderBottom: "solid 1px white",
											padding: "0px 5px",
											color: "var(--orangePrimary)",
											textDecoration: "underline",
											// position: "absolute",
											// top: "30px",
											// right: "13%",

											fontSize: "0.9rem",
										}}
										className='btn '
										onClick={() => {
											setLanguage("Arabic");
											setClickMenu(false);
											setClick(false);
											// window.location.reload(false);
										}}>
										عربي
									</span>
								) : (
									<span
										style={{
											// background: "#c40000",
											cursor: "pointer",
											border: "solid 1px white",
											padding: "0px 2px",
											color: "var(--orangePrimary)",
											fontSize: "14px",
										}}
										className='btn '
										onClick={() => {
											setLanguage("English");
											setClickMenu(false);
											setClick(false);
											// window.location.reload(false);
										}}>
										En
									</span>
								)}
							</span>
						</span>
					)}
					<i
						style={{
							color: "var(--orangePrimary)",
							fontWeight: "bolder",
							fontSize: "1.6rem",
						}}
						className='fa fa-bars faaa-bars'
						onClick={handleSidebar}></i>
				</span>
			)}
			<SideWrapper show={clickMenu} dir={language === "Arabic" ? "rtl" : "ltr"}>
				<span className={language === "Arabic" ? "AlignItemsRight" : ""}>
					<div className='upperStyling'>
						<img
							src={
								storeLogo
									? finalLogoUrl2
									: "https://res.cloudinary.com/infiniteapps/image/upload/e_bgremoval/v1652480319/khankhadija/LogoSideBar_YusufSidebar_gfw40c.png"
							}
							alt='Infinite-Apps'
							className={language === "Arabic" ? "imgLogo2Arabic" : "imgLogo2 "}
						/>
					</div>
					<ul>
						<li
							className='mt-3'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								to='/'
								className='sidebar-link'
								onClick={() => {
									setClickMenu(false);
									setClick(false);
								}}>
								{click && clickMenu ? (
									<React.Fragment>
										<i
											className={
												language === "Arabic"
													? "fas fa-home fontawesome-iconsArabic"
													: "fas fa-home fontawesome-icons"
											}></i>
										<span className='linkStyling'>
											{language === "Arabic" ? (
												<span className='linkTextArabic'>الصفحة الرئيسية</span>
											) : (
												"Home"
											)}
										</span>
									</React.Fragment>
								) : null}
							</Link>
						</li>

						<li
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								to='/listings'
								className='sidebar-link'
								onClick={() => {
									setClickMenu(false);
									setClick(false);
								}}>
								{click && clickMenu ? (
									<React.Fragment>
										<span
											className={
												language === "Arabic"
													? "fontawesome-pricingWrapperArabic"
													: "fontawesome-pricingWrapper"
											}>
											<i
												className={
													language === "Arabic"
														? "far fa-list-alt fontawesome-iconsArabic"
														: "far fa-list-alt fontawesome-iconsPricing"
												}></i>{" "}
										</span>
										<span className='linkStyling'>
											{" "}
											{language === "Arabic" ? (
												<span className='linkTextArabic'>احجز الآن</span>
											) : (
												"Book Now"
											)}{" "}
										</span>
									</React.Fragment>
								) : null}
							</Link>
						</li>

						<li
							onClick={() => {
								window.scrollTo({ top: 250, behavior: "smooth" });
							}}>
							<Link
								to='/khan-khadija-gallery'
								className='sidebar-link'
								onClick={() => {
									setClickMenu(false);
									setClick(false);
								}}>
								{click && clickMenu ? (
									<React.Fragment>
										<span
											className={
												language === "Arabic"
													? "fontawesome-pricingWrapperArabic"
													: "fontawesome-pricingWrapper"
											}>
											<i
												className={
													language === "Arabic"
														? "fas fa-camera fontawesome-iconsArabic"
														: "fas fa-camera fontawesome-iconsPricing"
												}></i>{" "}
										</span>
										<span className='linkStyling'>
											{" "}
											{language === "Arabic" ? (
												<span className='linkTextArabic'> صور الخان</span>
											) : (
												"Khan Gallery"
											)}{" "}
										</span>
									</React.Fragment>
								) : null}
							</Link>
						</li>

						<li
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								to='/contact'
								className='sidebar-link'
								onClick={() => {
									setClickMenu(false);
									setClick(false);
								}}>
								{click && clickMenu ? (
									<React.Fragment>
										<span
											className={
												language === "Arabic"
													? "fontawesome-pricingWrapperArabic"
													: "fontawesome-pricingWrapper"
											}>
											<i
												className={
													language === "Arabic"
														? "fas fa-address-card  fontawesome-iconsArabic"
														: "fas fa-address-card  fontawesome-iconsPricing"
												}></i>{" "}
										</span>
										<span className='linkStyling'>
											{" "}
											{language === "Arabic" ? (
												<span className='linkTextArabic'> اتصل بنا</span>
											) : (
												"Contact Us"
											)}{" "}
										</span>
									</React.Fragment>
								) : null}
							</Link>
						</li>

						<li
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								to='/about'
								className='sidebar-link'
								onClick={() => {
									setClickMenu(false);
									setClick(false);
								}}>
								{click && clickMenu ? (
									<React.Fragment>
										<span
											className={
												language === "Arabic"
													? "fontawesome-pricingWrapperArabic"
													: "fontawesome-pricingWrapper"
											}>
											<i
												className={
													language === "Arabic"
														? "fas fa-sitemap  fontawesome-iconsArabic"
														: "fas fa-sitemap  fontawesome-iconsPricing"
												}></i>{" "}
										</span>
										<span className='linkStyling'>
											{" "}
											{language === "Arabic" ? (
												<span className='linkTextArabic'>من نحن </span>
											) : (
												<span>About us</span>
											)}{" "}
										</span>
									</React.Fragment>
								) : null}
							</Link>
						</li>

						{isAuthenticated() && isAuthenticated().user.role === 0 && (
							<li
								className='nav-item ml-5 mt-3'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								<Link
									className='nav-link '
									to='/dashboard'
									style={{ fontWeight: "bold" }}
									onClick={() => {
										setClickMenu(false);
										setClick(false);
									}}>
									<span className='linkStyling'>My Account/Dashboard</span>
								</Link>
							</li>
						)}

						{isAuthenticated() && isAuthenticated().user.role === 1 && (
							<React.Fragment>
								{language === "Arabic" ? (
									<li
										className='nav-item ml-3 mt-3'
										onClick={() => {
											window.scrollTo({ top: 0, behavior: "smooth" });
										}}>
										<Link
											style={{
												fontWeight: "bold",
												color: "var(--orangePrimary)",
											}}
											className='nav-link '
											to='/admin/dashboard'
											onClick={() => {
												setClickMenu(false);
												setClick(false);
											}}>
											<span className='linkStyling linkTextArabic'>
												لوحة التحكم
											</span>
										</Link>
									</li>
								) : (
									<li
										className='nav-item ml-3 mt-3'
										onClick={() => {
											window.scrollTo({ top: 0, behavior: "smooth" });
										}}>
										<Link
											style={{
												fontWeight: "bold",
												color: "var(--orangePrimary)",
											}}
											className='nav-link '
											to='/admin/dashboard'
											onClick={() => {
												setClickMenu(false);
												setClick(false);
											}}>
											<span className='linkStyling'>Admin Dashboard</span>
										</Link>
									</li>
								)}
							</React.Fragment>
						)}

						{isAuthenticated() && isAuthenticated().user.role === 2 && (
							<React.Fragment>
								{language === "Arabic" ? (
									<li
										className='nav-item ml-3 mt-3'
										onClick={() => {
											window.scrollTo({ top: 0, behavior: "smooth" });
										}}>
										<Link
											style={{
												fontWeight: "bold",
												color: "var(--orangePrimary)",
											}}
											className='nav-link '
											to='/clerk/dashboard'
											onClick={() => {
												setClickMenu(false);
												setClick(false);
											}}>
											<span className='linkStyling linkTextArabic'>
												لوحة التحكم
											</span>
										</Link>
									</li>
								) : (
									<li
										className='nav-item ml-3 mt-3'
										onClick={() => {
											window.scrollTo({ top: 0, behavior: "smooth" });
										}}>
										<Link
											style={{
												fontWeight: "bold",
												color: "var(--orangePrimary)",
											}}
											className='nav-link '
											to='/clerk/dashboard'
											onClick={() => {
												setClickMenu(false);
												setClick(false);
											}}>
											<span className='linkStyling'>Clerk Dashboard</span>
										</Link>
									</li>
								)}
							</React.Fragment>
						)}

						{!isAuthenticated() && (
							<Fragment>
								<li
									className='nav-item ml-3 mt-3'
									onClick={() => {
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}>
									<Link
										className='nav-link '
										to='/login'
										style={{ fontWeight: "bold", color: "white" }}
										onClick={() => {
											setClickMenu(false);
											setClick(false);
										}}>
										<span className='linkStyling'>
											{language === "Arabic" ? (
												<span className='linkTextArabic'>تسجيل الدخول</span>
											) : (
												"Login"
											)}
										</span>
									</Link>
								</li>
							</Fragment>
						)}

						{isAuthenticated() && (
							<li
								className='nav-item'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								<span>
									<span
										className='signoutbutton nav-link'
										style={{
											cursor: "pointer",
											// margin: 10,
											fontWeight: "bold",
											textDecoration: "underline",
											color: "#ff3b3b",
											// fontStyle: "italic",
											fontSize: "1.2rem",
										}}
										onClick={() =>
											signout(() => {
												setClickMenu(false);
												setClick(false);
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

						{/** The Language Button */}

						{language === "Arabic" ? (
							<li
								className='nav-item mx-3'
								style={{ marginTop: "50px" }}
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								<span style={{ color: "white", fontWeight: "bold" }}>
									{language === "Arabic" ? "اللغة" : "Language"}
								</span>{" "}
								<span className=' ml-2 btn' style={{ padding: "1px" }}>
									{language === "English" ? (
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
												setLanguage("Arabic");
												setClickMenu(false);
												setClick(false);
												ReactGA.event({
													category: "User Changed Language",
													action: `User Changed Language to Arabic`,
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
												setClickMenu(false);
												setClick(false);
												ReactGA.event({
													category: "User Changed Language",
													action: `User Changed Language to English`,
													label: "Language Was Changed",
												});
												// window.location.reload(false);
											}}>
											English
										</span>
									)}
								</span>
							</li>
						) : (
							<li
								className='nav-item mx-5'
								style={{ marginTop: "50px" }}
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								<span style={{ color: "white", fontWeight: "bold" }}>
									{language === "Arabic" ? "اللغة" : "Language"}
								</span>{" "}
								<span className=' ml-2 btn' style={{ padding: "1px" }}>
									{language === "English" ? (
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
												setLanguage("Arabic");
												setClickMenu(false);
												setClick(false);
												ReactGA.event({
													category: "User Changed Language",
													action: `User Changed Language to Arabic`,
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
												setClickMenu(false);
												setClick(false);
												ReactGA.event({
													category: "User Changed Language",
													action: `User Changed Language to English`,
													label: "Language Was Changed",
												});
												// window.location.reload(false);
											}}>
											English
										</span>
									)}
								</span>
							</li>
						)}
					</ul>
				</span>
			</SideWrapper>
		</Nav>
	);
};

export default withRouter(Sidebar);

const Nav = styled.nav`
	overflow: hidden;
	background-image: linear-gradient(to right, #1e467d, #1e467d) !important;
	/* font-family: "Droid Arabic Kufi"; */

	.infiniteAppsLogo {
		width: 250px;
		height: 79px;
		margin-top: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
		/* border-radius: 15px; */
	}

	.imgLogo {
		width: 250px;
		height: 79px;
		object-fit: cover;
		margin-top: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
		border-radius: 15px;
	}

	.logoDisapear {
		display: none;
	}

	.nav-icon {
		font-size: 1.5rem;
		cursor: pointer;
		margin-left: 4px;
		font-weight: bold;
	}

	.linkTextArabic {
		font-family: "Droid Arabic Kufi" !important;
	}

	@media (max-width: 950px) {
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		width: 100%;
		padding: 0.5rem 1.5rem;
		background: white;
		border-bottom: 3px solid var(--darkGrey);
		z-index: 300;

		.cart-badge {
			border-radius: 100%;
			font-size: 12px;
			font-style: italic;
			background: #737070;
			color: white;
			text-decoration: none !important;
			display: block;
			padding: 5.2px;
			font-weight: bold;
			position: absolute;
			left: 10px;
		}

		.logo-type {
			font-size: 1rem;
			font-family: "Snell Roundhand, cursive";
			font-weight: bold;
			text-align: center;
			font-style: italic;
			display: inline-block;
			vertical-align: middle;
			margin-bottom: 0;
			margin-right: 2px;
		}

		.nav-center {
			display: flex;
			align-items: center;
			justify-content: space-between;
			max-width: 1170px;
			margin: 0 auto;
		}

		.nav-cart {
			position: relative;
		}
		.cart-items {
			background: var(--mainGrey);
			color: black;
			font-weight: bold;
			font-size: 0.7rem;
			position: absolute;
			padding: 0 5px;
		}

		.logo-type {
			font-size: 1rem;
			font-family: "Snell Roundhand, cursive";
			font-weight: bold;
			text-align: center;
			font-style: italic;
			display: inline-block;
			vertical-align: middle;
			margin-bottom: 0;
		}
	}
	font-size: 1rem;

	@media (max-width: 380px) {
		.navLanguage {
			display: none;
		}
	}
`;

const SideWrapper = styled.nav`
	overflow-y: auto;
	position: fixed;
	top: 0px;
	right: 0;
	width: 70%;
	height: 100%;
	background: #ebf5ff;
	z-index: 100;
	border-right: 3px solid darkgrey;
	transition: 0.5s;
	transform: ${(props) => (props.show ? "translateX(0)" : "translateX(250%)")};
	background-image: linear-gradient(to right, #1e467d, #1e467d) !important;

	.AlignItemsRight {
		text-align: right;
	}

	/*transform: translateX(-100%);*/ /**this will hide the side bar */

	.upperStyling {
		background: var(--orangePrimary);
		/* padding: 60px; */
		position: relative;
		min-height: 120px;
		text-align: center;
	}

	.imgLogo2 {
		width: 250px;
		height: 80px;
		object-fit: cover;
		margin-top: 20px;
		margin-bottom: 0px;
		margin-right: 50px;
		/* border-radius: 15px; */
		text-align: center;
	}

	.imgLogo2Arabic {
		width: 250px;
		height: 80px;
		object-fit: cover;
		margin-top: 20px;
		margin-bottom: 0px;
		margin-right: 20px;
		/* border-radius: 15px; */
		text-align: center;
	}

	ul {
		list-style-type: none;
		padding: 0 !important;
	}

	li {
		margin-left: 30px;
	}
	.sidebar-link {
		display: block;
		font-size: 1.1rem;
		text-transform: capitalize;
		color: white;
		padding: 1.1rem 1.1rem;
		background: transparent;
		transition: 0.3s;
		font-weight: bold;
	}
	.sidebar-link:hover {
		background: white;
		opacity: 0.2;
		color: black;
		/* padding: 1rem 2rem 1rem 2rem; */
		text-decoration: none;
	}

	.liForBlogs {
		display: inline-block;
	}

	.fontawesome-icons {
		color: white;
		opacity: 0.4;
		margin-right: 10px;
		font-size: 1.2rem;
		/* font-weight: bold; */
	}

	.fontawesome-pricingWrapper {
		color: white;
		opacity: 0.4;
		margin-right: 8px;
		/* font-weight: bold; */
	}

	.fontawesome-iconsPricing {
		color: white;
		opacity: 0.4;
		font-size: 1.2rem;
		/* font-weight: bold; */
	}

	.fontawesome-iconsSpecial {
		margin-right: 10px;
		font-size: 1.2rem;
		opacity: 0.4;
	}

	.fontawesome-iconsArabic {
		color: white;
		opacity: 0.4;
		margin-left: 10px;
		font-size: 1.2rem;
		/* font-weight: bold; */
	}

	.fontawesome-pricingWrapperArabic {
		color: white;
		opacity: 0.4;
		/* margin-left: 8px; */
		/* font-weight: bold; */
	}

	.fontawesome-iconsPricingArabic {
		color: white;
		opacity: 0.4;
		font-size: 1.2rem;
		/* font-weight: bold; */
	}

	.fontawesome-iconsSpecialArabic {
		margin-left: 10px;
		font-size: 1.2rem;
		opacity: 0.4;
	}

	.linkStyling {
		font-size: 1.2rem;
		margin-left: 12px;
	}

	@media (min-width: 600px) {
		width: 20rem;
	}
	@media (max-width: 600px) {
		font-size: 0.8rem !important;
		.sidebar-link {
			font-size: 0.8rem !important;
		}
	}
	@media (min-width: 950px) {
		display: none;
	}
`;
