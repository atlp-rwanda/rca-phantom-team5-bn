import dotenv from "dotenv";
import { RedisClientType, createClient } from "redis";

dotenv.config()

class RedisCache {
    private readonly cache: RedisClientType;
    private ttl: number;
    private isconnected: boolean = false;

    constructor(ttl: number) {
        // [1] define ttl and create redis connection
        this.ttl = ttl;
        this.cache = createClient({
            password: process.env.REDIS_PASSWORD,
            socket: {
                host: process.env.REDISURL,
                port: parseInt(process.env.REDIS_PORT as string),
            }});
        
        this.cache.on("connect", () => {
            this.isconnected=true;
            console.log(`Redis connection established`);
        });


        this.cache.on("error", (error: any) => {
            // console.error(`Redis error, service degraded: ${error}`);
        });
        this.cache.connect()
    }

    async get<T>(key: string, fetcher: () => Promise<T>): Promise<T> {

        if (!this.isconnected) {
            return await fetcher();
        }

        return new Promise((resolve, reject) => {
            this.cache.get(key).then(async (value: any) => {
                const values = JSON.parse(value)
                if (values) {
                    if(value.id){
                    const newValue = { ...values, count: values.count + 1 }
                    this.cache.set(
                        key,
                        JSON.stringify(newValue)
                    );
                    return resolve(newValue);
                    }
                }

                const data:any = await fetcher();
                
                const result = { ...data, count: 1 }
                this.cache.set(
                    key,
                    JSON.stringify(result)
                );
                return resolve(result);

            }).catch((err: Error) => {
                return reject(err)
            })
        });
    }


    del(key: string) {
        this.cache.del(key);
    }

    reduceCount(key: string): any {
        return new Promise((resolve, reject) => {
            this.cache.get(key).then((value) => {
                if (value) {
                    const oldValue = JSON.parse(value)
                    const newValue = { ...oldValue, count: oldValue.count - 1 }
                    this.cache.set(
                        key,
                        JSON.stringify(newValue)
                    );
                
                    resolve(newValue);
                }
                reject({ message: "noValue" })
            })
        })

    }

    flush() {
        this.cache.flushAll();
    }
}

const Cache = new RedisCache(60)

export default Cache