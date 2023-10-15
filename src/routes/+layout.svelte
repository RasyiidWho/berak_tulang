<script lang="ts">
  import '../app.postcss';
  import logo from '$lib/assets/berak.png';
  import '$lib/assets/global.css';
  import { initializeStores } from '@skeletonlabs/skeleton';
  import { getModalStore } from '@skeletonlabs/skeleton';
  import { get, writable } from 'svelte/store';
  import { debounce } from 'ts-debounce';
  import Icon from '@iconify/svelte';

  // Floating UI for Popups
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
  import { AppBar, AppShell, storePopup, type PopupSettings, popup, ListBox, ListBoxItem, RadioGroup, RadioItem, type ModalSettings, Modal, Avatar } from '@skeletonlabs/skeleton';
  storePopup.set({
    computePosition,
    autoUpdate,
    flip,
    shift,
    offset,
    arrow
  });

  let animeName = '';
  let animeNameSedurunge = '';
  let isVisible = true;
  let isUpdated = false;

  import { animeData, animeNamex, animeID } from '$lib/stores';
  // const preventContextMenu=(event) => {
  //   event.preventDefault();
  // };

  const popupFeatured: PopupSettings = {
    // Represents the type of event that opens/closed the popup
    event: 'click',
    // Matches the data-popup value on your popup element
    target: 'popupFeatured',
    // Defines which side of your trigger the popup will appear
    placement: 'bottom'
  };

  initializeStores();
  export const modalStore = getModalStore();

  const modal: ModalSettings = {
    type: 'component',
    component: 'exampleImage'
  };
  function triggerModal() {
    modalStore.trigger(modal);
  }

  const animeDataStore = writable([]);

  // async function searchAnimePromise(name) {
  //   // console.log('searchAnimePromise terpanggil, name: ' + name);
  //   animeData.set(0);
  //   try {
  //       const response = await fetch('https://api.jikan.moe/v4/anime?q=' + name + '&limit=5');
  //     if (response.ok && name) {
  //       const animeDatas = await response.json();
  //       const datos = animeDatas.data
  //       animeDataStore.set(datos);
  //       animeData.set(datos)
  //       // await sleep(5000);
  //       // console.log(JSON.stringify($animeDataStore));
  //       // await sleep(2000);
  //     } else {
  //       console.error('Failed to fetch data from the API');
  //       return false
  //     }
  //     // console.log('animeData: ' + JSON.stringify($animeData));
  //   } catch (error) {
  //     console.log(error);
  //     return false
  //   }
  //   return true;
  // }

  const searchAnimePromise = async (name) => {
    console.log('debounce terpanggil: ');
    animeData.set(0);
    try {
      const response = await fetch('https://api.jikan.moe/v4/anime?q=' + name + '&limit=5');
      if (response.ok && name) {
        const animeDatas = await response.json();
        const datos = animeDatas.data;
        animeDataStore.set(datos);
        animeData.set(datos);
        // await sleep(5000);
        // console.log(JSON.stringify($animeDataStore));
        // await sleep(2000);
      } else {
        console.log('animeData: ' + animeData);
        console.error('Failed to fetch data from the API');
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function searchAnimePromiseNoArrow(name) {
    debouncedFunction.cancel();
    console.log('debounce terpanggil no arrow: ');
    isUpdated = false;
    try {
      const response = await fetch('https://api.jikan.moe/v4/anime?q=' + name + '&limit=7');
      if (response.ok && name) {
        const animeDatas = await response.json();
        const datos = animeDatas.data;
        animeDataStore.set(datos);
        animeData.set(datos);
        isUpdated = true;
        // await sleep(5000);
        // console.log(JSON.stringify($animeDataStore));
        // await sleep(2000);
      } else {
        isUpdated = true;
        console.log('animeData: ' + animeData);
        console.error('Failed to fetch data from the API');
      }
    } catch (error) {
      isUpdated = true;
      console.log(error);
    }
  }

  const debouncedFunction = debounce(searchAnimePromiseNoArrow, 2000, { isImmediate: false });

  function handleKeyDown(event) {
    if (event.keyCode !== 8 || animeNameSedurunge.endsWith(' ')) {
      debouncedFunction(animeName);
    }
    animeNameSedurunge = animeName;
    if (event.key === 'F1') {
      // Execute your command here
      triggerModal();
    }
  }

  function animeIDSet(data) {
    if (data !== $animeData) {
      animeID.set(data.mal_id);
      console.log('data sama');
    } else {
      console.log('data sama');
    }
  }

  // animeID.set(data.mal_id)

  // $: debouncedFunction
  // $: animeData
  // $: animeName
  // $:  animeNamex;
  $: console.log('isUpdated: ' + isUpdated);
  $: isUpdated;
</script>

<!-- 
██╗░░██╗████████╗███╗░░░███╗██╗░░░░░
██║░░██║╚══██╔══╝████╗░████║██║░░░░░
███████║░░░██║░░░██╔████╔██║██║░░░░░
██╔══██║░░░██║░░░██║╚██╔╝██║██║░░░░░
██║░░██║░░░██║░░░██║░╚═╝░██║███████╗
╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░░░░╚═╝╚══════╝ 
-->

{#if $modalStore[0]}
  <div class="fixed left-1/2 transform -translate-x-1/2 z-[1000] p-25 opacity-0 transition-opacity ease-in-out duration-300" class:opacity-100={isVisible}>
    <section class="md:w-[500px] w-full text-token md:mt-40 mt-20 card">
      <input class="input rounded-lg md:w-full w-[400px]" style="text-decoration: none !important;" spellcheck="false" placeholder="Anime or Kdrama you want to lookup..." bind:value={animeName} on:keydown={handleKeyDown} />
      <ul class="list">
        <!-- {JSON.stringify($animeData)} -->
        {#if isUpdated}
          <!-- <div>The writable store has a value: {JSON.stringify($animeData)}</div> -->
          {#each Object.values($animeData) as data}
            <!-- {JSON.stringify(data.mal_id)}
           -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <a href="/weeb/{data.mal_id}"
              class="btn button-base-styles" 
              on:click={() => {modalStore.close(), console.log('ngestore');}}
            >
              <div class="w-[50px]">
                <Avatar src={data.images.jpg.small_image_url} initials={'awwww'} width="w-[50px]" />
              </div>
              <div class=" text-left left-0 w-full">
                <h6 class="h6 flex-auto text-left"><span class="chip variant-soft-primary rounded-full px-[4px] py-[1px]">Anime</span> {data.titles[0].title}</h6>
                <span class="chip variant-soft-primaryry px-[4px] py-[1px]">⭐ {data.score ? data.score : '...'} </span>
                <span class="chip variant-soft-primaryry px-[4px] py-[1px]">🗓️ {data.year ? data.year : '...'} </span>
                <span class="chip variant-soft-primaryry px-[4px] py-[1px]">🧬 {data.genres[0]?.name ? data.genres[0].name : '...'}</span>
                <!-- <span class="chip variant-filled-secondary">Anime</span>
                <span class="chip variant-filled-secondary">Anime</span> -->
              </div>
              <!-- <div class="grid grid-cols-1 grid-rows-2 gap-0">
                <div><span class="flex-auto text-left">{data.titles[0].title}</span></div>
                <div class="flex-auto">
                  <span class="chip variant-filled-secondary m-2">
                    <span>Anime</span>
                  </span>
                  <span class="chip variant-glass-secondary m-2">
                    <span>2019</span>
                  </span>
                  <span class="chip variant-glass-secondary m-2">
                    <span>Action</span>
                  </span>
                  <span class="chip variant-glass-secondary m-2">
                    <span>Adventure</span>
                  </span>
                  <span class="chip variant-glass-secondary m-2"> <span>⭐ 5</span></span>
                </div>
              </div> -->
              <span>⋮</span>
            </a>
          {/each}
        {:else}
          <!-- <div>The writable store does not have a value.</div> -->
        {/if}
        <!-- <b>{$animeDataStore.data[0].images.webp.image_url} {$animeData.data[0].images.webp.image_url}</b> -->
        <!-- <img src="{$animeData.data[0].images.webp.image_url}" alt=""> -->
        <!-- <b class="btn">{animeData.data[0].images.webp.image_url}</b> -->
        <!-- {#each get(animeData) as data}
          <li class="btn button-base-styles">
            <Avatar src={data.images.webp.image_url} width="w-12" />
            <span class="flex-auto">{data.titles[0].title}</span>
            <span>⋮</span>
          </li>
          {/each} -->
      </ul>
    </section>
  </div>
{/if}
<Modal />
<svelte:window on:keydown={handleKeyDown} />
<!-- <AppShell>
  <svelte:fragment slot="header">
    <AppBar background="bg-transparent {$modalStore[0] ? 'blur-md' : ''}">
      <svelte:fragment slot="lead">
        <!== <img src={ logo } class="w-10 ml-5" alt="" on:contextmenu={ preventContextMenu } /> ==>
        <div class="btn p-0 !bg-transparent pl-5 parent flex items-center justify-center">
          <div style="background-image:url({logo});" class=" image child md:w-14 md:h-11 w-10 h-8 bg-center bg-contain bg-no-repeat bg-cover" />
        </div>
      </svelte:fragment>
      <h4 class="btn h4 p-0">Berak Tulang</h4>
      <svelte:fragment slot="trail">
        <button class="btn !bg-transparent" use:popup={popupFeatured}>
          <AlignRight size="20" />
        </button>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
</AppShell> -->

<slot><!-- optional fallback --></slot>

<div class="fixed bottom-0 left-1/2 transform -translate-x-1/2 p-5 opacity-0 transition-opacity ease-in-out duration-300" class:opacity-100={isVisible}>
  <RadioGroup>
    <RadioItem active="" name="justify"><Icon icon="ri:home-line" width="30" /></RadioItem>
    <RadioItem active="" name="justify" on:click={() => triggerModal()}><Icon icon="ri:search-2-line" width="30" /></RadioItem>
    <RadioItem active="" name="justify"><Icon icon="ri:menu-4-fill" width="30" /></RadioItem>
  </RadioGroup>
</div>
