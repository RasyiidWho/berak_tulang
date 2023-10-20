<script lang="ts">
  import berak from '$lib/assets/berak.png';
  import { AlasanBerak } from '$lib/stores';
  import { sleep } from '$lib/sleep';
  import { fade } from 'svelte/transition';
  import { Ratings, focusTrap, getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
  import { animeData, animeNamex, animeID } from '$lib/stores';
  import { Application } from '@splinetool/runtime';
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';

  // make sure you have a canvas in the body
  let canvas3d;

  onMount(() => {
    // myElement.addEventListener('click', handleClick);
    if (browser) {
      // start the application and load the scene
  const spline = new Application(canvas3d);
  spline.load('https://prod.spline.design/TRY4GvgtSIVQYCAA/scene.splinecode');

  }
  });



  const modalStore = getModalStore();
  let arrayAlasanBerak = [];
  let wibuAnime = 'Tell your friend your list!';
  let wibuGambar;
  let wibuRating = 10;
  let wibuID;
  let inputPopupDemo: string = '';

  // Nganggo gawe data JSON opo array opo sakarepmu,
  // Sek penting isine iso diubah-ubah nganggo
  // $1.update(ISINE) // Ngupdate isine (append)
  // $1.set(ISINE) // Ngereset isine

  // Mek update terus
  // Templekke neng bind mek value'ne keupdate terus secara realtime
  // contoh: bind:value={arrayAlasanBerak}
  AlasanBerak.subscribe((v) => {
    arrayAlasanBerak = v;
  });

  let animeName;

    
  animeNamex.subscribe((v) => {
    
    if(v) {
      animeName = v;
    } else {
      console.log("v: " + v)
    }
  });

  const modal: ModalSettings = {
    type: 'component',
    component: 'exampleImage'
  };

  // Fungsi nggo ngupdate, sangkutke neng button nggo update value'ne
  // Templekke neng on:, contoh: on:click={() => updateAlasanBerak(AlasanBerak)}
  // const updateAlasanBerak = (v) => {
  //   AlasanBerak.update(() => v);
  // };

  let isLoading = false;
  let isLoadingImage = false;
  let isLoadingImageHTML;


animeID.subscribe((v) => {
  printAnimePromise(v);
});

  async function printAnimePromise(id) {
    isLoading = true;
    isLoadingImage = true;
    // console.log('animeData: ' + JSON.stringify(animeData));
    // console.log('tulung executed');
    // animeData.set(0);
    await sleep(5000);
    try {
      const response = await fetch('https://api.jikan.moe/v4/anime/' + id);
      if (response.ok) {
        const data = await response.json();
        const datos = data.data;
        response ? (wibuAnime = datos.titles[0].title) : (wibuAnime = 'Anime Not Found');
        response ? (wibuGambar = datos.images.webp.image_url) : (wibuAnime = 'Anime Not Found');
        response ? (wibuRating = datos.score) : (wibuRating = 10);
        // console.log("data.images.webp.image_url: " + JSON.stringify(datos.mal_id))
        // console.log("data.images.webp.image_url: " + data[0].images.webp.image_url)
        await sleep(2000);
        isLoading = false;
        await sleep(3000);
        isLoadingImage = false;
        // await sleep(5000);
      } else {
        console.error('Failed to fetch data from the API');
      }
      // console.log('animeData: ' + JSON.stringify($animeData));
    } catch (error) {
      isLoading = false;
      console.error('Error fetching anime data:', error);
    }
  }


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
  

  // $: wibuID = arrayAlasanBerak.slice(-1).pop();
  $: printAnimePromise(wibuID);
  $: isLoading;
  $: isLoadingImage;
  // $: printAnime(wibuID);
  let isFocused: boolean = true;


</script>


<!-- 
██╗░░██╗████████╗███╗░░░███╗██╗░░░░░
██║░░██║╚══██╔══╝████╗░████║██║░░░░░
███████║░░░██║░░░██╔████╔██║██║░░░░░
██╔══██║░░░██║░░░██║╚██╔╝██║██║░░░░░
██║░░██║░░░██║░░░██║░╚═╝░██║███████╗
╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░░░░╚═╝╚══════╝ 
-->

<style>
  #logo {
    visibility: hidden;
  }
</style>


<div class="container flex justify-center h-full w-full max-h-full max-w-full  {$modalStore[0] ? 'blur-3xl' : ''}">
  <!-- <div class="flex justify-center"> -->
    <!-- <canvas class="block" bind:this={canvas3d}></canvas> -->
    <!-- <div class="m-auto grid grid-cols-1 gap-2 text-center pt-20">
      <!== <b transition:fade class="btn !bg-transparent h-96 -z-50">
        <img class="md:w-[400px] w-[2000px] rounded-md" src="{berak}" alt="logo" />
      </b> ==>
      <!== <spline-viewer class="hide" url="https://prod.spline.design/mYqynR66CUUnDVjU/scene.splinecode"></spline-viewer> ==>
      
      <!== <h1 class="h1" on:click={() => modalStore.trigger(modal)}>{wibuAnime}</h1> ==>
      <!== <form action="" use:focusTrap={isFocused}>
        <input on:click={() => modalStore.trigger(modal)} class="input rounded-lg md:w-full w-[400px] variant-form-material" style="text-decoration: none !important;" spellcheck="false" placeholder="Pssst... Click me!" />
      </form> ==>
      
      <!== <input class="btn button-base-styles bg-black" bind:value={animeName} on:click={() => animeNamex.set(animeName)}/> ==>
        <div class="m-5">
          <!== <InputChip value="{data.jukuk}" name="chips" placeholder="Mengapa kamu ingin berak?" /> ==>
          <!== <h1 class="h1">Isine: {newValue}</h1> ==>
          <!== <input class="input" type="text" on:change="{() => updateString(newValue)}" bind:value="{newValue}"> ==>
          <!== <InputChip bind:value={arrayAlasanBerak} on:keydown={() =>animeNamex.set(animeName)} name="chips" on:add={() => updateAlasanBerak(arrayAlasanBerak)} placeholder="Type here_" /> ==>
        </div>

    </div> -->
  <!-- </div> -->
</div>
