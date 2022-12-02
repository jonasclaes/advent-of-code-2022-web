<script>
	export const prerender = true;
	import '../app.css';
</script>

<div class="flex flex-col h-screen justify-between">
	<slot />
	<footer class="footer footer-center p-4 bg-secondary text-secondary-content">
		<div>
			<p>
				This site is fully open-source and available at <a
					href="https://github.com/jonasclaes/advent-of-code-2022-web"
					target="_blank"
					rel="noopener noreferrer"
					class="link">GitHub</a
				>
			</p>
			<p>
				Created by <a
					href="https://jonasclaes.be"
					target="_blank"
					rel="noopener noreferrer"
					class="link">Jonas Claes</a
				>
				and
				<a href="https://syandelbart.com" target="_blank" rel="noopener noreferrer" class="link"
					>Syan Delbart</a
				>
			</p>
		</div>
	</footer>
</div>
