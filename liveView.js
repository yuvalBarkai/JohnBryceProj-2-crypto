/// <reference path="moreFunctions/jquery-3.6.0.js"/> 

const intervalInc = 2000;


let dataPoints1 = [];
let dataPoints2 = [];
let dataPoints3 = [];
let dataPoints4 = [];
let dataPoints5 = [];

let graphInterval;

/**
 * @param {Array} selectedCoins an array with the selected coins symbols (Select.selectedSym)
 * 
 * Validates if there are coins in the array and also if there is a value for each coin on the API
 * An interval calls cryptocompare api and takes each coins value from there, updates the chart with
 * the information and calls the function updateChart(...priceList) with arrguments containing the prices.
 */
async function liveViewChart(selectedCoins) {
    try {
        dataPoints1.splice(0,dataPoints1.length);
        dataPoints2.splice(0,dataPoints2.length);
        dataPoints3.splice(0,dataPoints3.length);
        dataPoints4.splice(0,dataPoints4.length);
        dataPoints5.splice(0,dataPoints5.length);

        if (selectedCoins.length == 0)
            $("#loading").html("<div class='text-danger'> Please check some coins before entering this page </div>");
        else {
            graphInterval = setInterval(async function () {
                try {
                    let prices = await getPromise(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${selectedCoins}&tsyms=USD`);
                    $("#loading").html("");
                    for (let i = 0; i < 5; i++) {
                        chart.options.data[i].name = "";
                        chart.options.data[i].legendText = ``;
                    }

                    let priceList = [];
                    for (let c in selectedCoins) {
                        chart.options.data[c].name = selectedCoins[c];
                        chart.options.data[c].legendText = `${selectedCoins[c]} $${prices[selectedCoins[c].toUpperCase()].USD}`;
                        priceList.push(prices[selectedCoins[c].toUpperCase()].USD);
                    }
                    
                    updateChart(...priceList);
                }
                catch (e) {
                    $("#loading").html(`<div class='text-danger'> One of the coins does not have a value currently, 
                    please remove it in order to see the chart </div>`);
                    clearInterval(graphInterval);
                }
            }, intervalInc)
        }
    }
    catch (e) {
        console.log(e);
    }
}



// Contains the configuration for the chart 
let chart = new CanvasJS.Chart("chartContainer", {
    zoomEnabled: false,
    title: {
        text: "Coins"
    },
    axisX: {
        title: "Time"
    },
    axisY: {
        prefix: "$"
    },
    toolTip: {
        shared: true
    },
    legend: {
        cursor: "pointer",
        verticalAlign: "top",
        fontSize: 22,
        fontColor: "dimGrey",
        itemclick: toggleDataSeries
    },
    data: [{
        type: "line",
        xValueType: "dateTime",
        yValueFormatString: "$####.00",
        xValueFormatString: "hh:mm:ss TT",
        showInLegend: true,
        name: "",
        dataPoints: dataPoints1
    },
    {
        type: "line",
        xValueType: "dateTime",
        yValueFormatString: "$####.00",
        showInLegend: true,
        name: "",
        dataPoints: dataPoints2
    },
    {
        type: "line",
        xValueType: "dateTime",
        yValueFormatString: "$####.00",
        showInLegend: true,
        name: "",
        dataPoints: dataPoints3
    },
    {
        type: "line",
        xValueType: "dateTime",
        yValueFormatString: "$####.00",
        showInLegend: true,
        name: "",
        dataPoints: dataPoints4
    },
    {
        type: "line",
        xValueType: "dateTime",
        yValueFormatString: "$####.00",
        showInLegend: true,
        name: "",
        dataPoints: dataPoints5
    },
    ]
});


function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
    }
    else {
        e.dataSeries.visible = true;
    }
/*     chart.render(); */
}


/**
 * @param {number} value1 
 * @param {number} value2 
 * @param {number} value3 
 * @param {number} value4 
 * @param {number} value5 
 *  
 * Depending on the arguments, updates the dataPoints arrays with
 * the fitting value and the current time.
 * calls chart.render()
 */
function updateChart(value1, value2, value3, value4, value5) {
    let time = new Date;
    time.setTime(time.getTime() + intervalInc);
    if (value1) {
        dataPoints1.push({
            x: time.getTime(),
            y: value1
        });
    }
    if (value2) {
        dataPoints2.push({
            x: time.getTime(),
            y: value2
        });
    }
    if (value3) {
        dataPoints3.push({
            x: time.getTime(),
            y: value3
        });
    }
    if (value4) {
        dataPoints4.push({
            x: time.getTime(),
            y: value4
        });
    }
    if (value5) {
        dataPoints5.push({
            x: time.getTime(),
            y: value5
        });
    }

    chart.render();
}