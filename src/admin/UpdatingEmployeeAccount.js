/** @format */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getAllUsers, updateUserByAdmin } from "./apiAdmin";
import { isAuthenticated } from "../auth/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Adminsidebar from "./AdminSideBar/Adminsidebar";
import DarkBG from "./AdminSideBar/DarkBG";

const UpdatingEmployeeAccount = ({ match }) => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);

	//update form itself
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
		error: "",
		success: false,
		misMatch: false,
		loading: false,
		role: 0,
	});
	const [linkClick, setLinkClick] = useState(false);
	const [allUsersAvailable, setAllUsersAvailable] = useState([]);
	// eslint-disable-next-line
	const { name, email, password, password2, role, success, loading } = values;

	const handleChange = (name) => (event) => {
		setValues({
			...values,
			error: false,
			misMatch: false,
			[name]: event.target.value,
		});
	};

	const { user, token } = isAuthenticated();

	const gettingAllUsers = () => {
		getAllUsers(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error, "getting all users error");
			} else {
				setAllUsersAvailable(data);
				setValues({
					...values,
					name:
						match.params.userId &&
						match.params.userId !== "undefined" &&
						data.filter((e) => e._id === match.params.userId)[0].name,
					email:
						match.params.userId &&
						match.params.userId !== "undefined" &&
						data.filter((e) => e._id === match.params.userId)[0].email,
					role:
						match.params.userId &&
						match.params.userId !== "undefined" &&
						data.filter((e) => e._id === match.params.userId)[0].role,
				});
			}
		});
	};

	useEffect(() => {
		gettingAllUsers();

		// eslint-disable-next-line
	}, [match.params.userId]);

	useEffect(() => {
		setClickMenu2(click2);
	}, [click2, clickMenu2]);

	const clickSubmit = (e) => {
		e.preventDefault();
		if (password !== password2) {
			setValues({
				...values,
				success: false,
				misMatch: true,
			});

			return <React.Fragment>{toast.error(MisMatchError)}</React.Fragment>;
		} else {
			updateUserByAdmin(match.params.userId, user._id, token, {
				userId: match.params.userId,
				name: values.name,
				role: values.role,
				// password: values.password,
				activeUser: values.activeUser,
				email: values.email,
			}).then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					toast.success("User was successfully Updated.");
					setTimeout(function () {
						setLinkClick(false);
					}, 2000);
				}
			});
		}
	};

	const signUpForm = () => (
		<FormSignup>
			<div className=' justify-content-md-center mt-2'>
				<div>
					<div className='form-container text-center'>
						<h3 className='mb-3'>
							Employee's Account <span className='text-primary'>Update</span>
						</h3>
						<form onSubmit={clickSubmit}>
							<div className='form-group'>
								<label htmlFor='name' style={{ fontWeight: "bold" }}>
									Full Name
								</label>
								<input
									type='text'
									name='name'
									value={name}
									onChange={handleChange("name")}
								/>
							</div>
							<div
								className='form-group '
								style={{
									marginTop: "25px",
								}}></div>
							<div className='form-group' style={{ marginTop: "25px" }}>
								<label htmlFor='email' style={{ fontWeight: "bold" }}>
									Email Address / Phone #
								</label>
								<input
									type='text'
									name='email'
									value={email}
									onChange={handleChange("")}
								/>
							</div>
							<div className='form-group' style={{ marginTop: "25px" }}>
								<label htmlFor='email' style={{ fontWeight: "bold" }}>
									User Role
								</label>
								<input
									type='text'
									name='role'
									value={role}
									onChange={handleChange("role")}
								/>
							</div>
							<div className='form-group' style={{ marginTop: "25px" }}>
								<label htmlFor='email' style={{ fontWeight: "bold" }}>
									Active User?
								</label>
								<select
									onChange={handleChange("activeUser")}
									className='form-control'
									style={{ fontSize: "0.85rem" }}>
									<option>Please select / Required*</option>
									<option value='0'>Deactivate User</option>
									<option value='1'>Activate User</option>
								</select>
							</div>
							<div className='form-group ' style={{ marginTop: "25px" }}>
								<label htmlFor='password' style={{ fontWeight: "bold" }}>
									Password
								</label>
								<input
									type='password'
									name='password'
									value={password}
									onChange={handleChange("password")}
								/>
							</div>
							<div
								className='form-group'
								style={{ marginTop: "25px", marginBottom: "40px" }}>
								<label htmlFor='password2' style={{ fontWeight: "bold" }}>
									{" "}
									Confirm Password
								</label>
								<input
									background='red'
									type='password'
									name='password2'
									value={password2}
									onChange={handleChange("password2")}
								/>
							</div>
							<input
								type='submit'
								value='Update'
								className='btn btn-primary w-75 btn-block mx-auto'
							/>
						</form>
						<hr />
					</div>
				</div>
			</div>
		</FormSignup>
	);
	const MisMatchError = "Passwords Don't Match, Please Try Again!!";

	return (
		<AddingOffersWrapper>
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
				className='col-md-8 mx-auto p-5'
				style={{
					overflow: "hidden",
					border: "1px solid black",
					marginTop: "10px",
					marginBottom: "400px",
				}}>
				<ToastContainer />
				{allUsersAvailable.length > 0 ? (
					<div className='container'>
						<div className='row'>
							<div className='col-md-6 mx-auto'>
								<ul className='list-group col-md-10'>
									<h3
										style={{ fontSize: "1.4rem" }}
										className='text-center mt-2'>
										{allUsersAvailable && allUsersAvailable.length} Employees in
										your business have account
									</h3>
									<p className='mt-2 text-center'>
										Please Select a <strong>User</strong> to Update his/her
										Account...
									</p>
									{allUsersAvailable &&
										allUsersAvailable.map((e, i) => (
											<Link
												to={`/admin/update-user-account/${e._id}`}
												onClick={() => setLinkClick(true)}>
												<li
													key={i}
													className='list-group-item d-flex my-1 py-3 justify-content-between align-items-center '
													style={{ fontSize: "1.1rem" }}>
													<strong>{e.name}</strong>
												</li>
											</Link>
										))}
								</ul>
							</div>
							{allUsersAvailable &&
							isAuthenticated().user.role === 1 &&
							linkClick ? (
								<div className='col-md-6'>{signUpForm()}</div>
							) : (
								<React.Fragment>
									<div
										className='col-md-6'
										style={{
											textAlign: "center",
											fontSize: "1.3rem",
											color: "blueviolet",
											marginTop: "10%",
										}}>
										Please Select an Employee So You Can Create an internal
										account for him/her.
									</div>
								</React.Fragment>
							)}
						</div>
					</div>
				) : (
					<div
						style={{
							textAlign: "center",
							fontSize: "1.2rem",
							fontWeight: "bold",
						}}>
						No Employees Account Available To Update
					</div>
				)}
			</div>
		</AddingOffersWrapper>
	);
};

export default UpdatingEmployeeAccount;

const AddingOffersWrapper = styled.div`
	margin-bottom: 200px;
	background: white;
`;

const FormSignup = styled.div`
	input[type="text"],
	input[type="email"],
	input[type="password"],
	input[type="date"],
	select,
	textarea {
		display: block;
		width: 100%;
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
		transition: var(--mainTransition);
		font-weight: bold;
	}

	.form-container {
		margin-left: 50px;
		margin-right: 50px;
	}
`;
