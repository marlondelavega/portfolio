<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import { Info, Mail, Copy, Check, BriefcaseBusiness } from '@lucide/svelte';
	import me from '$lib/assets/photos/me.jpg';
	import { fly } from 'svelte/transition';
	import IntersectionObserver from '$lib/components/IntersectionObserver.svelte';
	import { designSkills, devSkills, randomRotate } from '$lib/data/skills.js';
	import BrandIcon from '$lib/components/BrandIcon.svelte';
	import { type SimpleIcon } from 'simple-icons';

	const email = 'marlondelaveg4@gmail.com';

	const designFiles = import.meta.glob('$lib/assets/designs/web/*.png', {
		eager: true,
		query: '?url',
		import: 'default'
	}) as Record<string, string>;

	const works = Object.entries(designFiles)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([path, url]) => ({
			url,
			title: path
				.split('/')
				.pop()!
				.replace(/\.png$/, '')
				.replace(/\b\w/g, (c) => c.toUpperCase())
		}));

	let activeWork: { url: string; title: string } | null = $state(null);
	let workDialog: HTMLDialogElement | undefined = $state();

	function openWork(work: { url: string; title: string }) {
		activeWork = work;
		workDialog?.showModal();
	}

	let activeSkillTab: 'dev' | 'design' = $state('dev');
	const reduceMotion =
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	let activeSkills = $derived(activeSkillTab === 'dev' ? devSkills : designSkills);
	let skillRotations = $derived(activeSkills.map(() => randomRotate()));

	let infoDialog: HTMLDialogElement | undefined = $state();
	let contactDialog: HTMLDialogElement | undefined = $state();
	let copied = $state(false);

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(email);
			copied = true;
			setTimeout(() => (copied = false), 1500);
		} catch {
			copied = false;
		}
	}
</script>

<div class="drafting-grid flex h-dvh w-full flex-col gap-4 bg-base-300 p-4 lg:flex-row">
	<aside class="z-50 flex h-full w-full flex-col gap-4 lg:max-w-md">
		<!-- logo & buttons -->
		<IntersectionObserver>
			<section class="card flex flex-row justify-between rounded-3xl bg-base-100 p-4" in:fly>
				<div class="ml-3 size-8"><Logo /></div>

				<div class="flex flex-row gap-2">
					<button class="btn inline-flex btn-sm lg:hidden">
						<Mail class="size-5" />
						<span>My works</span>
					</button>

					<button class="btn btn-primary btn-sm" onclick={() => infoDialog?.showModal()}>
						<Info class="size-5 fill-primary" />
						<span>Info</span>
					</button>

					<button class="btn btn-sm" onclick={() => contactDialog?.showModal()}>
						<Mail class="size-5" />
						<span>Contact me</span>
					</button>
				</div>
			</section>
		</IntersectionObserver>

		<IntersectionObserver delay={200}>
			<section class="card flow-root gap-2 rounded-3xl bg-base-100 p-4">
				<div class="avatar float-left mr-4 mb-2">
					<div class="size-32 rounded-2xl">
						<img alt="Marlon de la Vega" src={me} class="size-full object-cover" />
					</div>
				</div>

				<div class="leading-4.5">
					Hi, I'm <strong class="font-bold tracking-tight text-base-content"
						>Marlon de la Vega</strong
					>
					— a Full-Stack Developer and Graphic Designer with 3 years of experience. I build web-based
					information systems for local government, from citation management to investment planning tools,
					and design logos, layouts, and materials for government events and campaigns.
					<button
						type="button"
						class="cursor-pointer font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
						onclick={() => infoDialog?.showModal()}
					>
						Know more about me...
					</button>
				</div>
			</section>
		</IntersectionObserver>

		<div class="flex min-h-0 grow flex-col gap-2">
			<IntersectionObserver delay={400}>
				<div class="join w-full">
					<button
						type="button"
						class="btn join-item flex-1 btn-sm {activeSkillTab === 'dev'
							? 'btn-primary'
							: 'bg-base-100'}"
						aria-pressed={activeSkillTab === 'dev'}
						onclick={() => (activeSkillTab = 'dev')}
					>
						Development
					</button>
					<button
						type="button"
						class="btn join-item flex-1 btn-sm {activeSkillTab === 'design'
							? 'btn-primary'
							: 'bg-base-100'}"
						aria-pressed={activeSkillTab === 'design'}
						onclick={() => (activeSkillTab = 'design')}
					>
						Design
					</button>
				</div>
			</IntersectionObserver>

			<IntersectionObserver delay={600} class="min-h-0 flex-1 overflow-auto">
				{#key activeSkillTab}
					<section
						class="thin-scroll card relative flex flex-col items-start gap-2 rounded-3xl bg-base-100 p-2"
						in:fly={{ x: reduceMotion ? 0 : -40, duration: reduceMotion ? 0 : 400 }}
					>
						{#each activeSkills as skill, i}
							{@render SkillCard(
								skill.name,
								skill.text,
								skill.icon,
								skill.level,
								skillRotations[i]
							)}
						{/each}
					</section>
				{/key}
			</IntersectionObserver>
		</div>
	</aside>

	<main
		class="card hidden h-full w-full min-w-2xl rounded-4xl bg-base-200 p-4 shadow-lg lg:flex lg:flex-col lg:gap-4"
	>
		<section
			class="card flex flex-row items-center gap-2 self-start rounded-3xl bg-base-100 px-4 py-2"
		>
			<BriefcaseBusiness class="size-5" />
			<span>My works</span>
		</section>

		<IntersectionObserver
			delay={800}
			class="thin-scroll min-h-0 flex-1 overflow-auto rounded-3xl bg-base-100 p-4"
		>
			<div class="columns-2 gap-4">
				{#each works as work (work.url)}
					<button
						type="button"
						class="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-3xl bg-base-200 focus-visible:outline-offset-4"
						onclick={() => openWork(work)}
					>
						<img
							src={work.url}
							alt={work.title}
							loading="lazy"
							class="block w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
						/>
					</button>
				{/each}
			</div>
		</IntersectionObserver>
	</main>

	<dialog bind:this={workDialog} class="modal">
		<div class="modal-box w-11/12 max-w-5xl p-3">
			<form method="dialog">
				<button class="btn absolute top-3 right-3 z-10 btn-circle btn-ghost btn-sm">✕</button>
			</form>
			{#if activeWork}
				<img
					src={activeWork.url}
					alt={activeWork.title}
					class="max-h-[80vh] w-full rounded-2xl object-contain"
				/>
				<p class="mt-3 text-sm font-medium">{activeWork.title}</p>
			{/if}
		</div>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
</div>

<dialog bind:this={infoDialog} class="modal">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn absolute top-3 right-3 btn-circle btn-ghost btn-sm">✕</button>
		</form>

		<div class="avatar mb-4">
			<div class="size-20 rounded-2xl">
				<img alt="Marlon de la Vega" src={me} class="size-full object-cover" />
			</div>
		</div>

		<h3 class="text-lg font-bold">Marlon de la Vega</h3>
		<p class="text-sm text-base-content/70">Full-Stack Developer &amp; Graphic Designer</p>

		<p class="mt-4 leading-5">
			I'm a Full-Stack Developer and Graphic Designer with 3 years of experience building web-based
			information systems for local government — from citation management to investment planning
			tools — and designing logos, layouts, and materials for government events and campaigns.
		</p>
		<p class="mt-3 leading-5">
			On the development side I work mainly with SvelteKit, TailwindCSS, and MongoDB, and I'm
			comfortable across React, SolidJS, and PHP/MySQL stacks. On the design side I use the Adobe
			Creative Suite to produce visual materials end-to-end, from concept to print-ready files.
		</p>

		<div class="modal-action">
			<button
				class="btn btn-primary btn-sm"
				onclick={() => {
					infoDialog?.close();
					contactDialog?.showModal();
				}}
			>
				<Mail class="size-4" />
				Contact me
			</button>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<dialog bind:this={contactDialog} class="modal">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn absolute top-3 right-3 btn-circle btn-ghost btn-sm">✕</button>
		</form>

		<h3 class="text-lg font-bold">Contact me</h3>
		<p class="mt-1 text-sm text-base-content/70">
			Feel free to reach out for work, collaborations, or questions.
		</p>

		<div class="mt-4 flex items-center gap-2 rounded-xl bg-base-200 p-3">
			<Mail class="size-5 shrink-0" />
			<a href="mailto:{email}" class="grow truncate underline">{email}</a>
			<button
				type="button"
				class="btn btn-square btn-ghost btn-sm"
				aria-label="Copy email address"
				onclick={copyEmail}
			>
				{#if copied}
					<Check class="size-4 text-success" />
				{:else}
					<Copy class="size-4" />
				{/if}
			</button>
		</div>

		<div class="modal-action">
			<a href="mailto:{email}" class="btn btn-primary btn-sm">
				<Mail class="size-4" />
				Email me
			</a>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

{#snippet SkillCard(name: string, text: string, icon: SimpleIcon, level: string, rotate: number)}
	<div
		class="group relative flex w-full flex-row items-center gap-4 overflow-hidden rounded-2xl bg-base-200 p-3 transition-all hover:bg-base-300"
	>
		<div
			class="pointer-events-none absolute -inset-4 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
		></div>

		<div
			class="avatar relative z-10 flex size-24 min-w-24 shrink-0 items-center justify-center rounded-xl bg-base-100 p-2.5 shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-(--rotate)"
			style="--rotate: {rotate}deg"
		>
			<BrandIcon {icon} size={56} />
		</div>

		<div class="relative z-10 min-w-0 grow">
			<div class="flex items-center justify-between gap-2">
				<span class="truncate font-medium">{name}</span>
				{#if level}
					<span
						class="badge shrink-0 badge-outline badge-sm"
						style="border-color: #{icon.hex}; color: #{icon.hex}">{level}</span
					>
				{/if}
			</div>
			<p class="mt-0.5 text-sm leading-4.5 text-base-content/70">{text}</p>
		</div>
	</div>
{/snippet}
