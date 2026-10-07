export type Work = {
	url: string;
	title: string;
	kind: 'dev' | 'design' | 'video';
	demoUrl?: string;
};

function titleFromFilename(path: string) {
	return path
		.split('/')
		.pop()!
		.replace(/\.png$/, '')
		.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getYouTubeId(url: string) {
	const match = url.match(
		/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/
	);
	return match?.[1];
}

const appFiles = import.meta.glob('$lib/assets/apps/web/*.png', {
	eager: true,
	query: '?url',
	import: 'default'
}) as Record<string, string>;

const designFiles = import.meta.glob('$lib/assets/designs/web/*.png', {
	eager: true,
	query: '?url',
	import: 'default'
}) as Record<string, string>;

const appMeta: Record<string, { title: string; demoUrl: string }> = {
	'app-1.png': {
		title: 'Citation Ticketing System',
		demoUrl: 'https://citeticket-demo.onrender.com/citeticket/'
	}
};

const videoDemoUrl = 'https://youtu.be/q9O0Wx4w-vY';
const videoId = getYouTubeId(videoDemoUrl)!;

const videoWork: Work = {
	url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
	title: 'Animation Reel (Draft)',
	kind: 'video',
	demoUrl: videoDemoUrl
};

const devWorks: Work[] = Object.entries(appFiles)
	.sort(([a], [b]) => a.localeCompare(b))
	.map(([path, url]) => {
		const file = path.split('/').pop()!;
		const meta = appMeta[file];
		return {
			url,
			title: meta?.title ?? titleFromFilename(path),
			kind: 'dev' as const,
			demoUrl: meta?.demoUrl
		};
	});

const designWorks: Work[] = Object.entries(designFiles)
	.sort(([a], [b]) => a.localeCompare(b))
	.map(([path, url]) => ({
		url,
		title: titleFromFilename(path),
		kind: 'design' as const
	}));

const midpoint = Math.ceil(designWorks.length / 2);

export const works: Work[] = [
	...devWorks,
	...designWorks.slice(0, midpoint),
	videoWork,
	...designWorks.slice(midpoint)
];
