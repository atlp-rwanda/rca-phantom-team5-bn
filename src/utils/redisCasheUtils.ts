import dotenv from "dotenv";
import { RedisClientType, createClient } from "redis";

dotenv.config()

 class RedisCache {
    private readonly cache: RedisClientType;
    private ttl: number;

    constructor(ttl: number) {
        // [1] define ttl and create redis connection
        this.ttl = ttl;
        this.cache = createClient({
            url: process.env.REDIS_URL,
            password: process.env.REDIS_PASSWORD,
        });

        this.cache.on("connect", () => {
            console.log(`Redis connection established`);
        });

        this.cache.on("error", (error: any) => {
            console.error(`Redis error, service degraded: ${error}`);
        });
    }

    // [2] generic function, takes `fetcher` argument which is meant to refresh the cache
    async get<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
        // [3] if we're not connected to redis, bypass cache
        if (!this.cache.connect) {
            return await fetcher();
        }

        return new Promise((resolve, reject) => {
            this.cache.get(key).then(async (value: any) => {
                if (value) {
                    const newValue = {...JSON.parse(value),count:JSON.parse(value).count+1}
                    this.cache.set(
                        key,
                        JSON.stringify(newValue)
                    );
                    this.cache.expire(key,this.ttl,"NX")
                    return resolve(newValue);
                }

                // [5] if value is not in cache, fetch it and return it
                const data = await fetcher();
                const result = {...data,count:1}
                this.cache.set(
                    key,
                    JSON.stringify(result)
                );
                this.cache.expire(key,this.ttl,"NX")
                return resolve(result);

            }).catch((err: Error) => {
                return reject(err)
            })
        });
    }

    // [6]
    del(key: string) {
        this.cache.del(key);
    }
    
    reduceCount(key:string):any{
      return new Promise((resolve, reject) => {
      this.cache.get(key).then((value)=>{
        if (value){
            const oldValue = JSON.parse(value)
            const newValue = {...oldValue,count:oldValue.count-1}
            this.cache.set(
                key,
                JSON.stringify(newValue)
            );
            this.cache.expire(key,this.ttl,"NX")
            resolve(newValue);
        }
        reject({message:"noValue"})
      })
    })
     
    }

    flush() {
        this.cache.flushAll();
    }
}

const Cache = new RedisCache(60)

export default Cache