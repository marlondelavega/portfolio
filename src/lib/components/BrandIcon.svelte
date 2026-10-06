<script>
	let { icon, size = 24, color = undefined } = $props();
</script>

<svg
	role="img"
	viewBox="0 0 24 24"
	width={size}
	height={size}
	fill={color ? `#${color}` : `#${icon.hex}`}
	xmlns="http://www.w3.org/2000/svg"
>
	<title>{icon.title}</title>
	<path d={icon.path} />
</svg>
