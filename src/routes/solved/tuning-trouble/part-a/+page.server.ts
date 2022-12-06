import { invalid } from '@sveltejs/kit';
import type { Actions } from './$types';

const insertElement = <T>(arr: T[], elem: T, maxLength: number = 4): T[] => {
	arr.push(elem);

	if (arr.length > maxLength) arr = arr.slice(1);

	return arr;
};

const isUnique = <T>(arr: T[], uniqueValues: number = 4): boolean => {
	const unique = [...new Set(arr)];
	return unique.length == 4;
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const input = data.get('input');

		if (!input) return invalid(400, { error: { missing: true, input } });

		const inputData = input.toString().split('\r\n');

		let output = '';

		let characterBuffer: string[] = [];
		let characterCount = 0;
		for (let character of inputData[0]) {
			characterBuffer = insertElement(characterBuffer, character);

			if (isUnique(characterBuffer)) {
				output += `The start sequence was found at ${characterCount + 1}`;
				break;
			}

			characterCount++;
		}

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
