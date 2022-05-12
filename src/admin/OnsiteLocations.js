/** @format */

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "antd/dist/antd.min.css";
import { isAuthenticated } from "../auth";
import { getLocations, removeLocation, createLocation } from "./apiAdmin";
import Adminsidebar from "./AdminSideBar/Adminsidebar";
import DarkBG from "./AdminSideBar/DarkBG";

const OnsiteLocations = () => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);

	const [address, setAddress] = useState("");
	const [address_Arabic, setAddressArabic] = useState("");
	const [sitePhone, setSitePhone] = useState("");
	const [comment, setComment] = useState("");
	const [loading, setLoading] = useState("");
	const [locations, setLocations] = useState([]);

	useEffect(() => {
		setClickMenu2(click2);
	}, [click2, clickMenu2]);

	const { user, token } = isAuthenticated();

	useEffect(() => {
		loadAllLocations();
	}, []);

	const loadAllLocations = () =>
		getLocations().then((res) => setLocations(res.data));

	const handleSubmit = (e) => {
		e.preventDefault();

		if (address.length <= 5) {
			return toast.error(
				"Address Name should be more than 5 letters, Please try again",
			);
		}

		if (address.length >= 150) {
			return toast.error(
				"Address Name should be less than 150 letters, Please try again",
			);
		}

		setLoading(true);
		// console.table(name, expiry, discount);
		createLocation(user._id, token, {
			address,
			address_Arabic,
			comment,
			sitePhone,
		})
			.then((res) => {
				setLoading(false);
				loadAllLocations(); // load all locations
				setAddress("");
				setComment("");
				setSitePhone("");
				setAddressArabic("");
				toast.success(`"${res.data.address}" is created`);
				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			})
			.catch((err) => {
				console.log("create location err", err);
				setTimeout(function () {
					window.location.reload(false);
				}, 1500);
			});
	};
	const handleRemove = (locationId) => {
		if (window.confirm("Delete?")) {
			setLoading(true);
			removeLocation(locationId, user._id, token)
				.then((res) => {
					loadAllLocations(); // load all locations
					setLoading(false);
					toast.error(`Location "${res.data.name}" deleted`);
				})
				.catch((err) => {
					console.log("create Location err", err);
					setTimeout(function () {
						window.location.reload(false);
					}, 1500);
				});
		}
	};

	return (
		<>
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
			<div className='container my-4'>
				<div className='col-md-10 ' style={{ marginBottom: "180px" }}>
					{loading ? (
						<h4 className='text-danger'>Loading...</h4>
					) : (
						<h4 className='mb-3'>Create a Khan Khadija Location:</h4>
					)}

					<form onSubmit={handleSubmit}>
						<div className='form-group'>
							<label className='text-muted'>Site Address</label>
							<input
								type='text'
								className='form-control'
								onChange={(e) => setAddress(e.target.value)}
								value={address}
								autoFocus
								required
							/>
						</div>

						<div className='form-group'>
							<label className='text-muted'>Site Address (Arabic)</label>
							<input
								type='text'
								className='form-control'
								onChange={(e) => setAddressArabic(e.target.value)}
								value={address_Arabic}
							/>
						</div>

						<div className='form-group'>
							<label className='text-muted'>Comment For This Address</label>
							<input
								type='text'
								className='form-control'
								onChange={(e) => setComment(e.target.value)}
								value={comment}
							/>
						</div>
						<div className='form-group'>
							<label className='text-muted'>Site Phone #</label>
							<input
								type='text'
								className='form-control'
								onChange={(e) => setSitePhone(e.target.value)}
								value={sitePhone}
							/>
						</div>
						<button className='btn btn-outline-primary'>Save</button>
					</form>

					<br />
					<hr />
					<h4 className='my-3'>
						Created Sites/Locations: {locations.length} Sites/Locations
					</h4>

					<table className='table table-bordered'>
						<thead className='thead-light'>
							<tr>
								<th scope='col'>Site Address</th>
								<th scope='col'>Site Address (Arabic)</th>
								<th scope='col'>Comment</th>
								<th scope='col'>Site Phone</th>
								<th scope='col'>Action</th>
							</tr>
						</thead>

						<tbody>
							{locations.map((c) => (
								<tr key={c._id}>
									<td>{c.address}</td>
									<td>{c.address_Arabic}</td>
									<td>{c.comment}</td>
									<td>{c.sitePhone}</td>
									<td>
										<span
											onClick={() => {
												handleRemove(c._id);
												setTimeout(function () {
													window.location.reload(false);
												}, 1500);
											}}
											className='badge badge-danger badge-pill align-items-center d-flex justify-content-between'
											style={{ cursor: "pointer" }}>
											Delete
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default OnsiteLocations;
