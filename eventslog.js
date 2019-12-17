const express = require('express');
const redis = require('redis');

const app = express();

// var REDIS_PORT = process.env.REDIS_PORT || 6379;

// var subscriber = redis.createClient(REDIS_PORT);
var subscriber = redis.createClient({
    host: 'redis-12194.c93.us-east-1-3.ec2.cloud.redislabs.com',
    port: 12194,
    password: 'WwcrwB4yFbu7FhCOF7CDAMPD6NqVqw0l'
});

subscriber.on("pmessage", (channel, pmessage, val) => {
    console.log("EVENT :" + pmessage);
    console.log("EVENT ON :" + val);
    console.log("From channel: " + channel);
})

subscriber.psubscribe("__key*__:*");
app.get('/', (req, res) => {
    res.send("Event Logger");
})

app.listen(3006, () => {
    console.log("server is listening to port 3006");
})