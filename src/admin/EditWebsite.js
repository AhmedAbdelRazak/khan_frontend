/** @format */

import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import EditAboutUsPage from "./EditAboutUsPage";
import EditHomePage from "./EditHomePage";
import Adminsidebar from "./AdminSideBar/Adminsidebar";
import DarkBG from "./AdminSideBar/DarkBG";
import EditContactUsPage from "./EditContactUsPage";

const isActive = (history, path) => {
	if (history.location.pathname === path) {
		return {
			// color: "white !important",
			background: "#2b0612",
			fontWeight: "bold",
			// textDecoration: "underline",
		};
	} else {
		return { color: "black", fontWeight: "bold" };
	}
};

const EditWebsite = ({ history, match }) => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);

	useEffect(() => {
		setClickMenu2(click2);
	}, [click2, clickMenu2]);

	const [selectedLink, setSelectedLink] = useState(match.params.pageedit);

	return (
		<Fragment>
			{click2 && clickMenu2 ? (
				<DarkBG setClick2={setClick2} setClickMenu2={setClickMenu2} />
			) : null}
			<div className='mx-auto'>
				<Adminsidebar
					click2={click2}
					setClick2={setClick2}
					clickMenu2={clickMenu2}
					setClickMenu2={setClickMenu2}
				/>
			</div>

			<EditWebsiteWrapper className='col-md-10 mx-auto'>
				<div className='row'>
					<div className='col-md-3'>
						<ul className='mt-4'>
							<hr />
							<li>
								<Link
									data-aos='fade-down'
									style={isActive(history, `/admin/website-edit/aboutus-edit`)}
									to={`/admin/website-edit/aboutus-edit`}
									onClick={() => {
										setSelectedLink("aboutus-edit");
									}}>
									Edit About Us Page
								</Link>
							</li>
							<hr />

							<li>
								<Link
									data-aos='fade-down'
									style={isActive(
										history,
										`/admin/website-edit/contactus-edit`,
									)}
									to={`/admin/website-edit/contactus-edit`}
									onClick={() => {
										setSelectedLink("contactus-edit");
									}}>
									Edit Contact Us Page
								</Link>
							</li>
							<hr />

							<li>
								<Link
									data-aos='fade-down'
									style={isActive(history, `/admin/website-edit/home-edit`)}
									to={`/admin/website-edit/home-edit`}
									onClick={() => {
										setSelectedLink("home-edit");
									}}>
									Edit Home Page
								</Link>
							</li>
							<hr />
						</ul>
					</div>
					<div className='col-md-8 mx-auto'>
						{selectedLink === "aboutus-edit" && (
							<div>
								<EditAboutUsPage />
							</div>
						)}

						{selectedLink === "logo-edit" && (
							<div>
								<EditAboutUsPage />
							</div>
						)}

						{selectedLink === "contactus-edit" && (
							<div>
								<EditContactUsPage />
							</div>
						)}
						{selectedLink === "home-edit" && (
							<div>
								<EditHomePage />
							</div>
						)}
					</div>
				</div>
			</EditWebsiteWrapper>
		</Fragment>
	);
};

export default EditWebsite;

const EditWebsiteWrapper = styled.div`
	margin-bottom: 300px;
	margin-top: 50px;
	ul {
		list-style-type: none;
		padding: 0 !important;
	}

	li a {
		font-weight: bold;
		color: white;
		padding: 2px;
		border-radius: 4px;
	}
`;
