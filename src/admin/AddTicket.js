/** @format */

import React, { useState, Fragment, useEffect } from "react";
import { isAuthenticated } from "../auth/index";
// import { Link } from "react-router-dom";
import { createTicket, cloudinaryUpload1, getTickets } from "./apiAdmin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Adminsidebar from "./AdminSideBar/Adminsidebar";
import DarkBG from "./AdminSideBar/DarkBG";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import styled from "styled-components";

const AddTicket = () => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);

	useEffect(() => {
		setClickMenu2(click2);
	}, [click2, clickMenu2]);

	const [serviceName, setServiceName] = useState("");
	const [serviceName_Arabic, setServiceName_Arabic] = useState("");
	const [servicePrice, setServicePrice] = useState("");
	const [servicePriceDiscount, setServicePriceDiscount] = useState("");

	const [servicePrice_Children, setServicePrice_Children] = useState("");
	const [servicePriceDiscount_Children, setServicePriceDiscount_Children] =
		useState("");

	const [option1, setOption1] = useState("");
	const [option2, setOption2] = useState("");
	const [option3, setOption3] = useState("");
	const [option4, setOption4] = useState("");
	const [option1_Arabic, setOption1_Arabic] = useState("");
	const [option2_Arabic, setOption2_Arabic] = useState("");
	const [option3_Arabic, setOption3_Arabic] = useState("");
	const [option4_Arabic, setOption4_Arabic] = useState("");

	const [option1_Price, setOption1_Price] = useState("");
	const [option2_Price, setOption2_Price] = useState("");
	const [option3_Price, setOption3_Price] = useState("");
	const [option4_Price, setOption4_Price] = useState("");

	const [option1_Active, setOption1_Active] = useState(false);
	const [option2_Active, setOption2_Active] = useState(false);
	const [option3_Active, setOption3_Active] = useState(false);
	const [option4_Active, setOption4_Active] = useState(false);

	const [allTickets, setAllTickets] = useState([]);
	const [serviceDescription, setServiceDescription] = useState("");
	const [serviceDescription_Arabic, setServiceDescription_Arabic] =
		useState("");
	const [serviceDescription2, setServiceDescription2] = useState("");
	const [serviceDescription2_Arabic, setServiceDescription2_Arabic] =
		useState("");
	const [serviceDescription3, setServiceDescription3] = useState("");
	const [serviceDescription3_Arabic, setServiceDescription3_Arabic] =
		useState("");
	const [serviceDescription4, setServiceDescription4] = useState("");
	const [serviceDescription4_Arabic, setServiceDescription4_Arabic] =
		useState("");
	const [serviceDescription5, setServiceDescription5] = useState("");
	const [serviceDescription5_Arabic, setServiceDescription5_Arabic] =
		useState("");
	const [serviceDescription6, setServiceDescription6] = useState("");
	const [serviceDescription6_Arabic, setServiceDescription6_Arabic] =
		useState("");
	const [serviceDescription7, setServiceDescription7] = useState("");
	const [serviceDescription7_Arabic, setServiceDescription7_Arabic] =
		useState("");
	const [serviceDescription8, setServiceDescription8] = useState("");
	const [serviceDescription8_Arabic, setServiceDescription8_Arabic] =
		useState("");
	const [serviceDescription9, setServiceDescription9] = useState("");
	const [serviceDescription9_Arabic, setServiceDescription9_Arabic] =
		useState("");
	const [serviceDescription10, setServiceDescription10] = useState("");
	const [serviceDescription10_Arabic, setServiceDescription10_Arabic] =
		useState("");

	const [addThumbnail, setAddThumbnail] = useState([]);

	// eslint-disable-next-line
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	// destructure user and token from localstorage
	const { user, token } = isAuthenticated();

	const handleChange1 = (e) => {
		setError("");
		setServiceName(e.target.value);
	};

	const handleChange1_Arabic = (e) => {
		setError("");
		setServiceName_Arabic(e.target.value);
	};

	const handleChange2 = (e) => {
		setError("");
		setServicePrice(e.target.value);
	};

	const handleChange10 = (e) => {
		setError("");
		setServiceDescription(e.target.value);
	};

	const handleChange10_Arabic = (e) => {
		setError("");
		setServiceDescription_Arabic(e.target.value);
	};

	const handleChange11 = (e) => {
		setError("");
		setServiceDescription2(e.target.value);
	};

	const handleChange11_Arabic = (e) => {
		setError("");
		setServiceDescription2_Arabic(e.target.value);
	};

	const handleChange12 = (e) => {
		setError("");
		setServiceDescription3(e.target.value);
	};

	const handleChange12_Arabic = (e) => {
		setError("");
		setServiceDescription3_Arabic(e.target.value);
	};

	const handleChange13 = (e) => {
		setError("");
		setServiceDescription4(e.target.value);
	};

	const handleChange13_Arabic = (e) => {
		setError("");
		setServiceDescription4_Arabic(e.target.value);
	};

	const handleChange14 = (e) => {
		setError("");
		setServiceDescription5(e.target.value);
	};

	const handleChange14_Arabic = (e) => {
		setError("");
		setServiceDescription5_Arabic(e.target.value);
	};

	const handleChange15 = (e) => {
		setError("");
		setServiceDescription6(e.target.value);
	};

	const handleChange15_Arabic = (e) => {
		setError("");
		setServiceDescription6_Arabic(e.target.value);
	};

	const handleChange16 = (e) => {
		setError("");
		setServiceDescription7(e.target.value);
	};

	const handleChange16_Arabic = (e) => {
		setError("");
		setServiceDescription7_Arabic(e.target.value);
	};

	const handleChange17 = (e) => {
		setError("");
		setServiceDescription8(e.target.value);
	};

	const handleChange17_Arabic = (e) => {
		setError("");
		setServiceDescription8_Arabic(e.target.value);
	};

	const handleChange18 = (e) => {
		setError("");
		setServiceDescription9(e.target.value);
	};

	const handleChange18_Arabic = (e) => {
		setError("");
		setServiceDescription9_Arabic(e.target.value);
	};

	const handleChange19 = (e) => {
		setError("");
		setServiceDescription10(e.target.value);
	};

	const handleChange19_Arabic = (e) => {
		setError("");
		setServiceDescription10_Arabic(e.target.value);
	};

	const handleChange9 = (e) => {
		setError("");
		setServicePriceDiscount(e.target.value);
	};

	const handleChange20 = (e) => {
		setError("");
		setServicePrice_Children(e.target.value);
	};
	const handleChange21 = (e) => {
		setError("");
		setServicePriceDiscount_Children(e.target.value);
	};

	const handleChange22 = (e) => {
		setError("");
		setOption1(e.target.value);
	};
	const handleChange23 = (e) => {
		setError("");
		setOption2(e.target.value);
	};
	const handleChange24 = (e) => {
		setError("");
		setOption3(e.target.value);
	};
	const handleChange25 = (e) => {
		setError("");
		setOption4(e.target.value);
	};
	const handleChange26 = (e) => {
		setError("");
		setOption1_Arabic(e.target.value);
	};
	const handleChange27 = (e) => {
		setError("");
		setOption2_Arabic(e.target.value);
	};
	const handleChange28 = (e) => {
		setError("");
		setOption3_Arabic(e.target.value);
	};
	const handleChange29 = (e) => {
		setError("");
		setOption4_Arabic(e.target.value);
	};
	const handleChange30 = (e) => {
		setError("");
		setOption1_Price(e.target.value);
	};
	const handleChange31 = (e) => {
		setError("");
		setOption2_Price(e.target.value);
	};
	const handleChange32 = (e) => {
		setError("");
		setOption3_Price(e.target.value);
	};
	const handleChange33 = (e) => {
		setError("");
		setOption4_Price(e.target.value);
	};

	const gettingAllTickets = () => {
		getTickets(token).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setError("");
				setAllTickets(
					data.map((serviceNames) => serviceNames.serviceName.toLowerCase()),
				);
			}
		});
	};

	useEffect(() => {
		gettingAllTickets();
		// eslint-disable-next-line
	}, [servicePrice, serviceName]);

	let matchingServiceName =
		allTickets.indexOf(serviceName.toLowerCase()) !== -1;

	const clickSubmit = (e) => {
		e.preventDefault();
		if (matchingServiceName) {
			return toast.error("This Package was added before.");
		}

		if (addThumbnail.length === 0) {
			return toast.error("Please add at least one photo as a thumbnail");
		}

		if (allTickets.length >= 25) {
			return toast.error(
				"You have submitted more than 3 tickets, Please check with infinite-apps.com and ask for increasing your range",
			);
		}

		setError("");
		setSuccess(false);
		// make request to api to create service
		createTicket(user._id, token, {
			serviceName,
			serviceName_Arabic,
			servicePrice,
			servicePrice_Children,
			servicePriceDiscount,
			servicePriceDiscount_Children,
			option1,
			option2,
			option3,
			option4,
			option1_Arabic,
			option2_Arabic,
			option3_Arabic,
			option4_Arabic,
			option1_Price,
			option2_Price,
			option3_Price,
			option4_Price,
			option1_Active,
			option2_Active,
			option3_Active,
			option4_Active,
			serviceDescription,
			serviceDescription_Arabic,
			serviceDescription2,
			serviceDescription2_Arabic,
			serviceDescription3,
			serviceDescription3_Arabic,
			serviceDescription4,
			serviceDescription4_Arabic,
			serviceDescription5,
			serviceDescription5_Arabic,
			serviceDescription6,
			serviceDescription6_Arabic,
			serviceDescription7,
			serviceDescription7_Arabic,
			serviceDescription8,
			serviceDescription8_Arabic,
			serviceDescription9,
			serviceDescription9_Arabic,
			serviceDescription10,
			serviceDescription10_Arabic,
			thumbnail: addThumbnail && addThumbnail.images,
		}).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				toast.success("Package was successfully Added.");
				setError("");
				window.scrollTo({ top: 0, behavior: "smooth" });
				setTimeout(function () {
					setServicePrice("");
					window.location.reload(false);
				}, 2500);
			}
		});
	};

	const fileUploadAndResizeThumbNail = (e) => {
		// console.log(e.target.files);
		let files = e.target.files;
		let allUploadedFiles = [];
		if (files) {
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					720,
					720,
					"JPEG",
					100,
					0,
					(uri) => {
						cloudinaryUpload1(user._id, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setAddThumbnail({ ...addThumbnail, images: allUploadedFiles });
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

	const FileUploadThumbnail = () => {
		return (
			<>
				<label
					className='btn btn-info btn-raised'
					style={{ cursor: "pointer", fontSize: "0.95rem" }}>
					Add Ticket Thumbnails
					<input
						type='file'
						hidden
						accept='images/*'
						onChange={fileUploadAndResizeThumbNail}
						required
						multiple
					/>
					<br />
					(Width: 920px ; Height: 420px)
				</label>
			</>
		);
	};

	const handleImageRemove = (public_id) => {
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
				const { images } = addThumbnail;
				let filteredImages = images.filter((item) => {
					return item.public_id !== public_id;
				});
				setAddThumbnail({ ...addThumbnail, images: filteredImages });
			})
			.catch((err) => {
				console.log(err);
				window.location.reload(false);
			});
	};

	const newTicketForm = () => (
		<form onSubmit={clickSubmit}>
			<div className='row'>
				<div className='form-group col-md-10 mx-auto'>
					<label className='text-muted'>Package Name</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange1}
						value={serviceName}
						required
						// placeholder='Haircut, Color, Wash, etc...'
					/>
				</div>

				<div className='form-group col-md-10 mx-auto'>
					<label className='text-muted'>Package Name Arabic</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange1_Arabic}
						value={serviceName_Arabic}
						required
						// placeholder='Haircut, Color, Wash, etc...'
					/>
				</div>

				<div className='form-group col-md-5 mx-auto mt-4'>
					<label className='text-muted'>Ticket Price (Adults)</label>
					<input
						type='number'
						className='form-control'
						onChange={handleChange2}
						value={servicePrice}
						required
						placeholder='The price should be only a number'
					/>
				</div>
				<div className='form-group col-md-5 mx-auto mt-4'>
					<label className='text-muted'>
						Ticket Price After Discount (Adults)
					</label>
					<input
						type='number'
						className='form-control'
						onChange={handleChange9}
						value={servicePriceDiscount}
						required
						placeholder='The price should be only a number'
					/>
				</div>
				<div className='form-group col-md-5 mx-auto mt-4'>
					<label className='text-muted'>Ticket Price (Children)</label>
					<input
						type='number'
						className='form-control'
						onChange={handleChange20}
						value={servicePrice_Children}
						required
						placeholder='The price should be only a number'
					/>
				</div>
				<div className='form-group col-md-5 mx-auto mt-4'>
					<label className='text-muted'>
						Ticket Price After Discount (Children)
					</label>
					<input
						type='number'
						className='form-control'
						onChange={handleChange21}
						value={servicePriceDiscount_Children}
						required
						placeholder='The price should be only a number'
					/>
				</div>

				<div className='form-group col-md-3 mx-auto mt-4'>
					<label className='text-muted'>Additional Options 1</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange22}
						value={option1}
						placeholder='Please add any additional options for this Ticket'
					/>
				</div>

				<div className='form-group col-md-3 mx-auto mt-4'>
					<label className='text-muted'>Additional Options 1 (Arabic)</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange26}
						value={option1_Arabic}
						placeholder='Please add any additional options for this Ticket In Arabic'
					/>
				</div>

				<div className='form-group col-md-3 mx-auto mt-4'>
					<label className='text-muted'>Additional Options 1 Price</label>
					<input
						type='number'
						className='form-control'
						onChange={handleChange30}
						value={option1_Price}
						placeholder='The price should be only a number'
					/>
				</div>

				<div className='form-group col-md-3 mx-auto mt-5'>
					<label className='text-muted'>Activate / Deactivate</label>
					<input
						type='checkbox'
						className='ml-2 mt-2'
						onChange={() => setOption1_Active(!option1_Active)}
						checked={option1_Active === true ? true : false}
					/>
				</div>

				<div className='form-group col-md-3 mx-auto mt-4'>
					<label className='text-muted'>Additional Options 2</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange23}
						value={option2}
						placeholder='Please add any additional options for this Ticket'
					/>
				</div>

				<div className='form-group col-md-3 mx-auto mt-4'>
					<label className='text-muted'>Additional Options 2 (Arabic)</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange27}
						value={option2_Arabic}
						placeholder='Please add any additional options for this Ticket In Arabic'
					/>
				</div>

				<div className='form-group col-md-3 mx-auto mt-4'>
					<label className='text-muted'>Additional Options 2 Price</label>
					<input
						type='number'
						className='form-control'
						onChange={handleChange31}
						value={option2_Price}
						placeholder='The price should be only a number'
					/>
				</div>

				<div className='form-group col-md-3 mx-auto mt-5'>
					<label className='text-muted'>Activate / Deactivate</label>
					<input
						type='checkbox'
						className='ml-2 mt-2'
						onChange={() => setOption2_Active(!option2_Active)}
						checked={option2_Active === true ? true : false}
					/>
				</div>

				<div className='form-group col-md-3 mx-auto mt-4'>
					<label className='text-muted'>Additional Options 3</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange24}
						value={option3}
						placeholder='Please add any additional options for this Ticket'
					/>
				</div>

				<div className='form-group col-md-3 mx-auto mt-4'>
					<label className='text-muted'>Additional Options 3 (Arabic)</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange28}
						value={option3_Arabic}
						placeholder='Please add any additional options for this Ticket In Arabic'
					/>
				</div>

				<div className='form-group col-md-3 mx-auto mt-4'>
					<label className='text-muted'>Additional Options 3 Price</label>
					<input
						type='number'
						className='form-control'
						onChange={handleChange32}
						value={option3_Price}
						placeholder='The price should be only a number'
					/>
				</div>

				<div className='form-group col-md-3 mx-auto mt-5'>
					<label className='text-muted'>Activate / Deactivate</label>
					<input
						type='checkbox'
						className='ml-2 mt-2'
						onChange={() => setOption3_Active(!option3_Active)}
						checked={option3_Active === true ? true : false}
					/>
				</div>

				<div className='form-group col-md-3 mx-auto mt-4'>
					<label className='text-muted'>Additional Options 4</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange25}
						value={option4}
						placeholder='Please add any additional options for this Ticket'
					/>
				</div>

				<div className='form-group col-md-3 mx-auto mt-4'>
					<label className='text-muted'>Additional Options 4 (Arabic)</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange29}
						value={option4_Arabic}
						placeholder='Please add any additional options for this Ticket In Arabic'
					/>
				</div>

				<div className='form-group col-md-3 mx-auto mt-4'>
					<label className='text-muted'>Additional Options 4 Price</label>
					<input
						type='number'
						className='form-control'
						onChange={handleChange33}
						value={option4_Price}
						placeholder='The price should be only a number'
					/>
				</div>

				<div className='form-group col-md-3 mx-auto mt-5'>
					<label className='text-muted'>Activate / Deactivate</label>
					<input
						type='checkbox'
						className='ml-2 mt-2'
						onChange={() => setOption4_Active(!option4_Active)}
						checked={option4_Active === true ? true : false}
					/>
				</div>

				<div className='form-group col-md-6 mx-auto mt-4'>
					<label className='text-muted'>Package Description 1</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange10}
						value={serviceDescription}
						required
						placeholder='Please add package Description'
					/>
				</div>

				<div className='form-group col-md-6 mx-auto mt-4'>
					<label className='text-muted'>Package Description 1 (Arabic)</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange10_Arabic}
						value={serviceDescription_Arabic}
						required
						placeholder='Please add package Description'
					/>
				</div>

				<div className='form-group col-md-6 mx-auto mt-4'>
					<label className='text-muted'>Package Description 2</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange11}
						value={serviceDescription2}
						required
						placeholder='Please add 2nd package Description'
					/>
				</div>

				<div className='form-group col-md-6 mx-auto mt-4'>
					<label className='text-muted'>Package Description 2 (Arabic)</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange11_Arabic}
						value={serviceDescription2_Arabic}
						required
						placeholder='Please add 2nd package Description'
					/>
				</div>

				<div className='form-group col-md-6 mx-auto mt-4'>
					<label className='text-muted'>Package Description 3</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange12}
						value={serviceDescription3}
						required
						placeholder='Please add package Description'
					/>
				</div>

				<div className='form-group col-md-6 mx-auto mt-4'>
					<label className='text-muted'>Package Description 3 (Arabic)</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange12_Arabic}
						value={serviceDescription3_Arabic}
						required
						placeholder='Please add 3rd package Description'
					/>
				</div>

				<div className='form-group col-md-6 mx-auto mt-4'>
					<label className='text-muted'>Package Description 4</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange13}
						value={serviceDescription4}
						required
						placeholder='Please add package Description'
					/>
				</div>

				<div className='form-group col-md-6 mx-auto mt-4'>
					<label className='text-muted'>Package Description 4 (Arabic)</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange13_Arabic}
						value={serviceDescription4_Arabic}
						required
						placeholder='Please add 4th package Description'
					/>
				</div>

				<div className='form-group col-md-6 mx-auto mt-4'>
					<label className='text-muted'>Package Description 5</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange14}
						value={serviceDescription5}
						placeholder='Please add package Description'
					/>
				</div>

				<div className='form-group col-md-6 mx-auto mt-4'>
					<label className='text-muted'>Package Description 5 (Arabic)</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange14_Arabic}
						value={serviceDescription5_Arabic}
						placeholder='Please add package Description'
					/>
				</div>

				<div className='form-group col-md-6 mx-auto mt-4'>
					<label className='text-muted'>Package Description 6</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange15}
						value={serviceDescription6}
						placeholder='Please add package Description'
					/>
				</div>

				<div className='form-group col-md-6 mx-auto mt-4'>
					<label className='text-muted'>Package Description 6 (Arabic)</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange15_Arabic}
						value={serviceDescription6_Arabic}
						placeholder='Please add 6th package Description'
					/>
				</div>

				<div className='form-group col-md-6 mx-auto mt-4'>
					<label className='text-muted'>Package Description 7</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange16}
						value={serviceDescription7}
						placeholder='Please add package description'
					/>
				</div>

				<div className='form-group col-md-6 mx-auto mt-4'>
					<label className='text-muted'>Package Description 7 (Arabic)</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange16_Arabic}
						value={serviceDescription7_Arabic}
						placeholder='Please add 7th package description'
					/>
				</div>

				<div className='form-group col-md-6 mx-auto mt-4'>
					<label className='text-muted'>Package Description 8</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange17}
						value={serviceDescription8}
						placeholder='Please add package description'
					/>
				</div>

				<div className='form-group col-md-6 mx-auto mt-4'>
					<label className='text-muted'>Package Description 8 (Arabic)</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange17_Arabic}
						value={serviceDescription8_Arabic}
						placeholder='Please add 8th package description'
					/>
				</div>

				<div className='form-group col-md-6 mx-auto mt-4'>
					<label className='text-muted'>Package Description 9</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange18}
						value={serviceDescription9}
						placeholder='Please add package description'
					/>
				</div>

				<div className='form-group col-md-6 mx-auto mt-4'>
					<label className='text-muted'>Package Description 9 (Arabic)</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange18_Arabic}
						value={serviceDescription9_Arabic}
						placeholder='Please add 9th package description'
					/>
				</div>

				<div className='form-group col-md-6 mx-auto mt-4'>
					<label className='text-muted'>Package Description 10</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange19}
						value={serviceDescription10}
						placeholder='Please add package description'
					/>
				</div>

				<div className='form-group col-md-6 mx-auto mt-4'>
					<label className='text-muted'>Package Description 10 (Arabic)</label>
					<input
						type='text'
						className='form-control'
						onChange={handleChange19_Arabic}
						value={serviceDescription10_Arabic}
						placeholder='Please add 10th package description'
					/>
				</div>
			</div>

			<button className='btn btn-outline-primary mb-3'>Add Ticket</button>
		</form>
	);

	// eslint-disable-next-line
	const showSuccess = () => {
		if (success) {
			return <h3 className='text-success'>{serviceName} is created</h3>;
		}
	};

	console.log(addThumbnail);

	return (
		<AddTicketWrapper>
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
				className='col-md-8 col-sm-6 offset-md-2 mt-3 mx-auto p-3'
				style={{
					border: "1px black solid",
					borderRadius: "20px",
					marginBottom: "200px",
				}}>
				<h3 className='mt-1 mb-3 text-center'>Add Tickets</h3>
				<ToastContainer />
				<div className='m-3 col-8 mx-auto'>
					<div className='row'>
						{addThumbnail &&
							addThumbnail.images &&
							addThumbnail.images.map((image) => {
								return (
									<div className='my-3 col-4 '>
										<button
											type='button'
											// className='close'
											onClick={() => {
												handleImageRemove(image.public_id);

												var array = addThumbnail.images.filter(function (s) {
													return s.public_id !== image.public_id;
												});

												setAddThumbnail({
													images: array,
												});
											}}
											style={{
												color: "white",
												background: "darkGrey",
												fontSize: "15px",
												borderRadius: "5px",
												marginBottom: "3px",
												// marginLeft: "20px",
												textAlign: "center",
												padding: "0px 3px",
											}}
											aria-label='Close'>
											<span aria-hidden='true'>&times;</span>
										</button>
										<br />
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
					{FileUploadThumbnail()}
				</div>
				{newTicketForm()}
			</div>
		</AddTicketWrapper>
	);
};

export default AddTicket;

const AddTicketWrapper = styled.div`
	input::placeholder {
		color: #d3d3d3 !important;
		font-size: 0.75em !important;
	}
`;
