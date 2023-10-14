<script lang="ts">
  import berak from '$lib/assets/berak.png';
  import { AlasanBerak } from '$lib/stores';
  import { sleep } from '$lib/sleep';
  import { fade } from 'svelte/transition';
  import { Accordion, AccordionItem, RadioGroup, RadioItem, Ratings, getModalStore } from '@skeletonlabs/skeleton';
  import { animeData, animeNamex, animeID } from '$lib/stores';
  import Carousel from 'svelte-carousel';
  import { browser } from '$app/environment';
  import { writable } from 'svelte/store';
  import { debounce } from 'ts-debounce';

  const modalStore = getModalStore();
  let arrayAlasanBerak = [];

  let wibuAnime = 'Tell your friend your list!';
  let wibuGambar = 'https://cdn.myanimelist.net/images/anime/4/19644.webp';
  let wibuRating = 10;
  let wibuID;
  let inputPopupDemo: string = '';
  let isLoading = false;
  let isLoadingImage = false;
  let isLoadingImageHTML;
  let timeHorizontal = 'Details';

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

  // let animeName;

  // animeNamex.subscribe((v) => {
  //   if (v) {
  //     animeName = v;
  //   } else {
  //     console.log('v: ' + v);
  //   }
  // });

  // Fungsi nggo ngupdate, sangkutke neng button nggo update value'ne
  // Templekke neng on:, contoh: on:click={() => updateAlasanBerak(AlasanBerak)}
  const updateAlasanBerak = (v) => {
    AlasanBerak.update(() => v);
  };

  // Nganggo gawe data JSON opo array opo sakarepmu,
  // Sek penting isine iso diubah-ubah nganggo
  // $1.update(ISINE) // Ngupdate isine (append)
  // $1.set(ISINE) // Ngereset isine

  // FUNGSI PALING PENTING, NGGO NGESHARE VARIABLE & STATE
  // ANTAR FILE

  let anime;
  let animeChar;

  async function printAnimePromise(id) {
    debouncedFunction.cancel();
    isLoading = true;
    isLoadingImage = true;
    console.log('printAnimePromise');
    // console.log('animeData: ' + JSON.stringify(animeData));
    // console.log('tulung executed');
    // animeData.set(0);
    // await sleep(5000);
    try {
      const [response1, response2] = await Promise.all([fetch('https://api.jikan.moe/v4/anime/' + id + '/full'), fetch('https://api.jikan.moe/v4/anime/' + id + '/characters')]);
      if (response1.ok) {
        const data = await response1.json();
        const dataChar = await response2.json();
        anime = data.data;
        animeChar = dataChar.data;
        console.log(animeChar)
        // response ? (wibuAnime = datos.titles[0].title) : (wibuAnime = 'Anime Not Found');
        // response ? (wibuGambar = datos.images.webp.image_url) : (wibuAnime = 'Anime Not Found');
        // response ? (wibuRating = datos.score) : (wibuRating = 10);
        // console.log("data.images.webp.image_url: " + JSON.stringify(datos.mal_id))
        // console.log("data.images.webp.image_url: " + data[0].images.webp.image_url)
        // await sleep(2000);
        isLoading = false;
        // await sleep(3000);
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

  let carousel; // for calling methods of the carousel instance

  const handleNextClick = () => {
    carousel.goToNext();
  };

  const debouncedFunction = debounce(printAnimePromise, 3000, { isImmediate: false, maxWait: 5000 });

  animeID.subscribe((v) => {
    if (v == true) {
      console.log('isine true, apaan coba?');
    } else {
      console.log('v: ' + v);
      debouncedFunction(v);
    }
  });

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
  // $: printAnimePromise(wibuID);
  // $: printAnimePromise(animeIDx);
  $: isLoading;
  $: isLoadingImage;
  // $: anime
  // $: printAnime(wibuID);
  // printAnimePromise(1)
</script>

<!-- 
  ██╗░░██╗████████╗███╗░░░███╗██╗░░░░░
  ██║░░██║╚══██╔══╝████╗░████║██║░░░░░
  ███████║░░░██║░░░██╔████╔██║██║░░░░░
  ██╔══██║░░░██║░░░██║╚██╔╝██║██║░░░░░
  ██║░░██║░░░██║░░░██║░╚═╝░██║███████╗
  ╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░░░░╚═╝╚══════╝ 
  -->

<div class="container {$modalStore[0] ? 'blur-3xl' : ''} {isLoading ? 'animate-pulse blur-xl' : ''} pt-12">
  <div class="flex flex-col md:flex-row">
    <img bind:this={isLoadingImageHTML} class="fixed -z-10 md:w-[1400px] opacity-10 w-[4000px] rotate-90 rounded-md motion-safe:animate-pulse blur-3xl" src={anime?.images.webp.image_url} alt="logo" />
    <div class="w-full md:w-1/2 md:ml-5">
      <div class="text-center">
        <b transition:fade class="btn !bg-transparent -z-50">
          <img
            bind:this={isLoadingImageHTML}
            class="md:w-[420px] w-[300px] rounded-md
              {isLoadingImage ? 'animate-pulse blurx-xl' : ''} 
              {anime?.images.webp.image_url ? anime?.images.webp.image_url : berak}"
            src={anime?.images.webp.image_url}
            alt="logo"
          />
        </b>
        <div class="flex content-center justify-center">
          <h1 class="h1">{anime?.titles[0].title ? anime?.titles[0].title : 'Anime Not Found'}</h1>
          <h1 class="h1 absolute -mt-5 opacity-50">カウボーイビバップ</h1>
          <h1 class="h1 absolute mt-10 opacity-10">カウボーイビバップ</h1>
        </div>
        <!-- <h1 class="h1 md:pt-6 pt-5 {isLoading ? 'animate-pulse blur-xl' : ''}">{wibuAnime}</h1> -->
        <div class={isLoading ? 'animate-pulse blur-xl' : ''}>
          <!-- <Ratings value={wibuRating} max={10} interactive>
              <svelte:fragment slot="empty">🌚</svelte:fragment>
              <svelte:fragment slot="half">🌘</svelte:fragment>
              <svelte:fragment slot="full">🌝</svelte:fragment>
            </Ratings> -->
        </div>
      </div>
    </div>
    <div class="w-full md:w-4/5 mt-6 p-4">
      <div class="md:visible collapse -ml-2">
        <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
          <RadioItem bind:group={timeHorizontal} name="time" value="Details">💌 Anime // Details</RadioItem>
          <RadioItem bind:group={timeHorizontal} name="time" value="Actors">🥙 Anime // Characters</RadioItem>
          <RadioItem bind:group={timeHorizontal} name="time" value="Episodes">🍣 Anime // Episodes</RadioItem>
        </RadioGroup>
      </div>
      <div class="pt-5">
        <div class="flex">
          <h1 class="h1">Details</h1>
          <h1 class="h1 absolute opacity-20">カウボーイビバップ</h1>
        </div>

        <div class="pt-4">
          <span class="chip variant-filled-primary mb-2">{anime ? '⛄ ' + anime.season + ' ' + anime.year : 'Anime Not Found'}</span>

          {#if anime}
            {#if anime.studio === 'object'}
              {#each anime.studio as studios}
                <span class="chip variant-filled-primary mb-2">{'📹 ' + studios.name}</span>
              {/each}
            {:else}
              <span class="chip variant-filled-primary mb-2">{'📹 ' + anime.studios[0].name}</span>
            {/if}
          {/if}
        </div>
        <div class="pt-2 space-x-2">
          {#if anime}
            {#each anime.genres as genre}
              <span class="chip variant-soft-primary">
                {genre.name}
              </span>
            {/each}
          {/if}
        </div>
        <div class="flex pt-2grid grid-cols-2 grid-rows-1 gap-2 pt-10">
          <!-- <span class="chip variant-outline-primary p-2" on:click={doSomething}>
             <span class="font-black text-3xl">7.5</span>
          </span> -->
          <Accordion>
            <AccordionItem open>
              <svelte:fragment slot="lead">🐾</svelte:fragment>
              <svelte:fragment slot="summary">Synopsys</svelte:fragment>
              <svelte:fragment slot="content">{anime?.synopsis ? anime?.synopsis : 'Anime Not Found'}</svelte:fragment>
            </AccordionItem>
            <AccordionItem open>
              <svelte:fragment slot="lead">🎒</svelte:fragment>
              <svelte:fragment slot="summary">Background</svelte:fragment>
              <svelte:fragment slot="content">{anime?.background ? anime?.background : 'Background not found, perhaps you can contribute it?'}</svelte:fragment>
            </AccordionItem>
            <AccordionItem>
              <svelte:fragment slot="lead">🐒</svelte:fragment>
              <svelte:fragment slot="summary">Characters</svelte:fragment>
              <svelte:fragment slot="content">
                <!-- {#if browser} -->
                <div class="md:max-w-2xl max-w-md text-center">
                  <Carousel particlesToShow={8} particlesToScroll={8} bind:this={carousel} arrows={false} infinite={false}>
                    {#if animeChar}
                      {#each animeChar as image}
                   <img class="m-1 rounded-lg w-32" src={image.character.images.webp.image_url} alt="imagex" />
                      {/each}
                    {/if}
                  </Carousel>
                </div>

                <!-- {/if} -->
              </svelte:fragment>
            </AccordionItem>
            <!-- ... -->
          </Accordion>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="flex w-screen">
      
    </div> -->
</div>
