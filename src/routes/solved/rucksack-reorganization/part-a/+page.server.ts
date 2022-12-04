import { invalid } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const input = data.get('input');

		if (!input) return invalid(400, { error: { missing: true, input } });

		let score = 0;
		const inputData = input.toString().split('\r\n');
		for (const line of inputData) {
			if (line == '') continue;

			const compartment1 = line.substring(0, line.length / 2);
			const compartment2 = line.substring(line.length / 2);

			const [common_item] = [...compartment1].filter(
				(value, index) =>
					[...compartment1].indexOf(value) === index && [...compartment2].includes(value)
			);

			score += common_item.match(/[A-Z]/g)
				? common_item.charCodeAt(0) - 38
				: common_item.charCodeAt(0) - 96;
		}

		const output = `The sum of the priorities of the common item types is: ${score}\r\n`;

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
