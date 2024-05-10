import { TransactionTargetResponse } from "frames.js";
import { NextRequest, NextResponse } from "next/server";
import { Abi, Account, createPublicClient, createWalletClient, encodeFunctionData, getContract, http } from "viem";
import { baseSepolia } from "viem/chains";
import { erc1155abi } from "./contracts/erc1155-abi";

export async function POST(req: NextRequest): Promise<NextResponse> {
	const json = await req.json();

	const address = json.address;

	const client = createWalletClient({
		chain: baseSepolia,
		transport: http(),
	});

	console.log({ address });
	console.log({ client });

	const NFT_CONTRACT_ADDRESS = "0x2620443FdFA5506705458bDc9fB864058028A686";
	console.log("calling claim");

	const tx = await client.writeContract({
		address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
		abi: erc1155abi,
		functionName: "claim",
		account: address,
		args: [
			address,
			0n,
			1n,
			"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
			0n,
			{
				proof: [],
				quantityLimitPerWallet: 100n,
				pricePerToken: 0n,
				currency: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
			},
			"0x",
		],
	});
	console.log({ tx });

	return NextResponse.json({
		data: tx,
		status: "success",
		timestamp: new Date().getTime(),
	});
}
