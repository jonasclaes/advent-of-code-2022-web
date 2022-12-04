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
				.map((assignment) => assignment.map((value) => parseInt(value)))
				.map((assignment) =>
					Array.from(new Array(assignment[1] - assignment[0] + 1), (x, i) => i + assignment[0])
				);

			const assignmentIntersection = assignment1.filter((value) => assignment2.includes(value));

			if (assignmentIntersection.length > 0) {
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
