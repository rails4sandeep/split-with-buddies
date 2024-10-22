//import expenses from expenses.json
const fs = require('fs');
let date = new Date();
let expenses =  require('./financials/expenses.json') // Importing expenses.json file
let people = require('./financials/people.json') // Importing people.json file
let currentState = require('./financials/currentState.json') // Importing currentState.json file
let count = expenses.length; // Getting the length of the expenses array
//iterate through the expenses array

if(currentState.processed.expenseId === expenses[count-1].id) {
    console.log("No new expenses to process");
} else {
    for (let i = 0; i < count; i++) {
        //add each expense to the total
        let share = expenses[i].amount / expenses[i].applies.length;
        console.log("share is: " + share);
        for (let j=0; j < expenses[i].applies.length; j++) {
            let person = expenses[i].applies[j];
            let updatedFund = people[person].fund - share;
            console.log("person is: " + people[person].name);
            console.log("updatedFund is: " + updatedFund);
            people[person].fund = updatedFund;
        }
    }
    currentState.processed.expenseId = expenses[count-1].id;
}


console.log("People after expenses are: ");
console.log(people);

//write people object to json file
let data = JSON.stringify(people);
//copy people file to archive directory
fs.copyFileSync('./financials/people.json', './financials/archive/people' + date + '.json');
fs.writeFileSync('./financials/people.json', data);
//console.log the updated people object
let currentStateData = JSON.stringify(currentState);
//add time stamp to the file name currentState.json
//copy currentState file to archive directory
fs.copyFileSync('./financials/currentState.json', './financials/archive/currentState' + date + '.json');
fs.writeFileSync('./financials/currentState.json', currentStateData);

//assign current date time to a variable
