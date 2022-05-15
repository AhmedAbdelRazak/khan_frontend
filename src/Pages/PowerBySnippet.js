/** @format */

import React from "react";
import styled from "styled-components";
import SemiColonLogo from "../GeneralImgs/SemiColonLogo.png";

const PowerBySnippet = () => {
	const storeLogo =
		"https://res.cloudinary.com/infiniteapps/image/upload/v1640714861/KuwaitDemo/1640714860747.png";
	var index = storeLogo.indexOf("upload");

	var finalLogoUrl =
		storeLogo.substr(0, index + 6) +
		"/e_bgremoval" +
		storeLogo.substr(index + 6);

	const infiniteAppsWebsite = () => {
		window.open("https://infinite-apps.com");
	};

	return (
		<PowerBySnippetWrapper>
			<h1>Powered By Infinite-Apps & Semi Colon</h1>
			<h3>The Right Choice To Develop Your Web App!</h3>
			<div
				className='mx-auto'
				style={{ textAlign: "center" }}
				onClick={infiniteAppsWebsite}>
				<img src={finalLogoUrl} alt='Infinite-Apps' className='imgLogo' />
				<br />
				<img src={SemiColonLogo} alt='Infinite-Apps' className='imgLogo2' />
			</div>
		</PowerBySnippetWrapper>
	);
};

export default PowerBySnippet;

const PowerBySnippetWrapper = styled.div`
	margin: 20px 0px;
	text-align: center;
	/* border: 2px solid red; */
	padding: 40px 0px;
	background: var(--superBabyBlue);
	box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);

	.imgLogo {
		width: 12%;
		text-align: center;
		margin-top: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
		cursor: pointer;
		/* border-radius: 80px 0px; */
	}

	.imgLogo2 {
		width: 7%;
		text-align: center;
		margin-top: 0px;
		margin-bottom: 0px;
		margin-left: 0px;
		cursor: pointer;

		/* border-radius: 80px 0px; */
	}

	h1 {
		font-size: 1.6rem;
	}

	h3 {
		font-size: 1.2rem;
	}

	@media (max-width: 1000px) {
		h1 {
			font-size: 1.2rem;
		}

		h3 {
			font-size: 0.9rem;
		}

		.imgLogo {
			width: 50%;
			text-align: center;
			margin-top: 0px;
			margin-bottom: 0px;
			margin-left: 0px;
			cursor: pointer;
			/* border-radius: 80px 0px; */
		}

		.imgLogo2 {
			width: 30%;
			text-align: center;
			margin-top: 0px;
			margin-bottom: 0px;
			margin-left: 0px;
			cursor: pointer;

			/* border-radius: 80px 0px; */
		}
	}
`;
