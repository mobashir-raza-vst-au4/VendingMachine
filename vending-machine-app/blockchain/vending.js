// import Web3 from 'web3';

// const provider = new Web3.providers.HttpProvider(
//     "https://goerli.infura.io/v3/a2f24be056594f8bbac0ffe0db896875"
// )

// const web3 = new Web3(provider)
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"amounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"donutBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVendingMachineBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"purchase","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"restock","outputs":[],"stateMutability":"nonpayable","type":"function"}]
// const vmContract = new web3.eth.Contract(abi, "0xc1257F7580F139d0a4e689b74aa80837012d1784")

const vendingMachineContract = web3 => {
    return new web3.eth.Contract(abi, "0x628186300d1dFc8c1E3626b52d38F761ACAfA212")
}
export default vendingMachineContract;