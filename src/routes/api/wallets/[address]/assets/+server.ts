import { formatUnits } from "viem";

export type Token = {
	symbol: string;
	name: string;
	decimals: number;
	balance: string;
};

export async function GET({ params }) {
	const { address } = params;

	const [tokenBalance, xrpBalance] = await Promise.all([
		fetch(
			`https://evm-sidechain.xrpl.org/api?module=account&action=tokenlist&address=${address}`,
		),
		fetch(
			`https://evm-sidechain.xrpl.org/api?module=account&action=balance&address=${address}`,
		),
	]);

	const tokenBalanceJson = await tokenBalance.json();
	const xrpBalanceJson = await xrpBalance.json();

	const assets = tokenBalanceJson.result.map((token: Token) => ({
		symbol: token.symbol,
		name: token.name,
		balance: formatUnits(BigInt(token.balance), token.decimals),
	}));

	assets.push({
		symbol: "XRP",
		name: "XRP",
		balance: formatUnits(BigInt(xrpBalanceJson.result), 18),
	});

	return new Response(JSON.stringify(assets), {
		status: 200,
	});
}
