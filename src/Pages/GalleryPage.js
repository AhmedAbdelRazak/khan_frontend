/** @format */

// eslint-disable-next-line
import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { getGalleries } from "../admin/apiAdmin";

const GalleryPage = () => {
	const [galleries, setGalleries] = useState([]);

	const loadAllGalleries = () =>
		getGalleries().then((res) => setGalleries(res.data));

	useEffect(() => {
		loadAllGalleries();
	}, []);

	return (
		<GalleryPageWrapper>
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
										{/* <div className='imageTitle'>{image.title}</div> */}
									</div>
								)}
							</Fragment>
						);
					})}
			</div>
		</GalleryPageWrapper>
	);
};

export default GalleryPage;

const GalleryPageWrapper = styled.div`
	min-height: 700px;

	overflow: hidden !important;
	padding: 40px;

	.row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		/* grid-gap: 3em; */
		grid-row-gap: 4em;
		grid-column-gap: 1em;
		justify-items: center;
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

	.imageTitle {
		font-weight: bold;
		text-align: center;
		font-size: 1.2rem;

		/* margin: 15px 0px; */
	}

	.titleBookNow {
		text-align: center;
		font-size: 1.8rem !important;
		font-weight: bolder;
		letter-spacing: 2px;
		color: var(--mainBlue);
	}

	@media (max-width: 1000px) {
		.row {
			display: grid;
			grid-template-columns: repeat(1, 1fr);
			grid-row-gap: 4em;
			margin: auto;
			/* border: 1px solid red; */
			grid-auto-rows: minmax(60px, auto);
			/* justify-items: start; */
		}
	}
`;
