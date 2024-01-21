<script>
	import { onMount } from 'svelte';
	import '../app.pcss';
	import { web3auth } from '@/userStore';
	import { goto } from '$app/navigation';
	import { PUBLIC_WEB3AUTH_PROJECT_ID } from '$env/static/public';

	const clientId = PUBLIC_WEB3AUTH_PROJECT_ID;

	onMount(async () => {
		const pkg = await import('@web3auth/modal');
		const { Web3Auth } = pkg;
		const pkg2 = await import('@web3auth/base');
		const { CHAIN_NAMESPACES } = pkg2;

		$web3auth = new Web3Auth({
			clientId, // Get your Client ID from Web3Auth Dashboard
			chainConfig: {
				chainNamespace: CHAIN_NAMESPACES.EIP155,
				chainId: '0x15F902', // Please use 0x1 for Mainnet
				rpcTarget: 'https://rpc-evm-sidechain.xrpl.org/',
				displayName: 'XRP Testnet'
			}
		});

		await $web3auth.initModal();

		if (!$web3auth.connected) {
			goto('/login');
		}
	});
</script>

<slot />
