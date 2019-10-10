import { IEnvProvider } from "providers/EnvProvider/IEnvProvider";
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';


export default function setupDb(envProvider: IEnvProvider) {
    const mongoUrl: string = envProvider.get('DB_CONNECTION_STRING');
        mongoose.Promise = global.Promise;
        return new Promise(async (res, rej) => {
            const mode = envProvider.get('DB_MODE');

            let url;
            if (mode === 'INMEMORY' || process.env.NODE_ENV === 'test') {
                const mongodb = new MongoMemoryServer();
                url = await mongodb.getConnectionString();
            } else {
                url = mongoUrl;
            }
    
            await mongoose.connect(url, { useNewUrlParser: true }, e => {
                if (e) {
                    rej(e)
                }
                console.log('Connected to Mongo');
                res('Connected to Mongo')
            });

        })
        
}