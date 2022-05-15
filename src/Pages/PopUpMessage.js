/** @format */

import React from "react";
import { Modal } from "antd";
import styled from "styled-components";
import "antd/dist/antd.min.css";

const PopUpMessage = ({ modalVisible2, setModalVisible2 }) => {
	return (
		<PopUpMessageWrapper>
			<Modal
				width='85%'
				title={
					<div
						style={{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: "1.6rem",
						}}>{`Khan Khadija Resort`}</div>
				}
				visible={modalVisible2}
				onOk={() => {
					setModalVisible2(false);
					localStorage.setItem(
						"modalHistoricallyVisible",
						JSON.stringify(modalVisible2),
					);
					// toast.success(`Thank you for your Feedback `);
				}}
				// okButtonProps={{ style: { textAlign: "center" } }}
				cancelButtonProps={{ style: { display: "none" } }}
				onCancel={() => setModalVisible2(false)}>
				<div
					style={{
						fontSize: "1.3rem",
						textAlign: "center",
						color: "darkblue",
						fontWeight: "bold",
					}}>
					<div>
						Khan Khadija Online Scheduling System Still Under Development...
					</div>
					<div>
						Please Contact Khan Khadija Customer Support For Further Inquiries
						at +201211492941
					</div>
				</div>
			</Modal>
		</PopUpMessageWrapper>
	);
};

export default PopUpMessage;

const PopUpMessageWrapper = styled.span`
	@media (max-width: 900px) {
		.theModal {
			width: 90% !important;
		}
	}
`;
