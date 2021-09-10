const fs = require('fs');

fs.writeFileSync('./.env', `API=S{process.env.API\n`)