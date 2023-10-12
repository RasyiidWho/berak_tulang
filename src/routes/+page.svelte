<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<script lang="ts">
	import berak from '$lib/assets/berak.png';
	// import { InputChip } from '@skeletonlabs/skeleton';
	export let data;
	import { InputChip } from '@skeletonlabs/skeleton';
	import { AlasanBerak } from "$lib/stores";

	let storeAlasanBerak = [];

	// Mek update terus
	// Templekke neng bind mek value'ne keupdate terus secara realtime
	// contoh: bind:value={storeAlasanBerak}
	AlasanBerak.subscribe((v) => {
		storeAlasanBerak = v;
	});

	// Fungsi nggo ngupdate, sangkutke neng button nggo update value'ne
	// Templekke neng on:, contoh: on:click={() => updateAlasanBerak(AlasanBerak)}
	const updateAlasanBerak = (v) => {
		AlasanBerak.update(() => v);
	};

</script>

<div class="container">
	<div class="flex w-screen">
		<div class="m-auto grid grid-cols-1 gap-10 text-center pt-10">
			<b class="btn !bg-transparent"><img src={berak} alt="logo" /></b>
			<h1 class="h1">Mari Berak Bersama Kami!</h1>
			<div class="m-5">
				<!-- <InputChip value="{data.jukuk}" name="chips" placeholder="Mengapa kamu ingin berak?" /> -->
				<!-- <h1 class="h1">Isine: {newValue}</h1> -->
				<!-- <input class="input" type="text" on:change="{() => updateString(newValue)}" bind:value="{newValue}"> -->
				<InputChip
					bind:value={storeAlasanBerak}
					name="chips"
					on:add={() => updateAlasanBerak(storeAlasanBerak)}
					placeholder="Kenapa kamu ingin sekali berak?"
				/>
				<!-- <b class="btn !bg-transparent" on:click={() => updateString(newValue)}>aaaaaaaaaaaaaaa</b> -->
			</div>
		</div>
	</div>
</div>


<style>
	* {
		-webkit-touch-callout: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
	}
</style>