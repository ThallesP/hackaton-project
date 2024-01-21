import { formatUnits } from "viem";

export const config = {
	runtime: "edge",
};

export interface XRPTransaction {
	blockHash: string;
	blockNumber: string;
	confirmations: string;
	contractAddress: string;
	cumulativeGasUsed: string;
	from: string;
	gas: string;
	gasPrice: string;
	gasUsed: string;
	hash: string;
	input: string;
	isError: string;
	nonce: string;
	timeStamp: string;
	to: string;
	transactionIndex: string;
	txreceipt_status: string;
	value: string;
}

export interface TokenTransaction {
	value: string;
	blockHash: string;
	blockNumber: string;
	confirmations: string;
	contractAddress: string;
	cumulativeGasUsed: string;
	from: string;
	gas: string;
	gasPrice: string;
	gasUsed: string;
	hash: string;
	input: string;
	logIndex: string;
	nonce: string;
	timeStamp: string;
	to: string;
	tokenDecimal: string;
	tokenName: string;
	tokenSymbol: string;
	transactionIndex: string;
}

export async function GET({ params }) {
	const [txListResponse, tokenTxResponse] = await Promise.all([
		fetch(
			`https://evm-sidechain.xrpl.org/api?module=account&action=txlist&address=${params.address}`,
		),
		fetch(
			`https://evm-sidechain.xrpl.org/api?module=account&action=tokentx&address=${params.address}`,
		),
	]);

	const { result: xrpTransactions } = (await txListResponse.json()) as {
		result: XRPTransaction[];
	};
	const { result: tokenTransactions } = (await tokenTxResponse.json()) as {
		result: TokenTransaction[];
	};

	const transactions: (XRPTransaction | TokenTransaction)[] = xrpTransactions
		.filter((tx) => !tx.contractAddress && tx.value !== "0")
		.map((tx) => ({
			...tx,
			tokenSymbol: "XRP",
			tokenDecimal: "18",
			tokenName: "XRP",
		}))
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		.concat(tokenTransactions as any) // typescript being dumb
		.sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp))
		.map((tx) => ({
			...tx,
			value: formatUnits(BigInt(tx.value), Number(tx.tokenDecimal)),
		}));

	return new Response(JSON.stringify(transactions), {
		status: 200,
	});
}
