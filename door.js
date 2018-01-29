console.log("starte");
var Web3 = require('web3')
var web3 = new Web3('http://localhost:8545')

var Gpio = require('onoff').Gpio;
var lock = new Gpio(4, 'out');
console.log("starte event stuff");

var contract = new web3.eth.Contract([{
  "constant": true,
  "inputs": [{
    "name": "",
    "type": "address"
  }],
  "name": "permission",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "place",
    "type": "uint256"
  }],
  "name": "open",
  "outputs": [],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "owner",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "employee",
    "type": "address"
  }],
  "name": "removeEmployee",
  "outputs": [],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "employee",
    "type": "address"
  }],
  "name": "addEmployee",
  "outputs": [],
  "payable": false,
  "type": "function"
}, {
  "inputs": [],
  "payable": false,
  "type": "constructor"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "from",
    "type": "address"
  }, {
    "indexed": false,
    "name": "timestamp",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "place",
    "type": "uint256"
  }],
  "name": "Opened",
  "type": "event"
}], '0x23a1f700594f3d9be3fE4ad159F9Bd4006Fc9BdD');

//kovan 0x23a1f700594f3d9be3fE4ad159F9Bd4006Fc9BdD
//tobalaba 0xcde38456d24baba5df8b3139fc48717131676469


var latest = web3.eth.getBlock("latest");
var latestCheckedBlockNumber = latest.blocknumber;

var f = async function() {
  var latestBlock = web3.eth.getBlock("latest").blocknumber;

  const events = await contract.getPastEvents("allEvents", {
    fromBlock: latestCheckedBlockNumber,
    toBlock: latestBlock
  })

  if (events.length > 0) {
    console.log("hallo");
    if (lock.readSync() === 0) {
      //pin auf eins setzen (strom fließt)
      lock.writeSync(1);
      console.log("Opening that door");
      await sleep(3000);
      lock.writeSync(0);
      console.log("Locking that doow")
    }
  }
}

console.log("starte listener");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function test() {
  while (true) {
    await sleep(3000);
    f();
  }
}

test();

console.log("fertig");