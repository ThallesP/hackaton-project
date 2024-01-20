import { createPublicClient, http, type Hex, formatUnits } from "viem";
import { privateKeyToAccount } from "viem/accounts";

export async function load({ cookies, fetch }) {
	if (!cookies.get("privKey")) {
		return {
			status: 302,
			headers: {
				location: "/login",
			},
		};
	}

	const account = privateKeyToAccount(cookies.get("privKey") as Hex);

	const wallet = createPublicClient({
		transport: http("https://rpc-evm-sidechain.xrpl.org/"),
	});

	const [balance, transactions, assets] = await Promise.all([
		wallet.getBalance({
			address: account.address,
		}),
		fetch(`/api/wallets/${account.address}/transactions`),
		fetch(`/api/wallets/${account.address}/assets`),
	]);

	const transactionsJson = await transactions.json();
	const assetsJson = await assets.json();

	return {
		balance: formatUnits(balance, 18),
		address: account.address,
		privKey: cookies.get("privKey") as Hex,
		transactions: transactionsJson,
		assets: assetsJson,
	};
}
