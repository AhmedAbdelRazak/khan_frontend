/** @format */

import React, { useEffect } from "react";
import styled from "styled-components";
// import { Link } from "react-router-dom";

const SuccessfullyPaid = () => {
	useEffect(() => {
		localStorage.removeItem("pickedServiceFirstAvailable");
		localStorage.removeItem("CustomerType");
		localStorage.removeItem("chosenDateFromFirstAvailable");
		localStorage.removeItem("barber");
		localStorage.removeItem("chosenStylistId_Store");
	}, []);
	return (
		<SchedulePage>
			<div
				style={{
					fontSize: "2rem",
					textAlign: "center",
					marginTop: "30px",
					fontWeight: "bold",
					letterSpacing: "2px",
					color: "#000034",
				}}>
				Thank you for choosing Khan Khadija Resort!
			</div>
			<div
				className='mt-3'
				style={{
					fontSize: "1.5rem",
					textAlign: "center",
					fontWeight: "bold",
					color: "#670000",
				}}>
				Your ticket was successfully reserved.
			</div>
		</SchedulePage>
	);
};

export default SuccessfullyPaid;

const SchedulePage = styled.div`
	background-color: #c0c0c0;
	margin-bottom: 500px;
	padding: 100px 0px;

	.continueShoppingEmpty {
		font-weight: bold;
		font-size: 1.1rem;
		border: 1px solid white;
		color: white;
		box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
		background-color: #350000;
		border-radius: 20px;
		padding: 10px;
		transition: var(--mainTransition);
		text-decoration: none;
		width: 40%;
		text-align: center;
	}

	.continueShoppingEmpty:hover {
		cursor: pointer;
		padding: 12px;
		transition: var(--mainTransition);
		background-color: #ffcdcd;
		color: black;
		text-decoration: none;
	}

	.continueShoppingEmpty2 {
		font-weight: bold;
		font-size: 0.95rem;
		border: 1px solid white;
		color: white;
		box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
		background-color: black;
		border-radius: 20px;
		padding: 10px;
		transition: var(--mainTransition);
		text-decoration: none;
		width: 35%;
		text-align: center;
	}

	.continueShoppingEmpty2:hover {
		cursor: pointer;
		padding: 12px;
		transition: var(--mainTransition);
		background-color: #ffcdcd;
		color: black;
		text-decoration: none;
	}

	@media (max-width: 1000px) {
		.continueShopping {
			margin-left: 89px;
			width: 55%;
			font-size: 1rem;
			text-align: center;
		}
		.itemsLength {
			font-size: 1.1rem;
		}
		.continueShoppingEmpty {
			width: 65%;
			text-align: center;
			font-size: 0.95rem;
		}
		.continueShoppingEmpty2 {
			width: 55%;
			text-align: center;
			font-size: 0.85rem;
		}
	}
`;
