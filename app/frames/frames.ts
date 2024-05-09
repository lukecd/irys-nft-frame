import { farcasterHubContext } from "frames.js/middleware";
import { createFrames } from "frames.js/next";
import { DEFAULT_DEBUGGER_HUB_URL } from "../debug";
import { appURL } from "../utils";

export const frames = createFrames({
	basePath: "/frames",
	baseUrl: appURL(),
	middleware: [
		farcasterHubContext({
			hubHttpUrl: DEFAULT_DEBUGGER_HUB_URL,
		}),
	],
});
