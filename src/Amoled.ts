// You can also use the generator at https://skeleton.dev/docs/generator to create these values for you
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';
export const Amoled: CustomThemeConfig = {
	name: 'Amoled',
	properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		"--theme-font-family-heading": `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "16px",
		"--theme-rounded-container": "16px",
		"--theme-border-base": "2px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "0 0 0",
		"--on-success": "255 255 255",
		"--on-warning": "255 255 255",
		"--on-error": "255 255 255",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #F2A057 
		"--color-primary-50": "253 241 230", // #fdf1e6
		"--color-primary-100": "252 236 221", // #fcecdd
		"--color-primary-200": "252 231 213", // #fce7d5
		"--color-primary-300": "250 217 188", // #fad9bc
		"--color-primary-400": "246 189 137", // #f6bd89
		"--color-primary-500": "242 160 87", // #F2A057
		"--color-primary-600": "218 144 78", // #da904e
		"--color-primary-700": "182 120 65", // #b67841
		"--color-primary-800": "145 96 52", // #916034
		"--color-primary-900": "119 78 43", // #774e2b
		// secondary | #F29E6D 
		"--color-secondary-50": "253 240 233", // #fdf0e9
		"--color-secondary-100": "252 236 226", // #fcece2
		"--color-secondary-200": "252 231 219", // #fce7db
		"--color-secondary-300": "250 216 197", // #fad8c5
		"--color-secondary-400": "246 187 153", // #f6bb99
		"--color-secondary-500": "242 158 109", // #F29E6D
		"--color-secondary-600": "218 142 98", // #da8e62
		"--color-secondary-700": "182 119 82", // #b67752
		"--color-secondary-800": "145 95 65", // #915f41
		"--color-secondary-900": "119 77 53", // #774d35
		// tertiary | #F2E205 
		"--color-tertiary-50": "253 251 218", // #fdfbda
		"--color-tertiary-100": "252 249 205", // #fcf9cd
		"--color-tertiary-200": "252 248 193", // #fcf8c1
		"--color-tertiary-300": "250 243 155", // #faf39b
		"--color-tertiary-400": "246 235 80", // #f6eb50
		"--color-tertiary-500": "242 226 5", // #F2E205
		"--color-tertiary-600": "218 203 5", // #dacb05
		"--color-tertiary-700": "182 170 4", // #b6aa04
		"--color-tertiary-800": "145 136 3", // #918803
		"--color-tertiary-900": "119 111 2", // #776f02
		// success | #00841e 
		"--color-success-50": "217 237 221", // #d9eddd
		"--color-success-100": "204 230 210", // #cce6d2
		"--color-success-200": "191 224 199", // #bfe0c7
		"--color-success-300": "153 206 165", // #99cea5
		"--color-success-400": "77 169 98", // #4da962
		"--color-success-500": "0 132 30", // #00841e
		"--color-success-600": "0 119 27", // #00771b
		"--color-success-700": "0 99 23", // #006317
		"--color-success-800": "0 79 18", // #004f12
		"--color-success-900": "0 65 15", // #00410f
		// warning | #BE4A4B 
		"--color-warning-50": "245 228 228", // #f5e4e4
		"--color-warning-100": "242 219 219", // #f2dbdb
		"--color-warning-200": "239 210 210", // #efd2d2
		"--color-warning-300": "229 183 183", // #e5b7b7
		"--color-warning-400": "210 128 129", // #d28081
		"--color-warning-500": "190 74 75", // #BE4A4B
		"--color-warning-600": "171 67 68", // #ab4344
		"--color-warning-700": "143 56 56", // #8f3838
		"--color-warning-800": "114 44 45", // #722c2d
		"--color-warning-900": "93 36 37", // #5d2425
		// error | #BF4E4E 
		"--color-error-50": "245 228 228", // #f5e4e4
		"--color-error-100": "242 220 220", // #f2dcdc
		"--color-error-200": "239 211 211", // #efd3d3
		"--color-error-300": "229 184 184", // #e5b8b8
		"--color-error-400": "210 131 131", // #d28383
		"--color-error-500": "191 78 78", // #BF4E4E
		"--color-error-600": "172 70 70", // #ac4646
		"--color-error-700": "143 59 59", // #8f3b3b
		"--color-error-800": "115 47 47", // #732f2f
		"--color-error-900": "94 38 38", // #5e2626
		// surface | #0d0d0d 
		"--color-surface-50": "219 219 219", // #dbdbdb
		"--color-surface-100": "207 207 207", // #cfcfcf
		"--color-surface-200": "195 195 195", // #c3c3c3
		"--color-surface-300": "158 158 158", // #9e9e9e
		"--color-surface-400": "86 86 86", // #565656
		"--color-surface-500": "13 13 13", // #0d0d0d
		"--color-surface-600": "12 12 12", // #0c0c0c
		"--color-surface-700": "10 10 10", // #0a0a0a
		"--color-surface-800": "8 8 8", // #080808
		"--color-surface-900": "6 6 6", // #060606
		
	}
}