<script lang="ts">
	import { challenges } from '$lib/challenges';
</script>

<div class="hero min-h-screen bg-base-200" style="background-image: url(/lots-of-bricks.jpg);">
	<div class="hero-overlay bg-opacity-80" />
	<div class="hero-content text-center text-white">
		<div class="max-w-md">
			<h1 class="text-5xl font-bold">Advent Of Code 2022</h1>
			<p class="py-6">An overengineered web app based solver for puzzles.</p>
		</div>
	</div>
</div>
<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6 bg-primary">
	<h2 class="col-span-full text-4xl text-primary-content pb-2 text-center font-bold">Challenges</h2>
	{#each $challenges as challenge, index}
		<div class="card w-full bg-base-100 shadow-xl image-full">
			<figure><img src="/rubiks-cube.jpg" alt="Rubiks Cube" /></figure>
			<div class="card-body">
				<h2 class="card-title">
					{challenge.name}
					{#if $challenges.length - 1 == index}<div class="badge badge-primary">NEW</div>{/if}
				</h2>
				<p>{challenge.description}</p>
				<div class="card-actions justify-around">
					{#if challenge.challengeA.isComplete}
						<a class="btn btn-secondary" href={challenge.challengeA.path}>Solution A</a>
					{/if}
					{#if challenge.challengeB.isComplete}
						<a class="btn btn-secondary" href={challenge.challengeA.path}>Solution B</a>
					{/if}
				</div>
			</div>
		</div>
	{/each}
</div>
