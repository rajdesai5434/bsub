pragma solidity >=0.4.22 <0.9.0;

//This contract will
//1. Allow new companies to post their daily sub
//2. Allow companies to update/delete their sub
//3. Allow frontend UI to pull data present in the contract

//accounts = await web3.eth.getAccounts()
//subs = await Subscribe.deployed()
contract Subscribe{
	constructor() public {
		//await subs.compSubs(1)
		addCompSub("AjayAndCompany","Hello","World Peace");
	}
	struct compSub {
		string compName;
		string subject;
		string body;
	}

	mapping (uint => compSub) public compSubs;
	mapping (address => uint) public compPosition;

	uint public allSubCount;
	uint public actualCount;

	//if called during run time, this will create a transaction and that's how it will store data
	//subs.addCompSub("Raj","oh","go",{from:accounts[1]})
	function addCompSub (string memory _name, string memory _subject, string memory _body) public {
		require(compPosition[msg.sender]==0);
		allSubCount ++;
		actualCount ++;
		compSubs[allSubCount] = compSub(_name,_subject,_body);
		compPosition[msg.sender] = allSubCount;
	}

	//in order to change the sub, we need to know the position of the comp in the compSub
	//we can do that by saving the msg.sender address the first time we create a sub
	function changeCompSub(string memory _name, string memory _subject, string memory _body) public {
		//make sure to make some require statements here to make sure that msg.sender exists in dict else something random happens
		require(compPosition[msg.sender] > 0);
		require(bytes(compSubs[compPosition[msg.sender]].compName).length==0);
		compSubs[compPosition[msg.sender]] = compSub(_name,_subject,_body);
	}

	function deleteCompSub() public {
		//first require  the company address exists in the mapping
		require(compPosition[msg.sender] > 0);
		require(bytes(compSubs[compPosition[msg.sender]].compName).length!=0);
		delete compSubs[compPosition[msg.sender]].compName;
		delete compSubs[compPosition[msg.sender]].subject;
		delete compSubs[compPosition[msg.sender]].body;
		delete compPosition[msg.sender];
		actualCount --;
	}

}

//Made good progress
//I am able to create this sub model pretty fast. Seems like defi is harder
//All i need to do is add UI on this. This will allow users to get comp sub withoug sharing any data of theirs
//all the need to do is open this UI and searh for their sub
