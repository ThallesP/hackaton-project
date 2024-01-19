<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { cn } from '@/utils';
	import { Button, buttonVariants } from './ui/button';
	import { Label } from './ui/label';
	import { Input } from './ui/input';
	import { ArrowRight } from 'lucide-svelte';
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
						<Input id="address" name="address" placeholder="Wallet address" />
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
							/>
							<Button class="absolute right-0 top-0 gap-1">
								<img src="/xrp-icon.png" alt="XRP asset icon" width={16} height={16} />
								XRP
							</Button>
						</div>
					</div>

					<div class="flex items-center justify-start">
						<Button class="w-full max-w-full gap-1 overflow-ellipsis">
							Send
							<ArrowRight size={16} />
						</Button>
					</div>
				</div>
			</div>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
