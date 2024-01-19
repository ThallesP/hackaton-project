<script>
	import Divider from '@/components/divider.svelte';
	import ListItem from '@/components/list-item.svelte';
	import ListWrapper from '@/components/list-wrapper.svelte';
	import ReceiveModal from '@/components/receive-modal.svelte';
	import SendModal from '@/components/send-modal.svelte';
	import * as Tabs from '@/components/ui/tabs';

	const assets = [1, 2];
	const transactions = [3, 4];
</script>

<main class="flex h-[100lvh] flex-col items-center justify-center gap-2">
	<div class="container flex w-[582px] max-w-full flex-col gap-2">
		<h1 class="text-left text-3xl">
			<span class="block text-base text-slate-400">Balance: </span>R$500,00
		</h1>

		<div class="flex items-center justify-center gap-4 px-4 py-8">
			<SendModal />

			<ReceiveModal />
		</div>

		<Tabs.Root>
			<Tabs.List class="w-full">
				<Tabs.Trigger value="assets" class="flex-1">Assets</Tabs.Trigger>
				<Tabs.Trigger value="transactions" class="flex-1">Transactions</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="assets" class="rounded-md bg-slate-800 p-2">
				<ListWrapper>
					{#each assets as asset, i}
						{@const isLast = i === assets.length - 1}
						<div>
							<ListItem>
								{asset}
							</ListItem>

							{#if !isLast}
								<Divider />
							{/if}
						</div>
					{/each}
				</ListWrapper>
			</Tabs.Content>
			<Tabs.Content value="transactions" class="rounded-md bg-slate-800 p-2">
				<ListWrapper>
					{#each transactions as transaction, i}
						{@const isLast = i === transactions.length - 1}
						<div>
							<ListItem>
								{transaction}
							</ListItem>

							{#if !isLast}
								<Divider />
							{/if}
						</div>
					{/each}
				</ListWrapper>
			</Tabs.Content>
		</Tabs.Root>
	</div>
</main>
