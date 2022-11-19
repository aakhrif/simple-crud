<script lang="ts">
	import Button from '@smui/button';
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import { Label } from '@smui/common';

	let topAppBar: TopAppBar;

	let lightTheme =
		typeof window === 'undefined' || window.matchMedia('(prefers-color-scheme: light)').matches;
	function switchTheme() {
		lightTheme = !lightTheme;
		let themeLink = document.head.querySelector<HTMLLinkElement>('#theme');
		if (!themeLink) {
			themeLink = document.createElement('link');
			themeLink.rel = 'stylesheet';
			themeLink.id = 'theme';
		}
		themeLink.href = `/smui${lightTheme ? '' : '-dark'}.css`;
		document.head
			.querySelector<HTMLLinkElement>('link[href$="/smui-dark.css"]')
			?.insertAdjacentElement('afterend', themeLink);
	}
</script>

<div class="flexy">
	<div class="top-app-bar-container flexor">
		<TopAppBar bind:this={topAppBar} variant="static" class="topbar">
			<Row>
				<Section>
					<Title>My App</Title>
				</Section>
				<Section align="end" toolbar>
					<Button on:click={switchTheme}>
						<Label>{lightTheme ? 'Lights off' : 'Lights on'}</Label>
					</Button>
				</Section>
			</Row>
		</TopAppBar>
	</div>
</div>

<div class="flexy">
	<div class="bottom-app-bar-container flexor">
		<div class="flexor-content">
			<slot />
		</div>
	</div>
</div>

<style>
	.topbar {
		position: unset !important;
	}
</style>
