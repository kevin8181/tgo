import brands from "./brandsList.js";

console.log("Checking", brands.length, "makers");

for (const brand of brands) {
	try {
		const url = new URL(brand.link);

		if (url.protocol !== "https:") {
			console.warn(brand.name, brand.link, url.protocol);
		}

		if (url.pathname !== "/") {
			console.warn(brand.name, brand.link, "not root");
		}

		const response = await fetch(brand.link);

		if (response.status !== 200) {
			console.warn(brand.name + " " + brand.link + " " + response.status);
		}
	} catch (e) {
		console.warn(brand.name, brand.link, "fetch failed");
	}
}

console.log("Done");
