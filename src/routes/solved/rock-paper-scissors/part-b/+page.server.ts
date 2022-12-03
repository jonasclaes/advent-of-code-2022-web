import { invalid } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const input = data.get('input');

		if (!input) return invalid(400, { error: { missing: true, input } });

		enum Draw {
			ROCK = 1,
			PAPER = 2,
			SCISSORS = 3
		}

		const WantedOutcomes: Record<string, string> = {
			X: 'LOSE',
			Y: 'DRAW',
			Z: 'WIN'
		};

		const Symbols: Record<string, number> = {
			A: Draw.ROCK,
			B: Draw.PAPER,
			C: Draw.SCISSORS
		};

		const Effects: Record<string, Record<string, number>> = {
			WIN: {
				[Draw.ROCK]: Draw.PAPER,
				[Draw.PAPER]: Draw.SCISSORS,
				[Draw.SCISSORS]: Draw.ROCK
			},
			LOSE: {
				[Draw.ROCK]: Draw.SCISSORS,
				[Draw.PAPER]: Draw.ROCK,
				[Draw.SCISSORS]: Draw.PAPER
			}
		};

		enum Outcomes {
			WIN = 6,
			DRAW = 3,
			LOSE = 0
		}

		const scores: number[] = [];
		const inputData = input.toString().split('\r\n');
		for (const line of inputData) {
			if (line == '') continue;

			const [player1, end] = line.split(' ');

			let score = Outcomes[WantedOutcomes[end] as keyof typeof Outcomes];
			score +=
				WantedOutcomes[end] == 'DRAW'
					? Symbols[player1]
					: Effects[WantedOutcomes[end] as keyof typeof Effects][Symbols[player1]];

			scores.push(score);
		}

		const output = `Following the strategy guide, your total score is: ${scores.reduce(
			(acc, cursor) => acc + cursor
		)}\r\n`;

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
