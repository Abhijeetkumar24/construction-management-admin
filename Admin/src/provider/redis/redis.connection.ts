// import { createClient } from 'redis';

import { Redis, RedisOptions } from "ioredis";
import { AcceptAny } from "../../interface/type";

// export function redis_connect() {
//     const client = createClient();
//     client.on('error', err => console.log('Redis Client Error', err));
//     client.connect();
// }


class RedisStorage{
    private client: Redis;

    constructor(){
        this.client = new Redis(this.getConfiguration());
    }

    private getConfiguration(): RedisOptions {
        const creds: RedisOptions = {
            db: 0,                                // Redis allows to have 16 separate databases (numbered from 0 to 15) within a single Redis server instance.
            host: 'localhost',
            port: 6379,
        }
        return creds;
    }

    async set(key: string, value: AcceptAny){
        try{
            return await this.client.set(key, value);
        }catch(error){
            console.log('Redis storage set', error);
            throw error
        }
    }


    async get(key: string) {
        try {
            return await this.client.get(key);
        } catch (error) {
            console.log('Redis storage insertKeyInRedis', error, false);
            throw error;
        }
    }
}

export const redis = new RedisStorage();