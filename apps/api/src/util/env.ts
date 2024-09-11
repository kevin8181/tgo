import dotenv from 'dotenv';
dotenv.config();

import envalid, { url } from 'envalid';
const env = envalid.cleanEnv(process.env, {
	GUIDE_BASE_URL: url(),
});

export default env;
