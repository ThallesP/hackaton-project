import { http, type Chain } from "viem";

export const transport = http("https://rpc-evm-sidechain.xrpl.org/");

export const chain: Chain = {
	id: 1440002,
	name: "XRP Testnet",
	nativeCurrency: {
		decimals: 18,
		name: "XRP",
		symbol: "XRP",
	},
	rpcUrls: {
		default: {
			http: ["https://rpc-evm-sidechain.xrpl.org/"],
			webSocket: [],
		},
		public: {
			http: [],
			webSocket: [],
		},
	},
	testnet: true,
};
