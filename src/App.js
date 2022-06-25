/** @format */

import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "antd/dist/antd.min.css";
import ReactGA from "react-ga";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Navbar/Sidebar";
import DarkBackground from "./Navbar/DarkBackground";
import About from "./Pages/About";
import AboutArabic from "./Pages/AboutArabic";
import Contact from "./Pages/Contact";
import ContactArabic from "./Pages/ContactArabic";
import Home from "./Pages/HomePage/Home";
import Listings from "./Pages/Listings";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import BookNow from "./Pages/ReserveNow/BookNow";
import BookNowArabic from "./Pages/ReserveNowArabic/BookNow";
import SuccessfullyPaid from "./Pages/ReserveNow/SuccessfullyPaid";
import SuccessfullyPaidArabic from "./Pages/ReserveNowArabic/SuccessfullyPaid";
import ReserveNowAdmin from "./admin/ReserveNow/ReserveNowAdmin";
import ReserveNowClerk from "./Clerk/ReserveNow/ReserveNowAdmin";

//admin routes
import AdminRoute from "./auth/AdminRoute";
import EmployeeRoute from "./auth/EmployeeRoute";
import AdminDashboard from "./admin/AdminDashboard";
import ClerkDashboard from "./Clerk/AdminDashboard";
import AddTicket from "./admin/AddTicket";
import UpdateTicket from "./admin/UpdateTicket";
import AddTicketManagement from "./admin/AddTicketManagement";
import UpdateTicketManagement from "./admin/UpdateTicketManagement";
import UpdateProfile from "./admin/UpdateProfile";
import EditWebsite from "./admin/EditWebsite";
import StoreManagement from "./admin/StoreManagement";
import DevQuickLinks from "./admin/DevQuickLinks";
import Footer from "./Pages/Footer";
import CouponManagement from "./admin/CouponManagement";
import BusStationManagement from "./admin/BusStationManagement";
import OnsiteLocations from "./admin/OnsiteLocations";
import AddSiteAccount from "./admin/AddSiteAccount";
import Home_Arabic from "./Pages/HomePageArabic/Home_Arabic";
import ListingsArabic from "./Pages/ListingsArabic";
// eslint-disable-next-line
import PopUpMessage from "./Pages/PopUpMessage";
import ManageGallery from "./admin/ManageGallery";
import SingleTicketPage from "./Pages/SingleTicketPage/SingleTicketPage";
import SingleTicketPageArabic from "./Pages/SingleTicketPage/SingleTicketPageArabic";
import GalleryPage from "./Pages/GalleryPage";
import SingleReservationPage from "./admin/SingleReservationPage";
import SingleReservationPageClerk from "./Clerk/SingleReservationPage";
import UncompleteForm from "./admin/UncompleteForm";
import UpdatingEmployeeAccount from "./admin/UpdatingEmployeeAccount";

const App = () => {
	const [click, setClick] = useState(false);
	const [clickMenu, setClickMenu] = useState(false);
	const [language, setLanguage] = useState("English");
	// eslint-disable-next-line
	const [modalVisible2, setModalVisible2] = useState(true);

	useEffect(() => {
		setClickMenu(click);
		// eslint-disable-next-line
	}, [click, clickMenu]);

	const languageToggle = () => {
		// console.log(language);
		localStorage.setItem("lang", JSON.stringify(language));

		// window.location.reload(false);
	};

	useEffect(() => {
		languageToggle();
		// eslint-disable-next-line
	}, [language]);

	let url = window.location.pathname;

	useEffect(() => {
		if (url === "/ar" || url.includes("/ar/book-now")) {
			setLanguage("Arabic");
		} else {
			setLanguage("English");
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		// To Report Page View
		ReactGA.pageview(window.location.pathname + window.location.search);
		// eslint-disable-next-line
	}, []);

	// console.log(window.location.pathname + window.location.search);
	// console.log(url.replace("/ar", ""), "url.replace");

	return (
		<BrowserRouter>
			{/* <PopUpMessage
				modalVisible2={modalVisible2}
				setModalVisible2={setModalVisible2}
			/> */}
			<Navbar language={language} setLanguage={setLanguage} />
			{click && clickMenu ? (
				<DarkBackground setClick={setClick} setClickMenu={setClickMenu} />
			) : null}
			<Sidebar
				click={click}
				setClick={setClick}
				clickMenu={clickMenu}
				setClickMenu={setClickMenu}
				language={language}
				setLanguage={setLanguage}
			/>
			<ToastContainer />
			<Switch>
				{url === "/ar" ? <Redirect to='/' /> : null}

				{language === "Arabic" ? (
					<Route path='/' exact component={Home_Arabic} language={language} />
				) : (
					<Route path='/' exact component={Home} language={language} />
				)}

				{language === "Arabic" ? (
					<Route path='/contact' exact component={ContactArabic} />
				) : (
					<Route path='/contact' exact component={Contact} />
				)}

				{language === "Arabic" ? (
					<Route path='/about' exact component={AboutArabic} />
				) : (
					<Route path='/about' exact component={About} />
				)}

				{language === "Arabic" ? (
					<Route
						path='/listings'
						exact
						component={ListingsArabic}
						language={language}
					/>
				) : (
					<Route
						path='/listings'
						exact
						component={Listings}
						language={language}
					/>
				)}
				<Route path='/listings' exact component={Listings} />
				<Route path='/login' exact component={Login} />
				<Route path='/signup' exact component={Register} />
				<Route path='/khan-khadija-gallery' exact component={GalleryPage} />

				{language === "Arabic" ? (
					<Route
						path='/ticket-successfully-reserved'
						exact
						component={SuccessfullyPaidArabic}
					/>
				) : (
					<Route
						path='/ticket-successfully-reserved'
						exact
						component={SuccessfullyPaid}
					/>
				)}

				{url.includes("/ar/book-now") ? (
					<Redirect to={`${url.replace("/ar", "")}`} />
				) : null}

				{language === "Arabic" ? (
					<Route path='/book-now/:ticketName' exact component={BookNowArabic} />
				) : (
					<Route path='/book-now/:ticketName' exact component={BookNow} />
				)}

				{language === "Arabic" ? (
					<Route
						path='/ticket/:ticketslug'
						exact
						component={SingleTicketPageArabic}
						language={language}
					/>
				) : (
					<Route
						path='/ticket/:ticketslug'
						exact
						component={SingleTicketPage}
					/>
				)}

				<AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />

				<AdminRoute
					path='/admin/book-for-a-client/:ticketName'
					exact
					component={ReserveNowAdmin}
				/>

				<AdminRoute path='/admin/create-a-ticket' exact component={AddTicket} />
				<AdminRoute
					path='/admin/tickets-count'
					exact
					component={AddTicketManagement}
				/>
				<AdminRoute
					path='/admin/update-a-ticket/:ticketId'
					exact
					component={UpdateTicket}
				/>
				<AdminRoute
					path='/admin/update-ticket-count'
					exact
					component={UpdateTicketManagement}
				/>

				<AdminRoute
					path='/admin/update-profile/:userId'
					exact
					component={UpdateProfile}
				/>
				<AdminRoute
					exact
					path='/admin/website-edit/:pageedit'
					component={EditWebsite}
				/>
				<AdminRoute
					exact
					path='/admin/khan-khadija/management'
					component={StoreManagement}
				/>
				<AdminRoute
					exact
					path='/admin/dev-payments'
					component={DevQuickLinks}
				/>

				<AdminRoute
					exact
					path='/admin/manage-coupons'
					component={CouponManagement}
				/>

				<AdminRoute
					exact
					path='/admin/bus-stations'
					component={BusStationManagement}
				/>
				<AdminRoute
					exact
					path='/admin/onsite-locations'
					component={OnsiteLocations}
				/>

				<AdminRoute
					exact
					path='/admin/create-site-account'
					component={AddSiteAccount}
				/>

				<AdminRoute
					exact
					path='/admin/manage-gallery'
					component={ManageGallery}
				/>

				<AdminRoute
					exact
					path='/admin/update-reservation/:reservationId'
					component={SingleReservationPage}
				/>

				<AdminRoute
					path='/admin/update-user-account/:userId'
					exact
					component={UpdatingEmployeeAccount}
				/>

				<AdminRoute
					exact
					path='/admin/uncomplete-reservation'
					component={UncompleteForm}
				/>

				<EmployeeRoute
					exact
					path='/clerk/update-reservation/:reservationId'
					component={SingleReservationPageClerk}
				/>
				<EmployeeRoute
					path='/clerk/book-for-a-client/:ticketName'
					exact
					component={ReserveNowClerk}
				/>
				<EmployeeRoute
					path='/clerk/dashboard'
					exact
					component={ClerkDashboard}
				/>
			</Switch>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
