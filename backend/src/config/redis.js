const { createClient } = require('redis');

async function connectToRedis() {
    const client = createClient({
        password: process.env.REDIS_PASSWORD,
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        }
    });

    client.on('connect', () => console.log("\x1b[32m%s\x1b[0m",'[server]: Connected to Redis') )
    client.on('error', err => console.log("\x1b[31m%s\x1b[0m",'[server]: Redis Client Error', err))
    await client.connect();

    // await client.SETEX('hello', 120, 'bye');
    // const value = await client.get('hello');
    await client.disconnect();
}

module.exports = {
    connectToRedis
}