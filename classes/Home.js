/// <reference path="../moreFunctions/jquery-3.6.0.js"/>

class Home {
    static allCoins = false;  // change to true in order to see all coins

    /**
     * Starts an event on click on the class ".more" and
     * if it is pressed and the collapsor is open the function
     * calles the fitting coin id (button.name) info 
     * from an API, prints the information on a collapsor and shows it
     * aswell as containing the HTML code in sessionStorage for 2 minutes.
     * if the collapsor is open it closes it.
     * if the information is found in the sessionStorage it takes it from there.
     */
    static moreInfo() {
        $(".more").on("click", async function () {
            try {
                let coll = $(`#${this.id.substring(8)}`);
                if (coll.css("display") == "none") {
                    coll.css("display", "block");
                    if (sessionStorage[this.id])
                        coll.html(sessionStorage[this.id]);
                    else {
                        coll.html(spin());
                        let info = await getPromise(`https://api.coingecko.com/api/v3/coins/${this.name}`);
                        const html = `<div class="moreInfo"> 
                        <img src="${info.image.small}">
                            <div> <b>$</b>${info.market_data.current_price.usd} </div> 
                            <div> <b>€</b>${info.market_data.current_price.eur} </div>
                            <div> <b>₪</b>${info.market_data.current_price.ils} </div>
                        </div>`
                        coll.html(html);
                        sessionStorage[this.id] = html;
                        setTimeout(() => {
                            sessionStorage.removeItem(this.id);
                        }, 120_000)
                    }
                }
                else
                    coll.css("display", "none");
            }
            catch (e) {
                console.log(e);
            }
        })
    }
    /**
     * @param {Array} data coins from the api coingecko
     * 
     * Prints either 100 coins or all the coins in the data:array, depends
     * on the boolean Home.allCoins.
     * Also validatates if the the coin's checkbox is checked and lets it keep
     * the attribute.
     */
    static printList(data) {
        $("#home").html("");
        let listLength;
        this.allCoins ? listLength = data.length : listLength = 100; 

        for (let d = 0; d < listLength; d++) {
            let checkboxBackup = "";
            if (Select.selected.includes(`coin${d}`))
                checkboxBackup = "checked";

            $("#home").append(`
                <label class="card">
                    <div class="card-title">
                        <span class="form-switch">
                            <input type="checkbox" class="form-check-input checkbox" id="coin${d}" ${checkboxBackup}>
                        </span>
                        <span class="sym">${data[d].symbol}</span>
                    </div>
                    <div class="coin-name">${data[d].name}</div>
                    <button class="btn btn-primary more" name="${data[d].id}" id="collapse${d}">
                        More Info
                    </button>
                    <div class="collapse" id="${d}">
                        
                    </div>
                </label>
            `);
        }
    }
    /**
     * @param {Array} data coins from the api coingecko
     * 
     * Checks either 100 coins or all the coins in the data:array, depends
     * on the boolean Home.allCoins.
     * Prints the ones that their symbol fits the user's input.
     * Also validatates if the the coin's checkbox is checked and lets it keep
     * the attribute.
     */
    static printSpecific(data) {
        $("#searchBtn").on("click", () => {
            $("#home").html("");
            let listLength;
            this.allCoins ? listLength = data.length : listLength = 100; 

            let foundCoin = false;
            const value = $("#search").val().toLowerCase();
            if (value) {

                for (let d = 0; d < listLength; d++) {
                    let checkboxBackup = "";
                    if (data[d].symbol == value) {
                        if (Select.selected.includes(`coin${d}`))
                            checkboxBackup = "checked";

                        foundCoin = true;
                        $("#home").append(`
                        <label class="card">
                            <div class="card-title">
                                <span class="form-switch">
                                    <input type="checkbox" class="form-check-input checkbox" id="coin${d}" ${checkboxBackup}>
                                </span>
                                <span class="sym">${data[d].symbol}</span>
                            </div>
                            <div class="coin-name">${data[d].name}</div>
                            <button class="btn btn-primary more" name="${data[d].id}" id="collapse${d}">
                                More Info
                            </button>
                            <div class="collapse" id="${d}">
                                
                            </div>
                        </label>
                    `);
                    }
                }
                if(!foundCoin)
                    $("#home").html("<div class='text-danger'> Sorry could'nt find any coin with that symbol </div>")
            }
            else
                Home.printList(data);

            
            Select.selectValidation(data);
            Home.moreInfo();
        });
    }
}