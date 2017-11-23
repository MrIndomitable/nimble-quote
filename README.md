# Nimble Quote

## Installation

```shell
npm install
npm run dev
```

## Prerequisite

Add a file `.local.server.js` in the `server` directory. add the following content in it
```javascript
process.env.SESSION_SECRET = require('uuid').v4();
process.env.GOOGLE_CLIENT_ID = require('chance').Chance().word();
process.env.GOOGLE_CLIENT_SECRET = require('chance').Chance().word();
process.env.GOOGLE_CALLBACK_URL = require('chance').Chance().url();
process.env.SENDGRID_API_KEY = require('chance').Chance().word();
process.env.EMAIL_TOKEN_ENCRYPTION_KEY = require('chance').Chance().word();
process.env.JAWSDB_URL = 'mysql://user:password@localhost:3306/dbname';

require('./dist/index');
```
