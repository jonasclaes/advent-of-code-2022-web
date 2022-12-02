export type Challenge = {
	name: string;
	description: string;
    challengeA: {
        isComplete: boolean;
    }
    challengeB: {
        isComplete: boolean;
    }
};

export const challenges: Challenge[] = [
	{
		name: 'Calorie Counting',
		description: 'Elves have to count calories',
        challengeA: {
            isComplete: true
        },
        challengeB: {
            isComplete: true
        }
	},
	{
		name: 'Rock, paper, scissors',
		description: 'Playing rock, paper, scissors between elves',
		challengeA: {
            isComplete: true
        },
        challengeB: {
            isComplete: true
        }
	}
];