/** @format */

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Wave2 from "../GeneralImgs/wave2.png";
// import Logo from "../imgs/Logo.jpg";
import Aos from "aos";
import "aos/dist/aos.css";

const Footer = () => {
	useEffect(() => {
		Aos.init({ duration: 2000 });
	}, []);
	const faceBookLink = () => {
		window.open("");
	};

	const instagramLink = () => {
		window.open("");
	};

	return (
		<FooterWrapper>
			<img src={Wave2} alt='Khan Khadija' className='footer-img' />
			<div className='container'>
				<div className='row'>
					<div className='col-md-3 footer-box mx-auto' data-aos='fade-up'>
						<p>Social Media</p>
						<i className='fab fa-facebook-f'></i>{" "}
						<span
							onClick={faceBookLink}
							style={{ cursor: "pointer", fontWeight: "bold" }}>
							Khan Khadija Resort Facebook
						</span>
						<br />
						<br />
						<i
							style={{ color: "red", fontSize: "15px", fontWeight: "bold" }}
							className='fab fa-instagram'></i>{" "}
						<span
							onClick={instagramLink}
							style={{ cursor: "pointer", fontWeight: "bold" }}>
							Khan Khadija Resort Instagram
						</span>
					</div>
					<div className='col-md-4 footer-box mx-auto' data-aos='fade-down'>
						<p>CONTACT US</p>
						<p>
							<i className='fa fa-map-marker'></i> Breaux Bridge, LA 70517
						</p>
						<p>
							<i className='fa fa-phone'></i> (909) 991-4386
						</p>
					</div>
					<div className='col-md-5 footer-box mx-auto' data-aos='fade-left'>
						<p>
							<b>Submit your phone and we will respond within minutes</b>
						</p>
						<input
							type='number'
							className='form-control'
							placeholder='Phone # (e.g. 9992225555)'
						/>
						<button
							type='button'
							className='btn btn-primary'
							onClick={() => {
								window.scrollTo({ top: 0, behavior: "smooth" });
							}}>
							<Link
								to='/book-now/khan-khadija-premium-plan'
								style={{ color: "white" }}>
								Submit
							</Link>
						</button>
					</div>
				</div>
				<hr />
				<p className='copyright'>
					&copy; {new Date().getFullYear()}
					<span> Khan Khadija Resort All rights reserved </span>
					{"    "}
				</p>
			</div>
		</FooterWrapper>
	);
};

export default Footer;

const FooterWrapper = styled.section`
	overflow: hidden !important;

	/* background-image: linear-gradient(to right, #4da6ff, #003467);
	 */
	/* background-image: linear-gradient(to right, #4da6ff, #0000ff); */

	background-image: linear-gradient(to right, #1e467d, #aec8ec);
	margin-top: 100px;

	color: #fff;

	.footer-img {
		width: 100%;
	}
	.footer-box {
		padding: 20px;
	}
	.footer-box img {
		width: 120px;
		margin-bottom: 20px;
	}
	.footer-box .fa {
		margin-right: 8px;
		font-size: 25px;
		height: 40px;
		width: 40px;
		text-align: center;
		padding-top: 7px;
		border-radius: 2px;
		background-image: linear-gradient(to right, #ff8f8c, #160100);
	}
	.footer-box .form-control {
		box-shadow: none !important;
		border: none;
		border-radius: 0;
		margin-top: 25px;
		max-width: 250px;
	}
	.footer-box .btn-primary {
		box-shadow: none !important;
		border: none;
		border-radius: 0;
		margin-top: 30px;
		background-image: linear-gradient(to right, #ff8f8c, #160100);
	}

	hr {
		background-color: #fff;
	}
	.copyright {
		margin-bottom: 0;
		padding-bottom: 20px;
		text-align: center;
		font-weight: bold;
	}
`;
