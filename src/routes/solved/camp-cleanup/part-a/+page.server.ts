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

		const inputData = input.toString().split('\r\n');

		let totalPairs = 0;

		for (const line of inputData) {
			if (line === '') {
				continue;
			}

			const [assignment1, assignment2] = line
				.split(',')
				.map((assignment) => assignment.split('-'))
				.map((assignment) => assignment.map((value) => parseInt(value)));

			if (
				(assignment1[0] <= assignment2[0] && assignment1[1] >= assignment2[1]) ||
				(assignment2[0] <= assignment1[0] && assignment2[1] >= assignment1[1])
			) {
				output += `Found a match for assignments: ${assignment1} and ${assignment2}\r\n`;
				totalPairs += 1;
			}
		}

		output += `The total pairs is: ${totalPairs}\r\n`;

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
