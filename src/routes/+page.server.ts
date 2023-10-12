import { localStorageStore } from '@skeletonlabs/skeleton';
import type { PageServerLoad } from './$types';
import type { Writable } from 'svelte/store';
import { get } from 'svelte/store';


export const load = (async ({cookies}) => {
    // function setCookieBerakx() {
    //     cookies.set('cookieberakx', "awwwwwwwwwww", { path: '/' });
    // }

    // function getCookieBerakx() {
    //     cookies.get('cookieberakx');
    // }
	return {
		// ano: setCookieBerakx,
        // getCookieBerakx
        
	};
}) satisfies PageServerLoad;
