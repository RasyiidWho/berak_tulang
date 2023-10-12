<script lang="ts">
	import '../app.postcss';
	import logo from '$lib/assets/berak.png';
	import { AlignRight, Fingerprint, Home } from 'lucide-svelte';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import {
		AppBar,
		AppShell,
		storePopup,
		type PopupSettings,
		popup,
		ListBox,
		ListBoxItem
	} from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// const preventContextMenu = (event) => {
	//   event.preventDefault();
	// };

	function preventContextMenu(event) {
		event.preventDefault();
	}

	const popupFeatured: PopupSettings = {
		// Represents the type of event that opens/closed the popup
		event: 'click',
		// Matches the data-popup value on your popup element
		target: 'popupFeatured',
		// Defines which side of your trigger the popup will appear
		placement: 'bottom'
	};

	let valueSingle: string = 'books';
	import './global.css';
</script>

<div class="card" data-popup="popupFeatured">
	<!-- <div class="grid grid-cols-1 gap-4 justify-start items-start">
		<button type="button" class="btn !bg-transparent">
			<span><Home /></span>
			<span>Homepage</span>
		</button>
		<a href="/blog" type="button" class="btn !bg-transparent">
			<span><Fingerprint /></span>
			<span>Blog</span>
		</a>
	</div> -->

	<ListBox active="variant-filled">
		<ListBoxItem
			bind:group={valueSingle}
			name="medium"
			value="books"
			padding="px-10"
			class="flex items-center"
		>
			<div class="flex items-center">
				<Home class="mr-2 my-2" name="home" />
				<span>Home</span>
			</div>
		</ListBoxItem>
		<ListBoxItem
			bind:group={valueSingle}
			name="small"
			value="pencil"
			padding="px-10"
			class="flex items-center"
		>
			<div class="flex items-center">
				<Home class="mr-2 my-2" name="edit" />
				<span>Edit</span>
			</div>
		</ListBoxItem>
		<ListBoxItem
			bind:group={valueSingle}
			name="large"
			value="inbox"
			padding="px-10"
			class="flex items-center"
		>
			<div class="flex items-center">
				<Home class="mr-2 my-2" name="inbox" />
				<span>Inbox</span>
			</div>
		</ListBoxItem>
		<ListBoxItem
			bind:group={valueSingle}
			name="x-large"
			value="user"
			padding="px-10"
			class="flex items-center"
		>
			<div class="flex items-center">
				<Home class="mr-2 my-2" name="user" />
				<span>User</span>
			</div>
		</ListBoxItem>
	</ListBox>
</div>
<AppShell>
	<svelte:fragment slot="header">
		<AppBar background="bg-transparent">
			<svelte:fragment slot="lead">
				<!-- <img src={logo} class="w-10 ml-5" alt="" on:contextmenu={preventContextMenu} /> -->
				<div class="btn p-0 !bg-transparent pl-5 parent flex items-center justify-center">
					<div style="background-image: url({logo});" class=" image child md:w-14 md:h-11 w-10 h-8 bg-center bg-contain bg-no-repeat bg-cover"
					/>
				</div>
			</svelte:fragment>
			<h4 class="btn h4 p-0">Berak Tulang</h4>
			<div>
				
			</div>
			<svelte:fragment slot="trail">
				<button class="btn !bg-transparent" use:popup={popupFeatured}
					><AlignRight size="20" />
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>
