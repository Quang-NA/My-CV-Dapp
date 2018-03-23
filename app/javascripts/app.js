// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";


// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import myExampleContract_artifacts from '../../build/contracts/MyExampleContract.json'

// MyExampleContract is our usable abstraction, which we'll use through the code below.
var MyExampleContract = contract(myExampleContract_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
    start: function() {
        var self = this;

        // Bootstrap the MetaCoin abstraction for Use.
        MyExampleContract.setProvider(web3.currentProvider);

        // Get the initial account balance so it can be displayed.
        web3.eth.getAccounts(function(err, accs) {
            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }

            if (accs.length == 0) {
                alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }

            accounts = accs;
            account = accounts[0];
            document.getElementById("allAccounts").innerHTML = accounts.join("<br />");
        });

        MyExampleContract.deployed().then(function(instance) {
            document.getElementById("myCVAddress").innerHTML = instance.address;
        });

        App.listenToEvents();
    },

    fGetMySummary: function() {
        MyExampleContract.deployed().then(function(instance) {
            return instance.getMySummary();
        }).then(function(result) {
            document.getElementById("getSummary").innerHTML = result;
        });
    },

    fGetMyExperience: function() {
        MyExampleContract.deployed().then(function(instance) {
            return instance.getMyExperience();
        }).then(function(result) {
            document.getElementById("getExperience").innerHTML = result;
        });
    },

    fGetMySkill: function() {
        MyExampleContract.deployed().then(function(instance) {
            return instance.getMySkill();
        }).then(function(result) {
            document.getElementById("getSkill").innerHTML = result;
        });
    },

    fEditSummary: function() {
        var editText = document.getElementById("editMySummary").value;

        MyExampleContract.deployed().then(function(instance) {
            return instance.editSummary(editText, {from: accounts[0], gas: 500000});
        }).then(function(result) {
            console.log(result);
        }).catch(function(err) {
            console.error(err);
        });
    },

    fEditExperience: function() {
        var editText = document.getElementById("editMyExperience").value;

        MyExampleContract.deployed().then(function(instance) {
            return instance.editExperience(editText, {from: accounts[0], gas: 500000});
        }).then(function(result) {
            console.log(result);
        }).catch(function(err) {
            console.error(err);
        });
    },

    fEditSkill: function() {
        var editText = document.getElementById("editMySkill").value;

        MyExampleContract.deployed().then(function(instance) {
            return instance.editSkill(editText, {from: accounts[0], gas: 500000});
        }).then(function(result) {
            console.log(result);
        }).catch(function(err) {
            console.error(err);
        });
    },

    listenToEvents: function() {
        MyExampleContract.deployed().then(function(instance) {
            instance.EditSummaryEvent({},{fromBlock:0, toBlock:'latest'}).watch(function(error, event) {
                document.getElementById("summaryLogs").innerHTML += JSON.stringify(event);
                // console.log(event);
            });
            instance.EditExperienceEvent({},{fromBlock:0, toBlock:'latest'}).watch(function(error, event) {
                document.getElementById("experienceLogs").innerHTML += JSON.stringify(event);
                // console.log(event);
            });
            instance.EditSkillEvent({},{fromBlock:0, toBlock:'latest'}).watch(function(error, event) {
                document.getElementById("skillLogs").innerHTML += JSON.stringify(event);
                // console.log(event);
            });
        });
    },
};

window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        // console.warn("No web3 detected. Falling back to http://localhost:7545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    }

    App.start();
});
