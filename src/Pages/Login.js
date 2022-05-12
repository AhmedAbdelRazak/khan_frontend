/** @format */
// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { authenticate, isAuthenticated, signin, authenticate2 } from "../auth";
// eslint-disable-next-line
import Google from "../auth/Google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
// import ReactGA from "react-ga";
import ReactGA from "react-ga";
import Helmet from "react-helmet";

const Login = ({ history }) => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		loading: false,
		redirectToReferrer: false,
	});

	const { email, password, loading, redirectToReferrer } = values;
	const { user } = isAuthenticated();

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

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
		setValues({ ...values, error: false, loading: true });
		signin({ email, password }).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, loading: false });
				toast.error(data.error);
			} else if (data.user.activeUser === false) {
				setValues({ ...values, error: data.error, loading: false });
				return toast.error(
					"User was deactivated, Please reach out to the admin site",
				);
			} else {
				console.log(data);
				authenticate(data, () => {
					setValues({
						...values,
						redirectToReferrer: true,
					});
				});
			}
		});
	};

	const showLoading = () =>
		loading && (
			<div className='alert alert-info'>
				<h2>Loading...</h2>
			</div>
		);

	const redirectUser = () => {
		let intendedDestination = history.location.state;
		if (intendedDestination && redirectToReferrer) {
			return <Redirect to={intendedDestination.from} />;
		} else {
			if (redirectToReferrer) {
				if (user && user.role === 1) {
					return <Redirect to='/admin/dashboard' />;
				} else if (user && user.role === 1000) {
					return <Redirect to='/business-dashboard' />;
				} else {
					return <Redirect to='/pricing' />;
				}
			}
		}

		if (isAuthenticated()) {
			return <Redirect to='/' />;
		}
	};

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		// To Report Page View
		ReactGA.pageview(window.location.pathname + window.location.search);
		// eslint-disable-next-line
	}, []);

	const signinForm = () => (
		<FormSignin>
			<div className='container-fluid mx-auto'>
				<div className='col-xl-6  mx-auto '>
					<div
						className='form-container text-center p-4'
						style={{
							// border: "solid 3px grey",
							background: "white",
							borderRadius: "10px",
							boxShadow: "5px 5px 5px 5px rgba(0, 0, 0, 0.2)",
						}}>
						<h1 className='mb-3'>
							Account <span className='text-primary'>Login</span>
						</h1>
						{/* <Google informParent={informParent} /> */}

						<form onSubmit={clickSubmit}>
							<div className='form-group' style={{ marginTop: "25px" }}>
								<label htmlFor='email' style={{ fontWeight: "bold" }}>
									Email Address / Phone
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
							<input
								type='submit'
								value='login'
								className='btn btn-primary w-75 btn-block mx-auto mt-5 loginFont'
								//onClick={sendEmail}
							/>
						</form>
						<hr />

						<p
							style={{
								fontSize: "0.9rem",
								textAlign: "center",
							}}>
							Forgot Your Password, Please{" "}
							<strong
								style={{
									textDecoration: "underline",
									fontStyle: "italic",
									fontSize: "1rem",
								}}>
								<Link
									to='/auth/password/forgot'
									className='btn btn-sm btn-outline-danger'>
									Reset Your Password
								</Link>
							</strong>
						</p>
					</div>
				</div>
			</div>
		</FormSignin>
	);

	return (
		<WholeSignin>
			<br />
			<Helmet>
				<meta charSet='utf-8' />
				<title>Khan Khadija Demo</title>
				<meta
					name='description'
					content="This website still under development by www.infinite-apps.com'. Infinite Apps can help with your SEO (Search Engine Optimization) so you can market for your business and rank higher with Google. If you are interested, Please contact infinite apps 9099914386 (www.infinite-apps.com)"
				/>
				<link rel='canonical' href='http://infinite-apps.com' />
			</Helmet>
			<div className='mx-auto text-center'>
				<img
					src='https://res.cloudinary.com/infiniteapps/image/upload/v1640714861/KuwaitDemo/1640714860747.jpg'
					alt='Infinite-Apps'
					className='imgLogo'
				/>
			</div>
			<ToastContainer />
			{showLoading()}
			{signinForm()}
			{redirectUser()}
		</WholeSignin>
	);
};

export default Login;

const FormSignin = styled.div`
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

		.form-container {
			margin-left: 10px;
			margin-right: 10px;
		}
	}
`;

const WholeSignin = styled.div`
	background: #dbe4eb;
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
