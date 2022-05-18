/** @format */

// eslint-disable-next-line
import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css";
import { getGalleries } from "../../admin/apiAdmin";

const KhanGallery = () => {
	const [galleries, setGalleries] = useState([]);

	const loadAllGalleries = () =>
		getGalleries().then((res) => setGalleries(res.data));

	useEffect(() => {
		Aos.init({ duration: 2000 });
	}, []);

	// eslint-disable-next-line
	var requiredArraySmall = [
		0, 3, 4, 7, 8, 11, 12, 15, 16, 19, 20, 23, 24, 27, 28, 31,
	];

	// eslint-disable-next-line
	var requiredArrayLarge = [
		1, 2, 5, 6, 9, 10, 13, 14, 17, 18, 21, 22, 25, 26, 29, 30,
	];

	useEffect(() => {
		loadAllGalleries();
	}, []);
	return (
		<KhanGalleryWrapper>
			<h1
				// data-aos='fade-up'
				className='titleBookNow'>
				Khan Gallery
			</h1>
			<div
				className='row'
				// style={{ border: "2px red solid" }}
			>
				{galleries &&
					galleries.map((image, i) => {
						return (
							<Fragment key={i}>
								{i > 8 ? null : (
									<div
										className={`mainImagediv${i} mainImagediv`}
										// style={{ border: "solid red 1px" }}
									>
										<img
											className='image1 '
											src={image.thumbnail[0].url}
											alt={image.title}
										/>
										<div className='imageTitle'>{image.title}</div>
									</div>
								)}
							</Fragment>
						);
					})}
			</div>
		</KhanGalleryWrapper>
	);
};

export default KhanGallery;

const KhanGalleryWrapper = styled.div`
	overflow: hidden !important;
	padding: 20px;

	.row {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 2em;
		margin: auto;
		/* border: 1px solid red; */
		grid-auto-rows: minmax(60px, auto);
		/* justify-items: start; */
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 12px;
	}

	.mainImagediv0 {
		grid-row: 1/3;
	}

	.mainImagediv2 {
		grid-row: 2/4;
	}

	.mainImagediv4 {
		grid-row: 4/7;
	}

	.mainImagediv6 {
		grid-row: 5/8;
	}

	.imageTitle {
		font-weight: bold;
		text-align: center;
		/* margin: 15px 0px; */
	}

	.titleBookNow {
		text-align: center;
		font-size: 1.3rem !important;
		font-weight: bolder;
		letter-spacing: 2px;
		color: var(--mainBlue);
	}
`;
