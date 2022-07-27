/** @format */
// eslint-disable-next-line
import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import {
	signup,
	// eslint-disable-next-line
	authenticate,
	isAuthenticated,
	// eslint-disable-next-line
	signin,
	authenticate2,
} from "../auth";
// eslint-disable-next-line
import Google from "../auth/Google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
// import ReactGA from "react-ga";
// eslint-disable-next-line
import Helmet from "react-helmet";
import Adminsidebar from "./AdminSideBar/Adminsidebar";
import DarkBG from "./AdminSideBar/DarkBG";
import { getLocations } from "./apiAdmin";

const AddSiteAccount = () => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);
	// eslint-disable-next-line
	const [Locations, setLocations] = useState([]);

	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
		relatedSite: "",
		role: 2,
		error: "",
		success: false,
		misMatch: false,
		redirectToReferrer: "",
		loading: false,
	});

	const {
		name,
		email,
		password,
		password2,
		// eslint-disable-next-line
		relatedSite,
		role,
		success,
		misMatch,
		// eslint-disable-next-line
		redirectToReferrer,
		loading,
	} = values;

	console.log(success);

	// eslint-disable-next-line
	const { user } = isAuthenticated();
	const handleChange = (name) => (event) => {
		setValues({
			...values,
			error: false,
			misMatch: false,
			[name]: event.target.value,
		});
	};

	console.log(loading);

	useEffect(() => {
		setClickMenu2(click2);
	}, [click2, clickMenu2]);

	// eslint-disable-next-line
	const informParent = (response) => {
		setValues({ ...values, error: false, loading: true });
		if (response.error) {
			setValues({ ...values, error: response.error, loading: false });
			toast.error(response.error);
		} else {
			authenticate2(response, () => {
				setValues({
					...values,
					redirectToReferrer: true,
				});
			});
		}
	};

	const clickSubmit = (event) => {
		event.preventDefault();
		if (password !== password2) {
			setValues({
				...values,
				success: false,
				misMatch: true,
			});
			return <React.Fragment>{toast.error(MisMatchError)}</React.Fragment>;
		} else {
			setValues({ ...values, error: false, misMatch: false });
			signup({
				name,
				email,
				password,
				password2,
				role: Number(role).toFixed(0),
				// relatedSite,
				misMatch,
			}).then((data) => {
				console.log(data);
				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			});
		}
	};

	useEffect(() => {
		loadAllLocations();
	}, []);

	const loadAllLocations = () =>
		getLocations().then((res) => setLocations(res.data));

	// eslint-disable-next-line
	const handleChosenSite = (event) => {
		setValues({ ...values, role: event.target.value });
	};

	const signUpForm = () => (
		<FormSignup>
			<div className='container-fluid mx-auto'>
				<div className='col-xl-6  mx-auto '>
					<div
						className='form-container text-center p-4'
						style={{
							// border: "solid 3px grey",
							background: "white",
							borderRadius: "10px",
							boxShadow: "5px 5px 5px 5px rgba(0, 0, 0, 0.1)",
						}}>
						<h1 className='mb-3'>
							Employee <span className='text-primary'>Register</span>
						</h1>
						{/* <Google informParent={informParent} /> */}
						<form onSubmit={clickSubmit}>
							<div className='form-group ' style={{ marginTop: "25px" }}>
								<label htmlFor='name' style={{ fontWeight: "bold" }}>
									Employee Name
								</label>
								<input
									className='w-75 mx-auto'
									type='text'
									name='name'
									value={name}
									onChange={handleChange("name")}
								/>
							</div>
							<div className='form-group ' style={{ marginTop: "25px" }}>
								<label htmlFor='email' style={{ fontWeight: "bold" }}>
									Phone or Email
								</label>
								<input
									className='w-75 mx-auto'
									type='text'
									name='email'
									value={email}
									onChange={handleChange("email")}
								/>
							</div>

							<div className='form-group ' style={{ marginTop: "25px" }}>
								<label htmlFor='password' style={{ fontWeight: "bold" }}>
									Password
								</label>
								<input
									className='w-75 mx-auto'
									type='password'
									name='password'
									value={password}
									onChange={handleChange("password")}
								/>
							</div>
							<div className='form-group ' style={{ marginTop: "25px" }}>
								<label htmlFor='password2' style={{ fontWeight: "bold" }}>
									Confirm Password
								</label>
								<input
									className='w-75 mx-auto'
									type='password'
									name='password2'
									value={password2}
									onChange={handleChange("password2")}
								/>
							</div>

							<label htmlFor='password2' style={{ fontWeight: "bold" }}>
								Add Employee Role
							</label>
							<select
								onChange={handleChosenSite}
								className='w-75 mx-auto'
								style={{ fontSize: "0.80rem" }}>
								<option>Please select / Required*</option>
								<option value='1'>Admin Account</option>
								<option value='2'>Clerk Account</option>
								<option value='3'>Owner Account</option>
								<option value='4'>Kitchen Account</option>
								<option value='5'>Salon Account</option>
								<option value='6'>Security Account</option>
								<option value='7'>Bus Station</option>
							</select>

							<input
								type='submit'
								value='Register'
								className='btn btn-primary w-75 btn-block mx-auto my-4'
								//onClick={sendEmail}
							/>
						</form>

						<hr />
					</div>
				</div>
			</div>
		</FormSignup>
	);

	const MisMatchError = "Passwords Don't Match, Please Try Again!!";

	// useEffect(() => {
	// 	ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
	// 	// To Report Page View
	// 	ReactGA.pageview(window.location.pathname + window.location.search);
	// 	// eslint-disable-next-line
	// }, []);

	return (
		<WholeSignup>
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
			{/* <div className='mx-auto text-center'>
				<img
					src='https://res.cloudinary.com/infiniteapps/image/upload/v1640714861/KuwaitDemo/1640714860747.jpg'
					alt='Infinite-Apps'
					className='imgLogo'
				/>
			</div> */}
			<ToastContainer />

			{signUpForm()}
		</WholeSignup>
	);
};

export default AddSiteAccount;

const FormSignup = styled.div`
	margin-top: 1.5%;
	margin-bottom: 95px;
	input[type="text"],
	input[type="email"],
	input[type="password"],
	input[type="date"],
	select,
	textarea {
		display: block;
		padding: 0.5rem;
		font-size: 1rem;
		border: 1px solid #ccc;
	}
	input[type="text"]:focus,
	input[type="email"]:focus,
	input[type="password"]:focus,
	input[type="date"]:focus,
	select:focus,
	textarea:focus,
	label:focus {
		outline: none;
		border: 1px solid var(--primaryColor);

		box-shadow: 5px 8px 3px 0px rgba(0, 0, 0, 0.3);
		transition: 0.3s;
		font-weight: bold;
	}

	.form-container {
		margin-left: 50px;
		margin-right: 50px;
	}

	@media (max-width: 900px) {
		font-size: 14px !important;
		h1 {
			font-size: 1.5rem;
		}
		.loginFont {
			font-size: 13px;
		}
	}
`;

const WholeSignup = styled.div`
	/* background: #dbe4eb; */
	padding-bottom: 15px;
	.infiniteAppsLogo {
		width: 159px;
		height: 79px;
		margin-top: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
		/* border-radius: 15px; */
	}

	.imgLogo {
		width: 189px;
		height: 109px;
		margin-top: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
		margin-right: 50px;
		border-radius: 15px;
	}
	.kokoko {
		/* color: rgb(187, 182, 182); */
		color: black;
		font-weight: bold;
		font-size: 1.3rem;
		text-shadow: 2px 2px 4px rgb(0, 0, 0, 0.1);
		letter-spacing: 2px;
	}
	.kokoko2 {
		/* color: rgb(187, 182, 182); */
		color: black;
		font-weight: bold;
		font-size: 1.3rem;
		text-shadow: 2px 2px 4px rgb(0, 0, 0, 0.1);
		letter-spacing: 2px;
	}
	.kokoko3 {
		/* color: rgb(187, 182, 182); */
		color: black;
		font-weight: bold;
		font-size: 1.3rem;
		text-shadow: 2px 2px 4px rgb(0, 0, 0, 0.1);
		letter-spacing: 2px;
	}
	@media (max-width: 1000px) {
		.infiniteAppsLogo {
			width: 48px;
			height: 48px;
		}
	}
`;
