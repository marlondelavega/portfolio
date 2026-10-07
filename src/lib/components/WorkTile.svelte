<script lang="ts">
	import { CodeXml, Palette, Play } from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	import type { Work } from '$lib/data/works.js';

	let { work, onOpen }: { work: Work; onOpen: (work: Work) => void } = $props();

	let isDev = $derived(work.kind === 'dev');

	const kindStyle = {
		dev: {
			label: 'App',
			icon: CodeXml,
			ring: 'ring-primary/50 shadow-[0_0_28px_-8px_var(--color-primary)]',
			badge: 'bg-primary text-primary-content',
			overlayLabel: 'Web App',
			primaryAction: null as string | null,
			linkLabel: 'Visit live demo'
		},
		design: {
			label: 'Design',
			icon: Palette,
			ring: 'ring-accent/50 shadow-[0_0_28px_-8px_var(--color-accent)]',
			badge: 'bg-accent text-accent-content',
			overlayLabel: 'Design',
			primaryAction: 'View full size',
			linkLabel: null as string | null
		},
		video: {
			label: 'Video',
			icon: Play,
			ring: 'ring-secondary/50 shadow-[0_0_28px_-8px_var(--color-secondary)]',
			badge: 'bg-secondary text-secondary-content',
			overlayLabel: 'Video',
			primaryAction: 'Play video',
			linkLabel: 'Watch on YouTube'
		}
	} as const;

	let style = $derived(kindStyle[work.kind]);
	let Icon = $derived(style.icon);
	const reduceMotion =
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	let active = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	function arm() {
		clearTimeout(timer);
		timer = setTimeout(() => (active = true), 500);
	}

	function disarm() {
		clearTimeout(timer);
		active = false;
	}

	function go() {
		if (isDev && work.demoUrl) {
			window.open(work.demoUrl, '_blank', 'noopener,noreferrer');
		} else {
			onOpen(work);
		}
	}

	function handleClick() {
		if (active) {
			go();
		} else {
			arm();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			go();
		}
	}

	function openFromOverlay(event: MouseEvent) {
		event.stopPropagation();
		go();
	}
</script>

<div
	role="button"
	tabindex="0"
	class="group/tile relative block w-full cursor-pointer overflow-hidden rounded-3xl ring-2 transition-shadow duration-300 {style.ring}"
	onpointerenter={arm}
	onpointerleave={disarm}
	onfocus={arm}
	onblur={disarm}
	onclick={handleClick}
	onkeydown={handleKeydown}
>
	<span
		class="absolute top-3 left-3 z-10 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium {style.badge}"
	>
		<Icon class="size-3" />
		{style.label}
	</span>

	<img
		src={work.url}
		alt={work.title}
		loading="lazy"
		class="block w-full scale-100 transition-[transform_700ms_ease-in-out,filter_700ms_cubic-bezier(0.16,1,0.3,1)] group-hover/tile:scale-105 {active
			? 'blur-sm'
			: ''}"
	/>

	{#if active}
		<div
			class="absolute inset-0 flex flex-col justify-end gap-2 bg-linear-to-t from-black/80 via-black/30 to-transparent p-4 text-left text-white"
			transition:fade={{ duration: reduceMotion ? 0 : 200 }}
		>
			<p class="text-xs font-medium tracking-wide text-white/70 uppercase">
				{style.overlayLabel}
			</p>
			<p class="text-base leading-tight font-semibold">{work.title}</p>
			<div class="mt-1 flex flex-wrap gap-2">
				{#if style.primaryAction}
					<button type="button" class="btn btn-primary btn-sm" onclick={openFromOverlay}>
						{style.primaryAction}
					</button>
				{/if}
				{#if work.demoUrl && style.linkLabel}
					<a
						href={work.demoUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-sm {style.primaryAction ? '' : 'btn-primary'}"
						onclick={(event) => event.stopPropagation()}
					>
						{style.linkLabel}
					</a>
				{/if}
			</div>
		</div>
	{/if}
</div>
