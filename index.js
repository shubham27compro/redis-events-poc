var express = require('express');
var redis = require('redis');

var PORT = process.env.PORT || 3000;
var REDIS_PORT = process.env.REDIS_PORT || 6379;

// var client = redis.createClient(REDIS_PORT);

var client = redis.createClient({
  host: 'redis-12194.c93.us-east-1-3.ec2.cloud.redislabs.com',
  port: 12194,
  password: 'WwcrwB4yFbu7FhCOF7CDAMPD6NqVqw0l'
});
client.on("ready", () => {
  client.config("SET", "notify-keyspace-events", "KEA");
})

var app = express();

app.use(express.json());


app.get('/runcommand', function(req, res, next){
  client.setex("tempkey", 10, "this will be deleted");
  res.send("hello: running set commant with 10 seconds expiry");
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}...`);
});