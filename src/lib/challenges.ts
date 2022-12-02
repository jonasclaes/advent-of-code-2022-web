import { readable } from 'svelte/store';

export type Challenge = {
	isComplete: boolean;
	path: string;
};

export type DailyChallenge = {
	name: string;
	description: string;
	challengeA: Challenge;
	challengeB: Challenge;
};

export const challenges = readable<DailyChallenge[]>([], (set) => {
	set([
		{
			name: 'Calorie Counting',
			description: 'Elves have to count calories',
			challengeA: {
				isComplete: true,
				path: '/solved/calorie-counting/part-a'
			},
			challengeB: {
				isComplete: true,
				path: '/solved/calorie-counting/part-b'
			}
		},
		{
			name: 'Rock, paper, scissors',
			description: 'Playing rock, paper, scissors between elves',
			challengeA: {
				isComplete: true,
				path: '/solved/rock-paper-scissors/part-a'
			},
			challengeB: {
				isComplete: true,
				path: '/solved/rock-paper-scissors/part-b'
			}
		}
	]);
});
