/** @format */
import React, { useState, useEffect, Fragment } from "react";
import { updateTicket, getTickets, cloudinaryUpload1 } from "./apiAdmin";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Adminsidebar from "./AdminSideBar/Adminsidebar";
import DarkBG from "./AdminSideBar/DarkBG";
import axios from "axios";
import Resizer from "react-image-file-resizer";

const UpdateTicket = ({ match }) => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);

	useEffect(() => {
		setClickMenu2(click2);
	}, [click2, clickMenu2]);

	const [allTickets, setAllTickets] = useState([]);
	const [selectedService, setSelectedService] = useState([]);

	const { user, token } = isAuthenticated();
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

	const [activeService, setActiveService] = useState("1");
	const [serviceLoyaltyPoints, setServiceLoyaltyPoints] = useState(0);
	const [linkClick, setLinkClick] = useState(false);
	const [loading, setLoading] = useState(false);

	const [addThumbnail, setAddThumbnail] = useState([]);

	const gettingAllTickets = () => {
		getTickets(token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllTickets(data);
				setSelectedService(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId),
				);
				setAddThumbnail({
					images:
						match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0].thumbnail,
				});

				setServiceName(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0].serviceName,
				);

				setServiceName_Arabic(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.serviceName_Arabic,
				);

				setServicePrice(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0].servicePrice,
				);
				setServicePriceDiscount(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.servicePriceDiscount,
				);

				setServicePrice_Children(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.servicePrice_Children,
				);
				setServicePriceDiscount_Children(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.servicePriceDiscount_Children,
				);

				setServiceDescription(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.serviceDescription,
				);

				setServiceDescription_Arabic(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.serviceDescription_Arabic,
				);

				setServiceDescription2(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.serviceDescription2,
				);

				setServiceDescription2_Arabic(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.serviceDescription2_Arabic,
				);

				setServiceDescription3(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.serviceDescription3,
				);

				setServiceDescription3_Arabic(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.serviceDescription3_Arabic,
				);

				setServiceDescription4(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.serviceDescription4,
				);

				setServiceDescription4_Arabic(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.serviceDescription4_Arabic,
				);

				setServiceDescription5(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.serviceDescription5,
				);

				setServiceDescription5_Arabic(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.serviceDescription5_Arabic,
				);

				setServiceDescription6(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.serviceDescription6,
				);

				setServiceDescription6_Arabic(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.serviceDescription6_Arabic,
				);

				setServiceDescription7(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.serviceDescription7,
				);

				setServiceDescription7_Arabic(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.serviceDescription7_Arabic,
				);

				setServiceDescription8(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.serviceDescription8,
				);

				setServiceDescription8_Arabic(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.serviceDescription8_Arabic,
				);

				setServiceDescription9(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.serviceDescription9,
				);

				setServiceDescription9_Arabic(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.serviceDescription9_Arabic,
				);

				setServiceDescription10(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.serviceDescription10,
				);

				setServiceDescription10_Arabic(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.serviceDescription10_Arabic,
				);

				setOption1(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0].option1,
				);
				setOption1_Arabic(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.option1_Arabic,
				);
				setOption1_Price(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.option1_Price,
				);
				setOption1_Active(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.option1_Active,
				);

				setOption2(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0].option2,
				);
				setOption2_Arabic(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.option2_Arabic,
				);
				setOption2_Price(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.option2_Price,
				);
				setOption2_Active(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.option2_Active,
				);

				setOption3(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0].option3,
				);
				setOption3_Arabic(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.option3_Arabic,
				);
				setOption3_Price(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.option3_Price,
				);
				setOption3_Active(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.option3_Active,
				);

				setOption4(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0].option4,
				);
				setOption4_Arabic(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.option4_Arabic,
				);
				setOption4_Price(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.option4_Price,
				);
				setOption4_Active(
					match.params.ticketId &&
						match.params.ticketId !== "undefined" &&
						data.filter((s) => s._id === match.params.ticketId)[0]
							.option4_Active,
				);
			}
		});
	};

	useEffect(() => {
		gettingAllTickets();
		// eslint-disable-next-line
	}, [match.params.ticketId, loading]);

	const handleChange1 = (e) => {
		setServiceName(e.target.value);
	};

	const handleChange1_Arabic = (e) => {
		setServiceName_Arabic(e.target.value);
	};

	const handleChange2 = (e) => {
		setServicePrice(e.target.value);
	};

	// eslint-disable-next-line
	const handleChange4 = (e) => {
		setServiceLoyaltyPoints(e.target.value);
	};

	const handleChange5 = (e) => {
		setActiveService(e.target.value);
	};

	const handleChange9 = (e) => {
		setServicePriceDiscount(e.target.value);
	};

	const handleChange10 = (e) => {
		setServiceDescription(e.target.value);
	};

	const handleChange10_Arabic = (e) => {
		setServiceDescription_Arabic(e.target.value);
	};

	const handleChange11 = (e) => {
		setServiceDescription2(e.target.value);
	};

	const handleChange11_Arabic = (e) => {
		setServiceDescription2_Arabic(e.target.value);
	};

	const handleChange12 = (e) => {
		setServiceDescription3(e.target.value);
	};

	const handleChange12_Arabic = (e) => {
		setServiceDescription3_Arabic(e.target.value);
	};

	const handleChange13 = (e) => {
		setServiceDescription4(e.target.value);
	};

	const handleChange13_Arabic = (e) => {
		setServiceDescription4_Arabic(e.target.value);
	};

	const handleChange14 = (e) => {
		setServiceDescription5(e.target.value);
	};

	const handleChange14_Arabic = (e) => {
		setServiceDescription5_Arabic(e.target.value);
	};

	const handleChange15 = (e) => {
		setServiceDescription6(e.target.value);
	};

	const handleChange15_Arabic = (e) => {
		setServiceDescription6_Arabic(e.target.value);
	};

	const handleChange16 = (e) => {
		setServiceDescription7(e.target.value);
	};

	const handleChange16_Arabic = (e) => {
		setServiceDescription7_Arabic(e.target.value);
	};

	const handleChange17 = (e) => {
		setServiceDescription8(e.target.value);
	};

	const handleChange17_Arabic = (e) => {
		setServiceDescription8_Arabic(e.target.value);
	};

	const handleChange18 = (e) => {
		setServiceDescription9(e.target.value);
	};

	const handleChange18_Arabic = (e) => {
		setServiceDescription9_Arabic(e.target.value);
	};

	const handleChange19 = (e) => {
		setServiceDescription10(e.target.value);
	};

	const handleChange19_Arabic = (e) => {
		setServiceDescription10_Arabic(e.target.value);
	};

	const handleChange20 = (e) => {
		setServicePrice_Children(e.target.value);
	};
	const handleChange21 = (e) => {
		setServicePriceDiscount_Children(e.target.value);
	};

	const handleChange22 = (e) => {
		setOption1(e.target.value);
	};
	const handleChange23 = (e) => {
		setOption2(e.target.value);
	};
	const handleChange24 = (e) => {
		setOption3(e.target.value);
	};
	const handleChange25 = (e) => {
		setOption4(e.target.value);
	};
	const handleChange26 = (e) => {
		setOption1_Arabic(e.target.value);
	};
	const handleChange27 = (e) => {
		setOption2_Arabic(e.target.value);
	};
	const handleChange28 = (e) => {
		setOption3_Arabic(e.target.value);
	};
	const handleChange29 = (e) => {
		setOption4_Arabic(e.target.value);
	};
	const handleChange30 = (e) => {
		setOption1_Price(e.target.value);
	};
	const handleChange31 = (e) => {
		setOption2_Price(e.target.value);
	};
	const handleChange32 = (e) => {
		setOption3_Price(e.target.value);
	};
	const handleChange33 = (e) => {
		setOption4_Price(e.target.value);
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		if (activeService === "0") {
			if (
				window.confirm(
					"Are you sure you want to deactivate the selected Package?",
				)
			) {
				updateTicket(match.params.ticketId, user._id, token, {
					serviceName,
					serviceName_Arabic,
					servicePrice,
					servicePriceDiscount,

					servicePrice_Children,
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

					serviceLoyaltyPoints: serviceLoyaltyPoints,
					activeService,
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
					thumbnail:
						addThumbnail && addThumbnail.images !== undefined
							? addThumbnail && addThumbnail.images
							: selectedService &&
							  selectedService.length > 0 &&
							  selectedService[0].thumbnail,
				}).then((data) => {
					if (data.error) {
						console.log(data.error);
						setLoading(false);
					} else {
						toast.success("Package was successfully Updated.");
						window.scrollTo({ top: 0, behavior: "smooth" });

						setTimeout(function () {
							setLinkClick(false);
							setLoading(false);
						}, 2000);
					}
				});
			}
		} else {
			updateTicket(match.params.ticketId, user._id, token, {
				serviceName,
				serviceName_Arabic,
				servicePrice,
				servicePriceDiscount,
				servicePrice_Children,
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

				serviceLoyaltyPoints: serviceLoyaltyPoints,

				activeService,
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
				thumbnail:
					addThumbnail && addThumbnail.images !== undefined
						? addThumbnail && addThumbnail.images
						: selectedService &&
						  selectedService.length > 0 &&
						  selectedService[0].thumbnail,
			}).then((data) => {
				if (data.error) {
					console.log(data.error);
					setLoading(false);
				} else {
					toast.success("Package was successfully Updated.");
					window.scrollTo({ top: 0, behavior: "smooth" });
					setTimeout(function () {
						setLinkClick(false);
						setLoading(false);
					}, 2000);
				}
			});
		}
	};

	const fileUploadAndResizeThumbNail = (e) => {
		// console.log(e.target.files);
		let files = e.target.files;
		let allUploadedFiles = addThumbnail && addThumbnail.images;
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

	console.log(addThumbnail, "addThumbnail");

	const FileUploadThumbnail = () => {
		return (
			<>
				<label
					className='btn btn-info btn-raised'
					style={{ cursor: "pointer", fontSize: "0.85rem" }}>
					Update Package Thumbnail
					<input
						type='file'
						hidden
						accept='images/*'
						onChange={fileUploadAndResizeThumbNail}
						multiple
					/>
				</label>
			</>
		);
	};
	// console.log(addThumbnail);

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
			});
	};

	return (
		<React.Fragment>
			<ToastContainer />
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
				className='container-fluid p-4 mt-3 col-10'
				style={{
					border: "darkBlue solid 1px",
					borderRadius: "20px",
					marginBottom: "215px",
				}}>
				<div className='row'>
					<ul className='list-group col-md-6'>
						<h3 className='text-center mt-5'>
							Total of {allTickets.length} Added Packages
						</h3>
						<p className='mt-2 text-center'>
							Please Select Which Package To Update.
						</p>
						{allTickets.map((s, i) => (
							<Link
								to={`/admin/update-a-ticket/${s._id}`}
								onClick={() => {
									setLinkClick(true);
									window.scrollTo({ top: 0, behavior: "smooth" });
								}}
								key={i}>
								<div
									className='container'
									style={{ textTransform: "capitalize" }}>
									<div className='row'>
										<li
											className='list-group-item d-flex my-1 py-4 justify-content-between align-items-center col-md-6'
											style={{ fontSize: "0.75rem" }}>
											<strong>{s.serviceName}</strong>
										</li>
										<li
											className='list-group-item d-flex my-1 py-4 justify-content-between align-items-center  col-md-3'
											style={{ fontSize: "0.75rem" }}>
											<strong>{s.servicePrice} L.E.</strong>,
											<strong style={{ color: "green" }}>
												{s.servicePriceDiscount} L.E.
											</strong>
										</li>

										{!s.activeService && (
											<li
												className='list-group-item d-flex my-1 py-4 justify-content-between align-items-center  col-md-2'
												style={{
													fontSize: "0.65rem",
													color: "red",
													fontWeight: "bold",
												}}>
												<strong>Deactivated</strong>
											</li>
										)}
									</div>
								</div>
							</Link>
						))}
					</ul>
					{allTickets && selectedService && selectedService[0] && linkClick ? (
						<form
							onSubmit={clickSubmit}
							className='col-md-5 mx-auto mt-5'
							style={{ borderLeft: "1px solid brown" }}>
							<h3
								style={{
									fontSize: "1.15rem",
									fontWeight: "bold",
									textTransform: "capitalize",
								}}
								className='text-center mt-1'>
								The Selected Package is "
								{selectedService &&
									selectedService[0] &&
									selectedService[0].serviceName}
								"
							</h3>
							<div style={{ textAlign: "center" }}>
								{addThumbnail &&
									addThumbnail.images &&
									addThumbnail.images.map((image, i) => {
										return (
											<Fragment key={i}>
												<img
													src={image.url}
													alt='Img Not Found'
													style={{
														width: "80px",
														height: "80px",
														boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
														textAlign: "center",
													}}
													className='mx-1 mt-3 '
												/>
												<button
													type='button'
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
														transform: "translate(-70%, -130%)",
														color: "white",
														background: "black",
														fontSize: "15px",
														padding: "0px",
														borderRadius: "50%",
													}}
													aria-label='Close'>
													<span aria-hidden='true'>&times;</span>
												</button>
											</Fragment>
										);
									})}

								<div className='my-3 p-3' style={{ textAlign: "center" }}>
									{FileUploadThumbnail()}
								</div>
							</div>

							<div className='form-group mt-5 '>
								<label className='text-muted'>Package Name</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange1}
									value={serviceName}
								/>
							</div>

							<div className='form-group mt-5 '>
								<label className='text-muted'>Package Name (Arabic)</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange1_Arabic}
									value={serviceName_Arabic}
								/>
							</div>

							<div className='row'>
								<div className='form-group col-md-6'>
									<label className='text-muted'>Package Price</label>
									<input
										type='text'
										className='form-control'
										onChange={handleChange2}
										value={servicePrice}
									/>
								</div>
								<div className='form-group col-md-6'>
									<label className='text-muted'>
										Package Price After Discount
									</label>
									<input
										type='text'
										className='form-control'
										onChange={handleChange9}
										value={servicePriceDiscount}
									/>
								</div>

								<div className='form-group col-md-6'>
									<label className='text-muted'>
										Package Price (Children){" "}
									</label>
									<input
										type='text'
										className='form-control'
										onChange={handleChange20}
										value={servicePrice_Children}
									/>
								</div>
								<div className='form-group col-md-6'>
									<label className='text-muted'>
										Package Price After Discount (Children)
									</label>
									<input
										type='text'
										className='form-control'
										onChange={handleChange21}
										value={servicePriceDiscount_Children}
									/>
								</div>

								<div className='form-group col-md-6 mx-auto mt-4'>
									<label className='text-muted'>Additional Options 1</label>
									<input
										type='text'
										className='form-control'
										onChange={handleChange22}
										value={option1}
										placeholder='Please add any additional options for this Ticket'
									/>
								</div>

								<div className='form-group col-md-6 mx-auto mt-4'>
									<label className='text-muted'>
										Additional Options 1 (Arabic)
									</label>
									<input
										type='text'
										className='form-control'
										onChange={handleChange26}
										value={option1_Arabic}
										placeholder='Please add any additional options for this Ticket In Arabic'
									/>
								</div>

								<div className='form-group col-md-6 mx-auto mt-4'>
									<label className='text-muted'>
										Additional Options 1 Price
									</label>
									<input
										type='number'
										className='form-control'
										onChange={handleChange30}
										value={option1_Price}
										placeholder='The price should be only a number'
									/>
								</div>

								<div className='form-group col-md-6 mx-auto mt-5'>
									<label className='text-muted'>Activate / Deactivate</label>
									<input
										type='checkbox'
										className='ml-2 mt-2'
										onChange={() => setOption1_Active(!option1_Active)}
										checked={option1_Active === true ? true : false}
									/>
								</div>

								<div className='form-group col-md-6 mx-auto mt-4'>
									<label className='text-muted'>Additional Options 2</label>
									<input
										type='text'
										className='form-control'
										onChange={handleChange23}
										value={option2}
										placeholder='Please add any additional options for this Ticket'
									/>
								</div>

								<div className='form-group col-md-6 mx-auto mt-4'>
									<label className='text-muted'>
										Additional Options 2 (Arabic)
									</label>
									<input
										type='text'
										className='form-control'
										onChange={handleChange27}
										value={option2_Arabic}
										placeholder='Please add any additional options for this Ticket In Arabic'
									/>
								</div>

								<div className='form-group col-md-6 mx-auto mt-4'>
									<label className='text-muted'>
										Additional Options 2 Price
									</label>
									<input
										type='number'
										className='form-control'
										onChange={handleChange31}
										value={option2_Price}
										placeholder='The price should be only a number'
									/>
								</div>

								<div className='form-group col-md-6 mx-auto mt-5'>
									<label className='text-muted'>Activate / Deactivate</label>
									<input
										type='checkbox'
										className='ml-2 mt-2'
										onChange={() => setOption2_Active(!option2_Active)}
										checked={option2_Active === true ? true : false}
									/>
								</div>

								<div className='form-group col-md-6 mx-auto mt-4'>
									<label className='text-muted'>Additional Options 3</label>
									<input
										type='text'
										className='form-control'
										onChange={handleChange24}
										value={option3}
										placeholder='Please add any additional options for this Ticket'
									/>
								</div>

								<div className='form-group col-md-6 mx-auto mt-4'>
									<label className='text-muted'>
										Additional Options 3 (Arabic)
									</label>
									<input
										type='text'
										className='form-control'
										onChange={handleChange28}
										value={option3_Arabic}
										placeholder='Please add any additional options for this Ticket In Arabic'
									/>
								</div>

								<div className='form-group col-md-6 mx-auto mt-4'>
									<label className='text-muted'>
										Additional Options 3 Price
									</label>
									<input
										type='number'
										className='form-control'
										onChange={handleChange32}
										value={option3_Price}
										placeholder='The price should be only a number'
									/>
								</div>

								<div className='form-group col-md-6 mx-auto mt-5'>
									<label className='text-muted'>Activate / Deactivate</label>
									<input
										type='checkbox'
										className='ml-2 mt-2'
										onChange={() => setOption3_Active(!option3_Active)}
										checked={option3_Active === true ? true : false}
									/>
								</div>

								<div className='form-group col-md-6 mx-auto mt-4'>
									<label className='text-muted'>Additional Options 4</label>
									<input
										type='text'
										className='form-control'
										onChange={handleChange25}
										value={option4}
										placeholder='Please add any additional options for this Ticket'
									/>
								</div>

								<div className='form-group col-md-6 mx-auto mt-4'>
									<label className='text-muted'>
										Additional Options 4 (Arabic)
									</label>
									<input
										type='text'
										className='form-control'
										onChange={handleChange29}
										value={option4_Arabic}
										placeholder='Please add any additional options for this Ticket In Arabic'
									/>
								</div>

								<div className='form-group col-md-6 mx-auto mt-4'>
									<label className='text-muted'>
										Additional Options 4 Price
									</label>
									<input
										type='number'
										className='form-control'
										onChange={handleChange33}
										value={option4_Price}
										placeholder='The price should be only a number'
									/>
								</div>

								<div className='form-group col-md-6 mx-auto mt-5'>
									<label className='text-muted'>Activate / Deactivate</label>
									<input
										type='checkbox'
										className='ml-2 mt-2'
										onChange={() => setOption4_Active(!option4_Active)}
										checked={option4_Active === true ? true : false}
									/>
								</div>
							</div>

							<div className='form-group col-md-10 mx-auto mt-1'>
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

							<div className='form-group col-md-10 mx-auto mt-1'>
								<label className='text-muted'>
									Package Description 1 (Arabic)
								</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange10_Arabic}
									value={serviceDescription_Arabic}
									required
									placeholder='Please add package Description'
								/>
							</div>

							<div className='form-group col-md-10 mx-auto mt-1'>
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

							<div className='form-group col-md-10 mx-auto mt-1'>
								<label className='text-muted'>
									Package Description 2 (Arabic)
								</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange11_Arabic}
									value={serviceDescription2_Arabic}
									required
									placeholder='Please add 2nd package Description'
								/>
							</div>

							<div className='form-group col-md-10 mx-auto mt-1'>
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

							<div className='form-group col-md-10 mx-auto mt-1'>
								<label className='text-muted'>
									Package Description 3 (Arabic)
								</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange12_Arabic}
									value={serviceDescription3_Arabic}
									required
									placeholder='Please add 3rd package Description'
								/>
							</div>

							<div className='form-group col-md-10 mx-auto mt-1'>
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

							<div className='form-group col-md-10 mx-auto mt-1'>
								<label className='text-muted'>
									Package Description 4 (Arabic)
								</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange13_Arabic}
									value={serviceDescription4_Arabic}
									required
									placeholder='Please add 4th package Description'
								/>
							</div>

							<div className='form-group col-md-10 mx-auto mt-1'>
								<label className='text-muted'>Package Description 5</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange14}
									value={serviceDescription5}
									placeholder='Please add package Description'
								/>
							</div>

							<div className='form-group col-md-10 mx-auto mt-1'>
								<label className='text-muted'>
									Package Description 5 (Arabic)
								</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange14_Arabic}
									value={serviceDescription5_Arabic}
									placeholder='Please add package Description'
								/>
							</div>

							<div className='form-group col-md-10 mx-auto mt-1'>
								<label className='text-muted'>Package Description 6</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange15}
									value={serviceDescription6}
									placeholder='Please add package Description'
								/>
							</div>

							<div className='form-group col-md-10 mx-auto mt-1'>
								<label className='text-muted'>
									Package Description 6 (Arabic)
								</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange15_Arabic}
									value={serviceDescription6_Arabic}
									placeholder='Please add 6th package Description'
								/>
							</div>

							<div className='form-group col-md-10 mx-auto mt-1'>
								<label className='text-muted'>Package Description 7</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange16}
									value={serviceDescription7}
									placeholder='Please add package description'
								/>
							</div>

							<div className='form-group col-md-10 mx-auto mt-1'>
								<label className='text-muted'>
									Package Description 7 (Arabic)
								</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange16_Arabic}
									value={serviceDescription7_Arabic}
									placeholder='Please add 7th package description'
								/>
							</div>

							<div className='form-group col-md-10 mx-auto mt-1'>
								<label className='text-muted'>Package Description 8</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange17}
									value={serviceDescription8}
									placeholder='Please add package description'
								/>
							</div>

							<div className='form-group col-md-10 mx-auto mt-1'>
								<label className='text-muted'>
									Package Description 8 (Arabic)
								</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange17_Arabic}
									value={serviceDescription8_Arabic}
									placeholder='Please add 8th package description'
								/>
							</div>

							<div className='form-group col-md-10 mx-auto mt-1'>
								<label className='text-muted'>Package Description 9</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange18}
									value={serviceDescription9}
									placeholder='Please add package description'
								/>
							</div>

							<div className='form-group col-md-10 mx-auto mt-1'>
								<label className='text-muted'>
									Package Description 9 (Arabic)
								</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange18_Arabic}
									value={serviceDescription9_Arabic}
									placeholder='Please add 9th package description'
								/>
							</div>

							<div className='form-group col-md-10 mx-auto mt-1'>
								<label className='text-muted'>Package Description 10</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange19}
									value={serviceDescription10}
									placeholder='Please add package description'
								/>
							</div>

							<div className='form-group col-md-10 mx-auto mt-1'>
								<label className='text-muted'>
									Package Description 10 (Arabic)
								</label>
								<input
									type='text'
									className='form-control'
									onChange={handleChange19_Arabic}
									value={serviceDescription10_Arabic}
									placeholder='Please add 10th package description'
								/>
							</div>

							<div className='form-group'>
								<label className='text-muted'>Active Service?</label>
								<select
									onChange={handleChange5}
									className='form-control'
									style={{ fontSize: "0.80rem" }}>
									<option>Please select / Required*</option>
									<option value='0'>Deactivate Package</option>
									<option value='1'>Activate Package</option>
								</select>
							</div>
							<button className='btn btn-outline-primary mb-3'>
								Submit Changes
							</button>
						</form>
					) : (
						<React.Fragment>
							<div
								style={{
									textAlign: "center",
									fontSize: "1.3rem",
									color: "blueviolet",
									marginTop: "8%",
									marginBottom: "12%",
									marginLeft: "100px",
								}}>
								Please Select a Package To Update.
							</div>
						</React.Fragment>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

export default UpdateTicket;
