import { join } from 'path'
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { Amoled } from './src/Amoled'

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {
			animation: {
				'spin-slow': 'spin 12s linear infinite',
				'unblur-05': 'unblur 0.5s',
			  },
			  keyframes: {
				wiggle: {
				  '0%, 100%': { transform: 'rotate(-3deg)' },
				  '50%': { transform: 'rotate(3deg)' },
				},
				'bounce-10s': {
					'0%': {
					  transform: 'translateY(0)',
					},
					'50%': {
					  transform: 'translateY(-200px)',
					},
					'100%': {
					  transform: 'translateY(0)',
					},
				},
				'unblur': {
					'0%': {
					  filter: 'blur(60px)',
					},
					'100%': {
					  filter: 'blur(0)',
					},
				  },
			  }
		},
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				custom: [
					Amoled,
				],
			},
		}),
	],
} satisfies Config;
