<script>
	import { fly } from 'svelte/transition';

	let {
		children,
		x = -40,
		duration = 600,
		delay = 0,
		threshold = 0.15,
		once = true,
		class: className = ''
	} = $props();
	let visible = $state(false);
	const reduceMotion =
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	function inViewport(node, options = {}) {
		let observer;

		$effect(() => {
			observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						node.dispatchEvent(new CustomEvent('enterviewport'));
						if (options.once !== false) observer.disconnect();
					}
				},
				{ threshold: options.threshold ?? 0.15 }
			);
			observer.observe(node);

			return () => observer.disconnect();
		});
	}
</script>

<div
	use:inViewport={{ threshold, once }}
	onenterviewport={() => (visible = true)}
	class={className}
>
	{#if visible}
		<div transition:fly={{ x: reduceMotion ? 0 : x, duration: reduceMotion ? 0 : duration, delay }}>
			{@render children()}
		</div>
	{/if}
</div>
