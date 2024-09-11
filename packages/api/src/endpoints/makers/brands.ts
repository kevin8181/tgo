import { Router } from "express";
const router = Router();

import brands from "./brandsList.js";

router.get("/", (req, res) => {
	res.json(brands);
});

export default router;
