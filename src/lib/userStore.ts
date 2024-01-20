import type { Web3Auth } from '@web3auth/modal';
import { writable } from 'svelte/store';

export const web3auth = writable<Web3Auth | null>(null);
