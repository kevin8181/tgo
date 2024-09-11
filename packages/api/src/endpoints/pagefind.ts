import { Router } from "express";
const router = Router();

import env from "../util/env.js";
const scriptUrl = env.GUIDE_BASE_URL + "/pagefind/pagefind.js";

//make it work on node
Object.assign(globalThis, {
	window: {
		location: {
			origin: "",
		},
	},
	document: {
		querySelector: () => {
			return {
				getAttribute: () => {
					return "en";
				},
			};
		},
	},
	location: {
		href: scriptUrl,
	},
});

//load the pagefind script
const response = await fetch(scriptUrl);
let string = "";
new Uint8Array(await response.arrayBuffer()).forEach((byte) => {
	string += String.fromCharCode(byte);
});
string = btoa(string);
const moduleUrl = `data:application/javascript;base64,${string}`;
const pagefind = await import(moduleUrl);

//initialize pagefind
pagefind.options({
	basePath: env.GUIDE_BASE_URL + "/pagefind",
});

router.get("/", async (req, res) => {
	const query = req.query["q"];

	if (typeof query !== "string") {
		return res.sendStatus(400);
	}

	try {
		return res.send(await search(query));
	} catch (e) {
		console.error(e);
		return res.sendStatus(500);
	}
});

async function search(query: string) {
	const results = await pagefind.search(query);

	const processedResults = await Promise.all(
		results.results.map(async (result: any) => {
			return await result.data();
		})
	);

	return processedResults;
}

export default router;
