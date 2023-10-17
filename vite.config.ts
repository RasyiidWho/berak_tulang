import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import removeConsole from 'vite-plugin-svelte-console-remover';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), purgeCss(), removeConsole()]
});
