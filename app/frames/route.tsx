/* eslint-disable react/jsx-key */
import { getTokenUrl } from "frames.js";
import { Button } from "frames.js/next";
import { baseSepolia } from "viem/chains";
import { frames } from "./frames";

const handleRequest = frames(async (ctx) => {
	const page = ctx.searchParams?.page ?? "initial";
	const imageUrl = process.env.NEXT_PUBLIC_HOST + "/sunrise-rectangle.png";
	const tokenUrl = getTokenUrl({
		address: "0x2620443FdFA5506705458bDc9fB864058028A686",
		chain: baseSepolia,
		tokenId: "0",
	});
	console.log({ tokenUrl });
	if (page === "initial")
		return {
			image: imageUrl,
			buttons: [
				<Button action="post" target={{ query: { page: "result" } }}>
					Recast Me, Follow Me, Then Mint Away!
				</Button>,
			],
		};
	return {
		image: (
			<div style={{ display: "flex", flexDirection: "column" }}>
				{ctx.message?.requesterFollowsCaster ? "Thanks for the follow." : "How about a follow?"}
				{ctx.message?.recastedCast ? "Thanks for the recast" : "Can I get a recast?"}
			</div>
		),
		buttons: [
			ctx.message?.requesterFollowsCaster && ctx.message?.recastedCast ? (
				<Button
					action="mint"
					key="mint-button"
					target={getTokenUrl({
						address: "0x2620443FdFA5506705458bDc9fB864058028A686",
						chain: baseSepolia,
						tokenId: "0",
					})}
				>
					Mint
				</Button>
			) : (
				<Button action="post" target={{ query: { page: "result" } }}>
					Check Again, Yo
				</Button>
			),
		],
	};
});

export const GET = handleRequest;
export const POST = handleRequest;
