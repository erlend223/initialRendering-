/**
 * This file is responisible for all help functions 
 * related too bank 
 */


let balance = 100
let loan = 0


function withdraw(amount){
    balance-=amount
}


function deposit(amount){
    balance+=amount
}


function takeLoan(amount){
    loan+=amount
}


function payLoan(amount){
    loan -= amount
}


function getBalance(){
    return balance
}


function getLoanOwed(){
    return loan
}


function hasLoan (){
    return loan > 0;
}


function canGetLoan(amount){
    return amount <= (2*balance)
}


const bank = {
    withdraw,
    deposit,
    takeLoan,
    payLoan,
    getBalance,
    getLoanOwed,
    hasLoan,
    canGetLoan
}

export default bank