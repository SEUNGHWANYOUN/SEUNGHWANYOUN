// import { PubSub } from "apollo-server-express";


// const pubsub = new PubSub();

// export default pubsub;


import { RedisPubSub } from 'graphql-redis-subscriptions';
//import * as Redis from 'ioredis';
const Redis = require('ioredis')

const options = {
  host: "127.0.0.1",
  port: "6379",
  retryStrategy: times => {
    // reconnect after
    return Math.min(times * 50, 2000);
  }
};

const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options)
});

export default pubsub;

 