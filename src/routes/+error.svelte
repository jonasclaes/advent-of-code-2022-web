<script>
	import { page } from '$app/stores';
	function goBack() {
		history.back();
	}
</script>

<div class="hero min-h-screen bg-base-200" style="background-image: url(/sad-lego-dude.jpg);">
	<div class="hero-overlay bg-opacity-80" />
	<div class="hero-content text-center text-white">
		<div class="max-w-2xl">
			<h1 class="text-5xl font-bold">{$page.status} - {$page.error?.message}</h1>
			<p class="py-6 text-lg">
				Oh no! It looks like something went wrong here... Please try again later!
			</p>
			<button class="btn btn-primary" on:click={goBack}>Go back</button>
		</div>
	</div>
</div>
