
const fs = require('fs');
let date = new Date();
let expenses =  require('./financials/expenses.json') // Importing expenses.json file
let people = require('./financials/people.json') // Importing people.json file
let currentState = require('./financials/currentState.json') // Importing currentState.json file
let count = expenses.length; // Getting the length of the expenses array

let generateDateStamp = function() {
    return date.toString().replace(/\s/g, '');
}

let updateFunds = function() {
    for (let i = currentState.processed.expenseId; i < count; i++) {
        //add each expense to the total
        let share = expenses[i].amount / expenses[i].applies.length;
        let processingType = expenses[i].type;
        console.log("share is: " + share);
        for (let j=0; j < expenses[i].applies.length; j++) {
            let person = expenses[i].applies[j];
            if(processingType === "credit") {
                let updatedFund = people[person].fund + share;
                console.log("person is: " + people[person].name);
                console.log("updatedFund is: " + updatedFund);
                people[person].fund = updatedFund;
            } else if(processingType === "debit") {
                let updatedFund = people[person].fund - share;
                console.log("person is: " + people[person].name);
                console.log("updatedFund is: " + updatedFund);
                people[person].fund = updatedFund;
            }
        }
    }
}

let updatePeopleFunds = function() {
    let data = JSON.stringify(people);
    //copy people file to archive directory
    fs.copyFileSync('./financials/people.json', './financials/archive/people' + generateDateStamp() + '.json');
    fs.writeFileSync('./financials/people.json', data);
}

let generateUpdatedState = function() {
    let currentStateData = JSON.stringify(currentState);
    fs.copyFileSync('./financials/currentState.json', './financials/archive/currentState' + generateDateStamp() + '.json');
    fs.writeFileSync('./financials/currentState.json', currentStateData);
}

//iterate through the expenses array
if(currentState.processed.expenseId === expenses[count-1].id) {
    console.log("No new expenses to process");
} else {
    updateFunds()
    currentState.processed.expenseId = expenses[count-1].id;
}
updatePeopleFunds();
generateUpdatedState();

