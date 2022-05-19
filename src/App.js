/** @format */

import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "antd/dist/antd.min.css";
import ReactGA from "react-ga";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Navbar/Sidebar";
import DarkBackground from "./Navbar/DarkBackground";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Home from "./Pages/HomePage/Home";
import Listings from "./Pages/Listings";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import BookNow from "./Pages/ReserveNow/BookNow";
import SuccessfullyPaid from "./Pages/ReserveNow/SuccessfullyPaid";

//admin routes
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./admin/AdminDashboard";
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
		console.log(language);
		localStorage.setItem("lang", JSON.stringify(language));
		// window.location.reload(false);
	};

	useEffect(() => {
		languageToggle();
		// eslint-disable-next-line
	}, [language]);

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		// To Report Page View
		ReactGA.pageview(window.location.pathname + window.location.search);
		// eslint-disable-next-line
	}, [window.location.pathname + window.location.search]);

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
				{language === "Arabic" ? (
					<Route path='/' exact component={Home_Arabic} language={language} />
				) : (
					<Route path='/' exact component={Home} />
				)}

				<Route path='/contact' exact component={Contact} />
				<Route path='/about' exact component={About} />
				{language === "Arabic" ? (
					<Route
						path='/listings'
						exact
						component={ListingsArabic}
						language={language}
					/>
				) : (
					<Route path='/listings' exact component={Listings} />
				)}
				<Route path='/listings' exact component={Listings} />
				<Route path='/login' exact component={Login} />
				<Route path='/signup' exact component={Register} />
				<Route path='/khan-khadija-gallery' exact component={GalleryPage} />
				<Route
					path='/ticket-successfully-reserved'
					exact
					component={SuccessfullyPaid}
				/>
				<Route path='/book-now/:ticketName' exact component={BookNow} />

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
			</Switch>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
