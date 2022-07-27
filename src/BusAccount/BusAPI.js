/** @format */

export const getPreviousBookingsBusStation = (userId, token) => {
	return fetch(
		`${process.env.REACT_APP_API_URL}/all-reservations-bus/${userId}`,
		{
			method: "GET",
			headers: {
				// content type?
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		},
	)
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};
