/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getTickets } from "../../apiCore";
import Aos from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";

const OurTickets_Arabic = ({ language }) => {
	const [allTickets, setAllTickets] = useState([]);
	const [ticketsWithOffers, setTicketsWithOffers] = useState([]);

	const gettingAllTickets = () => {
		getTickets().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllTickets(data.filter((i) => i.activeService === true));
				setTicketsWithOffers(
					data.filter(
						(i) =>
							(i.servicePriceDiscount !== i.servicePrice ||
								i.servicePriceDiscount_Children !== i.servicePrice_Children) &&
							i.activeService === true,
					),
				);
			}
		});
	};

	useEffect(() => {
		gettingAllTickets();
	}, []);

	useEffect(() => {
		Aos.init({ duration: 2000 });
	}, []);

	// const clickBooking = () => {
	// 	window.location.replace(`${process.env.REACT_APP_MAIN_URL}/book-now`);
	// };

	const settings = {
		dots: true,
		infinite: true,
		autoplay: true,
		arrows: true,
		speed: 1000,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplaySpeed: 5000,
		pauseOnHover: true,
		adaptiveHeight: true,

		responsive: [
			{
				breakpoint: 1200,
				settings: {
					dots: true,
					infinite: true,
					autoplay: true,
					arrows: true,
					speed: 1000,
					slidesToShow: 2,
					slidesToScroll: 1,
					autoplaySpeed: 5000,
					pauseOnHover: true,
					adaptiveHeight: true,
				},
			},
		],
	};

	const settings2 = {
		dots: true,
		infinite: true,
		// autoplay: true,
		arrows: true,
		speed: 1000,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplaySpeed: 5000,
		pauseOnHover: true,
		adaptiveHeight: true,

		responsive: [
			{
				breakpoint: 1200,
				settings: {
					dots: false,
					infinite: true,
					// autoplay: true,
					arrows: true,
					speed: 1000,
					slidesToShow:
						ticketsWithOffers && ticketsWithOffers.length <= 2 ? 1 : 2,
					slidesToScroll: 1,
					autoplaySpeed: 5000,
					pauseOnHover: true,
					adaptiveHeight: true,
				},
			},
		],
	};

	return (
		<OurTicketsWrapper>
			<div className='secSection'>
				<h1 dir='rtl' data-aos='fade-up'>
					خان خديجة | تذاكرنا
				</h1>
				{/* <div className='col-md-4 mx-auto'>
					<br />
					<div className='horizLine'></div>
				</div> */}
				{/* <p data-aos='fade-right'>
					تشمل جميع الباقات مرافق بدوام كامل ، ودعائم ممتعة للغاية ، وإعداد و
					انهيار الكابينة ، تجربة مخصصة للجميع ، الرسائل القصيرة / الرسائل
					النصية والبريد الإلكتروني والوسائط الاجتماعية لمشاركة صورك وصورك
					المرشحات وصور GIF والرسوم المتحركة المثيرة ومعرض الصور عبر الإنترنت
					وتجربة لا تنسى!
				</p> */}
				<div className='cardsWrapper'>
					<div className='container-fluid p-5'>
						<div className='row'>
							{allTickets &&
								allTickets.map((s, i) => {
									return (
										<div
											key={i}
											className='col-md-3 mx-auto my-2 '
											data-aos='fade-down'>
											<div
												dir='rtl'
												className='card'
												style={{
													borderRadius: "0% 0%",
													backgroundColor: "var(--superBabyBlue)",
												}}>
												<div className='card-body  '>
													<div className='card-img-top center img text-center responsiveimage'>
														<Link
															to={`/book-now/${s.serviceName
																.split(" ")
																.join("-")}`}
															onClick={() => {
																window.scrollTo({ top: 0, behavior: "smooth" });
															}}>
															<img
																alt={s.serviceName}
																src={s.thumbnail[0].url}
																style={{
																	height: "300px",
																	width: "300px",
																	borderRadius: "30px",
																	objectFit: "cover",
																}}
															/>
														</Link>
													</div>
													<div
														className='mt-2 mb-3'
														style={{
															fontSize: "20px",
															fontWeight: "bold",
															textAlign: "center",
															textTransform: "capitalize",
															color: "var(--mainBlue)",
														}}>
														التذكرة: {s.serviceName_Arabic}
													</div>
													{s.servicePrice === s.servicePriceDiscount ? (
														<div
															className='mb-2'
															style={{
																fontSize: "17px",
																fontWeight: "bold",
																textAlign: "center",
																textTransform: "capitalize",
															}}>
															سعر التذكرة (الكبار): {s.servicePriceDiscount}{" "}
															جنيه
														</div>
													) : (
														<div
															className='mb-2'
															style={{
																fontSize: "17px",
																fontWeight: "bold",
																textAlign: "center",
																textTransform: "capitalize",
															}}>
															سعر التذكرة (الكبار):{" "}
															<s style={{ color: "red" }}>
																{" "}
																{s.servicePrice} جنيه
															</s>{" "}
															<span className='ml-1'>
																{" "}
																{s.servicePriceDiscount} جنيه
															</span>
														</div>
													)}

													{s.servicePrice_Children ===
													s.servicePriceDiscount_Children ? (
														<div
															className='mb-2'
															style={{
																fontSize: "17px",
																fontWeight: "bold",
																textAlign: "center",
																textTransform: "capitalize",
															}}>
															سعر التذكرة (للأطفال):{" "}
															{s.servicePriceDiscount_Children} جنيه
														</div>
													) : (
														<div
															className='mb-2'
															style={{
																fontSize: "17px",
																fontWeight: "bold",
																textAlign: "center",
																textTransform: "capitalize",
															}}>
															سعر التذكرة (للأطفال):{" "}
															<s style={{ color: "red" }}>
																{" "}
																{s.servicePrice_Children} جنيه
															</s>{" "}
															<span className='ml-1'>
																{" "}
																{s.servicePriceDiscount_Children} جنيه
															</span>
														</div>
													)}
													<br />

													<ul style={{ textTransform: "capitalize" }}>
														<li>{s.serviceDescription_Arabic}</li>
														<div className='col-md-10'>
															<hr />
														</div>
														<li>
															{s.serviceDescription2_Arabic &&
																s.serviceDescription2_Arabic}
														</li>
														<div className='col-md-10'>
															<hr />
														</div>
														<li>
															{s.serviceDescription3_Arabic &&
																s.serviceDescription3_Arabic}
														</li>
														<div className='col-md-10'>
															<hr />
														</div>
														<li>
															{s.serviceDescription4_Arabic &&
																s.serviceDescription4_Arabic}
														</li>
														<div className='col-md-10'>
															<hr />
														</div>
														{s.serviceDescription5 !== "Not Added" &&
														s.serviceDescription5 !== "not added" &&
														s.serviceDescription5 !== "" ? (
															<React.Fragment>
																<li>
																	{s.serviceDescription5_Arabic &&
																		s.serviceDescription5_Arabic}
																</li>
																<div className='col-md-10'>
																	<hr />
																</div>
															</React.Fragment>
														) : null}

														{s.serviceDescription6 !== "Not Added" &&
														s.serviceDescription6 !== "not added" &&
														s.serviceDescription6 !== "" ? (
															<React.Fragment>
																<li>
																	{s.serviceDescription6_Arabic &&
																		s.serviceDescription6_Arabic}
																</li>
																<div className='col-md-10'>
																	<hr />
																</div>
															</React.Fragment>
														) : null}

														{s.serviceDescription7 !== "Not Added" &&
														s.serviceDescription7 !== "not added" &&
														s.serviceDescription7 !== "" ? (
															<React.Fragment>
																<li>
																	{s.serviceDescription7_Arabic &&
																		s.serviceDescription7_Arabic}
																</li>
																<div className='col-md-10'>
																	<hr />
																</div>
															</React.Fragment>
														) : null}

														{s.serviceDescription8 !== "Not Added" &&
														s.serviceDescription8 !== "not added" &&
														s.serviceDescription8 !== "" ? (
															<React.Fragment>
																<li>
																	{s.serviceDescription8_Arabic &&
																		s.serviceDescription8_Arabic}
																</li>
																<div className='col-md-10'>
																	<hr />
																</div>
															</React.Fragment>
														) : null}

														{s.serviceDescription9 !== "Not Added" &&
														s.serviceDescription9 !== "not added" &&
														s.serviceDescription9 !== "" ? (
															<React.Fragment>
																<li>
																	{s.serviceDescription9_Arabic &&
																		s.serviceDescription9_Arabic}
																</li>
																<div className='col-md-10'>
																	<hr />
																</div>
															</React.Fragment>
														) : null}

														{s.serviceDescription10 !== "Not Added" &&
														s.serviceDescription10 !== "not added" &&
														s.serviceDescription10 !== "" ? (
															<React.Fragment>
																<li>
																	{s.serviceDescription10_Arabic &&
																		s.serviceDescription10_Arabic}
																</li>
																<div className='col-md-10'>
																	<hr />
																</div>
															</React.Fragment>
														) : null}
													</ul>
												</div>
												<div className='col-md-9 mx-auto w-75'>
													<Link
														to={`/book-now/${s.serviceName
															.split(" ")
															.join("-")}`}
														className='btn btn-primary btn-block my-5 text-center '>
														احجز الآن!
													</Link>
												</div>
											</div>
										</div>
									);
								})}
						</div>
					</div>
				</div>
			</div>

			<div className='ticketsPhoneView'>
				<h1
					//  data-aos='fade-up'
					className='titleBookNow'>
					تذاكر الخان
				</h1>
				<div className='container-fluid my-3 ProductSlider'>
					<Slider {...settings} className='mb-5'>
						{allTickets &&
							allTickets.map((t, i) => (
								<div className='img-fluid images' key={i}>
									<Link
										to={`/ticket/${t.serviceName.split(" ").join("-")}`}
										onClick={() => {
											window.scrollTo({ top: 0, behavior: "smooth" });
										}}>
										<img alt={t.serviceName} src={t.thumbnail[0].url} />
									</Link>
								</div>
							))}
					</Slider>
				</div>
			</div>

			{ticketsWithOffers && ticketsWithOffers.length > 0 ? (
				<div className='ticketsPhoneView'>
					<h1
						// data-aos='fade-up'
						className='titleBookNow2'>
						عروض الخان
					</h1>
					<div className='container-fluid my-3 ProductSlider'>
						<Slider {...settings2} className='mb-5'>
							{ticketsWithOffers &&
								ticketsWithOffers.map((t, i) => {
									return (
										<div className='img-fluid images' key={i}>
											<Link
												to={`/ticket/${t.serviceName.split(" ").join("-")}`}
												onClick={() => {
													window.scrollTo({ top: 0, behavior: "smooth" });
												}}>
												<img
													className='imageOffers'
													alt={t.serviceName}
													src={t.thumbnail[1].url}
												/>
											</Link>
										</div>
									);
								})}
						</Slider>
					</div>
				</div>
			) : null}
		</OurTicketsWrapper>
	);
};

export default OurTickets_Arabic;

const OurTicketsWrapper = styled.div`
	font-family: "Droid Arabic Kufi";
	overflow: hidden !important;

	.titleBookNow {
		text-align: center;
		font-size: 1.3rem !important;
		font-weight: bolder;
		/* letter-spacing: 2px; */
		color: var(--mainBlue);
	}

	.titleBookNow2 {
		text-align: center;
		font-size: 1.3rem !important;
		font-weight: bolder;
		/* letter-spacing: 2px; */
		color: var(--orangePrimary);
		float: right;
		margin-right: 20px;
		font-weight: bolder;
	}

	.secSection h1 {
		font-size: 2rem;
		text-align: center;
		margin-top: 3px;
		font-weight: bold;
		/* letter-spacing: 3px; */
		overflow: hidden !important;
	}

	.secSection .horizLine {
		border-bottom: #2f2727 solid 5px;
	}

	.secSection p {
		margin: 20px 300px !important;
		line-height: 2;
	}

	.container-fluid {
		/* border: solid red 3px; */
		/* border-radius: 15% 2%; */
		/* background-color: black; */
		/* background-image: linear-gradient(to left, #272100, #000000); */
		/* box-shadow: 5px 5px 7px 7px rgba(0, 0, 0, 0.3); */
		overflow: hidden !important;
	}

	.secSection ul {
		list-style: none;
	}

	.secSection ul li:before {
		content: "✓";
		color: green;
		font-weight: bold;
		margin-right: 10px;
		font-size: 22px;
	}

	.card {
		margin: 30px 20px;
	}

	.card-body {
		height: 1200px;
	}

	.cardsWrapper {
		margin: 10px 50px;
	}

	.ticketsPhoneView {
		display: none;
	}

	.ProductSlider {
		padding: 0px 100px 0px 100px;
	}

	ul,
	li {
		text-align: right;
	}

	@media (max-width: 1400px) {
		.ProductSlider {
			padding: 0px;
		}
	}

	@media (max-width: 1600px) {
		.secSection p {
			margin: 20px 20px !important;
			/* font-weight: bold; */
		}

		.responsiveimage img {
			height: 230px !important;
			width: 230px !important;
		}

		.secSection h1 {
			font-size: 1.5rem;
		}

		.card {
			margin: 0px 0px !important;
		}

		.card-body {
			height: auto;
			padding: 0 !important;
		}
		.cardsWrapper {
			margin: 5px 10px;
		}

		.container-fluid {
			border-radius: 8% 2%;
			padding: 20px !important;
		}
		.ProductSlider {
			padding: 0px 10px 0px 10px;
		}
	}

	@media (max-width: 900px) {
		.secSection {
			display: none;
		}

		.ticketsPhoneView {
			display: block;
		}

		img {
			border-radius: 10px;
			width: 180px;
			height: 180px;
			object-fit: cover;
		}

		.imageOffers {
			border-radius: 10px !important;
			width: 180px !important;
			height: 90px !important;
			object-fit: cover;
			border: 2px var(--orangePrimary) solid;
			box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.05);
		}

		.slick-slide {
			margin: 0px 8px;
		}
	}

	@media (max-width: 380px) {
		img {
			border-radius: 10px;
			width: 160px;
			height: 160px;
			object-fit: cover;
		}

		.slick-dots {
			/* display: none !important; */
			text-align: center;
		}
	}
`;
