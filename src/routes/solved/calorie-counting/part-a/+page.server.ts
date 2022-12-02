import { invalid } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const input = data.get('input');

		if (!input) {
			return invalid(400, { error: { missing: true, input } });
		}

        let output = '';

        const inputData = input.toString().split("\r\n")

        const elves: number[] = []

        let currentElf: number[] = []
        for (const line of inputData) {
            if (line === "") {
                elves.push(currentElf.reduce((acc, x) => acc += x))
                currentElf = []
            } else {
                currentElf.push(parseInt(line))
            }
        }

        output += `The maximum amount of calories is: ${Math.max(...elves)}\r\n`

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
