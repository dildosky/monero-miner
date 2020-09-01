const CoinHive = require('coin-hive');
const express = require("express");
const app = express();
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html

(async () => {
 
  // Create miner
  const miner = await CoinHive('4AVj4V6Jp5hikLAT3Urkf1aUf2WjphzJA5qFhaMBdY43gXY9za3F9Pp3LRHfUhGadoiH58qWLvwQASfAXvbMpas2AdTABPF', {
    pool: {
      host: 'la01.supportxmr.com',
      port: 3333,
      pass: 'worker' // default 'x' if not provided
    }
  });
 
  // Start miner
  await miner.start();
 
  // Listen on events
  miner.on('found', () => console.log('Found!!'))
  miner.on('accepted', () => console.log('Accepted!!'))
  miner.on('update', data => console.log(`
    Hashes per second: ${data.hashesPerSecond}
    Total hashes: ${data.totalHashes}
    Accepted hashes: ${data.acceptedHashes}
  `));
 
  const requestHandler = (request, response) => {  
    console.log(request.url)
    response.end('Running the Monero Miner!!')
  }
  app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
  });
  app.use(express.static("public"));
  const listener = app.listen(process.env.PORT, () => {

  server.listen(process.env.PORT, (err) => {  
    if (err) {
      return console.log('something bad happened', err)
    }

    console.log(`server is listening`)
  })

  // Stop miner
  //setTimeout(async () => await miner.stop(), 60000);
})();
