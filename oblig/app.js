
import bank from "./bank.js"
import pay from "./pay.js"
import tools from "./tools.js"
import laptops from "./laptops.js"
//////////////////DOM ELEMENTS//////////////////

//BANK
const btnWithdraw = document.getElementById("btn-withdraw")
const btnDeposit = document.getElementById("btn-deposit")
const btnGetLoan = document.getElementById("btn-get-loan")

const balance = document.getElementById("bank-balance")
const loanOwed = document.getElementById("loan-owed")

//WORK
const btnSendToBank = document.getElementById("btn-send-to-bank")
const btnEarnMoney = document.getElementById("btn-earn-money")
const btnPayLoan = document.getElementById("btn-pay-loan")

const moeyEarned = document.getElementById("money-earned")

// LAPTOPS
const testButton = document.getElementById("btn-buy")
const selAvailableComputers = document.getElementById("sel-available-computers")

const featureText = document.getElementById("feature-text")
const laptopName = document.getElementById("laptop-name")
const laptopDescription = document.getElementById("laptop-description")
const laptopPrice = document.getElementById("laptop-price")

const laptopPicture = document.getElementById("pic-laptop")

//////////////////EVENT LISTENERS//////////////////

//BANK
btnWithdraw.addEventListener("click",handleWithdraw)
btnDeposit.addEventListener("click",handleDeposit)
btnGetLoan.addEventListener("click",handleLoan)

//WORK
btnSendToBank.addEventListener("click", handleSendToBank)
btnEarnMoney.addEventListener("click", handleEarnMoney)
btnPayLoan.addEventListener("click", handlePayLoan)

//////////////////EVENT HANDLERS//////////////////

//LAPTOPS
testButton.addEventListener("click", handleBuy)
selAvailableComputers.addEventListener("change", handleLaptopSelection)

//////////////////FUNCTION HANDLERS//////////////////

//BANK
function HandleUpdateText(){
    /*Handles the update of money earned, bank balance
    and outstanding loan text*/
    handleRenderEarned()
    handleRenderBalance()
    HandleRenderOutstandingLoan()
}


function handleRenderBalance(){
    /* Renders bank balance */
    balance.innerHTML=""
    balance.innerText = `Current balance ${bank.getBalance()} kr `
}


function HandleRenderOutstandingLoan(){
    /*Renders outstanding loan if loan exist
      If no loan exsist the outstanding text is hiden */
    loanOwed.innerHTML=""
    loanOwed.innerText = `Outstanding loan value ${bank.getLoanOwed()} kr `
    if(bank.hasLoan()){
        loanOwed.style.display="block"
        btnPayLoan.style.display="block"
    }else{
        loanOwed.style.display="none"
        btnPayLoan.style.display="none"
    }
}


function handleWithdraw(){
    /*Handles customers bank account witdraws. 
      If banlance is sufficent money is withdrawn. 
      Else money is not withdrawn and customer is alerted*/
    let amount = tools.getAmount()
    if (tools.isNumber(amount)){
        if(bank.getBalance() >= amount){
            bank.withdraw(amount)
            handleRenderBalance()
        }else{
            alert(`Your balance is too low! \nBalance: ${bank.getBalance()}kr \nAmount you are trying too withdraw: ${amount}kr`)
        }
    }

}


function handleDeposit(){
    /*Handels customer deposit to bank account
      Alerts the customer if a negative number is provided*/
    let amount = tools.getAmount()
    if(tools.isNumber(amount)){ 
        if(amount > 0){
            bank.deposit(amount)
            handleRenderBalance()
        }else{
            alert("Please enter a positive number")
        }
    }
}


function handleLoan(){
    /*Handles customers loan request
      If customer fullfills the banks loan demands
      Customer is given a loan*/
    let amount = tools.getAmount()
    if(bank.canGetLoan(amount) && !bank.hasLoan()){
        bank.takeLoan(amount)
    }
    HandleRenderOutstandingLoan()
}


// WORK 
function handleSendToBank(){
    if(bank.hasLoan()){
        if(bank.getLoanOwed() >= pay.getTenPercent()){
            bank.payLoan(pay.getTenPercent())
            bank.deposit(pay.getNinetyPercent())
        }else{
            bank.deposit(pay.getEarned()-bank.getLoanOwed())
            bank.payLoan(bank.getLoanOwed())
        }
    }else{
        bank.deposit(pay.getEarned())
    }
    pay.resetSalary()
    HandleUpdateText()
}

function handleEarnMoney(){
    pay.setSalary(100)
    handleRenderEarned()
}

function handleRenderEarned(){
    moeyEarned.innerHTML=""
    moeyEarned.innerText = `Pay ${pay.getEarned()} kr `
}

function handlePayLoan(){
    if(bank.hasLoan()){
        if(bank.getLoanOwed() <= pay.getEarned()){
            pay.setSalary(-(pay.getEarned()-bank.getLoanOwed()))
            bank.payLoan(bank.getLoanOwed())
        }else{
            bank.payLoan(pay.getEarned())
            pay.resetSalary()
        }
    }
    HandleUpdateText()
}


// LAPOTOPS
let id = 1

function handleBuy(){
    /*Handels pursuits by checking if the customer have
    sufficient funds too buy a laptop*/
    if(bank.getBalance()>=laptops.getPrice(id)){
        bank.withdraw(laptops.getPrice(id))
        HandleUpdateText()
        alert(`You are now the new owner of the laptop: ${laptops.getTitle(id)}`)
    }else{
        alert("You do not have enough money in the bank!")
    }
}

function handleLaptopSelection(){
    /*Handles the selectlist for laptops
    by calling handleLaptopUpdate and reviceing 
    The id of the selected element*/
    id = event.target.value
    handleLaptopUpdate()
}

function handleLaptopUpdate(){
    /**
     * Updates elements in selectlist
     */
    laptopDescription.innerHTML=""
    laptopDescription.innerText = `${laptops.getDescription(id)}`

    laptopPrice.innerHTML=""
    laptopPrice.innerText = `${laptops.getPrice(id)} kr `

    laptopName.innerHTML=""
    laptopName.innerText = `${laptops.getTitle(id)}`

    featureText.innerHTML=""
    featureText.innerHTML=`${laptops.getSpecs(id)}`

    laptopPicture.src = laptops.getPicUrl(id)

    console.log(laptops.getSpecs(id))
}


function initialRendering(){
    /**
     * Ensure intial rendering of 
     * elements on website
     */
    laptops.getLaptops(selAvailableComputers)
    HandleUpdateText()
    handlePayLoan()
}


initialRendering()

const app ={
    handleLaptopUpdate
}
export default app