// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract VendingMachine {
    address public owner;
    uint public amounts;
    mapping (address => uint) public donutBalances;

    constructor() {
        owner = msg.sender;
        donutBalances[address(this)] = 100;
    }

    function getVendingMachineBalances() public view returns (uint) {
        return donutBalances[address(this)];
    }

    function restock(uint amount) public onlyOwner {
        donutBalances[address(this)] += amount;
    }

    function purchase(uint amount) public payable{
        require(msg.value >= amount * 0.02 ether, "You must pay at least 0.02 Ether");
        require(donutBalances[address(this)] >= amount, "Not enough donuts in stock to fulfill your request.");
        donutBalances[msg.sender] += amount;
        donutBalances[address(this)] -= amount;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can restock the donuts balances.");
        _;
    }
}