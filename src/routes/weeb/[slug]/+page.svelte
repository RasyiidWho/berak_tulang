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
  import { debounce } from '$lib/debounce.js';
  import { writable } from 'svelte/store';

  const modalStore = getModalStore();
  let arrayAlasanBerak = [];
  let isLoading = false;
  let isLoadingImage = false;
  let isLoadingImageHTML;
  let timeHorizontal: number = 1;

  let swiper;

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

  async function printAnimePromise(id) {
    isLoading = true;
    isLoadingImage = true;
    console.log('printAnimePromise');
    // console.log('animeData: ' + JSON.stringify(animeData));
    // console.log('tulung executed');
    // animeData.set(0);
    // await sleep(5000);
    try {
      const response1Promise = fetch('https://api.jikan.moe/v4/anime/' + id + '/full');
      const response2Promise = new Promise((resolve) => debounce(resolve, 3000)).then(() => fetch('https://api.jikan.moe/v4/anime/' + id + '/characters'));
      const [response1, response2] = await Promise.all([response1Promise, response2Promise]);
      // await sleep(5000);
      if (response1.ok && response2.ok) {
        const data = await response1.json();
        const dataChar = await response2.json();
        anime = data.data;
        animeChar = dataChar.data;
        // response ? (wibuAnime = datos.titles[0].title) : (wibuAnime = 'Anime Not Found');
        // response ? (wibuGambar = datos.images.webp.image_url) : (wibuAnime = 'Anime Not Found');
        // response ? (wibuRating = datos.score) : (wibuRating = 10);
        // console.log("data.images.webp.image_url: " + JSON.stringify(datos.mal_id))
        // console.log("data.images.webp.image_url: " + data[0].images.webp.image_url)
        // await sleep(2000);
        isLoading = false;
        await sleep(3000);

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
              <Ratings justify="start" value={Math.abs(anime.score / 2) + 1} max={5}>
                <svelte:fragment slot="empty"><Icon icon="solar:star-bold" color="#7D591B" width="20" /></svelte:fragment>
                <svelte:fragment slot="half"><Icon icon="solar:star-bold-duotone" color="#ffb02e" width="20" /></svelte:fragment>
                <svelte:fragment slot="full"><Icon icon="solar:star-bold" color="#ffb02e" width="20" /></svelte:fragment>
              </Ratings>
              <div class="pt-0 sm:pt-2">
                <span class="chip rounded-full !bg-transparent my-0 ml-0 pl-0"><Icon icon="fluent-emoji:star" class="mr-1" /> {anime.score}</span>
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
              <Ratings justify="justify-center" value={Math.abs(anime.score / 2) + 1} max={5}>
                <svelte:fragment slot="empty"><Icon icon="solar:star-bold" color="#7D591B" width="30" /></svelte:fragment>
                <svelte:fragment slot="half"><Icon icon="solar:star-bold-duotone" color="#ffb02e" width="30" /></svelte:fragment>
                <svelte:fragment slot="full"><Icon icon="solar:star-bold" color="#ffb02e" width="30" /></svelte:fragment>
              </Ratings>
            {/if}
          </div>
        </div>
        <div class="pt-1">
          {#if anime}
            <span class="chip rounded-full !bg-transparent my-0 ml-0 pl-0 text-lg"><Icon icon="fluent-emoji:star" class="mr-2" /> {anime.score}</span>
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
          <RadioItem bind:group={timeHorizontal} name="time" value={2}>🥙 Review</RadioItem>
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
          {#if anime}
            {#if anime.studio === 'object'}
              {#each anime.studio as studio}
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
        <div class="block opacity-10 ml-5 -m-8 pt-8 w-full h-full -z-40 overflow-hidden">
          {#if anime}
            <h2 class="chip m-0 p-0 lg:text-4xl text-xl">#14213 Rank</h2>
            <h2 class="chip m-0 p-0 lg:text-4xl text-xl">#123113 Popular</h2>
            <h2 class="chip m-0 p-0 lg:text-4xl text-xl">203,182 User</h2>
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
          <div class="col-span-2 xl:col-span-4">
            <div class="p-4">
              <h2 class="h2">Characters</h2>
              <article>
                <div>List of characters that played</div>
                <swiper-container bind:this={swiper} free-mode="true">
                  <!-- <div class="relative flex w-[250px]"> -->
                  {#if animeChar}
                    {#each animeChar as char}
                      {#if !char.character.images.webp.image_url.includes('questionmark')}
                        <swiper-slide>
                          <div class="relative">
                            <img alt={char.character.name} class="object-cover rounded-t-lg px-0.5" src={char.character.images.jpg.image_url} />
                            <div class="absolute text-center bottom-0 left-0 right-0 mx-0.5 bg-black opacity-60">
                              <p class="text-sm text-gray-300">{char.character.name}</p>
                            </div>
                            <div class="absolute text-center top-0 left-0 right-0 mx-0.5 bg-black opacity-60">
                              <p class="text-sm text-gray-300">❤️‍🔥 {char.favorites}</p>
                            </div>
                          </div>

                          {#if char.voice_actors[0]}
                            {#each char.voice_actors as voice_actor, x}
                              <!-- <h1>{voice_actor.person.name}</h1> -->
                              {#if voice_actor.language === 'Japanese'}
                                <div class="{x == 1 ? 'hidden' : 'relative'}">
                                  <img alt={voice_actor.person.name} class="object-cover rounded-b-lg px-0.5" src={voice_actor.person.images.jpg.image_url} />
                                  <div class="absolute text-center top-0 left-0 right-0 mx-0.5 bg-black opacity-60">
                                    <p class="text-sm text-gray-300">{voice_actor.person.name}</p>
                                  </div>
                                </div>
                              {/if}
                            {/each}
                          {/if}
                        </swiper-slide>
                      {/if}
                    {/each}
                  {/if}
                </swiper-container>
                <!-- {#each items as item}
                    <swiper-slide>
                      <div class="relative">
                        <img class="w-[250px] h-[250px] object-cover rounded-t-lg px-0.5" src="https://picsum.photos/200/{item}?v={item}" />
                        <div class="absolute text-center bottom-0 left-0 right-0 mx-0.5 bg-black opacity-60">
                          <p class="text-sm text-gray-300">Kurumizawa McDowell, Satanichia</p>
                        </div>
                      </div>
                      <div class="relative">
                        <img class="w-[250px] h-[250px] object-cover rounded-b-lg px-0.5" src="https://picsum.photos/200/{item}?v={item}" />
                        <div class="absolute bottom-0 left-0 right-0 mx-0.5 bg-black opacity-60">
                          <h3 class="text-xl text-white font-bold">Kurumizawa McDowell, Satanichia</h3>
                          <p class="text-sm text-gray-300">Kurumizawa McDowell, Satanichia</p>
                        </div>
                      </div>
                    </swiper-slide>
                  {/each} -->
                <!-- </div> -->
              </article>
            </div>
          </div>
          <div>
            <a class="card variant-ghost-primary card-hover overflow-hidden" href="#">
              <!-- <header>
              {#if anime}
                <img class="bg-black/50" src={animeChar[0].character.images.webp.image_url} alt="Post" />
              {/if}
            </header> -->
              <div class="p-4">
                <h2 class="h2">Studios</h2>
                <article class="opacity-50">
                  <p>Wit Studio, CloverWorks</p>
                </article>
              </div>
            </a>
          </div>
          <div>
            <a class="card variant-ghost-primary card-hover overflow-hidden" href="#">
              <!-- <header>
              {#if anime}
                <img class="bg-black/50" src={animeChar[0].character.images.webp.image_url} alt="Post" />
              {/if}
            </header> -->
              <div class="p-4">
                <h2 class="h2">Status</h2>
                <article class="opacity-50">
                  <p>Currently Airing...</p>
                  <p>Broadcast at Saturdays at 23:00 (JST)</p>
                </article>
              </div>
            </a>
          </div>
          <div>
            <a class="card variant-ghost-primary card-hover overflow-hidden" href="#">
              <!-- <header>
              {#if anime}
                <img class="bg-black/50" src={animeChar[0].character.images.webp.image_url} alt="Post" />
              {/if}
            </header> -->
              <div class="p-4">
                <h2 class="h2">Trailer</h2>
                <article class="opacity-50">
                  <p>IKI NKO PLACEHOLDER TRAILER</p>
                </article>
              </div>
            </a>
          </div>
        </div>
        <div class=""></div>

        <!-- <hr class="opacity-50" /> -->
        <!-- <footer class="p-4 flex justify-start items-center space-x-4">
            <Avatar width="w-8" />
            <div class="flex-auto flex justify-between items-center">
              <h6 class="font-bold" data-toc-ignore>By Alex</h6>
              <small>On {new Date().toLocaleDateString()}</small>
            </div>
          </footer> -->
        <div class="flex pt-2grid grid-cols-2 grid-rows-1 gap-2 pt-10">
          <Accordion>
            <AccordionItem open>
              <svelte:fragment slot="lead"><Icon icon="fluent-emoji:banana" width="32px" /></svelte:fragment>
              <svelte:fragment slot="summary"><h2 class="h2">Episodes & Relation</h2></svelte:fragment>
              <svelte:fragment slot="content">
                <!-- <section class="snap-x snap-mandatory scroll-smooth flex gap-2 pb-2 overflow-x-auto">
                  
                      {#if animeChar}
                      {#each animeChar as image}
                      
                        {#if !image.character.images.webp.image_url.includes("questionmark")}
                        <div>
                        <img class="lazyload h-auto max-w-full rounded-lg" src={image.character.images.webp.image_url} />
                      </div>
                        {/if}
                    {/each}
                    {/if}
                </section> -->
                <!-- <div class="grid grid-cols-3">
                  <div>Item 1</div>
                  <div>Item 2</div>
                  <div>Item 3</div>
                  <!== More items ==>
                </div> -->
              </svelte:fragment>
            </AccordionItem>
            <AccordionItem open>
              <svelte:fragment slot="lead"><Icon icon="fluent-emoji:beer-mug" width="32px" /></svelte:fragment>
              <svelte:fragment slot="summary"><h2 class="h2">Synopsys</h2></svelte:fragment>
              <svelte:fragment slot="content">
                {anime?.synopsis ? anime?.synopsis : 'Anime Not Found'}
              </svelte:fragment>
            </AccordionItem>
            <AccordionItem open>
              <svelte:fragment slot="lead"><Icon icon="fluent-emoji:beach-with-umbrella" width="32px" /></svelte:fragment>
              <svelte:fragment slot="summary"><h2 class="h2">Background</h2></svelte:fragment>
              <svelte:fragment slot="content">{anime?.background ? anime?.background : 'Background not found, perhaps you can contribute it?'}</svelte:fragment>
            </AccordionItem>
            <!-- ... -->
          </Accordion>
        </div>
      </div>
      <div class="spacer h-[100px]"></div>
    </div>
  </div>
  <!-- <div class="flex w-screen">
      
    </div> -->
</div>
