import {createClient} from "redis";
import dotenv from 'dotenv'


dotenv.config()
// Create Redis client
const client = createClient({
  password: process.env.REDIS_PASSWORD, // Redis server password
  url: process.env.REDIS_URL, // Redis server URL
});

// Handle connection events
client.on("connect", () => {
  console.log("Redis client connected");
});

client.on("ready", () => {
  console.log("Redis client ready");
});

client.on("error", (error) => {
  console.error(`Redis error: ${error}`);
});

client.on("end", () => {
  console.log("Redis client disconnected");
});

// Export Redis client
export default client;
