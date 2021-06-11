import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
const { json } = require('body-parser');
var cookieParser = require('cookie-parser');
import session from 'express-session';
const FileStore = require("session-file-store")(session)

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
    .use(json())
	.use(
		cookieParser(),
		session({
			secret: 'secret key',
			resave: true,
			saveUninitialized: true,			
			store: new FileStore({
				ttl: 90 * 86400 
			}),
			cookie: {
				maxAge: 90 * 24 * 60 * 1000,				
			 }			
		}),		
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
	// .listen(PORT, err => {
