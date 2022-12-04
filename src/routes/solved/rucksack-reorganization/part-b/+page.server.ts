import { invalid } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const input = data.get('input');

		if (!input) return invalid(400, { error: { missing: true, input } });

		let score = 0;
		const inputData = input.toString().split('\r\n');

		let elves_group_lines = [];

		for (const line of inputData) {
			if (line == '') continue;

			elves_group_lines.push(line);
			if (elves_group_lines.length != 3) continue;

			const elf1 = elves_group_lines[0];
			const elf2 = elves_group_lines[1];
			const elf3 = elves_group_lines[2];

			const [common_item] = [...elf1].filter(
				(value, index) =>
					[...elf1].indexOf(value) === index &&
					[...elf2].includes(value) &&
					[...elf3].includes(value)
			);

			score += common_item.match(/[A-Z]/g)
				? common_item.charCodeAt(0) - 38
				: common_item.charCodeAt(0) - 96;

			elves_group_lines = [];
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
