pragma solidity ^0.4.15;

import "./CVExtender.sol";

contract owned {
    address owner;

    modifier onlyowner() {
        /**
         * Update Exception Handling from Solidity 0.4.13!
         * See: https://vomtom.at/exception-handling-in-solidity/
         * If you have any questions, head over to the course Q&A!
         **/
        require(msg.sender == owner);
        _;
    }

    function owned() public {
        owner = msg.sender;
    }
}

contract mortal is owned {
    function kill() public {
        if (msg.sender == owner)
        selfdestruct(owner);
    }
}

contract MyExampleContract is CVExtender, owned {
    string mySummary = "<h3>Hard-working and passionate person with great analytical and problem-solving skills. Seeking a job to improve my skills in the new challenging field of Blockchain Technology. I am a dedicated team player who may be able to provide the company with the benefit of my knowledge and skills while learning standard Blockchain Ecosystem.</h3>";
    string myExperience = "<h3>Participate in Application development on Blockchain platform course hosted by Vietnam Blockchain Club:</h3> &emsp; Overview of Blockchain Technology <br /> &emsp; Concept, structure of Ethereum and smart contract. <br /> &emsp; Learn Solidity programming and Ethereum Virtual Machine (EVM). <br /> &emsp; Learn how to install, set up an Ethereum network and deploy a smart contract. <br /> <h3>Created digital loyalty points using smart contract on Ethereum Platform:</h3> &emsp; Available on Ropsten Testnet and Vietnam Ethereum Testnet. <br /> &emsp; Total supply 10,000,000 points. <br /> &emsp; Customers purchase any product online and receive corresponding points. The point could always be convertible to physical products at any time. <br /> &emsp; Customer can transfer or buy points directly by sending ETH to smart contract. The default price is 2,000 points/1ETH/ 20M VND and can be adjusted by the contract owner. <br /> &emsp; Only owner can withdraw ETH from the contract. <br /> &emsp; Building a website interface that provides the user with simpler and easier interaction. <h3>Find a vulnerability in a smart contract of ICO Project:</h3> &emsp; The vulnerability allows attacker buy tokens in a small amount of ETH. <br /> &emsp; Make a test and get 2,000,000 tokens equal to 300,000 USD at Jan-11-2018. <br /> &emsp; Contacted and coordinate with their Dev team to give the solution.";
    string mySkill = "<h3>Programming: Solidity, C, C++, C#, Python, Java.</h3> <h3>Have a basic knowledge of Bitcoin and Ethereum blockchain.</h3> <h3>Do test cases in Truffle platform and build a simple font-end website to interact Smart Contract.</h3>";

    event EditSummaryEvent(string _summaryEvent);
    event EditExperienceEvent(string _experienceEvent);
    event EditSkillEvent(string _skillEvent);

    function editSummary(string _edit) public onlyowner {
        mySummary = _edit;
        EditSummaryEvent(_edit);
    }

    function editExperience(string _edit) public onlyowner {
        myExperience = _edit;
        EditExperienceEvent(_edit);
    }

    function editSkill(string _edit) public onlyowner {
        mySkill = _edit;
        EditSkillEvent(_edit);
    }

    function getMySummary() public view returns(string) {
        return mySummary;
    }

    function getMyExperience() public view returns(string) {
        return myExperience;
    }

    function getMySkill() public view returns(string) {
        return mySkill;
    }


    /**
     * Below is for our CV!
     * */
    function getAddress() public constant returns(string) {
        return "https://github.com/Quang-NA";
    }

    function getDescription() public constant returns(string) {
        return "This is an example. Do it for education purpose";
    }
    function getTitle() public constant returns(string) {
        return "My CV - Quang-NA";
    }
    function getAuthor() public constant returns(string, string) {
        return ("Quang-NA", "anhquang1258@gmail.com");
    }
}
