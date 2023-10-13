import { localStorageStore } from '@skeletonlabs/skeleton';

export const AlasanBerak = localStorageStore('AlasanBerakx', []);


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