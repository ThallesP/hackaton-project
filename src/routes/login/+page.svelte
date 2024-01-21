<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '@/components/ui/button';
	import Google from '@/icons/google.svelte';
	import { web3auth } from '@/userStore';
	import { onMount } from 'svelte';
	// import 'dotenv/config';
	// import { Web3Auth } from '@web3auth/modal';

	onMount(() => {
		if ($web3auth?.connected) {
			goto('/');
		}
	});

	async function login() {
		if (!$web3auth) {
			return;
		}
		const pkg = await import('@web3auth/base');

		try {
			await $web3auth.connectTo(pkg.WALLET_ADAPTERS.OPENLOGIN, {
				loginProvider: 'google'
			});

			const privKey = await $web3auth.provider?.request({
				method: 'eth_private_key'
			});

			// I'm not proud of this, but it works
			document.cookie = `privKey=0x${privKey};`;

			goto('/');
		} catch (error) {
			console.error(error);
		}
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<main class="flex h-screen flex-col items-center justify-center gap-2">
	<div class="flex w-96 flex-col gap-2">
		<h1 class="text-center text-3xl">Login</h1>
		<Button class="gap-1" on:click={login}>
			<Google width={16} height={16} class="stroke-primary" />
			Conectar com o Google
		</Button>
	</div>
</main>
