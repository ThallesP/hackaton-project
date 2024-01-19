<script lang="ts">
	import { cn } from '@/utils';

	let className: string | undefined = undefined;
	export { className as class };
</script>

<div aria-hidden="true" class={cn('h-0.5 w-full rounded-full bg-slate-900/30', className)} />
