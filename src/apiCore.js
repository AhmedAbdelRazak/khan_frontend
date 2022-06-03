/** @format */

export const allLoyaltyPointsAndStoreStatus = (token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/store-management`, {
		method: "GET",
		headers: {
			// content type?
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getHomes = (token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/home`, {
		method: "GET",
		headers: {
			// content type?
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getTickets = (token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/tickets`, {
		method: "GET",
		headers: {
			// content type?
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const getTicketsManagement = (token) => {
	return fetch(`${process.env.REACT_APP_API_URL}/ticketManagement`, {
		method: "GET",
		headers: {
			// content type?
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const createReservation = (callingOrder) => {
	return fetch(`${process.env.REACT_APP_API_URL}/reservation-create`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			// Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(callingOrder),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const createBeforeReview = (callingOrder) => {
	return fetch(`${process.env.REACT_APP_API_URL}/before-review`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			// Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(callingOrder),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => {
			console.log(err);
		});
};

export const getPreviousBookings = () => {
	return fetch(`${process.env.REACT_APP_API_URL}/all-reservations`, {
		method: "GET",
		headers: {
			// content type?
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};
