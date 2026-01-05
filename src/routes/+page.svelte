<script lang="ts">
	import '@fontsource-variable/open-sans';
	import { goto } from '$app/navigation';
	import { mode } from 'mode-watcher';
	import SEO from '$lib/components/SEO.svelte';

	let themeColor = $state('#000000');

	$effect(() => {
		themeColor = mode.current === 'light' ? '#000000' : '#ffffff';
	});

	function goToCatalogue() {
		goto('/catalogue');
	}
</script>

<SEO pageKey="home" />

<div class="container">
	<div class="content">
		<h1 class="title" style={`color: ${themeColor};`}>
			E-commerce Headless
		</h1>
		
		<button class="catalogue-btn" on:click={goToCatalogue} style={`border-color: ${themeColor}; color: ${themeColor};`}>
			Voir le catalogue
		</button>
	</div>
</div>

<style lang="scss">
	.container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 30;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 0 20px;
	}

	.title {
		font-family: 'Open Sans Variable', sans-serif;
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 300;
		letter-spacing: -0.02em;
		margin: 0 0 40px 0;
		line-height: 1.1;
		text-align: center;
		width: 100%;
	}

	.catalogue-btn {
		font-family: 'Open Sans Variable', sans-serif;
		font-size: 0.875rem;
		font-weight: 400;
		letter-spacing: 0.5px;
		text-transform: uppercase;
		background: transparent;
		border: 1px solid #000000;
		color: #000000;
		padding: 12px 28px;
		border-radius: 0;
		cursor: pointer;
		transition: all 0.2s ease;
		margin-top: 20px;
		
		&:hover {
			background: #000000;
			color: #ffffff;
		}
		
		&:active {
			transform: scale(0.98);
		}
	}

	/* Dark mode support */
	:global(body.dark) .catalogue-btn {
		border-color: #ffffff;
		color: #ffffff;
		
		&:hover {
			background: #ffffff;
			color: #000000;
		}
	}

	/* Responsive */
	@media screen and (max-width: 768px) {
		.container {
			padding: 0 24px;
		}

		.title {
			font-size: 2.5rem;
			margin-bottom: 32px;
		}

		.content {
			max-width: 90vw;
		}
	}

	@media screen and (max-width: 480px) {
		.title {
			font-size: 2rem;
			margin-bottom: 24px;
		}

		.catalogue-btn {
			padding: 10px 24px;
			font-size: 0.75rem;
		}
	}

	@media screen and (max-width: 320px) {
		.title {
			font-size: 1.75rem;
		}
		
		.content {
			padding: 0 16px;
		}
	}
</style>