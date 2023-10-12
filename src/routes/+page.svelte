<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<script lang="ts">
	import berak from '$lib/assets/berak.png';
	// import { InputChip } from '@skeletonlabs/skeleton';
	export let data;
	import { myStringStore } from '$lib/stores';
	import { InputChip } from '@skeletonlabs/skeleton';

	let arrayBerak = [];

	storeBerak.subscribe((v) => {
		arrayBerak = v;
	});

	// 	function updateString(value) {
	//     myStringStore.update(() => value);

	//   }

	// function addBerak() {
	// 	 simpanBerak.set((simpanBerak) => simpanBerak);
	// }

	// berakx.subscribe((value) => {
	// 	berakx = value;
	// });

	// noteStore.update((notes) => notes.filter((n) => n.id !== noteId));

	// function setBerak() {
	// 	berakx.update((berakx) => berakx);
	// }

	// berakx.subscribe((v) => {
	// 	beraks = v;
	// });
	// let alasan: string;
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
					bind:value={arrayBerak}
					name="chips"
					on:add={() => updateString(arrayBerak)}
					placeholder="Enter any value..."
				/>

				<!-- <b class="btn !bg-transparent" on:click={() => updateString(newValue)}>aaaaaaaaaaaaaaa</b> -->
			</div>
		</div>
	</div>
</div>
