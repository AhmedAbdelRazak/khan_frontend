/** @format */

import React, { useState, Fragment, useEffect } from "react";
import { isAuthenticated } from "../auth/index";
// import { Link } from "react-router-dom";
import {
	LoyaltyPointsAndStoreStatus,
	allLoyaltyPointsAndStoreStatus,
	cloudinaryUpload1,
} from "./apiAdmin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Adminsidebar from "./AdminSideBar/Adminsidebar";
import DarkBG from "./AdminSideBar/DarkBG";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import styled from "styled-components";

const StoreManagement = () => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);
	const [defaultTicketQty, setDefaultTicketQty] = useState("");
	const [deposit, setDeposit] = useState("");
	const [daysStoreClosed, setDaysStoreClosed] = useState([]);
	const [datesStoreClosed, setDatesStoreClosed] = useState([]);
	const [oneDateStoreOff, setOneDateStoreOff] = useState("");
	const [addStoreLogo, setAddStoreLogo] = useState([]);
	const [addStoreName, setAddStoreName] = useState("");
	const [
		alreadySetLoyaltyPointsManagement,
		setAlreadySetLoyaltyPointsManagement,
	] = useState("");
	const [query, setQuery] = useState([]);
	// eslint-disable-next-line
	const [error, setError] = useState(false);
	// eslint-disable-next-line
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		setClickMenu2(click2);
	}, [click2, clickMenu2]);

	// destructure user and token from localstorage
	const { user, token } = isAuthenticated();

	const handleChange1 = (e) => {
		setError("");
		setDefaultTicketQty(e.target.value);
	};

	const handleChange2 = (e) => {
		setError("");
		setAddStoreName(e.target.value);
	};

	const handleChange3 = (e) => {
		setError("");
		setOneDateStoreOff(e);
	};

	const handleChange4 = (e) => {
		setError("");
		setDeposit(e.target.value);
	};

	const pushToAllDates = (e) => {
		e.preventDefault();
		console.log(
			new Date(oneDateStoreOff).toLocaleDateString(),
			"oneDateStoreOff",
		);
		setDatesStoreClosed([
			...datesStoreClosed,
			new Date(oneDateStoreOff).toLocaleDateString(),
		]);
		setOneDateStoreOff("");
	};

	const fileUploadAndResizeLogo = (e) => {
		// console.log(e.target.files);
		let files = e.target.files;
		let allUploadedFiles = addStoreLogo;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					720,
					720,
					"PNG",
					100,
					0,
					(uri) => {
						cloudinaryUpload1(user._id, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setAddStoreLogo({ ...addStoreLogo, images: allUploadedFiles });
							})
							.catch((err) => {
								console.log("CLOUDINARY UPLOAD ERR", err);
							});
					},
					"base64",
				);
			}
		}
	};

	const FileUploadStoreLogo = () => {
		return (
			<>
				<label
					className='btn btn-info btn-raised btn-block'
					style={{ cursor: "pointer", fontSize: "0.95rem" }}>
					Add Business Logo
					<input
						type='file'
						hidden
						accept='images/*'
						onChange={fileUploadAndResizeLogo}
					/>
					<br />
					(Width: 160px ; Height: 80px)
				</label>
			</>
		);
	};

	const handleImageRemove = (public_id) => {
		// console.log("remove image", public_id);
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/admin/removeimage/${user._id}`,
				{ public_id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			.then((res) => {
				// eslint-disable-next-line
				const { images } = addThumbnail;
				// let filteredImages = images.filter((item) => {
				// 	return item.public_id !== public_id;
				// });
				setAddStoreLogo([]);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			})
			.catch((err) => {
				console.log(err);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			});
	};

	const handleQueryChange = (event) => {
		if (event.target.checked && !query.includes(event.target.value)) {
			setQuery([...query, event.target.value]);
			setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
		} else if (!event.target.checked && query.includes(event.target.value)) {
			setQuery(query.filter((q) => q !== event.target.value));
			setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
		}

		setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
	};

	useEffect(() => {
		setDaysStoreClosed({ ...daysStoreClosed, daysStoreClosed: query });
		// eslint-disable-next-line
	}, [query]);

	const gettingPreviousLoyaltyPointsManagement = () => {
		allLoyaltyPointsAndStoreStatus(token).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setError("");
				setAlreadySetLoyaltyPointsManagement(data && data[data.length - 1]);
			}
		});
	};

	useEffect(() => {
		gettingPreviousLoyaltyPointsManagement();
		// eslint-disable-next-line
	}, []);

	const clickSubmit = (e) => {
		e.preventDefault();
		setError("");
		setSuccess(false);

		LoyaltyPointsAndStoreStatus(user._id, token, {
			defaultTicketQty,
			deposit,
			daysStoreClosed: daysStoreClosed.daysStoreClosed,
			datesStoreClosed: datesStoreClosed,
			addStoreLogo: addStoreLogo.images,
			addStoreName: addStoreName,
		}).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				toast.success("Khan Khadija Management Info Was Updated");
				setError("");
				window.scrollTo({ top: 0, behavior: "smooth" });
				setTimeout(function () {
					setDefaultTicketQty("");
					setAddStoreName("");
					setDaysStoreClosed([]);
				}, 2000);
				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			}
		});
	};
	// console.log(alreadySetLoyaltyPointsManagement);

	const LoyaltyPointsAndStoreStatusForm = () => (
		<form onSubmit={clickSubmit}>
			<div className='m-3 col-4'>
				<div className='col-12'>
					{addStoreLogo &&
						addStoreLogo.images &&
						addStoreLogo.images.map((image) => {
							return (
								<div className='m-3 col-6 '>
									<button
										type='button'
										className='close'
										onClick={() => {
											handleImageRemove(image.public_id);
											setAddStoreLogo([]);
										}}
										style={{
											color: "white",
											background: "black",
											fontSize: "20px",
										}}
										aria-label='Close'>
										<span aria-hidden='true'>&times;</span>
									</button>
									<img
										src={image.url}
										alt='Img Not Found'
										style={{
											width: "90px",
											height: "90px",
											boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
										}}
										key={image.public_id}
									/>
								</div>
							);
						})}
				</div>
				{FileUploadStoreLogo()}
			</div>

			<div className='form-group'>
				<label className='text-muted'>Default Ticket Quantity</label>
				<input
					type='number'
					className='form-control'
					onChange={handleChange1}
					value={defaultTicketQty}
					placeholder='Default Ticket stock per day if not added'
					required
				/>
			</div>
			<div className='form-group'>
				<label className='text-muted'>Brand / Business Name</label>
				<input
					type='text'
					className='form-control'
					onChange={handleChange2}
					value={addStoreName}
					placeholder='Your Resort / Brand Name'
					required
				/>
			</div>

			<div className='form-group'>
				<label className='text-muted'>Customer Deposit</label>
				<input
					type='number'
					className='form-control'
					onChange={handleChange4}
					value={deposit}
					placeholder='Should be Numbers Only'
				/>
			</div>

			<div className='w-100'>
				<label>Resort Closed on days:</label>
				<div className='checkboxes border-gray-200 border border-solid  mx-auto text-center'>
					<label htmlFor='one' className='block '>
						<input
							type='checkbox'
							id='one'
							onChange={handleQueryChange}
							value='Saturday'
							className='m-3'
						/>
						Saturday
					</label>
					<label htmlFor='two' className='block'>
						<input
							type='checkbox'
							id='two'
							onChange={handleQueryChange}
							value='Sunday'
							className='m-3'
						/>
						Sunday
					</label>
					<label htmlFor='three' className='block'>
						<input
							type='checkbox'
							id='three'
							onChange={handleQueryChange}
							value='Monday'
							className='m-3'
						/>
						Monday
					</label>
					<label htmlFor='four' className='block'>
						<input
							type='checkbox'
							id='four'
							onChange={handleQueryChange}
							value='Tuesday'
							className='m-3'
						/>
						Tuesday
					</label>
					<label htmlFor='five' className='block'>
						<input
							type='checkbox'
							id='five'
							onChange={handleQueryChange}
							value='Wednesday'
							className='m-3'
						/>
						Wednesday
					</label>
					<label htmlFor='six' className='block'>
						<input
							type='checkbox'
							id='six'
							onChange={handleQueryChange}
							value='Thursday'
							className='m-3'
						/>
						Thursday
					</label>
					<label htmlFor='seven' className='block'>
						<input
							type='checkbox'
							id='seven'
							onChange={handleQueryChange}
							value='Friday'
							className='m-3'
						/>
						Friday
					</label>
				</div>

				<div className='col-md-8 ml-5 mt-3'>
					<div>
						{datesStoreClosed && datesStoreClosed.length > 0 ? (
							<strong>Added Dates:</strong>
						) : (
							<strong>No Dates Added Yet</strong>
						)}
						<ul>
							{datesStoreClosed &&
								datesStoreClosed.length > 0 &&
								datesStoreClosed.map((i, e) => (
									<li
										style={{
											listStyle: "none",
											marginLeft: "20px",
											fontSize: "12px",
										}}
										key={e}>
										{new Date(i).toDateString()}
									</li>
								))}
						</ul>
					</div>
					<div className='form-group'>
						<label className='text-muted mr-3'>Add a date</label>

						<DatePicker
							selected={oneDateStoreOff}
							onChange={handleChange3}
							minDate={new Date()}
							// maxDate={}
							// filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0} //To exclude weekends
							isClearable={true}
							showYearDropdown
							scrollableMonthYearDropdown
						/>
					</div>
					<div className='ml-5 mb-3'>
						<button
							onClick={pushToAllDates}
							className='btn btn-outline-info mb-3 text-center ml-5'>
							Add Date
						</button>
					</div>
				</div>
			</div>
			<button className='btn btn-outline-primary my-3'>
				Add To Management Table
			</button>
		</form>
	);

	return (
		<StoreManagementWrapper>
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
				className='col-md-6 col-sm-6 offset-md-2 mt-5 mx-auto p-3'
				style={{
					border: "1px black solid",
					borderRadius: "20px",
					marginBottom: "20px",
				}}>
				<h3 className='mt-1 mb-3 text-center'>Business Management</h3>
				<ToastContainer />
				<div
					className='mb-3 mx-auto'
					style={{
						backgroundColor: "#f2e7e7",
						borderRadius: "10px",
						marginBottom: "20px",
						boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.5)",
					}}>
					<hr />
					<div
						style={{
							fontSize: "1.2rem",
							textAlign: "center",
							fontWeight: "bold",
							margin: "3px",
							color: "#660000",
							textShadow: "1px 2px 4px",
						}}>
						Your Latest Business Management Info:
					</div>
					<div className='row mx-auto' style={{ fontWeight: "bold" }}>
						{alreadySetLoyaltyPointsManagement && (
							<>
								<div className='mx-auto col-md-5'>
									Business Logo:{" "}
									<img
										src={
											alreadySetLoyaltyPointsManagement.addStoreLogo &&
											alreadySetLoyaltyPointsManagement.addStoreLogo[0] &&
											alreadySetLoyaltyPointsManagement.addStoreLogo[0].url
										}
										alt={alreadySetLoyaltyPointsManagement.addStoreName}
										style={{
											width: "50px",
											height: "50px",
											boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
										}}
									/>
								</div>
								<div className='mx-auto col-md-5 my-auto'>
									Resort Name:{" "}
									{alreadySetLoyaltyPointsManagement &&
										alreadySetLoyaltyPointsManagement.addStoreName}
								</div>

								<div className='mx-auto col-md-5 my-3'>
									Resort Closed On:{" "}
									{alreadySetLoyaltyPointsManagement &&
										alreadySetLoyaltyPointsManagement.daysStoreClosed.map(
											(i) => (
												<span key={i} className='my-1 mx-2'>
													{i}
												</span>
											),
										)}
								</div>
								<div className='mx-auto col-md-5 my-3'>
									Customer's Deposit:{" "}
									{alreadySetLoyaltyPointsManagement &&
										alreadySetLoyaltyPointsManagement.deposit}
									%
								</div>
								<div className='mx-auto col-md-10 mt-3 text-center'>
									Resort Closed On Dates:{" "}
									{alreadySetLoyaltyPointsManagement &&
										alreadySetLoyaltyPointsManagement.datesStoreClosed &&
										alreadySetLoyaltyPointsManagement.datesStoreClosed.map(
											(i) => (
												<span key={i} className='my-1 mx-2'>
													{i}
												</span>
											),
										)}
								</div>
							</>
						)}
					</div>
				</div>
				<br />
				{LoyaltyPointsAndStoreStatusForm()}
			</div>
		</StoreManagementWrapper>
	);
};

export default StoreManagement;

const StoreManagementWrapper = styled.div`
	margin-bottom: 100px;
	.react-datepicker__input-container input {
		width: 100% !important;
		padding: 5px 0px;
		border: 1px solid lightGrey;
	}

	.react-datepicker__input-container input {
		width: 100% !important;
		padding: 5px 10px;
		border: 1px solid lightGrey;
		border-radius: 10px;
	}

	.react-datepicker__close-icon::after {
		cursor: pointer;
		background-color: black;
		color: #fff;
		border-radius: 50%;
		height: 20px;
		width: 20px;
		padding: 5px;
		font-size: 12px;
		line-height: 1;
		text-align: center;
		display: table-cell;
		vertical-align: middle;
		content: "×";
	}

	input {
		padding: 5px 10px;
		border-radius: 10px;
	}
`;
