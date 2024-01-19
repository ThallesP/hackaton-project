<script lang="ts">
	import { Button } from '@/components/ui/button';
	import Google from '@/icons/google.svelte';
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<main class="flex h-screen flex-col items-center justify-center gap-2">
	<div class="flex w-96 flex-col gap-2">
		<h1 class="text-center text-3xl">Login</h1>
		<Button class="gap-1">
			<Google width={16} height={16} class="stroke-primary" />
			Conectar com o Google
		</Button>
	</div>
</main>
