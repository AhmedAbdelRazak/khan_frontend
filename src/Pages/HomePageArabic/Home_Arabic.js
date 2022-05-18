/** @format */

import React, { useEffect } from "react";
import styled from "styled-components";
import KhanMap from "../HomePage/KhanMap";
import PowerBySnippet from "../PowerBySnippet";
import BookNowGeneralArabic from "./BookNowGeneral_Arabic";
import HeroComponentArabic from "./HeroComponent_Arabic";
import KhanGalleryArabic from "./KhanGallery_Arabic";
import OurTicketsArabic from "./OurTickets_Arabic";

const Home_Arabic = ({ language }) => {
	useEffect(() => {
		if (window !== "undefined") {
			localStorage.removeItem("reservationData");
		}
	});

	console.log(language, "from home page arabic");
	return (
		<HomePageWrapper>
			<span className='deskTopHero'>
				<HeroComponentArabic language={language} />
			</span>

			<BookNowGeneralArabic language={language} />
			<div className='col-md-10 mx-auto mt-3'>
				<br />
				<hr />
			</div>
			<div className='mt-2'>
				<OurTicketsArabic language={language} />
			</div>
			<div className='col-md-10 mx-auto mt-3'>
				<hr />
			</div>

			<span className='khanGalleryStyling'>
				<KhanGalleryArabic />
			</span>

			<span className=''>
				<KhanMap />
			</span>

			<PowerBySnippet />
			<span className='phoneBottomHero'>
				<HeroComponentArabic language={language} />
			</span>
		</HomePageWrapper>
	);
};

export default Home_Arabic;

const HomePageWrapper = styled.div`
	.phoneBottomHero {
		display: none;
	}

	.khanGalleryStyling {
		display: none;
	}

	@media (max-width: 900px) {
		.deskTopHero {
			display: none;
		}

		.phoneBottomHero {
			display: block;
		}

		.phoneBottomHero {
			display: none;
		}

		.khanGalleryStyling {
			display: block;
		}
	}
`;
