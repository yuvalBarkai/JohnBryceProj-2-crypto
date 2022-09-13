/// <reference path="jquery-3.6.0.js"/>

/**
 * @param {string} url 
 * @returns An ajax call for the api in the url,
 * which it is contained in a promise
 */

function getPromise(url){
    return new Promise((resolve, reject)=>{
        $.ajax({
            method: "GET",
            url: url,
            success: info => resolve(info),
            error: e => reject(e)
        })
    })
}

/**
 * @returns {string} HTML code for a loading spinner  
 */
function spin(){
    return `
    <div class="spinner-border" role="status">
        <span class="visually-hidden"></span>
    </div>`
}