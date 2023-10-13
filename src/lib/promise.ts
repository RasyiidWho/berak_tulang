import { writable } from 'svelte/store';

export function fetchData() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			// Simulated data
			const data = { message: 'Data fetched successfully' };
			resolve(data);
		}, 1000); // Simulated delay
	});
}