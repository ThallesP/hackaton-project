<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { cn } from '@/utils';
	import { Button, buttonVariants } from './ui/button';
	import { Label } from './ui/label';
	import { Input } from './ui/input';
	import { ArrowRight, User } from 'lucide-svelte';
	import * as DropdownMenu from './ui/dropdown-menu';
</script>

<Dialog.Root>
	<Dialog.Trigger class={cn(buttonVariants(), 'flex-1')}>Send</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Send ... to ...</Dialog.Title>
			<Dialog.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</Dialog.Description>

			<div class="flex flex-col gap-4 pt-8">
				<div class="flex flex-col gap-4">
					<!-- <div class="flex flex-col gap-1">
						<Label for="amount" class="pb-1">Amount</Label>
						<Input
							id="amount"
							name="amount"
							type="number"
							inputmode="numeric"
							placeholder="Amount to send"
						/>
					</div> -->
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

							<DropdownMenu.Root>
								<DropdownMenu.Trigger class={cn(buttonVariants(), 'absolute right-0 top-0 gap-1')}>
									<User size={16} /> XYZ
								</DropdownMenu.Trigger>
								<DropdownMenu.Content class="max-h-[45vh] min-w-[40px] overflow-y-auto">
									H
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</div>
					</div>

					<div class="flex flex-col gap-1">
						<Label for="address" class="pb-1">Address</Label>
						<Input id="address" name="address" placeholder="Wallet address" />
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
