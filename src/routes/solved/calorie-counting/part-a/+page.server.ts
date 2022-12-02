import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const input = data.get('input');

		console.log(data);

		const output = '';

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
