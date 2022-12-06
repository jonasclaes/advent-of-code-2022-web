import { invalid } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const input = data.get('input');

		if (!input) return invalid(400, { error: { missing: true, input } });

		const inputData = input.toString().split('\r\n');
		const cargoList : Array<Array<string>> = [];
		let rev = false;

		for (const line of inputData) {
			const lineFormatted = line.trim();
			const lineChunks = [...line]

			if(!lineFormatted.match(/^move/g)) {
				let letter_index = 0;
				for (let letter = 1; letter < lineChunks.length; letter+=4) {
					const cursor = lineChunks[letter];

					if( cargoList.length < letter_index + 1) {
						cargoList.push([]);
					}

					if(cursor != " " && !cursor.match(/[0-9]/g)) {
						cargoList[letter_index].push(cursor);
					}

					letter_index += 1;
					
				}
			} else {
				if(!rev) {
					for (let stack = 0; stack < cargoList.length; stack++) {
						const stackList = cargoList[stack];
						stackList.reverse();
						rev = true;
					}
				}

				if(line != " ") {
					const move_split = Array.from(lineFormatted.matchAll(/\d{1,2}/g),(x) => parseInt(x[0]));
					const [moveAmount, origin, destination] = move_split;

					const listToAppend = []



					for (let moveCursor = 0; moveCursor < moveAmount; moveCursor++) {
						listToAppend.push(cargoList[origin - 1].pop());
					}

					listToAppend.reverse();

					for (let toAppend = 0; toAppend < listToAppend.length; toAppend++) {
						cargoList[destination - 1].push(listToAppend[toAppend] || "");
					}
				}
			}
		}

		const letters = cargoList.map((value) => value.pop()).join("");

		const output = `The top of each stack is the following : ${letters}\r\n`;

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
