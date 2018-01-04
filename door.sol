pragma solidity ^0.4.13;

contract Door {

    mapping(address => bool) public permission;
    address public owner;

    event Opened(address from, uint timestamp, uint place);

    function Door() {
        owner = msg.sender;
    }

    function open(uint place) public onlyEmployee {
        Opened(msg.sender, now, place);
    }

    function addEmployee(address employee) public onlyOwner {
        permission[employee] = true;
    }

    function removeEmployee(address employee) public onlyOwner {
        permission[employee] = false;
    }

    modifier onlyEmployee {
        require(permission[msg.sender]);
        _;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
}