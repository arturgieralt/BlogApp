require('dotenv').config();
import app from './app';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
const PORT = 3001;
const httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, './config/key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname,'./config/cert.pem'))
}
https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})