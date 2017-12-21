var Web3 = require('web3')
var web3 = new Web3('http://localhost:8545')

var Gpio = require('onoff').Gpio;
var lock = new Gpio(4, 'out');

var subscription = web3.eth.subscribe('logs', {
  address: '0xad36b4106ee705f97975a2d8fa030d739abce4f9'
}, function(error, result) {
  if (!error)
    console.log(log);
}).on("data", function(transaction) {
  //hier tür öffnen
  //wenn die Tür zu ist dann öffnen
  if (lock.readSync() === 0) {
    //pin auf eins setzen (strom fließt)
    lock.writeSync(1);
    new Promise(resolve => setTimeout(resolve, 3000));
    lock.writeSync(0);
  }
});
