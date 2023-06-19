/**
 * This file is responisible for all help functions 
 * related too pay task  
 */

let earned = 0

function getEarned(){
    return earned
}

function setSalary(amount){
    earned+=amount
}

function resetSalary(){
    earned = 0
}

function getTenPercent(){
    return earned * 0.1
}

function getNinetyPercent(){
    return earned * 0.9
}

const pay = {
    getEarned,
    setSalary,
    resetSalary,
    getTenPercent,
    getNinetyPercent
}

export default pay