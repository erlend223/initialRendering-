/**
 * This file is responisible for all help functions 
 * related too laptops, as well as getting data form 
 * RESTapi 
 */

import { LAPTOPS_API_URL } from "./utils.js"
import app from "./app.js"
let laptopObject = []


function getLaptops(selAvailableComputers) {
    /**
     * Gets laptop information from rest API
     * Convert it to json and calls gettitles 
     * to do initial populating of laptop selectlist
     * and laptop update
     */
    fetch(LAPTOPS_API_URL)
        .then(response => response.json())
        .then(json => {
            laptopObject = json
            console.log(laptopObject,"i fetch")
            getTitels(selAvailableComputers)
            app.handleLaptopUpdate()
        })
        .catch(error => console.error(error.message))
}

function getTitels(selAvailableComputers){
    /**
     * Populates selectlist
     */
    selAvailableComputers.innerHTML = ""
    for(const laptop of laptopObject){
        const lapTopTitle = document.createElement("option")
        lapTopTitle.innerText = laptop.title
        lapTopTitle.value = laptop.id   
        console.log(lapTopTitle)    
        selAvailableComputers.appendChild(lapTopTitle) 
    }

}


function getItem(id){
    /**
     * Return: one specific laptop item by laptop id
     */
    return laptopObject.find(item => item.id == id)
}


function getTitle (id){
    return getItem(id).title
}


function getSpecs(id){
    /**
     * Returns a manipulated string of the laptop features
     * Ensoure that each entry in the specs array will
     * be displayed on its own line 
     */
    let feature =""
    for(let spec of getItem(id).specs){
        console.log(spec)
        feature += ("- "+spec + "<br/>")
    }
    return feature
}

function getDescription(id){
    return getItem(id).description
}

function getPrice(id){
    return getItem(id).price
}

function getPicUrl(id){
    /**
     * Generates the src URL for a laptop
     * by replaing computer in the exsisting api path 
     * with image path 
     */
    return LAPTOPS_API_URL.replace("computers", getItem(id).image)
}

const laptops = {
    getLaptops,
    getTitels,
    getPicUrl,
    getSpecs,
    getDescription,
    getPrice,
    getTitels,
    getTitle
}

export default laptops 