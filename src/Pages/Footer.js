/** @format */

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import Wave2 from "../GeneralImgs/wave2.png";
// import Logo from "../imgs/Logo.jpg";
import Aos from "aos";
import "aos/dist/aos.css";

const Footer = () => {
	useEffect(() => {
		Aos.init({ duration: 500 });
	}, []);
	const faceBookLink = () => {
		window.open("https://m.facebook.com/khadija.resort/");
	};

	const instagramLink = () => {
		window.open("https://m.facebook.com/khadija.resort/");
	};

	return (
		<FooterWrapper>
			{/* <img src={Wave2} alt='Khan Khadija' className='footer-img' /> */}
			<div className='container'>
				<div className='row'>
					<div className='col-md-3 footer-box mx-auto' data-aos='fade-left'>
						<p style={{ fontWeight: "bold" }}>Social Media</p>
						<i
							style={{ color: "var(--orangePrimary)" }}
							className='fab fa-facebook-f'></i>{" "}
						<span
							className='mt-5 ml-3'
							onClick={faceBookLink}
							style={{ cursor: "pointer" }}>
							Khan Khadija Resort Facebook
						</span>
						<br />
						<br />
						<i
							style={{
								color: "var(--orangePrimary)",
								fontSize: "15px",
								fontWeight: "bold",
							}}
							className='fab fa-instagram'></i>{" "}
						<span
							className='mt-3 ml-3'
							onClick={instagramLink}
							style={{ cursor: "pointer" }}>
							Khan Khadija Resort Instagram
						</span>
					</div>
					<div className='col-md-4 footer-box mx-auto' data-aos='fade-left'>
						<p style={{ fontWeight: "bold" }}>CONTACT US</p>
						<p>
							<i className='fa fa-map-marker'></i> <br />
							<span dir='rtl'>
								بترو بلاست للصناعات البلاستیكیة، طريق البتروكيماويات طريق
								الاسكندرية القاهرة الصحراوى
							</span>
						</p>
						<p>
							<i className='fa fa-phone'></i> <br /> +201211492941
						</p>
					</div>
					<div className='mx-auto'>
						<div className='col-md-5 footer-box mx-auto' data-aos='fade-left'>
							<p>
								<b>Submit your phone and we will respond within minutes</b>
							</p>
							<input
								type='number'
								className='form-control mx-auto'
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
									style={{ color: "var(--mainBlue)" }}>
									Submit
								</Link>
							</button>
						</div>
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

	text-align: center !important;

	/* background-image: linear-gradient(to right, #4da6ff, #003467);
	 */
	/* background-image: linear-gradient(to right, #4da6ff, #0000ff); */

	background-image: linear-gradient(to right, var(--mainBlue), var(--mainBlue));
	margin-top: 20px;

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
		font-size: 15px;
		height: 40px;
		width: 40px;
		text-align: center;
		padding-top: 7px;
		border-radius: 2px;
		color: var(--orangePrimary);
		/* background-image: linear-gradient(to right, #ff8f8c, #160100); */
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
		/* background-image: linear-gradient(to right, #ff8f8c, #160100); */
		background: var(--orangePrimary);
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

	input {
		text-align: center;
	}
`;
