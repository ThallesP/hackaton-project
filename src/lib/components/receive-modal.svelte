<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { cn, copyToClipboard } from '@/utils';
	import { Button, buttonVariants } from './ui/button';
	import QRCode from 'qrcode';
	import { Label } from './ui/label';
	import { Check, Copy } from 'lucide-svelte';
	import { scale } from 'svelte/transition';

	let copied = false;
	let copiedTimeout: ReturnType<typeof setTimeout>;
	export let address: string;
	let qrCode: string | undefined = undefined;

	function alternateCopyIcon() {
		clearTimeout(copiedTimeout);
		setTimeout(() => {
			copied = false;
		}, 2000);
		copied = true;
	}

	async function handleCopyToClipboard(text: string) {
		alternateCopyIcon();
		await copyToClipboard(text);
	}

	QRCode.toDataURL(address, { errorCorrectionLevel: 'L' }, (err, url) => {
		if (err) qrCode = undefined;
		qrCode = url;
	});
</script>

<Dialog.Root>
	<Dialog.Trigger class={cn(buttonVariants({ variant: 'outline' }), 'flex-1')}>
		Receive
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Receive</Dialog.Title>
			<Dialog.Description>Share your address with someone to receive funds.</Dialog.Description>

			{#if qrCode}
				<div class="flex items-center justify-center py-4">
					<div class="h-96 w-96 max-w-full overflow-clip rounded-md">
						<img src={qrCode} alt="QR Code" class="h-full w-full object-contain" />
					</div>
				</div>
			{/if}

			<div class="flex flex-col gap-4">
				{#if qrCode}
					<h3 class="inline-flex items-center justify-center">
						<span aria-hidden="true" class="h-0.5 flex-1 rounded-full bg-slate-700" />
						<span class="px-4 uppercase">or</span>
						<span aria-hidden="true" class="h-0.5 flex-1 rounded-full bg-slate-700" />
					</h3>
				{/if}
				<div class="flex flex-col gap-1">
					<Label for="address" class="pb-1">Address</Label>
					<Button
						class="relative max-w-full gap-1  pr-10"
						on:click={() => handleCopyToClipboard(address)}
					>
						<span class="truncate">{address}</span>
						{#if copied}
							<div in:scale>
								<Check size={16} />
							</div>
						{:else}
							<div in:scale>
								<Copy size={16} />
							</div>
						{/if}
					</Button>
				</div>
			</div>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
