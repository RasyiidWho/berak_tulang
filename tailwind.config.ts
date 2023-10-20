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
			hide: {
				'#logo': {
				  display: 'none',
				},
			  },
			animation: {
				'spin-slow': 'spin 10s linear infinite',
				'spin-slowly': 'spin 60s linear infinite',
				'pulse-slow': 'ping 1s linear infinite',
				'unblur-05': 'unblur 0.5s',
			  },
			  keyframes: {
				mbuhopo: {
					'transform' : 'translateZ(0.0001px) rotateY(-14.1176470588deg)'
				},
				wiggle: {
				  '0%, 100%': { transform: 'rotate(-6deg)' },
				  '50%': { transform: 'rotate(6deg)' },
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
