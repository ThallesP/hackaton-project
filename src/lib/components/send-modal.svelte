<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { cn } from '@/utils';
	import { Button, buttonVariants } from './ui/button';
	import { Label } from './ui/label';
	import { Input } from './ui/input';
	import { ArrowRight } from 'lucide-svelte';
	import { privateKeyToAccount } from 'viem/accounts';
	import { createWalletClient, http, type Hex, parseUnits, createPublicClient } from 'viem';
	import { chain } from '@/constants';

	let open = false;
	export let privKey: `0x${string}`;

	let sendTo: Hex = '0x';
	let amount = '0';

	function openModal() {
		open = true;
	}

	async function send() {
		const account = privateKeyToAccount(privKey);

		const walletClient = createWalletClient({
			transport: http('https://rpc-evm-sidechain.xrpl.org/'),
			chain,
			account
		});

		const publicClient = createPublicClient({
			transport: http('https://rpc-evm-sidechain.xrpl.org/'),
			chain
		});

		const transactionId = await walletClient.sendTransaction({
			to: sendTo,
			value: parseUnits(amount, 18),
			account
		});

		// Transaction sent, now let's wait for it to complete
		await publicClient.waitForTransactionReceipt({ hash: transactionId });
		// TODO: add processing indicator

		// Transaction completed, now we could close this modal and update the UI
	}
</script>

<Dialog.Root>
	<Dialog.Trigger class={cn(buttonVariants(), 'flex-1')}>Send</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Send</Dialog.Title>
			<Dialog.Description>
				Verify that the address below is correct before sending.
			</Dialog.Description>

			<div class="flex flex-col gap-4 pt-8">
				<div class="flex flex-col gap-4">
					<div class="flex flex-col gap-1">
						<Label for="address" class="pb-1">Address</Label>
						<Input bind:value={sendTo} id="address" name="address" placeholder="Wallet address" />
					</div>

					<div class="flex flex-col gap-1">
						<div class="flex items-center justify-between">
							<Label for="asset" class="pb-1">Amount</Label>
							<Label for="asset" class="pb-1 text-right">Asset</Label>
						</div>
						<div class="relative">
							<Input
								id="amount"
								name="amount"
								type="number"
								inputmode="numeric"
								placeholder="Amount to send"
								bind:value={amount}
							/>

							<Tooltip.Root bind:open>
								<Tooltip.Trigger asChild let:builder>
									<Button
										on:click={openModal}
										builders={[builder]}
										class="absolute right-0 top-0 gap-1"
									>
										<img src="/xrp-icon.png" alt="XRP asset icon" width={16} height={16} />
										XRP
									</Button>
								</Tooltip.Trigger>
								<Tooltip.Content class="w-32">Coming Soon...</Tooltip.Content>
							</Tooltip.Root>
						</div>
					</div>

					<div class="flex items-center justify-start">
						<Button on:click={send} class="w-full max-w-full gap-1 overflow-ellipsis">
							Send
							<ArrowRight size={16} />
						</Button>
					</div>
				</div>
			</div>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
