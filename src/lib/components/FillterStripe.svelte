<script>
	const size = 12;
</script>

<svg width="100%" height="100%" class="absolute top-0 left-0 z-10">
	<defs>
		<pattern
			id="stripes"
			width={size}
			height={size}
			patternTransform="rotate(45)"
			patternUnits="userSpaceOnUse"
		>
			<rect width={size} height={size} class="fill-transparent" />
			<line
				x1="0"
				y1="0"
				x2="0"
				y2={size}
				class=" stroke-base-content opacity-50"
				stroke-width="1"
			/>
		</pattern>
	</defs>
	<rect width="100%" height="100%" fill="url(#stripes)" />
</svg>
