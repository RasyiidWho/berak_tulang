<script lang="ts">
  import berak from '$lib/assets/berak.png';
  import { AlasanBerak } from '$lib/stores';
  import { sleep } from '$lib/sleep';
  import { fade } from 'svelte/transition';
  import { Accordion, AccordionItem, Avatar, RadioGroup, RadioItem, Ratings, getModalStore } from '@skeletonlabs/skeleton';
  import Icon from '@iconify/svelte';
  import 'lazysizes';
  export let data;
  import 'lazysizes/plugins/parent-fit/ls.parent-fit';
  import { afterUpdate, onMount } from 'svelte';
  import { trimTextAfterWord } from '$lib/trim.js';
  import { register } from 'swiper/element/bundle';
  import { browser } from '$app/environment';
  import { debounce, throttle } from 'lodash-es';
    import { timeout } from '$lib/timeout.js';
  
  const modalStore = getModalStore();
  let arrayAlasanBerak = [];
  let isLoading = false;
  let isLoadingImage = false;
  let isLoadingImageHTML;
  let timeHorizontal: number = 1;

  let swiper;
  let swiper_recom;

  // init Swiper:

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

  // let countVA = 0;

  // Nganggo gawe data JSON opo array opo sakarepmu,
  // Sek penting isine iso diubah-ubah nganggo
  // $1.update(ISINE) // Ngupdate isine (append)
  // $1.set(ISINE) // Ngereset isine

  // FUNGSI PALING PENTING, NGGO NGESHARE VARIABLE & STATE
  // ANTAR FILE

  // Nganggo gawe data JSON opo array opo sakarepmu,
  // Sek penting isine iso diubah-ubah nganggo
  // $1.update(ISINE) // Ngupdate isine (append)
  // $1.set(ISINE) // Ngereset isine

  // FUNGSI PALING PENTING, NGGO NGESHARE VARIABLE & STATE
  // ANTAR FILE

  let anime;
  let animeChar;
  let animeCharRingkas = {};
  let animeRecom;

  async function printAnimePromise(id) {
    isLoading = true;
    isLoadingImage = true;
    // console.log('printAnimePromise');
    // console.log('animeData: ' + JSON.stringify(animeData));
    // console.log('tulung executed');
    // animeData.set(0);
    // await sleep(5000);
    try {
      const fetchPromises = [
      fetch('https://api.jikan.moe/v4/anime/' + id + '/full'),
      new Promise(resolve => setTimeout(resolve, 1000)),
      fetch('https://api.jikan.moe/v4/anime/' + id + '/characters'),
      new Promise(resolve => setTimeout(resolve, 1000)),
      fetch('https://api.jikan.moe/v4/anime/' + id + '/recommendations'),
    ];
      // const fullPromise = fetch('https://api.jikan.moe/v4/anime/' + id + '/full');
      // const charactersPromise = new Promise((resolve) => sleep(500)).then(() => fetch('https://api.jikan.moe/v4/anime/' + id + '/characters'));
      // const recommendationsPromise = new Promise((resolve) => sleep(500)).then(() => fetch('https://api.jikan.moe/v4/anime/' + id + '/recommendations'));
      const [full, _, characters, __, recommendations] = await Promise.all(fetchPromises);
      if (full.ok && characters.ok && recommendations.ok) {
        animeCharRingkas = {};
        const data = await full.json();
        const dataChar = await characters.json();
        const dataRecom = await recommendations.json();
        anime = data.data;
        animeChar = dataChar.data;
        animeRecom = dataRecom.data;
        animeChar.forEach((data) => {
          const fav = data.favorites;
          const imageJPEG = data.character.images.jpg.image_url;
          const va = data.voice_actors.filter((actor) => actor.language === 'Japanese').map((actor) => actor.person.name);
          const vaJPEG = data.voice_actors.filter((actor) => actor.language === 'Japanese').map((actor) => actor.person.images.jpg.image_url);

          data.japaneseVoiceActors = Array.from(new Set([fav, imageJPEG, ...va, ...vaJPEG]));

          // Collect unique Japanese voice actors in animeCharRingkas
          animeCharRingkas[data.character.name] = data.japaneseVoiceActors;
        });
        console.log('animeCharRingkas: ' + JSON.stringify(animeCharRingkas));
        // response ? (wibuAnime = datos.titles[0].title) : (wibuAnime = 'Anime Not Found');
        // response ? (wibuGambar = datos.images.webp.image_url) : (wibuAnime = 'Anime Not Found');
        // response ? (wibuRating = datos.score) : (wibuRating = 10);
        // console.log("data.images.webp.image_url: " + JSON.stringify(datos.mal_id))
        // console.log("data.images.webp.image_url: " + data[0].images.webp.image_url)
        // await sleep(2000);
        isLoading = false;
        isLoadingImage = false;
        // await sleep(5000);
      } else {
        // debounce(printAnimePromise(data.slug),10000)
        console.error('Failed to fetch data from the API');
      }
      // console.log('animeData: ' + JSON.stringify($animeData));
    } catch (error) {
      isLoading = false;
      console.error('Error fetching anime data:', error);
    }
  }
  let isFirefox;
  if (browser) {
    isFirefox = /Firefox/i.test(window.navigator.userAgent);
  }

  // const throttledFunction = throttle(printAnimePromise, 3000, { isImmediate: false, maxWait: 5000 });

  // animeID.subscribe((v) => {
  //   if (v == true) {
  //     console.log('isine true, apaan coba?');
  //   } else {
  //     console.log('v: ' + v);
  //     throttle(v, 500);
  //   }
  // });

  // $ / bind:value={} Gunane nganggo eksekusi secara langsung nek ono perubahan.
  // secara realtime & reaktif
  // sek ono kaitanne karo sek diceluk. contoh:

  // // Contoh bind:value={}
  // let aOri = "uwu";
  // let aAkhir = aOri;
  // <input bind:value={aAkhir} />

  // // Contoh $:
  // let aOri = "uwu";
  // let aAkhir = aOri;x
  // $: aAkhir = aOri
  // <input value={aOri} on:input={(event) => (aAkhir = event.target.value)}/>

  // <h1>Iki bakal keupdate terus: {aAkhir}</h1>
  // <h1>Iki variable awal e: {aOri}</h1>

  // $: wibuID = arrayAlasanBerak.slice(-1).pop();
  // $: printAnimePromise(wibuID);
  // $: printAnimePromise(animeIDx);

  $: isLoading;
  $: isLoadingImage;
  // $: console.log('timeHorizontal: ' + timeHorizontal);
  // $: if (timeHorizontal == 1) {
  //   console.log('aktirrrrrrrrrrrrr');
  // }
  // $: console.log('slug: ' + data.slug);

  let items = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

  onMount(() => {
    isLoading = true;
    isLoadingImage = true;
    register();
    // isLoading = true;
    // isLoadingImage = true;
    console.log('slug:' + data.slug);
    printAnimePromise(data.slug);

    Object.assign(swiper, {
      breakpoints: {
        1: {
          slidesPerView: 4
        },
        768: {
          slidesPerView: 5
        },
        1024: {
          slidesPerView: 7
        }
      },
      freeMode: true
    });
    swiper.initialize();

    Object.assign(swiper_recom, {
      breakpoints: {
        1: {
          slidesPerView: 4
        },
        768: {
          slidesPerView: 5
        },
        1024: {
          slidesPerView: 7
        }
      },
      freeMode: true
    });
    swiper_recom.initialize();
  });

  let previousSlug = data.slug;

  afterUpdate(() => {
    const currentSlug = data.slug;
    if (currentSlug !== previousSlug) {
      // Slug has changed
      console.log('Slug has changed:', currentSlug);
      printAnimePromise(data.slug);
      previousSlug = currentSlug; // Update the previous slug
    }
  });
  // $: anime
  // $: printAnimePromise(data.slug);
  // printAnimePromise(1)
  $: data.slug;
</script>

<!-- 
  ██╗░░██╗████████╗███╗░░░███╗██╗░░░░░
  ██║░░██║╚══██╔══╝████╗░████║██║░░░░░
  ███████║░░░██║░░░██╔████╔██║██║░░░░░
  ██╔══██║░░░██║░░░██║╚██╔╝██║██║░░░░░
  ██║░░██║░░░██║░░░██║░╚═╝░██║███████╗
  ╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░░░░╚═╝╚══════╝ 
  -->

<img alt="gambar muser" class="overflow-hidden lazyload fixed -z-50 rounded-full {isFirefox ? 'animate-spin-slowly opacity-5 w-[1500px]' : 'animate-spin-slow opacity-60 w-[800px]'}  blur-[1000px]" src={anime?.images.webp.image_url} />
<div class="container hide-scrollbar lg:sticky space-x-0 h-full w-full m-0 p-0 lg:px-10 {$modalStore[0] ? 'blur-3xl' : ''} {isLoading ? 'animate-pulse blur-xl disabled' : 'block'} lg:pt-12 m-0 p-0 w-full max-w-full max-h-full h-full">
  <div class="flex flex-col lg:flex-row">
    <!-- 
███╗   ███╗ ██████╗ ██████╗ ██╗██╗     ███████╗
████╗ ████║██╔═══██╗██╔══██╗██║██║     ██╔════╝
██╔████╔██║██║   ██║██████╔╝██║██║     █████╗  
██║╚██╔╝██║██║   ██║██╔══██╗██║██║     ██╔══╝  
██║ ╚═╝ ██║╚██████╔╝██████╔╝██║███████╗███████╗
╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚═╝╚══════╝╚══════╝
                                                -->
    <div class="w-full lg:hidden block">
      <div class="px-5 py-5 bottom-0 flex justify-start align-top">
        <b transition:fade class="btn m-0 p-0 left-0 w-1/3 !bg-transparent -z-50">
          <img
            alt="banner"
            bind:this={isLoadingImageHTML}
            class="min-w-[150px] sm:min-w-[220px] ml-4 sm:ml-1 rounded-md
              {isLoadingImage ? 'animate-pulse blurx-xl' : ''} 
              {anime?.images.webp.image_url ? anime?.images.webp.image_url : berak}"
            src={anime?.images.webp.image_url}
          />
        </b>
        <div class="ml-9 sm:ml-6 overflow-hidden">
          <div>
            {#if anime}
              <Ratings justify="start" value={anime.score !== null ? Math.round((anime.score / 2) * 2 + 0.4) / 2 : 0} max={5}>
                <svelte:fragment slot="empty"><Icon icon="solar:star-bold" color="#7D591B" width="20" /></svelte:fragment>
                <svelte:fragment slot="half"><Icon icon="solar:star-bold-duotone" color="#ffb02e" width="20" /></svelte:fragment>
                <svelte:fragment slot="full"><Icon icon="solar:star-bold" color="#ffb02e" width="20" /></svelte:fragment>
              </Ratings>
              <div class="pt-1 sm:pt-2">
                <span class="chip rounded-full !bg-transparent my-0 ml-0 pl-0"><Icon icon="fluent-emoji:star" class="mr-1" /> {anime.score !== null ? anime.score : '....'}</span>
                <span class="chip rounded-full !bg-transparent my-0 ml-0 pl-0"><Icon icon="fluent-emoji:spiral-calendar" class="mr-1" /> {anime.aired.prop.from.year}</span>
                <span class="chip rounded-full !bg-transparent my-0 ml-0 pl-0"><Icon icon="fluent-emoji:admission-tickets" class="mr-1" /> {trimTextAfterWord(anime.duration, 'min')} + {anime.episodes} eps</span>
                <!-- <h6>rating . tahun . durasi + eps</h6> -->
              </div>
            {/if}
          </div>
          <h3 class="h4 sm:h3">{anime?.title ? anime?.title : ''}</h3>
          <h1 class="h1 grid opacity-5 w-48 absolute -m-24 -z-[51] overflow-hidden">{anime?.title ? anime.title_japanese : 'タイトル'}</h1>
          <!-- <h1 class="h1 opacity-5 absolute m-0">{anime?.title ? anime.title_japanese : 'タイトル'}</h1>
          <h1 class="h1 opacity-5 absolute m-5">{anime?.title ? anime.title_japanese : 'タイトル'}</h1> -->
        </div>
        <!-- <h1 class="h1 lg:pt-6 pt-5 {isLoading ? 'animate-pulse blur-xl' : ''}">{wibuAnime}</h1> -->
        <div class={isLoading ? 'animate-pulse blur-xl' : ''}></div>
      </div>
    </div>
    <!-- 
██████╗ ███████╗███████╗██╗  ██╗████████╗ ██████╗ ██████╗ 
██╔══██╗██╔════╝██╔════╝██║ ██╔╝╚══██╔══╝██╔═══██╗██╔══██╗
██║  ██║█████╗  ███████╗█████╔╝    ██║   ██║   ██║██████╔╝
██║  ██║██╔══╝  ╚════██║██╔═██╗    ██║   ██║   ██║██╔═══╝ 
██████╔╝███████╗███████║██║  ██╗   ██║   ╚██████╔╝██║     
╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝     
                                                           -->
    <div class="w-full lg:w-1/2 lg:block hidden">
      <div class="text-center sticky top-12 bottom-0">
        <b transition:fade class="btn m-0 p-0 !bg-transparent -z-50">
          <img
            alt="cover"
            bind:this={isLoadingImageHTML}
            class="lazyload md:w-[360px] xl:min-w-[300px] 2xl:min-w-[500px] rounded-md
              {isLoadingImage ? 'animate-pulse blurx-xl' : ''} 
              {anime?.images.webp.image_url ? anime?.images.webp.image_url : berak}"
            src={anime?.images.webp.image_url}
          />
        </b>
        <div class="text-center w-full -mt-2 z-50">
          <div class="pt-3 text-center">
            {#if anime}
              <Ratings justify="justify-center" value={Math.round((anime.score / 2) * 2 + 0.4) / 2} max={5}>
                <svelte:fragment slot="empty"><Icon icon="solar:star-bold" color="#7D591B" width="30" /></svelte:fragment>
                <svelte:fragment slot="half"><Icon icon="solar:star-bold-duotone" color="#ffb02e" width="30" /></svelte:fragment>
                <svelte:fragment slot="full"><Icon icon="solar:star-bold" color="#ffb02e" width="30" /></svelte:fragment>
              </Ratings>
            {/if}
          </div>
        </div>
        <div class="pt-1">
          {#if anime}
            <span class="chip rounded-full !bg-transparent my-0 ml-0 pl-0 text-lg"><Icon icon="fluent-emoji:star" class="mr-2" /> {anime.score !== null ? anime.score : '....'}</span>
            <span class="chip rounded-full !bg-transparent my-0 ml-0 pl-0 text-lg"><Icon icon="fluent-emoji:spiral-calendar" class="mr-2" /> {anime.aired.prop.from.year}</span>
            <span class="chip rounded-full !bg-transparent my-0 ml-0 pl-0 text-lg"><Icon icon="fluent-emoji:popcorn" class="mr-2" /> {trimTextAfterWord(anime.duration, 'min')} @ {anime.episodes} eps</span>
            <!-- <h6>rating . tahun . durasi + eps</h6> -->
          {/if}
        </div>
        <div class="text-center">
          {#if anime}
            <h2 class="h2">{anime.genres.find((genre) => genre.name === 'Award Winning') ? '🏆' : ''}{anime?.title ? anime?.title : ''}</h2>
            <h1 class="h1 absolute opacity-5 -mt-28">{anime?.title ? anime.title_japanese : 'タイトル'}</h1>
            <!-- <h1 class="h1 absolute opacity-5 -mt-28">{anime?.title ? anime.title_japanese : 'タイトル'}</h1>
            <h1 class="h1 absolute opacity-5 -mt-28">{anime?.title ? anime.title_japanese : 'タイトル'}</h1> -->
          {/if}
        </div>
        <!-- <h1 class="h1 lg:pt-6 pt-5 {isLoading ? 'animate-pulse blur-xl' : ''}">{wibuAnime}</h1> -->
        <div class={isLoading ? 'animate-pulse blur-xl' : ''}></div>
      </div>
    </div>
    <!-- 
██████╗ ██████╗ ███╗   ██╗████████╗███████╗███╗   ██╗████████╗
██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔════╝████╗  ██║╚══██╔══╝
██║     ██║   ██║██╔██╗ ██║   ██║   █████╗  ██╔██╗ ██║   ██║   
██║     ██║   ██║██║╚██╗██║   ██║   ██╔══╝  ██║╚██╗██║   ██║   
╚██████╗╚██████╔╝██║ ╚████║   ██║   ███████╗██║ ╚████║   ██║   
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝   ╚═╝   
                                                                -->
    <div class="w-full lg:w-11/12 mb-100 pb-100">
      <div class="lg:block hidden p-0">
        <RadioGroup active="variant-filled-primary" spacing="0" padding="px-4 py-1" hover="hover:variant-soft-primary">
          <RadioItem bind:group={timeHorizontal} name="time" value={1}>💌 Overview</RadioItem>
          <RadioItem bind:group={timeHorizontal} name="time" value={2}>🍣 Episodes</RadioItem>
          <RadioItem bind:group={timeHorizontal} name="time" value={3}>🥙 Review</RadioItem>
          <!-- <RadioItem bind:group={timeHorizontal} name="time" value={3}>🍣 Overview</RadioItem> -->
        </RadioGroup>
      </div>
      <div class="pt-15 xl:pl-0 xl:pt-5 overflow-hidden pt-20 {timeHorizontal !== 1 ? 'hidden animate-none' : 'animate-unblur-05'}">
        <div class="flex pl-5 overflow-hidden">
          <Icon icon="fluent-emoji:bookmark-tabs" height="32px" />
          <h1 class="h1 flex ml-2">Overview</h1>
          <h1 class="h1 absolute opacity-10 pl-5 lg:-mt-3 overflow-hidden">{anime?.title ? anime.title_japanese : 'タイトル'}</h1>
        </div>
        <div style="font-size: 0;" class="pt-2 pl-5 pr-5 block flex-wrap overflow-x-hidden box-content">
          <a target="_blank" href="https://myanimelist.net/anime/{data.slug}" class="chip variant-soft-primary mr-1 my-0 text-sm mb-1">MAL</a>
          {#if anime}
            {#if anime.studios === 'object'}
              {#each anime.studios as studio}
                <!-- <span class="chip variant-soft-primary mr-1 my-0">{'📹 ' + studio.name}</span> -->
              {/each}
            {:else}
              <!-- <span class="chip variant-soft-primary mr-1 my-0">{anime.studios[0]?.name ? '📹 ' + anime.studios[0].name : '📹 '}</span> -->
            {/if}
            <!-- <span class="chip variant-soft-primary mr-1 my-0 text-sm animate-pulse text-yellow-100 mb-1">📀 Airing in 3 hour, 26 mins!</span> -->
            <span class="chip variant-soft-primary mr-1 my-0 text-sm mb-1">
              {#if anime}
                {#if anime.season == 'fall'}
                  🍂 Fall
                {:else if anime.season == 'winter'}
                  ⛄ Winter
                {:else if anime.season == 'spring'}
                  🌱 Spring
                {:else if anime.season == 'summer'}
                  ☀️ Summer
                {:else}
                  😭 No Season Recorded
                {/if}
              {/if}
            </span>
            {#each anime.genres as genre}
              <span class="chip variant-soft-primary mr-1 my-0 text-sm mb-1"> {genre.name === 'Award Winning' ? '🏆 ' + genre.name : genre.name}</span>
            {/each}
          {/if}
          {#if anime}
            {#if anime.demographics === 'object' || anime.demographics[0]}
              {#each anime.demographics as demographic}
                <span class="chip variant-soft-primary mr-1 my-0 text-sm mb-1">{demographic.name}</span>
              {/each}
            {/if}
          {/if}
          {#if anime}
            {#if anime.themes === 'object' || anime.themes[0]}
              {#each anime.themes as theme}
                <span class="chip variant-soft-primary mr-1 my-0 text-sm mb-1">{theme.name}</span>
              {/each}
            {/if}
          {/if}
        </div>
        <div class="relative opacity-10 ml-5 -m-8 pt-8 w-full h-full -z-40 overflow-hidden">
          {#if anime}
            <h2 class="chip m-0 p-0 lg:text-4xl text-xl">#{anime?.rank ? anime?.rank : '....'} Rank,</h2>
            <h2 class="chip m-0 p-0 lg:text-4xl text-xl">#{anime?.popularity ? anime?.popularity : '....'} Popular,</h2>
            <h2 class="chip m-0 p-0 lg:text-4xl text-xl">{anime?.members ? anime?.members : '....'} Members</h2>
          {/if}
        </div>
        <!-- <div class="relative w-[250px]">
          <img class="w-[250px] h-[250px] object-cover" src="https://cdn.myanimelist.net/images/characters/2/492973.webp" />
          <div class=" bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70">
              <h3 class="text-xl text-white font-bold">Kurumizawa McDowell, Satanichia</h3>
              <p class="mt-2 text-sm text-gray-300">Jim Giove, Verdian</p>
          </div>
          <img class="w-[250px] h-[250px] object-cover" src="https://cdn.myanimelist.net/images/voiceactors/1/62790.jpg" />
      </div> -->

        <div class="grid grid-cols-2 xl:grid-cols-4 grid-rows-1 gap-0 pt-10">
          <div>
            <a class="card variant-ghost-primary card-hover overflow-hidden" href="#">
              <div class="p-4">
                <div class="flex items-center">
                  <Icon icon="fluent-emoji:movie-camera" width="32px" class="mr-4"/>
                  <h2 class="h2">Studio</h2>
                </div>
                <article class="opacity-60">
                  <p>
                    {#if anime}
                      {#if anime.studios[1]}
                        {#each anime.studios as studio}
                          <!-- <span class="chip variant-soft-primary mr-1 my-0">{'📹 ' + studio.name}</span> -->
                          {studio.name},
                        {/each}
                      {:else}
                        {#each anime.studios as studio}
                          <!-- <span class="chip variant-soft-primary mr-1 my-0">{'📹 ' + studio.name}</span> -->
                          {studio.name}
                        {/each}
                      {/if}
                    {/if}
                  </p>
                </article>
              </div>
            </a>
          </div>
          <div>
            <a class="card variant-ghost-primary card-hover overflow-hidden" href="#">
              <div class="p-4">
                <div class="flex items-center">
                  <Icon icon="fluent-emoji:green-circle" width="32px" class="mr-4"/>
                  <h2 class="h2">Status</h2>
                </div>
                <article class="opacity-60">
                  {#if anime}
                    <p>{anime?.status ? anime.status : 'Not Identified'}</p>
                    <p>Start: {anime.aired.from !== null ? String(anime.aired.from).replace('T00:00:00+00:00', '') : '....'}</p>
                    <p>End: {anime.aired.to !== null ? String(anime.aired.to).replace('T00:00:00+00:00', '') : '....'}</p>
                  {/if}
                </article>
              </div>
            </a>
          </div>
          <div>
            <a class="card variant-ghost-primary card-hover overflow-hidden" href="#">
              <div class="p-4">
                <div class="flex items-center">
                  <Icon icon="fluent-emoji:bento-box" width="32px" class="mr-4"/>
                  <h2 class="h2">Addition</h2>
                </div>
                <article class="opacity-60">
                  {#if anime}
                    <p>Type: {anime?.type ? anime.type : '....'}</p>
                    <p>Source: {anime?.source ? anime.source : '....'}</p>
                    <p>Age Rate: {anime?.rating ? anime.rating : '....'}</p>
                  {/if}
                </article>
              </div>
            </a>
          </div>
          <div>
            <a class="card variant-ghost-primary card-hover overflow-hidden" href="#">
              <div class="p-4">
                <div class="flex items-center">
                  <Icon icon="fluent-emoji:videocassette" width="32px" class="mr-4"/>
                  <h2 class="h2">Trailer</h2>
                </div>
                <article class="opacity-100">
                  <div class="pt-1.5">
                    {#if anime}
                      <iframe title="trailer" class="w-full aspect-video rounded-lg" src={anime?.trailer.embed_url !== null ? String(anime.trailer.embed_url).replace('autoplay=1', 'autoplay=0') : 'https://youtube.com/embed/DJfg39WkMvE?si=L-wDgs0C66FudOyI?enablejsapi=1&wmode=opaque&autoplay=0'} allowfullscreen></iframe>
                    {/if}
                  </div>
                </article>
              </div>
            </a>
          </div>
          <div class="col-span-2 xl:col-span-4">
            <div class="p-4 pt-0">
              <div class="flex items-center">
                <Icon icon="fluent-emoji:goblin" width="32px" class="mr-4"/>
                <h2 class="h2">Characters</h2>
              </div>
              <article>
                <div class="opacity-60 pb-2">List of characters that played</div>
                <swiper-container bind:this={swiper} free-mode="true">
                  <!-- <div class="relative flex w-[250px]"> -->

                  {#each Object.keys(animeCharRingkas) as index}
                    {#if !animeCharRingkas[index][1].includes('questionmark')}
                    <swiper-slide>
                      <div class="relative">
                        <img alt={index} class="object-cover rounded-t-lg px-0.5" src={animeCharRingkas[index][1]} />
                        <div class="absolute text-center bottom-0 left-0 right-0 mx-0.5 bg-black opacity-60">
                          <p class="text-sm text-white opacity-100">{index}</p>
                        </div>
                        <div class="absolute text-center top-0 left-0 right-0 mx-0.5 bg-black opacity-60 rounded-t-md">
                          <p class="text-sm text-white opacity-100">❤️‍🔥 {animeCharRingkas[index][0]}</p>
                        </div>
                      </div>

                      {#if animeCharRingkas[index].length >= 4}
                        <div class="relative">
                          <img alt={animeCharRingkas[index][2]} class="object-cover rounded-b-lg px-0.5" src={animeCharRingkas[index].length > 4 ? animeCharRingkas[index][4] : animeCharRingkas[index][3]} />
                          <div class="absolute text-center top-0 left-0 right-0 bg-black opacity-60">
                            <p class="text-sm text-white opacity-100">{animeCharRingkas[index][2]}</p>
                          </div>
                        </div>
                      {/if}
                    </swiper-slide>
                    {/if}
                  {/each}

                  {#if animeChar}
                    {#each animeChar as char}
                      {#if !char.character.images.webp.image_url.includes('questionmark')}{/if}
                    {/each}
                  {/if}
                </swiper-container>
              </article>
            </div>
          </div>        
          <div class="col-span-2 xl:col-span-4 pt-2">
            <div class="flex pt-2grid grid-cols-2 grid-rows-1 gap-2">
              <Accordion>
                <AccordionItem hover="!bg-transparent" open>
                  <svelte:fragment slot="lead"><Icon icon="fluent-emoji:open-book" width="32px" /></svelte:fragment>
                  <svelte:fragment slot="summary"><h2 class="h2">Synopsys</h2></svelte:fragment>
                  <svelte:fragment slot="content">
                    <div class="opacity-60">
                    {anime?.synopsis ? anime?.synopsis : 'Anime Not Found'}
                  </div>
                  </svelte:fragment>
                </AccordionItem>
                <AccordionItem hover="!bg-transparent" open>
                  <svelte:fragment slot="lead"><Icon icon="fluent-emoji:clapper-board" width="32px" /></svelte:fragment>
                  <svelte:fragment slot="summary"><h2 class="h2">Background</h2></svelte:fragment>
                  <svelte:fragment slot="content">
                    <div class="opacity-60">
                    {anime?.background ? anime?.background : 'Background not found, perhaps you can contribute it?'}
                  </div>
                  </svelte:fragment>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <div class="col-span-2 xl:col-span-4">
            <div class="p-4">
              <div class="flex items-center">
                <Icon icon="fluent-emoji:beans" width="32px" class="mr-4"/>
                <h2 class="h2">Look a' Like</h2>
              </div>
              <article>
                <div class="opacity-60 pb-2">List of anime that lookalike</div>
                <swiper-container bind:this={swiper_recom} free-mode="true">
                  {#if animeRecom}
                    {#each animeRecom as recom}
                      <swiper-slide>
                        <a href="/weeb/{recom.entry.mal_id}">
                        <div class=" transition-transform active:translate-x-95 active:translate-y-95 active:rotate-0 active:skew-x-0 active:skew-y-0 active:scale-x-95 active:scale-y-95 active:brightness-90">
                          <img alt={recom.entry.title} class=" object-cover rounded-lg p-0.5" src={recom.entry.images.jpg.image_url} />
                          <div class="absolute text-center bottom-0 left-0 right-0 m-0.5 bg-black opacity-60 rounded-b-md">
                            <p class="text-sm text-white opacity-100 m-0">{recom.entry.title}</p>
                          </div>
                          <div class="absolute text-center top-0 left-0 right-0 m-0.5 bg-black opacity-60 rounded-t-md">
                            <p class="text-sm text-white opacity-100 ">❤️‍🔥 {recom.votes}</p>
                          </div>
                        </div>
                      </a>
                      </swiper-slide>
                    {/each}
                  {/if}
                </swiper-container>
              </article>
            </div>
          </div>
        </div>
      </div>
      <div class="spacer h-[100px]"></div>
    </div>
  </div>
  <!-- <div class="flex w-screen">
      
    </div> -->
</div>
