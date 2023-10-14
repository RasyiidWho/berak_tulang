import { localStorageStore } from '@skeletonlabs/skeleton';
import { writable } from 'svelte/store';
import {get} from 'svelte/store'

export const AlasanBerak = localStorageStore('AlasanBerakx', []);

export let animeID = writable(true);
export let animeData = writable(true);
export let animeNamex = writable(true);

// export function myLocalStorageStore(key: string, defaultValue: any, isDataArray: boolean) {
// 	const store = localStorageStore(key, defaultValue);

// 	return {
// 		...store,
// 		isDataArray,
// 		updateData(data: any) {
// 			if (isDataArray && Array.isArray(data)) {
// 				store.set([...data]);
// 			} else {
// 				store.set(data);
// 			}
// 		}
// 	};
// }
