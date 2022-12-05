<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;

	let loading = false;
</script>

<form class="p-6 grid gap-4 grid-cols-1 md:grid-cols-2" method="POST">
	<div>
		<div class="form-control">
			<label class="label" for="input">
				<span class="label-text">Input</span>
			</label>
			<textarea
				class="textarea textarea-bordered h-24"
				placeholder="Your input here..."
				id="input"
				name="input"
				value={form?.formData?.input ?? ''}
			/>
			<label class="label" for="input">
				<span class="label-text-alt">Please enter your input here.</span>
			</label>
		</div>
		<button class="btn">Submit my input!</button>
	</div>
	<div>
		<div class="form-control">
			<label class="label" for="output">
				<span class="label-text">Output</span>
			</label>
			<textarea
				class="textarea textarea-bordered h-24"
				placeholder="Soon there will be output..."
				id="output"
				name="output"
				disabled
				value={form?.data?.output ?? ''}
			/>
			<label class="label" for="output">
				<span class="label-text-alt">The output of the program ends up here.</span>
			</label>
		</div>
	</div>
</form>
