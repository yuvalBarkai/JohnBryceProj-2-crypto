/// <reference path="./moreFunctions/jquery-3.6.0.js"/>

// An IIFE function that gets crypto currency array from an api
// and calls a bunch of functions and events
(async function getData() {
    try {
        sessionStorage.clear();
        $("#home").html(spin());
        let list = await getPromise("https://api.coingecko.com/api/v3/coins/list");
        Home.printList(list);
        Home.printSpecific(list);
        Home.moreInfo();
        Select.selectValidation(list);
    }
    catch (e) {
        console.log(e);
    }
})();

// Removes the last coin checked if the user presses the close button in the modal
$("#modal-close").on("click",()=>{
    Select.modalRemove(Select.selected[5]);
});


// clear's the liveView interval, hides #about & #live, shows #home & #form
$("#homeBtn").on("click", () => {
    clearInterval(graphInterval);
    $("#live").css("display","none");
    $("#about").css("display","none");
    $("#home").css("display","grid");
    $("#form").css("display","block");
});

// Hides #form & #home & #about, shows #live with loading spinner and calls liveViewChart() 
$("#liveBtn").on("click", () => {
    $("#form").css("display","none");

    $("#home").css("display","none");
    $("#about").css("display","none");
    $("#live").css("display","block");
    $("#loading").html(spin());
    liveViewChart(Select.selectedSym);
});

// clear's the liveView interval, hides #home & #live, shows #about
$("#aboutBtn").on("click", () => {
    $("#form").css("display","none");

    clearInterval(graphInterval);
    $("#home").css("display","none");
    $("#live").css("display","none");
    $("#about").css("display","block");
});