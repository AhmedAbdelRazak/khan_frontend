/** @format */

import React from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const PackagePhotos2 = ({ serviceDetails }) => {
	return (
		<PackagePhotosWrapper>
			<div className='text-center col-md-6 mx-auto'>
				{serviceDetails && serviceDetails.thumbnail && (
					<Carousel
						autoPlay
						infiniteLoop
						interval={3000}
						showStatus={false}
						dynamicHeight={true}
						showThumbs={true}
						thumbWidth={100}
						width={"100%"}
						autoFocus={true}>
						{serviceDetails.thumbnail.map((i) => (
							<img
								alt={serviceDetails.serviceName}
								src={i.url}
								key={i.public_id}
								style={{ borderRadius: "15px" }}
							/>
						))}
					</Carousel>
				)}
			</div>
		</PackagePhotosWrapper>
	);
};

export default PackagePhotos2;

const PackagePhotosWrapper = styled.div`
	margin-bottom: 40px;
	margin-top: 5px;
	text-align: center;
	.carousel-root {
		/* border: 2px solid grey; */
		border-radius: 10px;
		object-fit: cover;
		box-shadow: 3px 2px 3px 2px rgba(0, 0, 0, 0.1);
		text-align: center;
	}
	/* .control-dots li {
		background-color: black !important;
	} */

	/* .slider img {
		width: 50%;
		height: 50%;
	} */

	.slider img {
		width: 70%;
		height: 70%;
		object-fit: cover !important;
	}

	.thumb img {
		height: 50px !important;
		object-fit: cover !important;
	}

	@media (max-width: 1200px) {
		.slider img {
			width: 100%;
			height: 100%;
			object-fit: cover !important;
		}
	}
`;
