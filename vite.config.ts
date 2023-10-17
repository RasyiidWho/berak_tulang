import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import removeConsole from 'vite-plugin-svelte-console-remover';
export default defineConfig({
	plugins: [sveltekit(), purgeCss(), removeConsole()]
});
