/** @format */
import React, { Fragment, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import styled from "styled-components";
// eslint-disable-next-line
import logo from "./Logo.jpg";
import { allLoyaltyPointsAndStoreStatus } from "../apiCore";

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
								: "https://res.cloudinary.com/infiniteapps/image/upload/e_bgremoval/v1640714861/KuwaitDemo/1640714860747.jpg"
						}
						alt='Infinite-Apps'
						className='imgLogo'
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
						color: "white",
						fontWeight: "bolder",
						fontSize: "1.6rem",
					}}></i>
			) : (
				<i
					style={{ color: "white", fontWeight: "bolder", fontSize: "1.6rem" }}
					className='fa fa-bars nav-icon faaa-bars'
					onClick={handleSidebar}></i>
			)}
			<SideWrapper show={clickMenu} dir={language === "Arabic" ? "rtl" : "ltr"}>
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
									{language === "Arabic" ? "الصفحة الرئيسية" : "Home"}
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
									{language === "Arabic" ? "احجز الآن" : "Book Now"}
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
									<i
										className={
											language === "Arabic"
												? "fas fa-address-card fontawesome-iconsArabic"
												: "fas fa-address-card fontawesome-icons"
										}></i>
									{language === "Arabic" ? "اتصل بنا" : "Contact us"}
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
									<i
										className={
											language === "Arabic"
												? "fas fa-sitemap fontawesome-iconsArabic"
												: "fas fa-sitemap fontawesome-icons"
										}></i>
									{language === "Arabic" ? "من نحن" : "About us"}
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
								My Account/Dashboard
							</Link>
						</li>
					)}

					{isAuthenticated() && isAuthenticated().user.role === 1 && (
						<React.Fragment>
							<li
								className='nav-item ml-5 mt-3'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								<Link
									style={{ fontWeight: "bold" }}
									className='nav-link '
									to='/admin/dashboard'
									onClick={() => {
										setClickMenu(false);
										setClick(false);
									}}>
									Admin Dashboard
								</Link>
							</li>
						</React.Fragment>
					)}

					{!isAuthenticated() && (
						<Fragment>
							<li
								className='nav-item ml-2 mt-3'
								onClick={() => {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}>
								<Link
									className='nav-link '
									to='/signin'
									style={{ fontWeight: "bold", color: "white" }}
									onClick={() => {
										setClickMenu(false);
										setClick(false);
									}}>
									{language === "Arabic" ? "تسجيل الدخول" : "Login"}
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
										color: "#ffc8c7",
										fontStyle: "italic",
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
									{language === "Arabic" ? "تسجيل خروج" : "Signout"}
								</span>
							</span>
						</li>
					)}
					<li
						className='nav-item mx-3'
						style={{ marginTop: "150px" }}
						onClick={() => {
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}>
						<span style={{ color: "white", fontWeight: "bold" }}>
							{language === "Arabic" ? "اللغة" : "Language"}
						</span>{" "}
						<span className=' ml-4 btn' style={{ padding: "1px" }}>
							{language === "English" ? (
								<span
									style={{ background: "#c40000", color: "white" }}
									className='btn '
									onClick={() => {
										setLanguage("Arabic");
										setClickMenu(false);
										setClick(false);
										// window.location.reload(false);
									}}>
									Arabic
								</span>
							) : (
								<span
									style={{ background: "#c40000", color: "white" }}
									className='btn '
									onClick={() => {
										setLanguage("English");
										setClickMenu(false);
										setClick(false);
										// window.location.reload(false);
									}}>
									English
								</span>
							)}
						</span>
					</li>
				</ul>
			</SideWrapper>
		</Nav>
	);
};

export default withRouter(Sidebar);

const Nav = styled.nav`
	overflow: hidden;
	background-image: linear-gradient(to right, #1e467d, #1e467d) !important;

	.infiniteAppsLogo {
		width: 159px;
		height: 79px;
		margin-top: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
		/* border-radius: 15px; */
	}

	.imgLogo {
		width: 159px;
		height: 79px;
		object-fit: cover;
		margin-top: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
		border-radius: 15px;
	}

	.nav-icon {
		font-size: 1.5rem;
		cursor: pointer;
		margin-left: 4px;
		font-weight: bold;
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
`;

const SideWrapper = styled.nav`
	overflow-y: auto;
	position: fixed;
	top: 87px;
	right: 0;
	width: 70%;
	height: 100%;
	background: #ebf5ff;
	z-index: 100;
	border-right: 3px solid darkgrey;
	transition: 0.5s;
	transform: ${(props) => (props.show ? "translateX(0)" : "translateX(250%)")};
	background-image: linear-gradient(to right, #1e467d, #1e467d) !important;

	/*transform: translateX(-100%);*/ /**this will hide the side bar */
	ul {
		list-style-type: none;
		padding: 0 !important;
	}
	.sidebar-link {
		display: block;
		font-size: 1rem;
		text-transform: capitalize;
		color: white;
		padding: 1.1rem 1.1rem;
		background: transparent;
		transition: 0.3s;
		font-weight: bold;
	}
	.sidebar-link:hover {
		background: #727272;
		color: whitesmoke;
		/* padding: 1rem 2rem 1rem 2rem; */
		text-decoration: none;
	}

	.liForBlogs {
		display: inline-block;
	}

	.fontawesome-icons {
		color: #ffdbda;
		margin-right: 10px;
		font-size: 1rem;
		/* font-weight: bold; */
	}

	.fontawesome-pricingWrapper {
		color: #ffdbda;
		margin-right: 8px;
		/* font-weight: bold; */
	}

	.fontawesome-iconsPricing {
		color: #ffdbda;
		font-size: 1rem;
		/* font-weight: bold; */
	}

	.fontawesome-iconsSpecial {
		margin-right: 10px;
		font-size: 1rem;
	}

	.fontawesome-iconsArabic {
		color: #ffdbda;
		margin-left: 10px;
		font-size: 1rem;
		/* font-weight: bold; */
	}

	.fontawesome-pricingWrapperArabic {
		color: #ffdbda;
		/* margin-left: 8px; */
		/* font-weight: bold; */
	}

	.fontawesome-iconsPricingArabic {
		color: #ffdbda;
		font-size: 1rem;
		/* font-weight: bold; */
	}

	.fontawesome-iconsSpecialArabic {
		margin-left: 10px;
		font-size: 1rem;
	}

	.dropDownIcon {
		cursor: pointer;
	}

	.subMenuList {
		margin-left: 50px;
		font-weight: bold;
	}

	.subMenuList a {
		color: black !important;
	}

	.subMenuWrapper-enter {
		opacity: 0;
		transform: scale(0.4);
	}
	.subMenuWrapper-enter-active {
		opacity: 1;
		transform: translateX(0);
		transition: opacity 300ms, transform 300ms;
	}
	.subMenuWrapper-exit {
		opacity: 1;
	}
	.subMenuWrapper-exit-active {
		opacity: 0;
		transform: scale(0.9);
		transition: opacity 200ms, transform 200ms;
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
// eslint-disable-next-line
const BlogsListWrapper = styled.nav`
	ul {
		list-style-type: none;
		padding: 0 !important;
		margin-left: 50px;
		font-weight: bold;
		color: blue;
	}

	.sidebar-link {
		display: block;
		font-size: 0.9rem;
		text-transform: capitalize;
		color: black;
		padding: 0.5rem 0.5rem;
		background: transparent;
		transition: 0.3s;
		font-weight: bold;
	}
	.sidebar-link:hover {
		background: #727272;
		color: whitesmoke;

		/* padding: 1rem 2rem 1rem 2rem; */
		text-decoration: none;
	}
`;
