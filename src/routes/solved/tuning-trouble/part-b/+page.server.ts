import { invalid } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const input = data.get('input');

		if (!input) return invalid(400, { error: { missing: true, input } });

		const markerLength = 14;
		let markerStart = 0;

		const inputData = input.toString().split('\r\n');
		const line = inputData[0];

		for (let index = markerLength; index < line.length; index++) {
			if (new Set([...line.substring(index, index + markerLength)]).size == markerLength) {
				markerStart = index + markerLength;
				break;
			}
		}

		const output = `The first marker is found after processing ${markerStart} characters.\r\n`;

		return {
			success: true,
			formData: {
				input
			},
			data: {
				output
			}
		};
	}
};
