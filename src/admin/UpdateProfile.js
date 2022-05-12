/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../auth/index";
import ReactGA from "react-ga";
import { read, update, updateUser } from "./apiAdmin";
import Adminsidebar from "./AdminSideBar/Adminsidebar";
import DarkBG from "./AdminSideBar/DarkBG";
import { toast } from "react-toastify";

const UpdateProfile = ({ match }) => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);

	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		error: false,
		success: false,
	});

	const { token } = isAuthenticated();
	// eslint-disable-next-line
	const { name, email, password, success } = values;

	const init = (userId) => {
		// console.log(userId);
		read(userId, token).then((data) => {
			if (data.error) {
				setValues({ ...values, error: true });
			} else {
				setValues({ ...values, name: data.name, email: data.email });
			}
		});
	};

	useEffect(() => {
		init(match.params.userId);
		// eslint-disable-next-line
	}, []);

	const handleChange = (name) => (e) => {
		setValues({ ...values, error: false, [name]: e.target.value });
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		console.log(name, email, password);
		update(match.params.userId, token, { name, email, password }).then(
			(data) => {
				if (data.error) {
					// console.log(data.error);
					alert(data.error);
				} else {
					updateUser(data, () => {
						setValues({
							...values,
							name: data.name,
							email: data.email,
							success: true,
						});
					});
					toast.success("Your Profile Was Successfully Updated!");
				}
			},
		);
	};

	useEffect(() => {
		setClickMenu2(click2);
	}, [click2, clickMenu2]);

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		// To Report Page View
		ReactGA.pageview(window.location.pathname + window.location.search);
		// eslint-disable-next-line
	}, []);

	const profileUpdating = (name, email, password) => (
		<form style={{ marginTop: "5%" }}>
			<h3
				className='my-4'
				style={{
					textDecoration: "underline",
					fontStyle: "italic",
				}}>
				Profile update
			</h3>
			<div className='form-group'>
				<label className='text-muted'>Name</label>
				<input
					type='text'
					onChange={handleChange("name")}
					className='form-control'
					value={name}
				/>
			</div>
			<div className='form-group'>
				<label className='text-muted'>Email / Phone</label>
				<input
					// type='email'
					onChange={handleChange("email")}
					className='form-control'
					value={email}
				/>
			</div>

			<div className='form-group'>
				<label className='text-muted'>Password</label>
				<input
					type='password'
					onChange={handleChange("password")}
					className='form-control'
					value={password}
					placeholder='update your password'
				/>
			</div>

			<button onClick={clickSubmit} className='btn btn-primary'>
				Submit Changes
			</button>
		</form>
	);

	return (
		<UpdateClientProfileWrapper>
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
				className='col-md-6 text-center mx-auto'
				style={{ marginBottom: "290px" }}>
				{profileUpdating(name, email, password)}
			</div>
		</UpdateClientProfileWrapper>
	);
};

export default UpdateProfile;

const UpdateClientProfileWrapper = styled.div``;
