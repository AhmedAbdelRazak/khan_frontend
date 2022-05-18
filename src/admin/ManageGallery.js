/** @format */

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "antd/dist/antd.min.css";
import { isAuthenticated } from "../auth";
import {
	getGalleries,
	removeGallery,
	createGallery,
	cloudinaryUpload1,
} from "./apiAdmin";
import Adminsidebar from "./AdminSideBar/Adminsidebar";
import DarkBG from "./AdminSideBar/DarkBG";
import axios from "axios";
import Resizer from "react-image-file-resizer";

const ManageGallery = () => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);

	const [galleries, setGalleries] = useState([]);
	const [title, setTitle] = useState("");
	const [title_Arabic, setTitle_Arabic] = useState("");
	const [addThumbnail, setAddThumbnail] = useState([]);
	const [loading, setLoading] = useState("");

	useEffect(() => {
		setClickMenu2(click2);
	}, [click2, clickMenu2]);

	const { user, token } = isAuthenticated();

	useEffect(() => {
		loadAllGalleries();
	}, []);

	const loadAllGalleries = () =>
		getGalleries().then((res) => setGalleries(res.data));

	const handleSubmit = (e) => {
		e.preventDefault();

		if (title.length <= 4 || title_Arabic.length <= 4) {
			return toast.error(
				"Gallery Title should be more than 5 letters, Please try again",
			);
		}

		if (title.length >= 50 || title_Arabic.length >= 50) {
			return toast.error(
				"Gallery Title should be less than 50 letters, Please try again",
			);
		}
		if (galleries.length >= 20) {
			return toast.error(
				"You have submitted more than 3 galleries, Please check with infinite-apps.com and ask for increasing your range",
			);
		}
		setLoading(true);
		// console.table(name, expiry, discount);
		createGallery(user._id, token, {
			title: title,
			title_Arabic: title_Arabic,
			thumbnail: addThumbnail && addThumbnail.images,
		})
			.then((res) => {
				setLoading(false);
				loadAllGalleries(); // load all galleries
				setTitle("");
				setTitle_Arabic("");
				toast.success(`"${res.data.title}" is created`);
				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			})
			.catch((err) => {
				console.log("create gallery err", err);
				setTimeout(function () {
					window.location.reload(false);
				}, 1500);
			});
	};

	const handleRemove = (couponId) => {
		if (window.confirm("Delete?")) {
			setLoading(true);
			removeGallery(couponId, user._id, token)
				.then((res) => {
					loadAllGalleries(); // load all galleries
					setLoading(false);
					toast.error(`Gallery "${res.data.title}" deleted`);
				})
				.catch((err) => console.log(err));
		}
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
						// multiple
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
						<h4 className='mb-3'>Create a New Gallery:</h4>
					)}

					<form onSubmit={handleSubmit}>
						<div className='m-3 col-8 mx-auto'>
							<div className='row'>
								{addThumbnail &&
									addThumbnail.images &&
									addThumbnail.images.map((image, key) => {
										return (
											<div className='my-3 col-5 ' key={key}>
												<button
													type='button'
													// className='close'
													onClick={() => {
														handleImageRemove(image.public_id);

														var array = addThumbnail.images.filter(function (
															s,
														) {
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
						<div className='form-group'>
							<label className='text-muted'>Gallery Title/Text</label>
							<input
								type='text'
								className='form-control'
								onChange={(e) => setTitle(e.target.value)}
								value={title}
								autoFocus
								required
							/>
						</div>
						<div className='form-group my-2'>
							<label className='text-muted'>Gallery Title/Text (Arabic)</label>
							<input
								type='text'
								className='form-control'
								onChange={(e) => setTitle_Arabic(e.target.value)}
								value={title_Arabic}
								required
							/>
						</div>
						<button className='btn btn-outline-primary'>Save</button>
					</form>

					<br />
					<hr />
					<h4 className='my-3'>
						Created Galleries: {galleries.length} Gallery
					</h4>

					<table className='table table-bordered'>
						<thead className='thead-light'>
							<tr>
								<th scope='col'>Title</th>
								<th scope='col'>Title (Arabic)</th>
								<th scope='col'>Creation Date</th>
								<th scope='col'>Action</th>
							</tr>
						</thead>

						<tbody>
							{galleries &&
								galleries.map((c) => (
									<tr key={c._id}>
										<td>{c.title}</td>
										<td>{c.title_Arabic}</td>
										<td>{new Date(c.createdAt).toLocaleString()}</td>
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

export default ManageGallery;
