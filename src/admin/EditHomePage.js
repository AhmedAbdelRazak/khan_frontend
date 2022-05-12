/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isAuthenticated } from "../auth/index";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { createHomePage, getHomes, cloudinaryUpload1 } from "./apiAdmin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const EditHomePage = () => {
	//Adding Variables

	const [categoryStatus, setCategoryStatus] = useState(true);
	const [allHomes, setAllHomes] = useState([]);
	const [addThumbnail, setAddThumbnail] = useState([]);
	const [addThumbnail2, setAddThumbnail2] = useState([]);
	const [addThumbnail3, setAddThumbnail3] = useState([]);
	const [hyper_link, setHyper_Link] = useState("");
	const [hyper_link2, setHyper_Link2] = useState("");
	const [hyper_link3, setHyper_Link3] = useState("");

	// eslint-disable-next-line
	const [loading, setLoading] = useState("");
	// eslint-disable-next-line
	const [error, setError] = useState(false);
	// eslint-disable-next-line
	const [success, setSuccess] = useState(false);
	const { user, token } = isAuthenticated();

	const handleChange8 = (e) => {
		setError("");
		setCategoryStatus(e.target.value);
	};

	const handleChange9 = (e) => {
		setError("");
		setHyper_Link(e.target.value);
	};

	const handleChange10 = (e) => {
		setError("");
		setHyper_Link2(e.target.value);
	};

	const handleChange11 = (e) => {
		setError("");
		setHyper_Link3(e.target.value);
	};

	const gettingAllHomes = () => {
		getHomes(token).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setError("");
				setAllHomes(data[data.length - 1]);

				setCategoryStatus(
					data[data.length - 1] && data[data.length - 1].categoryStatus,
				);

				setHyper_Link(
					data[data.length - 1] && data[data.length - 1].hyper_link,
				);

				setHyper_Link2(
					data[data.length - 1] && data[data.length - 1].hyper_link2,
				);

				setHyper_Link3(
					data[data.length - 1] && data[data.length - 1].hyper_link3,
				);
			}
		});
	};

	const fileUploadAndResizeThumbNail = (e) => {
		let files = e.target.files;
		let allUploadedFiles = addThumbnail;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				console.log(files[i]);
				Resizer.imageFileResizer(
					files[i],
					3840,
					720,
					"JPEG",
					100,
					0,
					(uri) => {
						console.log(uri, "uri from cloudinary");
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
	// eslint-disable-next-line
	const FileUploadThumbnail = () => {
		return (
			<>
				<label
					className='btn btn-info btn-raised'
					style={{ cursor: "pointer", fontSize: "0.8rem" }}>
					Add a Background Photo 1
					<input
						type='file'
						hidden
						accept='images/*'
						onChange={fileUploadAndResizeThumbNail}
					/>
					<br />
					(Width: 3840px ; Height: 720px)
				</label>
			</>
		);
	};
	// eslint-disable-next-line
	const handleImageRemove = (public_id) => {
		setLoading(true);
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
				setLoading(false);
				// eslint-disable-next-line
				const { images } = addThumbnail;
				// let filteredImages = images.filter((item) => {
				// 	return item.public_id !== public_id;
				// });
				setAddThumbnail([]);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			});
	};

	const fileUploadAndResizeThumbNail2 = (e) => {
		let files = e.target.files;
		let allUploadedFiles = addThumbnail2;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					3840,
					720,
					"JPEG",
					100,
					0,
					(uri) => {
						cloudinaryUpload1(user._id, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setAddThumbnail2({
									...addThumbnail2,
									images: allUploadedFiles,
								});
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
	// eslint-disable-next-line
	const FileUploadThumbnail2 = () => {
		return (
			<>
				<label
					className='btn btn-info btn-raised'
					style={{ cursor: "pointer", fontSize: "0.8rem" }}>
					Add a Background Photo 2
					<input
						type='file'
						hidden
						accept='images/*'
						onChange={fileUploadAndResizeThumbNail2}
					/>
					<br />
					(Width: 3840px ; Height: 720px)
				</label>
			</>
		);
	};
	// eslint-disable-next-line
	const handleImageRemove2 = (public_id) => {
		setLoading(true);
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
				setLoading(false);
				// eslint-disable-next-line
				const { images } = addThumbnail2;
				// let filteredImages = images.filter((item) => {
				// 	return item.public_id !== public_id;
				// });
				setAddThumbnail2([]);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			});
	};

	const fileUploadAndResizeThumbNail3 = (e) => {
		// console.log(e.target.files);
		let files = e.target.files;
		let allUploadedFiles = addThumbnail3;
		if (files) {
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					3840,
					720,
					"JPEG",
					100,
					0,
					(uri) => {
						cloudinaryUpload1(user._id, token, { image: uri })
							.then((data) => {
								allUploadedFiles.push(data);

								setAddThumbnail3({
									...addThumbnail3,
									images: allUploadedFiles,
								});
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

	// eslint-disable-next-line
	const FileUploadThumbnail3 = () => {
		return (
			<>
				<label
					className='btn btn-info btn-raised'
					style={{ cursor: "pointer", fontSize: "0.8rem" }}>
					Add a Background Photo 3
					<input
						type='file'
						hidden
						accept='images/*'
						onChange={fileUploadAndResizeThumbNail3}
					/>
					<br />
					(Width: 3840px ; Height: 720px)
				</label>
			</>
		);
	};
	// eslint-disable-next-line
	const handleImageRemove3 = (public_id) => {
		setLoading(true);
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
				setLoading(false);
				// eslint-disable-next-line
				const { images } = addThumbnail3;
				// let filteredImages = images.filter((item) => {
				// 	return item.public_id !== public_id;
				// });
				setAddThumbnail3([]);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			});
	};

	useEffect(() => {
		gettingAllHomes();
		// eslint-disable-next-line
	}, []);

	const clickSubmit = (e) => {
		e.preventDefault();
		if (addThumbnail.length === 0) {
			return toast.error("Please add a background photo for the Home Page.");
		}

		setError("");
		setSuccess(false);
		// make request to api to create Category
		createHomePage(user._id, token, {
			categoryStatus,
			hyper_link,
			hyper_link2,
			hyper_link3,
			thumbnail:
				addThumbnail && addThumbnail.images !== undefined
					? addThumbnail && addThumbnail.images
					: allHomes && allHomes.thumbnail,

			thumbnail2:
				addThumbnail2 && addThumbnail2.images !== undefined
					? addThumbnail2 && addThumbnail2.images
					: allHomes && allHomes.thumbnail2,

			thumbnail3:
				addThumbnail3 && addThumbnail3.images !== undefined
					? addThumbnail3 && addThumbnail3.images
					: allHomes && allHomes.thumbnail3,
		}).then((data) => {
			if (data.error) {
				setError(data.error);
				setTimeout(function () {
					window.location.reload(false);
				}, 1000);
			} else {
				toast.success("Home Page was successfully Added.");
				setError("");
				setTimeout(function () {
					setAddThumbnail([]);
				}, 2000);
				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			}
		});
	};
	// eslint-disable-next-line
	const newHomePageForm = () => (
		<form onSubmit={clickSubmit}>
			<div className='form-group'>
				<label className='text-muted'>
					Activate Changes{" "}
					{categoryStatus === false ? (
						<span className='ml-3' style={{ color: "red", fontWeight: "bold" }}>
							(Deactivated)
						</span>
					) : null}
				</label>
				<select
					onChange={handleChange8}
					className='form-control'
					style={{ fontSize: "0.80rem" }}>
					<option>Please select / Required*</option>
					<option value='0'>Deactivate Home Page Changes</option>
					<option value='1'>Activate Home Page Changes</option>
				</select>
			</div>

			<button className='btn btn-outline-primary mb-3'>Submit Changes</button>
		</form>
	);

	return (
		<div>
			<EditHomePageWrapper>
				<div
					className='col-md-9 mx-auto py-3'
					// style={{ border: "solid red 1px" }}
				>
					<h3 className='mt-1 mb-3 text-center'>Change "Home" Page</h3>
					<ToastContainer />
					<div className='m-3 col-4'>
						<div className='col-12'>
							{addThumbnail &&
								addThumbnail.images &&
								addThumbnail.images.map((image, i) => {
									return (
										<div className='m-3 col-6 ' key={i}>
											<button
												type='button'
												className='close'
												onClick={() => {
													handleImageRemove(image.public_id);
													setAddThumbnail([]);
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
						{FileUploadThumbnail()}
					</div>
					<div className='form-group mb-3'>
						<label className='text-muted'>Add Link To First Photo</label>
						<input
							type='text'
							className='form-control'
							onChange={handleChange9}
							value={hyper_link}
							placeholder='Optional'
						/>
					</div>

					<div className='m-3 col-4'>
						<div className='col-12'>
							{addThumbnail2 &&
								addThumbnail2.images &&
								addThumbnail2.images.map((image, i) => {
									return (
										<div className='m-3 col-6 ' key={i}>
											<button
												type='button'
												className='close'
												onClick={() => {
													handleImageRemove2(image.public_id);
													setAddThumbnail2([]);
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
						{FileUploadThumbnail2()}
					</div>
					<div className='form-group mb-3'>
						<label className='text-muted'>Add Link To Second Photo</label>
						<input
							type='text'
							className='form-control'
							onChange={handleChange10}
							value={hyper_link2}
							placeholder='Optional'
						/>
					</div>
					<div className='m-3 col-4'>
						<div className='col-12'>
							{addThumbnail3 &&
								addThumbnail3.images &&
								addThumbnail3.images.map((image, i) => {
									return (
										<div className='m-3 col-6 ' key={i}>
											<button
												type='button'
												className='close'
												onClick={() => {
													handleImageRemove3(image.public_id);
													setAddThumbnail3([]);
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
						{FileUploadThumbnail3()}
					</div>
					<div className='form-group mb-3'>
						<label className='text-muted'>Add Link To Third Photo</label>
						<input
							type='text'
							className='form-control'
							onChange={handleChange11}
							value={hyper_link3}
							placeholder='Optional'
						/>
					</div>
					{newHomePageForm()}
				</div>
			</EditHomePageWrapper>
		</div>
	);
};

export default EditHomePage;

const EditHomePageWrapper = styled.div`
	margin-bottom: 100px;
`;
