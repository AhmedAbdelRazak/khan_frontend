/** @format */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import { isAuthenticated, getSingleUser } from "../../auth/index";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getHomes } from "../../apiCore";

const HeroComponent_Arabic = () => {
	const [homePage, setHomePage] = useState({});

	const gettingAllHomes = () => {
		getHomes().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setHomePage(data[data.length - 1]);
			}
		});
	};

	useEffect(() => {
		gettingAllHomes();
		localStorage.removeItem("Cleared");
		// eslint-disable-next-line
	}, []);

	const settingsHero = {
		dots: true,
		infinite: true,
		autoplay: true,
		arrows: true,
		speed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplaySpeed: 4000,
		pauseOnHover: true,
		adaptiveHeight: true,
	};

	return (
		<HeroComponentWrapper className='mx-auto text-center'>
			<Slider {...settingsHero}>
				{homePage && homePage.thumbnail && homePage.thumbnail[0] && (
					<div className='heroPicMain'>
						<Link to={homePage.hyper_link ? homePage.hyper_link : "/"}>
							<img
								src={
									homePage &&
									homePage.thumbnail &&
									homePage.thumbnail[0] &&
									homePage.thumbnail[0].url
								}
								alt='ShopPhoto'
								className='mt-1'
							/>
						</Link>
					</div>
				)}

				{homePage && homePage.thumbnail2 && homePage.thumbnail2[0] && (
					<div className='heroPicMain'>
						<Link to={homePage.hyper_link2 ? homePage.hyper_link2 : "/"}>
							<img
								src={
									homePage &&
									homePage.thumbnail2 &&
									homePage.thumbnail2[0] &&
									homePage.thumbnail2[0].url
								}
								alt='ShopPhoto'
								className='mt-3'
							/>
						</Link>
					</div>
				)}

				{homePage && homePage.thumbnail3 && homePage.thumbnail3[0] && (
					<div className='heroPicMain'>
						<Link to={homePage.hyper_link3 ? homePage.hyper_link3 : "/"}>
							<img
								src={
									homePage &&
									homePage.thumbnail3 &&
									homePage.thumbnail3[0] &&
									homePage.thumbnail3[0].url
								}
								alt='ShopPhoto'
								className='mt-3'
							/>
						</Link>
					</div>
				)}
			</Slider>
		</HeroComponentWrapper>
	);
};

export default HeroComponent_Arabic;

const HeroComponentWrapper = styled.div`
	text-align: center;
	background-image: linear-gradient(white, white);
	margin-top: 20px;

	.heroPicMain {
		height: 100%;
		width: 100%;
		opacity: 1;
		text-align: center;
		/* border-radius: 5%; */
	}

	.heroPicMain img {
		height: 55vh;
		width: 100%;
		opacity: 1;
		text-align: center;
		object-fit: cover;
		/* border-radius: 5%; */
	}

	.slick-arrow {
		/* background-color: black; */
	}

	.slick-next {
		position: absolute !important;
		right: 1.2%;
		color: white !important;
	}

	.slick-prev {
		position: absolute !important;
		left: 0.5%;
		z-index: 200;
	}

	.slick-prev:before,
	.slick-next:before {
		font-family: "slick";
		font-size: 25px;
		line-height: 1;
		opacity: 0.75;
		color: grey;
		/* background-color: black; */
		padding-top: 5px !important;
		padding-bottom: 2px !important;
		padding-right: 3px;
		padding-left: 3px;
		border-radius: 10px;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.slick-dots li button:before {
		font-size: 15px;
		margin-top: 10px;
	}

	@media (max-width: 1000px) {
		.heroPicMain {
			height: 100%;
			width: 110vw;
			opacity: 1;
			align: center;
			/* border-radius: 5%; */
		}

		.heroPicMain img {
			width: 100%; /* width of container */
			height: 300px; /* height of container */
			object-fit: cover;
			/* border: 5px solid black; */
			margin-right: 500px;
			border-radius: 3%;
		}

		.slick-next {
			right: 5% !important;
		}

		.slick-prev {
			left: 2%;
		}

		.slick-dots li button:before {
			font-size: 10px;
		}

		.slick-prev:before,
		.slick-next:before {
			font-family: "slick";
			font-size: 20px;
			line-height: 1;
			opacity: 0.75;
			color: white;
			background-color: black;
			padding-top: 3px !important;
			padding-bottom: 2px !important;
			padding-right: 3px;
			padding-left: 3px;
			border-radius: 10px;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			display: none;
		}
	}
`;
