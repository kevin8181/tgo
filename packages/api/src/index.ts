import express from 'express';
const app = express();

import healthcheck from './endpoints/healthcheck.js';
app.use('/healthcheck', healthcheck);

import brands from './endpoints/makers/brands.js';
app.use('/brands', brands);

import pagefind from './endpoints/pagefind.js';
app.use('/pagefind', pagefind);

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
