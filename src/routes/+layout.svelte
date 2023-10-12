<script lang="ts">
	import '../app.postcss';
	import logo from '$lib/assets/berak.png';
	import { AlignRight } from 'lucide-svelte';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { AppBar, AppShell, storePopup, type PopupSettings, popup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	const popupFeatured: PopupSettings = {
	// Represents the type of event that opens/closed the popup
	event: 'click',
	// Matches the data-popup value on your popup element
	target: 'popupFeatured',
	// Defines which side of your trigger the popup will appear
	placement: 'bottom',
};
</script>

<div class="card p-4 shadow-xl" data-popup="popupFeatured">
<button type="button" class="btn variant-filled-surface">
	<span></span>
	<span>Button</span>
</button>
</div>
<AppShell>
	<svelte:fragment slot="header">
		<AppBar background="bg-transparent">
			<svelte:fragment slot="lead">
				<img src={logo} class="w-10" alt="" />
			</svelte:fragment>
			Berak Tulang
			<svelte:fragment slot="trail" >
				<button class="btn !bg-transparent" use:popup={popupFeatured}><AlignRight size="20" /></button>
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
