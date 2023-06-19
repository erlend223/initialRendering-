
/**
 * This file is responisible for all help functions 
 * not related too any specific task 
 */

function getAmount(){
    return parseFloat(prompt("Enter amount")) 
}

function isNumber(amount){
    /**
     * Check if an entry is a number
     * If its NaN it alerts the user 
     * and tell the user to provide a number
     */
    if(!isNaN(amount)){
        return true
    }else{
        alert("You need to provide a number") 
        return false 
    }
}

const tools = {
    getAmount,
    isNumber,

}

export default tools