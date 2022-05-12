/** @format */

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "antd/dist/antd.min.css";
import { isAuthenticated } from "../auth";
import {
	removeBusStation,
	createBusStation,
	getBusStations,
	AllPossibleHours,
} from "./apiAdmin";
import Adminsidebar from "./AdminSideBar/Adminsidebar";
import DarkBG from "./AdminSideBar/DarkBG";

const BusStationManagement = () => {
	const [click2, setClick2] = useState(false);
	const [clickMenu2, setClickMenu2] = useState(false);

	const [address, setAddress] = useState("");
	const [price, setPrice] = useState("");
	const [loading, setLoading] = useState("");
	const [busStations, setBusStations] = useState([]);
	const [AllAddedHoursCombined, setAllAddedHoursCombined] = useState([]);
	const [query4, setQuery4] = useState("");

	useEffect(() => {
		setClickMenu2(click2);
	}, [click2, clickMenu2]);

	const { user, token } = isAuthenticated();

	useEffect(() => {
		loadAllBusStations();
	}, []);

	const loadAllBusStations = () =>
		getBusStations().then((res) => setBusStations(res.data));

	let times = [];

	times = AllAddedHoursCombined.AllAddedHoursCombined;

	console.log(times);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (address.length <= 5) {
			return toast.error(
				"Address should be more than 5 letters, Please try again",
			);
		}

		if (address.length >= 150) {
			return toast.error(
				"Address should be less than 150 letters, Please try again",
			);
		}

		if (times.length < 1) {
			return toast.error("Please make sure to submit at least 1 active time.");
		}

		setLoading(true);
		console.table(address, times, price, "added Data");
		createBusStation(user._id, token, { address, times, price })
			.then((res) => {
				setLoading(false);
				loadAllBusStations(); // load all busStations
				setAddress("");
				setPrice("");
				AllAddedHoursCombined([]);
				times = [];
				toast.success(`"${res.data.address}" is created`);
				setTimeout(function () {
					window.location.reload(false);
				}, 2500);
			})
			.catch((err) => {
				console.log("create bus station err", err);
				setTimeout(function () {
					window.location.reload(false);
				}, 1500);
			});
	};
	const handleRemove = (busStationId) => {
		if (window.confirm("Delete?")) {
			setLoading(true);
			removeBusStation(busStationId, user._id, token)
				.then((res) => {
					loadAllBusStations(); // load all bus Stations
					setLoading(false);
					toast.error(`Bus Station "${res.data.address}" deleted`);
				})
				.catch((err) => console.log(err));
		}
	};

	const handleQueryChange_WorkingHours = (e) => {
		// console.log(e.target, "event.target");
		if (e.target.checked && !query4.includes(e.target.value)) {
			setQuery4([...query4, e.target.value]);
			setAllAddedHoursCombined({
				...AllAddedHoursCombined,
				AllAddedHoursCombined: query4,
			});
		} else if (!e.target.checked && query4.includes(e.target.value)) {
			setQuery4(query4.filter((q) => q !== e.target.value));
			setAllAddedHoursCombined({
				...AllAddedHoursCombined,
				AllAddedHoursCombined: query4,
			});
		}

		setAllAddedHoursCombined({
			...AllAddedHoursCombined,
			AllAddedHoursCombined: query4,
		});
	};

	useEffect(() => {
		setAllAddedHoursCombined({
			...AllAddedHoursCombined,
			AllAddedHoursCombined: query4,
		});
		// eslint-disable-next-line
	}, [query4]);

	return (
		<>
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
			<div className='container my-4'>
				<div className='col-md-10 ' style={{ marginBottom: "180px" }}>
					{loading ? (
						<h4 className='text-danger'>Loading...</h4>
					) : (
						<h4 className='mb-3'>Create a Bus Station:</h4>
					)}

					<form onSubmit={handleSubmit}>
						<div className='form-group'>
							<label className='text-muted'>Address</label>
							<input
								type='text'
								className='form-control'
								onChange={(e) => setAddress(e.target.value)}
								value={address}
								autoFocus
								required
							/>
						</div>

						<div className='form-group'>
							<label className='text-muted'>Price</label>
							<input
								type='text'
								className='form-control'
								onChange={(e) => setPrice(e.target.value)}
								value={price}
								required
							/>
						</div>
						<label className='text-muted'>Possible Times Buses Take Off</label>

						<div className='checkboxes border-gray-200 border border-solid  mx-auto text-center'>
							{AllPossibleHours &&
								AllPossibleHours.map((h) => {
									return (
										<span key={h} className='m-1 p-1'>
											<label htmlFor={h} className='block '>
												<input
													type='checkbox'
													id={h}
													onChange={handleQueryChange_WorkingHours}
													value={h}
													className='m-3'
													checked={query4 && query4.indexOf(h) !== -1}
												/>
												{h}
											</label>
										</span>
									);
								})}
						</div>

						<button className='btn btn-outline-primary'>
							Submit Bus Station
						</button>
					</form>

					<br />
					<hr />
					<h4 className='my-3'>
						Created Bus Stations: {busStations.length} Stations
					</h4>

					<table className='table table-bordered'>
						<thead className='thead-light'>
							<tr>
								<th scope='col'>Address</th>
								<th scope='col'>Times</th>
								<th scope='col'>Price</th>
								<th scope='col'>Action</th>
							</tr>
						</thead>

						<tbody>
							{busStations &&
								busStations.map((c) => (
									<tr key={c._id}>
										<td>{c.address}</td>
										<td>{c.times.map((i) => i + ", ")}</td>
										<td>{c.price} L.E.</td>
										<td>
											<span
												onClick={() => {
													handleRemove(c._id);
													setTimeout(function () {
														window.location.reload(false);
													}, 1500);
												}}
												className='badge badge-danger badge-pill align-items-center d-flex justify-content-between'
												style={{ cursor: "pointer" }}>
												Delete
											</span>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default BusStationManagement;
