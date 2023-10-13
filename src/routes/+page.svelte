<script lang="ts">
	import berak from '$lib/assets/berak.png';
	import { InputChip } from '@skeletonlabs/skeleton';
	import { AlasanBerak } from '$lib/stores';
	import Jikan from 'jikan4.js';
	import { writable } from 'svelte/store';
	import { sleep } from '$lib/sleep';
	import { fade, fly } from 'svelte/transition';

	let arrayAlasanBerak = [];

	let wibuAnime = "Mari Berak Berjama'ah";
	let wibuGambar;
	let wibuID;

	// AlasanBerak.subscribe((v) => v);

	// Mek update terus
	// Templekke neng bind mek value'ne keupdate terus secara realtime
	// contoh: bind:value={arrayAlasanBerak}
	AlasanBerak.subscribe((v) => {
		arrayAlasanBerak = v;
	});

	// Fungsi nggo ngupdate, sangkutke neng button nggo update value'ne
	// Templekke neng on:, contoh: on:click={() => updateAlasanBerak(AlasanBerak)}
	const updateAlasanBerak = (v) => {
		AlasanBerak.update(() => v);
	};

	// function updateAlasanBerak() {
	// 	AlasanBerak.update((v) => v);
	// }

	let animeData = writable(0);

	const jikanClient = new Jikan.Client();

	// async function printAnime(id: number) {
	// 	const anime = await jikanClient.anime.get(id);
	// 	console.log('anime: ' + JSON.stringify(anime));
	// 	animeData.set(anime);
	// 	console.log('animeData: ' + JSON.stringify($animeData));
	// 	anime ? (wibuAnime = anime.title) : (wibuAnime = 'Anime Not Found');
	// 	anime ? (wibuGambar = anime.image.jpg?.default?.href) : (wibuAnime = 'Anime Not Found');
	// }

	let isLoading = false;
	let isLoadingImage = false;

	async function printAnimePromise(id) {
		isLoading = true;
		isLoadingImage = true;
		console.log('animeData: ' + JSON.stringify(animeData));
		console.log('tulung executed');
		animeData.set(0);
		await sleep(5000);
		try {
			isLoading = false;
			const response = await jikanClient.anime.get(id);
			animeData.set(response);
			console.log('animeData: ' + JSON.stringify($animeData));
			response ? (wibuAnime = $animeData.title) : (wibuAnime = 'Anime Not Found');
			response
				? (wibuGambar = $animeData.image.jpg?.default?.href)
				: (wibuAnime = 'Anime Not Found');
			await sleep(3000);
			 isLoadingImage = false;
			
			
		} catch (error) {
			isLoading = false;
			console.error('Error fetching anime data:', error);
		}
	}

	// async function fetchData() {
	// 	return new Promise((resolve) => {
	// 		// Simulate an asynchronous operation
	// 		setTimeout(() => {
	// 			resolve('Promise resolved!');
	// 		}, 2000);
	// 	});
	// }

	// $ / bind:value={} Gunane nganggo eksekusi secara langsung nek ono perubahan.
	// secara realtime & reaktif
	// sek ono kaitanne karo sek diceluk. contoh:

	// // Contoh bind:value={}
	// let aOri = "uwu";
	// let aAkhir = aOri;
	// <input bind:value={aAkhir} />

	// // Contoh $:
	// let aOri = "uwu";
	// let aAkhir = aOri;
	// $: aAkhir = aOri
	// <input value={aOri} on:input={(event) => (aAkhir = event.target.value)}/>

	// <h1>Iki bakal keupdate terus: {aAkhir}</h1>
	// <h1>Iki variable awal e: {aOri}</h1>

	$: wibuID = arrayAlasanBerak.slice(-1).pop();
	$: printAnimePromise(wibuID);
	$: isLoading
	$: isLoadingImage
	// $: printAnime(wibuID);

</script>

<div class="container">
	<div class="flex w-screen">
		<div class="m-auto grid grid-cols-1 gap-10 text-center pt-10">
				<!-- {#if $animeData}
				<b class="btn !bg-transparent "><img in:fade={{ duration: 500 }} out:fade={{ duration: 500 }} out:fade src={wibuGambar} alt="logo"/></b>
				<h2>ID: {wibuID}, Anime: {wibuAnime}</h2>
			{:else}
				<b transition:fade class="btn !bg-transparent"><img in:fade={{ duration: 500 }} out:fade={{ duration: 500 }} out:fade src={wibuGambar} alt="logo" /></b>
				<h2 class="placeholder bg-secondary-50 mx-32" />
				<h2>ID: {wibuID}, Anime: {wibuAnime}</h2>
			{/if} -->
			<b transition:fade class="btn !bg-transparent h-96"><img class="{isLoadingImage ? 'animate-pulse blur-xl' : ''} {wibuGambar ? wibuGambar : berak}" src={wibuGambar} alt="logo" /></b>
			<h1 class="h1 {isLoading ? 'animate-pulse blur-xl' : ''}">{wibuAnime}</h1>

			<div class="m-5">
				<!-- <InputChip value="{data.jukuk}" name="chips" placeholder="Mengapa kamu ingin berak?" /> -->
				<!-- <h1 class="h1">Isine: {newValue}</h1> -->
				<!-- <input class="input" type="text" on:change="{() => updateString(newValue)}" bind:value="{newValue}"> -->
				<InputChip
					bind:value={arrayAlasanBerak}
					name="chips"
					on:add={() => updateAlasanBerak(arrayAlasanBerak)}
					placeholder="Kenapa kamu ingin sekali berak?"
				/>
				<!-- <b class="btn !bg-transparent" on:click={() => updateString(newValue)}>aaaaaaaaaaaaaaa</b> -->
			</div>
		</div>
	</div>
</div>
